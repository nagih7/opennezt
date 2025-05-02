import fs from 'fs'
import path from 'path'
import bytes from 'bytes'
import mime from 'mime-types'
import { PUBLIC_DIR, UUID_TRANSLATOR } from '@/configs'

class FileUpload {
    static UPLOAD_FOLDER = 'uploads'
    static METADATA_FILE = path.join(PUBLIC_DIR, 'private', 'file_metadata.json')

    // originalname: string
    // expiryTime: number (milliseconds) - optional parameter to set file expiration time
    constructor({ originalname, mimetype, buffer, expiryTime = null }) {
        this.originalname = originalname
        this.mimetype = mimetype
        this.buffer = buffer
        this.filename = `${UUID_TRANSLATOR.generate()}.${mime.extension(this.mimetype)}`
        this.expiryTime = expiryTime
    }

    // toJSON: Chuyển đổi dữ liệu thành dạng JSON
    toJSON() {
        const { buffer, ...rest } = this
        rest.filesize = bytes(Buffer.byteLength(buffer))
        return rest
    }

    // toString: Chuyển đổi dữ liệu thành dạng chuỗi
    toString() {
        return this.filepath || this.originalname
    }

    // Loads the metadata file containing expiration information
    static _loadMetadata() {
        try {
            if (!fs.existsSync(FileUpload.METADATA_FILE)) {
                // Create directory if it doesn't exist
                const metadataDir = path.dirname(FileUpload.METADATA_FILE)
                fs.mkdirSync(metadataDir, { recursive: true })
                // Create empty metadata file
                fs.writeFileSync(FileUpload.METADATA_FILE, JSON.stringify({}))
                return {}
            }
            const data = fs.readFileSync(FileUpload.METADATA_FILE, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            console.error('Error loading file metadata:', error)
            return {}
        }
    }

    // Saves the metadata file containing expiration information
    static _saveMetadata(metadata) {
        try {
            fs.writeFileSync(FileUpload.METADATA_FILE, JSON.stringify(metadata, null, 2))
        } catch (error) {
            console.error('Error saving file metadata:', error)
        }
    }

    // Schedule file for deletion after expiry time
    _scheduleFileDeletion(filepath) {
        if (!this.expiryTime) return

        const metadata = FileUpload._loadMetadata()
        const expiryTimestamp = Date.now() + this.expiryTime

        // Save expiry information
        metadata[filepath] = {
            expiryTimestamp,
            originalname: this.originalname,
        }

        FileUpload._saveMetadata(metadata)

        // Schedule deletion
        setTimeout(() => {
            FileUpload.remove(filepath)

            // Update metadata after deletion
            const updatedMetadata = FileUpload._loadMetadata()
            delete updatedMetadata[filepath]
            FileUpload._saveMetadata(updatedMetadata)
        }, this.expiryTime)
    }

    // save: Lưu file vào thư mục upload
    save(...paths) {
        if (!this.filepath) {
            const uploadDir = path.join(PUBLIC_DIR, FileUpload.UPLOAD_FOLDER, ...paths)
            fs.mkdirSync(uploadDir, { recursive: true })
            fs.writeFileSync(path.join(uploadDir, this.filename), this.buffer)
            this.filepath = path.posix.join(FileUpload.UPLOAD_FOLDER, ...paths, this.filename)

            // If expiry time is set, schedule file for deletion
            if (this.expiryTime) {
                this._scheduleFileDeletion(this.filepath)
            }

            return this.filepath
        } else {
            throw new Error('File saved. Use the "filepath" attribute to retrieve the file path.')
        }
    }

    // remove: Xóa file
    static remove(filepath) {
        filepath = path.join(PUBLIC_DIR, filepath)
        if (!fs.existsSync(filepath)) return
        const stats = fs.statSync(filepath)
        if (stats.isFile()) fs.unlinkSync(filepath)

        // Remove from metadata if exists
        const metadata = FileUpload._loadMetadata()
        if (metadata[filepath]) {
            delete metadata[filepath]
            FileUpload._saveMetadata(metadata)
        }
    }

    // Check for and remove expired files
    static cleanupExpiredFiles() {
        const metadata = FileUpload._loadMetadata()
        const now = Date.now()
        let hasChanges = false

        for (const [filepath, data] of Object.entries(metadata)) {
            if (data.expiryTimestamp && data.expiryTimestamp <= now) {
                FileUpload.remove(filepath)
                delete metadata[filepath]
                hasChanges = true
            }
        }

        if (hasChanges) {
            FileUpload._saveMetadata(metadata)
        }

        return hasChanges
    }
}

export default FileUpload
