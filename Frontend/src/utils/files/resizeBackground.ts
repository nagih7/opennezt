const resizeBackground = (file: File): Promise<File> => {
   return new Promise((resolve, reject) => {
      // Validate if it's an image
      if (!file.type.startsWith('image/')) {
         reject(new Error('Please select an image file'))
         return
      }

      // Create an image element to get dimensions
      const img = new Image()
      img.onload = () => {
         // For background images, maintain aspect ratio but resize to reasonable dimensions
         const canvas = document.createElement('canvas')
         const ctx = canvas.getContext('2d')

         if (!ctx) {
            reject(new Error('Failed to get canvas context'))
            return
         }

         // Set max dimensions for background image (wider than tall)
         const maxWidth = 1280
         const maxHeight = 800

         // Calculate dimensions while preserving aspect ratio
         let newWidth, newHeight
         if (img.width / img.height > maxWidth / maxHeight) {
            // Image is wider than our target ratio
            newWidth = maxWidth
            newHeight = (img.height * maxWidth) / img.width
         } else {
            // Image is taller than our target ratio
            newHeight = maxHeight
            newWidth = (img.width * maxHeight) / img.height
         }

         // Set canvas dimensions
         canvas.width = newWidth
         canvas.height = newHeight

         // Draw the resized image
         ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, newWidth, newHeight)

         // Convert to blob then file
         canvas.toBlob((blob) => {
            if (!blob) {
               reject(new Error('Failed to create blob from canvas'))
               return
            }
            const resizedFile = new File([blob], file.name, { type: file.type })
            // Resolve the promise with the resized file
            resolve(resizedFile)
         }, file.type)
      }

      img.onerror = () => {
         reject(new Error('Failed to load image'))
      }

      // Load the image from the file
      const reader = new FileReader()
      reader.onload = (e: any) => {
         img.src = e.target.result
      }
      reader.readAsDataURL(file)
   })
}

export default resizeBackground
