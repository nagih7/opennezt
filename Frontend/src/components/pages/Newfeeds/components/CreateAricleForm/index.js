import React, { forwardRef } from "react";
import { useState } from "react";
import {
   Box,
   FileUpload,
   Icon,
   Field,
   Input,
   NativeSelect,
   Button,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { last, set } from "lodash";

const CreateArticleForm = forwardRef(({ onSubmitForm }, props, ref) => {
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

   //Lưu từng file những thuộc tính quan trọng rồi chuyển thành base64
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
            attachment: processedFiles,
         },
      });
   };

   //convert to Base 64
   const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onload = () => resolve(reader.result);
         reader.onerror = reject;
         reader.readAsDataURL(file);
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
   };

   return (
      <>
         <div>
            <div label="Caption">
               <Input
                  ref={ref}
                  placeholder="Hire Talents For Your Project"
                  style={{ background: "#FFFFFF" }}
                  className="gap-2"
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
               ></Input>
               {/* <NativeSelect.Root size="sm" width="240px">
                  <NativeSelect.Field placeholder="Select option">
                     <option value="react">React</option>
                     <option value="vue">Vue</option>
                     <option value="angular">Angular</option>
                     <option value="svelte">Svelte</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
               </NativeSelect.Root> */}
               <FileUpload.Root
                  maxW="xl"
                  key={fileKey}
                  alignItems="stretch"
                  maxFiles={10}
                  value={formData.content.attachment}
                  onChange={handleFileChange}
               >
                  <FileUpload.HiddenInput />
                  <FileUpload.Dropzone>
                     <Icon as={LuUpload} size="md" color="fg.muted"></Icon>
                     <FileUpload.DropzoneContent>
                        <Box>Drag and drop files here</Box>
                        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                     </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                  <FileUpload.List />
               </FileUpload.Root>
               <Button onClick={handleSubmit}>Submit</Button>
            </div>
         </div>
      </>
   );
});

CreateArticleForm.displayName = "CreateArticleForm";
export default CreateArticleForm;
