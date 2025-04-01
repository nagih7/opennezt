/**
 * Resizes a logo image to 4x4 dimensions.
 * @param {File|Blob} file - The input file to resize.
 * @returns {Promise<File>} - A Promise that resolves to the resized file.
 */
const resizeLogo = (file) => {
    return new Promise((resolve, reject) => {
        // Create a FileReader to read the file
        const reader = new FileReader()

        reader.onload = (event) => {
            // Create an image element
            const img = new Image()

            img.onload = () => {
                // Create a canvas with 4x4 dimensions
                const canvas = document.createElement('canvas')
                canvas.width = 4
                canvas.height = 4

                // Draw the image on the canvas, resizing it to 4x4
                const ctx = canvas.getContext('2d')
                // Determine the size for cropping (square)
                const size = Math.min(img.width, img.height)

                // Set canvas to be square with the minimum dimension and resize to 400x400
                const maxSize = 400
                canvas.width = maxSize
                canvas.height = maxSize

                // Calculate offset to center the crop
                const offsetX = (img.width - size) / 2
                const offsetY = (img.height - size) / 2

                // Draw the cropped and resized image
                ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, maxSize, maxSize)

                // Convert the canvas to a blob
                canvas.toBlob((blob) => {
                    // Create a new file from the blob
                    const resizedFile = new File([blob], file.name, {
                        type: file.type,
                        lastModified: new Date().getTime(),
                    })

                    resolve(resizedFile)
                }, file.type)
            }

            img.onerror = () => {
                reject(new Error('Failed to load the image'))
            }

            // Set the source of the image to the read file
            img.src = event.target.result
        }

        reader.onerror = () => {
            reject(new Error('Failed to read the file'))
        }

        // Read the file as a data URL
        reader.readAsDataURL(file)
    })
}

export default resizeLogo
