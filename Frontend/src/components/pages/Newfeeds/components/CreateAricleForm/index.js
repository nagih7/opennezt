import React, { forwardRef, useEffect } from "react";
import { useState, useRef } from "react";
import {
  Box,
  FileUpload,
  Icon,
  Image,
  Text,
  Field,
  Input,
  InputGroup,
  NativeSelect,
  Button,
  Textarea,
  Dialog,
  Portal,
  CloseButton,
  List,
} from "@chakra-ui/react";
import { LuUpload, LuSearch } from "react-icons/lu";
import { last, set } from "lodash";
import { CloseOutlined } from "@mui/icons-material";
import { Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  IconlyAddUser,
  IconlyImage2,
  IconlyLocation,
  Iconlyuser,
  IconlyUser,
  IconlyWork,
  IconlyDocument,
} from "components/UI/Iconly";
import { filter } from "lodash";
import { getListMyProjects } from "api/project";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import img_avatar from "assets/images/background/avt.jpg";

const CreateArticleForm = forwardRef(
  ({ onSubmitForm, onCloseForm, isLoadingCreateArticle }, ref, isBottom) => {
    const [formData, setFormData] = useState({
      content: {
        caption: "",
        attachment: [],
        hashtags: [],
      },
      audience: "public",
      status: "published",
      project_id: "",
    });
    const [fileKey, setFileKey] = useState(0);
    const { authUser } = useSelector((state) => state.auth);

    // Project
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchProject, setSearchProject] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myProjects, paginationListMyProjects, isLoadingGetListMyProjects } =
      useSelector((state) => state.project);

    useEffect(() => {
      if (myProjects.length === 0) {
        dispatch(getListMyProjects(paginationListMyProjects));
      }
    }, [dispatch, paginationListMyProjects, myProjects]);

    useEffect(() => {
      if (
        isBottom &&
        isLoadingGetListMyProjects === false &&
        paginationListMyProjects.currentPage < paginationListMyProjects.lastPage
      ) {
        // Call API hoặc load thêm dữ liệu
        dispatch(
          getListMyProjects({
            ...paginationListMyProjects,
            currentPage: parseInt(paginationListMyProjects.currentPage) + 1,
          })
        );
      }
    }, [
      isBottom,
      dispatch,
      paginationListMyProjects,
      isLoadingGetListMyProjects,
    ]);

    // const handleNavigateToProjectDetails = (project) => {
    //   navigate(`/projects/details/${project._id}`);
    // };

    const handleSelectProject = (project) => {
      setSelectedProject(project);
      setFormData({
        ...formData,
        project_id: project._id,
      });
      setIsModalOpen(false);
    };

    const handleSearchProject = (e) => {
      setSearchProject(e.target.value);
    };

    const handleModalOpen = () => {
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    //Images

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
          <div>
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

    useEffect(() => {
      console.log(formData);
    }, [formData]);
    //End Images
    const handleSubmit = async () => {
      await onSubmitForm(formData);
      setFileKey((prev) => prev + 1);
    };

    const handleClick = () => {
      onCloseForm();
    };

    return (
      <>
        <div className="fixed inset-0 flex justify-center items-center z-[999] bg-gray-900 bg-opacity-50">
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
                    <span className="font-semibold">{authUser.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">@{authUser.email}</div>
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
                <div>
                  <div className="overflow-y-auto">{renderPreviewImages()}</div>
                </div>
                <div>
                <Dialog.Root
                      open={isModalOpen}
                      onClose={handleModalClose}
                      style={{ width: "100%" }}
                      zIndex={9999}
                      motionPreset="slide-in-left"
                      placement={"center"}
                    >
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header>
                              <Dialog.Title>Tag your project</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Header>
                              <InputGroup flex="1" startElement={<LuSearch />}>
                                <Input
                                  value={searchProject}
                                  onChange={handleSearchProject}
                                  placeholder="Search your project"
                                />
                              </InputGroup>
                            </Dialog.Header>
                            <Dialog.Body >
                              {myProjects.map((project, index) => (
                                <div
                                  className="mx-[-16px] px-[16px]"
                                  key={index}
                                >
                                  <div className=" rounded-md w-full max-w-[600px] p-4">
                                    <div className="bg-[#ffffff] border-[1px] rounded-md w-full max-w-[600px] p-4 cursor-pointer" onClick={() => handleSelectProject(project)}>
                                      <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0">
                                          <img
                                            src={
                                              project.logo || img_avatar_group
                                            }
                                            alt={project.name}
                                            className="w-[80px] h-[80px] rounded-full object-cover"
                                            onError={(e) => {
                                              e.target.src =
                                              img_avatar_group;
                                            }}
                                          />
                                        </div>

                                        <div className="flex-grow flex flex-col justify-between">
                                          <h5 className="text-lg font-semibold">
                                            <a
                                              href="#"
                                              className="text-black no-underline"
                                            >
                                              {project.name}
                                            </a>
                                          </h5>

                                          <div className="text-xs text-[#6f7f92] mt-2">
                                            <ul className="flex items-center gap-4 mb-0 pl-0">
                                              <li className="flex items-center gap-1">
                                                <IconlyDocument
                                                  size={20}
                                                  color={"#6f7f92"}
                                                />
                                                <span>0</span>
                                                <span>Posts</span>
                                              </li>
                                              <li className="flex items-center gap-1">
                                                <IconlyUser
                                                  size={20}
                                                  color={"#6f7f92"}
                                                />
                                                <span>Members</span>
                                                <span>6</span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </Dialog.Body>
                            <Dialog.Footer>
                              <Dialog.ActionTrigger>
                                <Button
                                  variant="outline"
                                  onClick={handleModalClose}
                                >
                                  Cancel
                                </Button>
                              </Dialog.ActionTrigger>
                              <Button>Save</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                              <CloseButton
                                size="sm"
                                onClick={handleModalClose}
                              />
                            </Dialog.CloseTrigger>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </Dialog.Root>
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
                  <div className="cursor-pointer">
                    <FileUpload.Root
                      key={fileKey}
                      alignItems="stretch"
                      maxFiles={10}
                      value={formData.content.attachment}
                      onChange={handleFileChange}
                      maxW="100%" 
                    >
                      <FileUpload.HiddenInput maxWidth="xl" />
                      <FileUpload.Trigger asChild>
                        <div className="cursor-pointer p-0 flex items-center justify-center">
                          <IconlyImage2 size={30} color={"#000000"} />
                        </div>
                      </FileUpload.Trigger>
                    </FileUpload.Root>{" "}
                  </div>
                  <div className="cursor-pointer" onClick={handleModalOpen} >
                    <IconlyWork size={30} color={"#000000"}  />
                  </div>
                  <div className="cursor-pointer">
                    <IconlyAddUser size={30} color={"#000000"} />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                {isLoadingCreateArticle ? (
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

CreateArticleForm.displayName = "CreateArticleForm";
export default CreateArticleForm;
