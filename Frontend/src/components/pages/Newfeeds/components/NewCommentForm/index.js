import React, { useEffect } from "react";
import { IconlyImage2 } from "components/UI/Iconly";
import avt from "assets/images/background/avt.jpg";
import { useSelector } from "react-redux";
import { Button, FileUpload, FileUploadList } from "@chakra-ui/react";
import { LuFileImage } from "react-icons/lu";
import { useState } from "react";

const NewCommentForm = ({ article_id, onSubmit }) => {
   const authUser = useSelector((state) => state.auth.authUser);
   const [formData, setFormData] = useState({
      article_id: article_id,
      content: {
         caption: "",
         image: "",
      },
   });
   const [fileKey, setFileKey] = useState(0);

   const handleFileChange = async (event) => {
      const files = Array.from(event.target.files);
      const processedFiles = await Promise.all(
         files.map(async (file) => {
            return {
               name: file.name,
               size: file.size,
               type: file.type,
               lastModified: file.lastModified,
               // Convert file to base64
               data: await convertFileToBase64(file),
            };
         })
      );

      setFormData({
         ...formData,
         content: {
            ...formData.content,
            image: processedFiles[0],
         },
      });
   };

   const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onload = () => resolve(reader.result);
         reader.onerror = reject;
         reader.readAsDataURL(file);
      });
   };

   const handleSubmit = async () => {
      await onSubmit(formData);
      await setFormData({
         article_id: article_id,
         content: {
            caption: "",
            image: "",
         },
      });
      await setFileKey((prev) => prev + 1);
   };

   const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault(); // Prevent default enter behavior
         if (formData.content.caption.trim()) {
            // Only submit if there's content
            handleSubmit();
         }
      }
   };

   return (
      <div>
         <div
            className="flex items-center w-full p-[10px] justify-between rounded-md border-[1px] border-gray-200 gap-3"
            onKeyDown={handleKeyDown}
         >
            <div className="flex">
               <div className="w-8 h-8">
                  {authUser?.avatar ? (
                     <img
                        src={authUser.avatar}
                        className="rounded-full w-8 h-8"
                     />
                  ) : (
                     <img src={avt} className="rounded-full w-8 h-8" />
                  )}
               </div>
               <div className="pl-3">
                  <input
                     type="text"
                     placeholder="Write a comment..."
                     className="w-[630px] h-9 bg-[#ffffff] pr-[50px] outline-none"
                     onChange={(e) =>
                        setFormData({
                           ...formData,
                           content: {
                              ...formData.content,
                              caption: e.target.value,
                           },
                        })
                     }
                     value={formData.content.caption}
                  />
               </div>
            </div>

            <div className="flex items-center ">
               <div className="w-9 h-9 bg-[#f8f9fa] rounded-md flex items-center justify-center">
                  <FileUpload.Root
                     accept="image/*"
                     value={formData.content.image}
                     onChange={handleFileChange}
                     key={fileKey}
                  >
                     <FileUpload.HiddenInput />
                     <FileUpload.Trigger asChild>
                        <div className="cursor-pointer p-0 flex items-center justify-center">
                           <IconlyImage2 size={30} color={"#000000"} />
                        </div>
                     </FileUpload.Trigger>
                     <FileUploadList />
                  </FileUpload.Root>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NewCommentForm;
