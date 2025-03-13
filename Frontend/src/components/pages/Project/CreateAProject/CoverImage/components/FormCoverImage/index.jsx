import React, { useState } from "react";

const FormCoverImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]; // Lấy file đầu tiên nếu có
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Tạo URL tạm thời để hiển thị ảnh
    }
  };

  return (
    <div>
      <p className="my-[16px] text-[#6f7f92]">
        The Cover Image will be used to customize the header of your project.
      </p>
      <div className="bg-[#f8f9fa] rounded-md">
        <div className="px-[24px] py-[24px]">
          <div>
            <div className="p-10 border-dashed border-[#6f7f9266] border-3">
              <div className="flex flex-col items-center justify-center  py-10">
                {/* Hiển thị ảnh nếu đã chọn, nếu không thì hiển thị text */}
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
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
                <div className="text-center">
                  {/* Input file */}
                  <input
                    type="file"
                    accept="image/*" // Chỉ cho phép chọn ảnh
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange} // Xử lý sự kiện khi người dùng chọn file
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

      {/* Hiển thị ảnh đã chọn */}
      {/* {selectedImage && (
        <div className="mt-4">
          <p>Selected Image:</p>
          <img
            src={selectedImage}
            alt="Selected Preview"
            className="mt-2"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )} */}
      <div className="my-[16px]">
        <p className="border-l-2 border-[#f14646] font-medium text-sm text-[#f14646] rounded-r-md bg-[#f8eaea] p-[15px]">
          For better results, make sure to upload an image that is larger than
          0px wide, and 225px tall.
        </p>
      </div>
    </div>
  );
};

export default FormCoverImage;
