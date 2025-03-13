import React, { useState, useEffect } from "react";
import { Avatar, Button, Input } from "@chakra-ui/react";
import { getProfile } from "api/profile";
import { getExperienceLevelFramwork, getIndustryFramework } from "api/user";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleFilled } from "@ant-design/icons";
import {
  IconlyHome,
  IconlyLogout,
  IconlyMessage,
  IconlyProfile,
} from "components/UI/Iconly";
import ActionBar from "../../../EditProfile/components/ActionBar";
import ProjectEditMenu from "../ProjectEditMenu";
import ProjectCard from "../ProjectCard";
import StageBotton from "components/pages/Project/CreateAProject/Stage/components/StageBotton";

const EditStage = () => {
  return (
    <div className="flex gap-8 w-full py-8 px-[16px]">
      <ProjectEditMenu />
      <div className="w-8/12">
        <div className="bg-[#ffffff] p-8 rounded-md">
          {/* =========== Profile Card ========== */}
          <ProjectCard />
          {/* =========== Action Bar  ========== */}
          <ActionBar />
        </div>
        <div className="bg-[#ffffff] p-8 rounded-md mt-8">
          <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
            <div>
              <h4 className=""> Stage</h4>
            </div>
          </div>
          <div>
            <StageBotton />
            <div className="px-[16px] flex justify-end">
              <div className="">
                <Button
                  // onClick={handleSaveChanges}
                  height={50}
                  className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                  borderRadius={4}
                  loading={false}
                  loadingText="Loading..."
                  spinnerPlacement="start"
                >
                  SAVE CHANGES
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStage;
