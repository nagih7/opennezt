import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ContainerLogo = () => {
  // const [selectedImage, setSelectedImage] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files?.[0]; // Lấy file đầu tiên nếu có
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file)); // Tạo URL tạm thời để hiển thị ảnh
  //   }
  // };
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px",
    width: 100, // Kích thước mặc định
    height: 100,
    x: 10,
    y: 10,
    aspect: 1, // Tỉ lệ vuông
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);

  // Xử lý khi tải ảnh lên
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Giới hạn kích thước crop
  const onCropChange = (newCrop) => {
    setCrop({
      ...newCrop,
      width: Math.min(newCrop.width, 200), // Giới hạn max width
      height: Math.min(newCrop.height, 200), // Giới hạn max height
    });
  };

  // Cập nhật preview theo thời gian thực
  useEffect(() => {
    if (!crop.width || !crop.height || !imageRef.current) return;

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

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
    );

    setCroppedImage(canvas.toDataURL());
  }, [crop]);

  return (
    <div>
      <div className="bg-[#f8f9fa] rounded-t-md mt-8">
        <ul className="flex text-sm mb-0 px-[24px] pt-[24px] pb-[16px]">
          <li className="pr-[24px]">
            <a href="#" className="no-underline text-[#2f65b9] font-medium">
              Upload
            </a>
          </li>
          <li className="pr-[24px]">
            <a href="#" className="no-underline text-[#6f7f92] font-medium">
              Delete
            </a>
          </li>
        </ul>
      </div>
      <div className="bg-[#f8f9fa] rounded-b-md">
        <div className="px-[24px] pb-[24px]">
          <div>
            <div className="p-10 border-dashed border-[#6f7f9266] border-3 ">
              <div className="flex flex-col items-center justify-center  py-10">
                {!selectedImage ? (
                  <>
                    <p className="mb-[5px] font-medium">Drop your file here</p>
                    <p className="mb-[5px] text-[#6f7f92] font-medium">or</p>
                  </>
                ) : (
                  <div className="text-center">
                    <img
                      src={selectedImage}
                      alt="Selected Preview"
                      className="mt-2 rounded-md mb-[16px]"
                      style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        objectFit: "cover",
                      }}
                    />
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
              <div className="flex flex-col items-center space-y-4 p-6">
                {/* <label className="text-blue-600 cursor-pointer font-semibold">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label> */}

                {/* Khu vực chọn và crop ảnh */}
                {selectedImage && (
                  <div className="flex gap-4">
                    {/* Khu vực crop */}
                    <div className="border rounded-md overflow-hidden">
                      <ReactCrop
                        crop={crop}
                        onChange={onCropChange}
                        aspect={1} // Crop vuông
                        minWidth={400} // Giới hạn min
                        minHeight={400}
                      >
                        <img
                          ref={imageRef}
                          src={selectedImage}
                          alt="Preview"
                          className="max-w-[300px] max-h-[300px]"
                        />
                      </ReactCrop>
                    </div>

                    {/* Ảnh preview */}
                    <div className="flex flex-col items-center">
                      <canvas
                        ref={previewCanvasRef}
                        className="w-[150px] h-[150px] object-cover rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerLogo;
