import React, { useEffect } from "react";
import RightProject from "../RightProject";
import img_logo_project from "../../../../../assets/images/background/1656677876-bpthumb.jpg";
import { IconlyEditSquare, IconlySearch } from "components/UI/Iconly";
import ProjectMenu from "../ProjectMenu";
import { Button, Image, Input, Tabs } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProjectDetails } from "api/project";
import { CheckCircleFilled, SettingFilled } from "@ant-design/icons";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";

const Setting = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // ========== STATE FROM REDUX ========== //
  const project = useSelector((state) => state.project.myProjectDetails);
  console.log("project", project);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getMyProjectDetails(id));
  }, [id, dispatch]);
  return (
    <div className="w-full h-full">
      <div className="w-full">
        <Image
          src={
            project.background ||
            "https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg"
          }
          alt={project.name}
          aspectRatio={10 / 3}
          width="100%"
          objectFit="cover"
          onError={(e) => {
            e.target.src =
              "https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg";
          }}
        />
      </div>

      <div>
        <div className="bg-[#ffffff]">
          <div className="p-8">
            <div className="px-[16px]">
              <div>
                <div className="flex justify-between w-full">
                  <div className="item-left">
                    <div className="flex justify-between gap-3">
                      <div className="p-[4px] mt-[-60px] rounded-md bg-[#ffffff]">
                        <a href="#">
                          <Image
                            src={project.logo || img_logo_project}
                            className="w-[150px] h-[150px] rounded-md"
                            alt={project.name}
                            aspectRatio={4 / 4}
                            width="100%"
                            objectFit="cover"
                            onError={(e) => {
                              e.target.src = img_logo_project;
                            }}
                          />
                        </a>
                      </div>
                      <div>
                        <h5>{project.name}</h5>
                        {project.description && (
                          <div>
                            <p>{project.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="item-right">
                    <ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0">
                      <li className="flex flex-col items-center">
                        <h5>0</h5>
                        Public
                      </li>
                      <li className="flex flex-col items-center">
                        <h5>0</h5>
                        Posts
                      </li>
                      <li className="flex flex-col items-center">
                        <h5>1</h5>
                        Member
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-[16px] pt-8">
        {/* ProjectMenu */}
        <ProjectMenu />
      </div>
      <div className="px-[16px]">
        <div className="flex w-full gap-8">
          <div className="w-10/12 mt-8">
            <Tabs.Root defaultValue="Project Requirement" variant="plain">
              <div className="p-8 bg-[#ffffff] rounded-md">
                <Tabs.List>
                  <Tabs.Trigger value="Project Requirement">
                    Project Requirement
                  </Tabs.Trigger>
                  <Tabs.Trigger value="delete">Delete</Tabs.Trigger>
                  <Tabs.Indicator rounded="l2" />
                </Tabs.List>
              </div>
              <div className="p-8 mt-8 bg-[#ffffff] rounded-md">
                <Tabs.Content pt="0" value="Project Requirement">
                  <div className="relative mb-8">
                    <Input
                      height={50}
                      type="url"
                      placeholder="Ex: OpenNezt"
                      className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                    />
                    <label
                      htmlFor=""
                      className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                    >
                      Team Role
                    </label>
                  </div>
                  <div className="relative mb-8">
                    <Input
                      height={50}
                      type="url"
                      placeholder="Ex: OpenNezt"
                      className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                    />
                    <label
                      htmlFor=""
                      className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                    >
                      Role
                    </label>
                  </div>
                  <div className="relative mb-8">
                    <Input
                      height={50}
                      type="url"
                      placeholder="Ex: OpenNezt"
                      className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                    />
                    <label
                      htmlFor=""
                      className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                    >
                      Industry
                    </label>
                  </div>
                  <div className="relative mb-8">
                    <Input
                      height={50}
                      type="url"
                      placeholder="Ex: OpenNezt"
                      className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                    />
                    <label
                      htmlFor=""
                      className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                    >
                      Experience Level
                    </label>
                  </div>
                  <div className="relative mb-8">
                    <Input
                      height={50}
                      type="url"
                      placeholder="Ex: OpenNezt"
                      className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                    />
                    <label
                      htmlFor=""
                      className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                    >
                      Category
                    </label>
                  </div>
                  <div className="relative mt-8">
                    <Input
                      height={50}
                      type="url"
                      placeholder="Ex: OpenNezt"
                      className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                    />
                    <label
                      htmlFor=""
                      className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                    >
                      Skill
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <div className="">
                      <Button
                        height={50}
                        className="mt-[14px] text-sm px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                        borderRadius={4}
                        loading={false}
                        loadingText="Loading..."
                        spinnerPlacement="start"
                      >
                        SAVE CHANGES
                      </Button>
                    </div>
                  </div>
                </Tabs.Content>
                <Tabs.Content pt="0" value="delete">
                  <div>
                    <p className="mb-0 p-[15px] border-l-[3px] text-sm border-[#09c] rounded-r-md bg-[#e3f1f6] text-[#09c]">
                      WARNING: Deleting this group will completely remove ALL
                      content associated with it. There is no way back, please
                      be careful with this option.
                    </p>
                  </div>
                  <label htmlFor="delete-project" className="mt-[16px]">
                    <input
                      type="checkbox"
                      id="delete-project"
                      className="w-4 h-4 mr-[10px]"
                    />
                    I understand the consequences of deleting this project.
                  </label>
                  <div className="flex justify-end">
                    <div className="">
                      <Button
                        height={50}
                        className="mt-[14px] text-sm px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                        borderRadius={4}
                        loading={false}
                        loadingText="Loading..."
                        spinnerPlacement="start"
                      >
                        DELETE PROJECT
                      </Button>
                    </div>
                  </div>
                </Tabs.Content>
              </div>
            </Tabs.Root>
          </div>
          <div className="w-4/12 mt-8">
            {/* RightProject */}
            <RightProject />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
