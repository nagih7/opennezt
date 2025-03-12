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

const CreateArticleForm = forwardRef((props, ref) => {
   const [formData, setFormData] = useState({
      content: {
         caption: "",
         attachments: [],
         hashtags: [],
      },
      audience: "public",
      status: "published",
      project_id: "",
   });
   const [caption, setCaption] = useState("");
   const [files, setFiles] = useState([]);

   const handleFileChange = (acceptedFiles) => {
      setFiles(acceptedFiles);
   };

   const handleSubmit = () => {
      setFormData({
         ...formData,
         content: {
            ...formData.content,
            caption: caption,
         },
      });
   };

   console.log(files);
   console.log(formData);

   // files.forEach((file, index) => {
   //    formData.append(`file${index}`, file);
   // });

   return (
      <>
         <div>
            <div label="Caption">
               <Input
                  ref={ref}
                  placeholder="Hire Talents For Your Project"
                  style={{ background: "#FFFFFF" }}
                  className="gap-2"
                  // value={caption}
                  onChange={(e) => setCaption(e.target.value)}
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
                  alignItems="stretch"
                  maxFiles={10}
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
