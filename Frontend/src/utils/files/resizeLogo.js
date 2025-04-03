const resizeLogo = (file) => {
    return new Promise((resolve, reject) => {
        // Validate if it's an image
        if (!file.type.startsWith('image/')) {
            reject(new Error('Please select an image file'))
            return
        }

        // Create an image element to get dimensions for cropping
        const img = new Image()
        img.onload = () => {
            // For 4x4 aspect ratio, make the dimensions equal
            const canvas = document.createElement('canvas')
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

            // Convert to blob then file
            canvas.toBlob((blob) => {
                const croppedFile = new File([blob], file.name, { type: file.type })
                // Resolve the promise with the cropped file
                resolve(croppedFile)
            }, file.type)
        }

        img.onerror = () => {
            reject(new Error('Failed to load image'))
        }

        // Load the image from the file
        const reader = new FileReader()
        reader.onload = (e) => {
            img.src = e.target.result
        }
        reader.readAsDataURL(file)
    })
}

export default resizeLogo
