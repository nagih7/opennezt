/**
 *
 * @param {*} file
 * @returns  {Promise<File>} - A promise that resolves to a resized file with a 4x4 aspect ratio
 * This function takes an image file, crops it to a square aspect ratio, and resizes it to 400x400 pixels.
 */
interface ResizeLogoError extends Error {
   message: string
}

const resizeLogo = (file: File): Promise<File> => {
   return new Promise<File>((resolve: (value: File) => void, reject: (reason: ResizeLogoError) => void) => {
      // Validate if it's an image
      if (!file.type.startsWith('image/')) {
         reject(new Error('Please select an image file') as ResizeLogoError)
         return
      }

      // Create an image element to get dimensions for cropping
      const img: HTMLImageElement = new Image()
      img.onload = (): void => {
         // For 4x4 aspect ratio, make the dimensions equal
         const canvas: HTMLCanvasElement = document.createElement('canvas')
         const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

         // Determine the size for cropping (square)
         const size: number = Math.min(img.width, img.height)

         // Set canvas to be square with the minimum dimension and resize to 400x400
         const maxSize: number = 400
         canvas.width = maxSize
         canvas.height = maxSize

         // Calculate offset to center the crop
         const offsetX: number = (img.width - size) / 2
         const offsetY: number = (img.height - size) / 2

         // Draw the cropped and resized image
         ctx!.drawImage(img, offsetX, offsetY, size, size, 0, 0, maxSize, maxSize)

         // Convert to blob then file
         canvas.toBlob((blob: Blob | null): void => {
            const croppedFile: File = new File([blob!], file.name, { type: file.type })
            // Resolve the promise with the cropped file
            resolve(croppedFile)
         }, file.type)
      }

      img.onerror = (): void => {
         reject(new Error('Failed to load image') as ResizeLogoError)
      }

      // Load the image from the file
      const reader: FileReader = new FileReader()
      reader.onload = (e: any): void => {
         img.src = e.target.result as string
      }
      reader.readAsDataURL(file)
   })
}

export default resizeLogo
