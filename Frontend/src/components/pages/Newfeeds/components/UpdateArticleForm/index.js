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

const UpdateArticleForm = forwardRef(
   ({ onClose, feed, onSubmit, isLoadingUpdateArticle }, ref) => {
      const [formData, setFormData] = useState(feed);
      const [fileKey, setFileKey] = useState(0);
      const { authUser } = useSelector((state) => state.auth);

      //Tạo ref để lưu ảnh hiện tại
      const handleFileChange = (event) => {
         const newFiles = Array.from(event.target.files);

         const filteredFiles = newFiles.filter((newFile) => {
            const isDuplicate = formData.content.attachment.some(
               (existingFiles) => existingFiles.name === newFile.name
            );
            return !isDuplicate;
         });
         setFormData({
            ...formData,
            content: {
               ...formData.content,
               attachment: [...formData.content.attachment, ...filteredFiles],
            },
         });
      };

      const renderPreviewImages = () => {
         return (
            <div className="relative">
               {" "}
               {formData.content.attachment.length > 0 && (
                  <button
                     className="absolute top-2 right-2 text-[30px] text-[#6f7f92] rounded-full w-6 h-6 flex items-center justify-center z-[999999]"
                     onClick={() => handleRemoveImage()}
                  >
                     ×
                  </button>
               )}
               <div
                  className="max-h-[36vh] overflow-y-auto scrollbar-thin"
                  style={{
                     scrollbarWidth: "thin",
                     scrollbarColor: "#CBD5E1 #F1F5F9",
                     "&::-webkit-scrollbar": {
                        width: "8px",
                     },
                     "&::-webkit-scrollbar-track": {
                        background: "#F1F5F9",
                        borderRadius: "4px",
                     },
                     "&::-webkit-scrollbar-thumb": {
                        background: "#CBD5E1",
                        borderRadius: "4px",
                     },
                     "&::-webkit-scrollbar-thumb:hover": {
                        background: "#94A3B8",
                     },
                  }}
               >
                  {formData.content.attachment.map((image, index) => (
                     <div key={index} className="relative">
                        <img
                           src={
                              typeof image === "string"
                                 ? image
                                 : URL.createObjectURL(image)
                           }
                           alt={`Preview ${index}`}
                           className="w-full auto object-cover rounded-md"
                        />
                     </div>
                  ))}
               </div>
            </div>
         );
      };

      const handleRemoveImage = () => {
         setFileKey((prev) => prev + 1);
         setFormData({
            ...formData,
            content: {
               ...formData.content,
               attachment: [],
            },
         });
      };

      const handleSubmit = async () => {
         await onSubmit(feed._id, formData);
         setFileKey((prev) => prev + 1);
      };

      const handleClose = () => {
         onClose();
      };

      return (
         <>
            <div className="fixed inset-0 flex justify-center items-center z-[999999]">
               <div
                  className="fixed inset-0 flex bg-gray-900 bg-opacity-50"
                  onClick={handleClose}
               ></div>{" "}
               <div className="bg-[#ffffff] w-[600px] p-8 rounded-md mb-4  z-[10]">
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
                           className=" flex justify-center cursor-pointer items-center p-2 rounded-full w-9 h-9"
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

                        <div>{renderPreviewImages()}</div>
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
                           <div className="cursor-pointer">
                              <FileUpload.Root
                                 key={fileKey}
                                 alignItems="stretch"
                                 maxFiles={10}
                                 value={formData.content.attachment}
                                 onChange={handleFileChange}
                                 maxW="100%" // Use full width
                              >
                                 <FileUpload.HiddenInput maxWidth="xl" />
                                 <FileUpload.Trigger asChild>
                                    <div className="cursor-pointer p-0 flex items-center justify-center">
                                       <IconlyImage2
                                          size={30}
                                          color={"#000000"}
                                       />
                                    </div>
                                 </FileUpload.Trigger>
                              </FileUpload.Root>
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
                        {isLoadingUpdateArticle ? (
                           <Button
                              loading
                              className="rounded-md bg-[#0866FF] w-full hover:bg-[#3897F0] font-medium text-[#FFFFFF] text-[15px]"
                           >
                              Post
                           </Button>
                        ) : (
                           <Button
                              onClick={handleSubmit}
                              className="rounded-md bg-[#0866FF] w-full hover:bg-[#3897F0] font-medium text-[#FFFFFF] text-[15px]"
                           >
                              Post
                           </Button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
   }
);

UpdateArticleForm.displayName = "UpdateArticleForm";
export default UpdateArticleForm;
