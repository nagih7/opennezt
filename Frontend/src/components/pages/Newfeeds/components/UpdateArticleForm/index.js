import React, { forwardRef, useEffect } from "react";
import { useState, useCallback, useRef } from "react";
import {
   Box,
   FileUpload,
   Icon,
   Field,
   Input,
   NativeSelect,
   Button,
   Textarea,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { last, set } from "lodash";
import { CloseOutlined } from "@mui/icons-material";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import {
   IconlyAddUser,
   IconlyImage2,
   IconlyLocation,
   Iconlyuser,
   IconlyUser,
} from "components/UI/Iconly";

const UpdateArticleForm = forwardRef(({ onClose, feed, onSubmit }, ref) => {
   const [formData, setFormData] = useState(feed);
   const [fileKey, setFileKey] = useState(0);
   const { authUser } = useSelector((state) => state.auth);
   const [isOpenImages, setIsOpenImages] = useState(false);

   const handleClickImage = () => {
      setIsOpenImages(!isOpenImages);
   };

   //Tạo ref để lưu ảnh hiện tại
   const imagesRef = useRef([...formData.content.attachment] || []);

   //Nếu có ảnh thì bật form lên
   useEffect(() => {
      if (imagesRef.current.length > 0) {
         setIsOpenImages(true);
      }
   }, [imagesRef]);

   const handleFileChange = async (event) => {
      //Ảnh được chọn trong form
      const files = await Array.from(event.target.files);
      if (files.length === 0) return;

      //newImages là ảnh được gửi từ db
      const newImages = [...imagesRef.current];
      //lọc từng phần tử files mới
      files.forEach((file) => {
         //lọc từng phần tử trong ref(là những ảnh hiện tại đang có)
         //so sánh với phẩn tử mới với phần tử cũ nếu trùng tên thì bỏ còn lại giữ
         if (!newImages.some((img) => img.name === file.name)) {
            newImages.push(file);
         }
      });

      //Khác thì set lại giá trị
      if (newImages.length !== imagesRef.current.length) {
         imagesRef.current = newImages;
         // Nếu muốn update formData với ảnh mới
         setFormData({
            ...formData,
            content: {
               ...formData.content,
               attachment: newImages,
            },
         });
      }
   };

   const renderPreviewImages = () => {
      return imagesRef.current.map((image, index) => (
         <div key={index} className="relative">
            <img
               src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
               }
               alt={`Preview ${index}`}
               className="w-20 h-20 object-cover rounded-md"
            />
            <button
               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
               onClick={() => handleRemoveImage(index)}
            >
               ×
            </button>
         </div>
      ));
   };

   const handleSubmit = async () => {
      onSubmit(feed._id, formData);
      await setFileKey((prev) => prev + 1);
      handleClose();
   };

   const handleRemoveImage = (index) => {
      // Xóa ảnh từ imagesRef
      const newImages = imagesRef.current.filter((_, i) => i !== index);
      imagesRef.current = newImages;

      // Cập nhật formData để re-render UI
      setFormData({
         ...formData,
         content: {
            ...formData.content,
            attachment: newImages,
         },
      });
   };

   const handleClose = () => {
      onClose();
   };

   return (
      <>
         <div className="fixed inset-0 flex justify-center items-center z-[999999] bg-gray-900 bg-opacity-50">
            <div className="bg-[#ffffff] w-[600px] p-8 rounded-md mb-4">
               <div
                  label="Caption"
                  className="flex flex-col justify-center items-center gap-3"
               >
                  <div className="flex justify-between w-full border-b-2 border-gray-200 pb-2">
                     <span> </span>
                     <span className="text-2xl font-bold text-center">
                        Edit Post
                     </span>
                     <div
                        onClick={handleClose}
                        className=" bg-[#aaadb1] flex justify-center cursor-pointer items-center p-2 rounded-full"
                     >
                        <CloseOutlined />
                     </div>
                  </div>
                  <div className="flex gap-3 justify-start w-full">
                     <Avatar
                        size={50}
                        src={authUser.avatar}
                        style={{ cursor: "pointer" }}
                     ></Avatar>
                     <div>
                        <div
                           href="#"
                           className="flex items-center gap-2 text-black no-underline text-nowrap"
                        >
                           <span className="font-semibold">
                              {authUser.name}
                           </span>
                        </div>
                        <div className="text-xs text-gray-500">
                           @{authUser.email}
                        </div>
                     </div>
                  </div>
                  <div className="w-full text-wrap p-2 ">
                     <Textarea
                        ref={ref}
                        placeholder="Hire Talents For Your Project"
                        style={{
                           background: "#FFFFFF",
                           outline: "none",
                           height: "100px",
                        }}
                        className="gap-2"
                        maxH="200px"
                        value={formData.content.caption}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              content: {
                                 ...formData.content,
                                 caption: e.target.value,
                              },
                           })
                        }
                     ></Textarea>
                     <div
                        className={`w-full border-3 border-dashed ${
                           isOpenImages ? "" : "hidden"
                        }  border-gray-200 rounded-md`}
                     >
                        <FileUpload.Root
                           key={fileKey}
                           alignItems="stretch"
                           maxFiles={5}
                           onChange={handleFileChange}
                           maxW="100%" // Use full width
                        >
                           <FileUpload.HiddenInput maxWidth="xl" />
                           <FileUpload.Dropzone
                              maxWidth="100%" // Adjust to full width
                              style={{ height: "100%", width: "100%" }} // Make it full width and height
                           >
                              <Icon
                                 as={LuUpload}
                                 size="md"
                                 color="fg.muted"
                              ></Icon>
                              <FileUpload.DropzoneContent maxWidth="100%">
                                 <Box>Drag and drop files here</Box>
                                 <Box color="fg.muted">
                                    .png, .jpg up to 5MB
                                 </Box>
                              </FileUpload.DropzoneContent>
                           </FileUpload.Dropzone>
                           <div>{renderPreviewImages()}</div>
                        </FileUpload.Root>
                     </div>
                  </div>

                  {/* <NativeSelect.Root size="sm" width="240px">
>>>>>>> 638522b5ad26b2a4fa6f97e3a677712d7c644fe0
                  <NativeSelect.Field placeholder="Select option">
                     <option value="react">React</option>
                     <option value="vue">Vue</option>
                     <option value="angular">Angular</option>
                     <option value="svelte">Svelte</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
               </NativeSelect.Root> */}

                  <div className=" flex items-center justify-between border border-gray-200 rounded-md p-3 w-full">
                     <span>Add to your post</span>
                     <div className="flex gap-3">
                        <div
                           className="cursor-pointer"
                           onClick={handleClickImage}
                        >
                           <IconlyImage2 size={30} color={"#000000"} />
                        </div>
                        <div className="cursor-pointer">
                           <IconlyLocation size={30} color={"#000000"} />
                        </div>
                        <div className="cursor-pointer">
                           <IconlyAddUser size={30} color={"#000000"} />
                        </div>
                     </div>
                  </div>

                  <div className="flex gap-3 w-full">
                     <Button
                        className="rounded-md bg-[#2f65b9] w-full"
                        onClick={handleSubmit}
                     >
                        Post
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
});

UpdateArticleForm.displayName = "UpdateArticleForm";
export default UpdateArticleForm;
