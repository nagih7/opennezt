import FileUpload from './file-upload'
import mime from 'mime-types'

// decode base 64 to fileUpload
// expiryTime: optional parameter for file expiration in milliseconds
const decodeBase64 = async (base64String, originalname, expiryTime = null) => {
    // Loại bỏ header Base64 (nếu có)
    const base64Data = await base64String.replace(/^data:image\/\w+;base64,/, '')

    // Chuyển Base64 thành Buffer
    const buffer = Buffer.from(base64Data, 'base64')
    const mimetype = mime.lookup(originalname) || 'application/octet-stream'

    // Tạo và trả về đối tượng FileUpload
    return new FileUpload({ originalname, mimetype, buffer, expiryTime })
}

export default decodeBase64
