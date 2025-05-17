import React, { useState, useRef, useEffect, ChangeEvent } from 'react'
import ReactCrop, { PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

type CropData = Omit<PixelCrop, 'unit'> & {
   unit: 'px' | '%'
   aspect?: number
}

const CanvasLogo: React.FC = () => {
   const [selectedImage, setSelectedImage] = useState<string | null>(null)
   const [crop, setCrop] = useState<CropData>({
      unit: 'px',
      width: 100, // Kích thước mặc định
      height: 100,
      x: 10,
      y: 10,
   })
   const [croppedImage, setCroppedImage] = useState<string | null>(null)
   const imageRef = useRef<HTMLImageElement | null>(null)
   const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)

   // Xử lý khi tải ảnh lên
   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         setSelectedImage(URL.createObjectURL(file))
      }
   }

   // Giới hạn kích thước crop
   const onCropChange = (newCrop: PixelCrop) => {
      setCrop({
         ...(newCrop as CropData),
         width: Math.min(newCrop.width, 400), // Giới hạn max width
         height: Math.min(newCrop.height, 400), // Giới hạn max height
      })
   }

   // Cập nhật preview theo thời gian thực
   useEffect(() => {
      if (!crop.width || !crop.height || !imageRef.current || !previewCanvasRef.current) return

      const canvas = previewCanvasRef.current
      const ctx = canvas.getContext('2d')

      if (!ctx) return

      const scaleX = imageRef.current.naturalWidth / imageRef.current.width
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height

      canvas.width = crop.width
      canvas.height = crop.height

      ctx.drawImage(
         imageRef.current,
         crop.x * scaleX,
         crop.y * scaleY,
         crop.width * scaleX,
         crop.height * scaleY,
         0,
         0,
         crop.width,
         crop.height
      )

      setCroppedImage(canvas.toDataURL())
   }, [crop])

   console.log('croppedImage', croppedImage)
   // Crop ảnh
   const handleOnCrop = () => {
      if (!imageRef.current || !previewCanvasRef.current) return

      const canvas = previewCanvasRef.current
      const ctx = canvas.getContext('2d')

      if (!ctx) return

      const scaleX = imageRef.current.naturalWidth / imageRef.current.width
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height

      canvas.width = crop.width
      canvas.height = crop.height

      ctx.drawImage(
         imageRef.current,
         crop.x * scaleX,
         crop.y * scaleY,
         crop.width * scaleX,
         crop.height * scaleY,
         0,
         0,
         crop.width,
         crop.height
      )

      setCroppedImage(canvas.toDataURL())
   }

   return (
      <div>
         <div className="bg-[#f8f9fa] rounded-t-md mt-8">
            <ul className="flex text-sm mb-0 px-[24px] pt-[24px] pb-[16px]">
               <li className="pr-[24px] text-[#2f65b9] font-medium">Upload</li>
               <li className="pr-[24px] text-[#6f7f92] font-medium">Delete</li>
            </ul>
         </div>
         <div className="bg-[#f8f9fa] rounded-b-md">
            <div className="px-[24px] pb-[24px]">
               <div>
                  <div className="p-10 border-dashed border-[#6f7f9266] border-3 ">
                     <div className="flex flex-col items-center justify-center gap-12 py-10">
                        {!selectedImage ? (
                           <>
                              <p className="mb-[5px] font-medium">Drop your file here</p>
                              <p className="mb-[5px] text-[#6f7f92] font-medium">or</p>
                           </>
                        ) : (
                           <div className="flex flex-col items-center w-full p-0 space-y-4">
                              {/* Khu vực chọn và crop ảnh */}
                              {selectedImage && (
                                 <div className="relative flex justify-center w-full gap-4">
                                    {/* Khu vực crop */}
                                    <div className="overflow-hidden w-[400px] h-[400px] relative flex justify-center items-center">
                                       <ReactCrop
                                          crop={crop}
                                          onChange={(c) => onCropChange(c)}
                                          aspect={1} // Crop vuông
                                          minWidth={100} // Giới hạn min
                                          minHeight={100}
                                          className="max-w-[400px] max-h-[400px]"
                                       >
                                          <img
                                             ref={imageRef}
                                             src={selectedImage}
                                             alt="Preview"
                                             className="max-w-[400px] max-h-[400px] bg-center bg-cover"
                                          />
                                       </ReactCrop>
                                    </div>

                                    {/* Ảnh preview */}
                                    <div className="absolute right-0 flex flex-col items-center gap-2">
                                       <canvas
                                          ref={previewCanvasRef}
                                          className="max-w-[150px] max-h-[150px] object-cover "
                                       />
                                       <label
                                          onClick={() => handleOnCrop()}
                                          htmlFor=""
                                          className="px-[30px] py-[11px] cursor-pointer text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                                       >
                                          CROP IMAGE
                                       </label>
                                    </div>
                                 </div>
                              )}
                           </div>
                        )}
                        <div className="text-center">
                           <input
                              type="file"
                              accept="image/*"
                              id="fileInput"
                              className="hidden"
                              onChange={handleFileChange}
                           />
                           <label
                              htmlFor="fileInput"
                              className="px-[24px] py-[11px] cursor-pointer text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                           >
                              SELECT YOUR FILE
                           </label>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CanvasLogo
