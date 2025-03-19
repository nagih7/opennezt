import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import {
   Box,
   FileUpload,
   Icon,
   Image,
   Text,
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

const CreateArticleForm = forwardRef(({ onSubmitForm, onCloseForm }, ref) => {
   const [formData, setFormData] = useState({
      content: {
         caption: "",
         attachment: [],
         hashtags: [],
      },
      audience: "public",
      status: "published",
      project_id: "675aa5d48107dd51e42c5b0f",
   });
   const [fileKey, setFileKey] = useState(0);
   const { authUser } = useSelector((state) => state.auth);
   const [isOpenImages, setIsOpenImages] = useState(false);

   const handleClickImage = () => {
      setIsOpenImages(!isOpenImages);
   };

   const handleFileChange = async (event) => {
      const files = Array.from(event.target.files);
      setFormData({
         ...formData,
         content: {
            ...formData.content,
            attachment: files,
         },
      });
   };

   const handleSubmit = async () => {
      await onSubmitForm(formData);
      await setFormData({
         content: {
            caption: "",
            attachment: [],
            hashtags: [],
         },
         audience: "public",
         status: "published",
         project_id: "675aa5d48107dd51e42c5b0f",
      });
      await setFileKey((prev) => prev + 1);
      handleClick();
   };

   const handleClick = () => {
      onCloseForm();
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
                        Create Post
                     </span>
                     <div
                        onClick={handleClick}
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
                           maxFiles={10}
                           value={formData.content.attachment}
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
                           <FileUpload.List>
                              {(file) => (
                                 <Box
                                    key={file.id}
                                    p={2}
                                    mb={2}
                                    border="1px"
                                    borderColor="gray.200"
                                    borderRadius="md"
                                 >
                                    {file.type &&
                                    file.type.startsWith("image/") ? (
                                       <Image
                                          src={URL.createObjectURL(file)}
                                          alt={file.name}
                                          boxSize="100px"
                                          objectFit="cover"
                                       />
                                    ) : (
                                       <Text>{file.name}</Text>
                                    )}
                                 </Box>
                              )}
                           </FileUpload.List>
                        </FileUpload.Root>
                     </div>
                  </div>
                  {/* <NativeSelect.Root size="sm" width="240px">
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
                        onClick={handleSubmit}
                        className="rounded-md bg-[#2f65b9] w-full"
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

CreateArticleForm.displayName = "CreateArticleForm";
export default CreateArticleForm;
