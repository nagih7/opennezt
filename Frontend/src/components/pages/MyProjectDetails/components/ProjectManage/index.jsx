import React, { useState, useEffect } from 'react';
import ProjectActivity from '../ProjectActivity';
import { Button, Input, Tabs } from '@chakra-ui/react';
import { toaster } from 'components/UI/toaster';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addProjectRequirement, deleteMyProject } from 'api/project';
import SelectCustom from 'components/UI/SelectCustom';
import {
    getCategoryFramework,
    getExperienceLevelFramwork,
    getIndustryFramework,
    getProjectRoleFramework,
    getSkillFramework,
    getSubCategoryFramework,
} from 'api/user';

const ProjectManage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    // ========== STATE FROM REDUX STORE  ========== //
    const {
        isLoadingDeleteMyProject,
        isLoadingCreateProjectRequirement,
        formAddProjectRequirement,
    } = useSelector((state) => state.project);

    const {
        projectTeamRoleFramework,
        projectRoleFramework,
        industryFramework,
        experienceLevelFramework,
        categoryFramework,
        subCategoryFramework,
        skillFramework,
    } = useSelector((state) => state.user);

    // ========== STATE  ========== //
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [formData, setFormData] = useState({
        teamRole: '',
        role: '',
        industries: '',
        experienceLevel: '',
        categories: '',
        subcategories: '',
        skills: '',
    });
    useEffect(() => {}, [projectTeamRoleFramework, projectRoleFramework]);

    useEffect(() => {
        dispatch(getProjectRoleFramework());
    }, [dispatch]);
    useEffect(() => {
        if (industryFramework?.items?.length === 0) {
            dispatch(getIndustryFramework());
        }
    }, [dispatch, industryFramework]);
    useEffect(() => {
        if (experienceLevelFramework?.items?.length === 0) {
            dispatch(getExperienceLevelFramwork());
        }
    }, [dispatch, experienceLevelFramework]);
    useEffect(() => {
        if (categoryFramework?.items?.length === 0) {
            dispatch(getCategoryFramework());
        }
    }, [dispatch, categoryFramework]);
    useEffect(() => {
        if (subCategoryFramework?.items?.length === 0) {
            dispatch(getSubCategoryFramework());
        }
    }, [dispatch, subCategoryFramework]);
    useEffect(() => {
        if (skillFramework?.items?.length === 0) {
            dispatch(getSkillFramework());
        }
    }, [dispatch, skillFramework]);

    useEffect(() => {
        setFormData({
            teamRole: formAddProjectRequirement.teamRole,
            role: formAddProjectRequirement.role,
            industries: formAddProjectRequirement.industries,
            experienceLevel: formAddProjectRequirement.experienceLevel,
            categories: formAddProjectRequirement.categories,
            subcategories: formAddProjectRequirement.subcategories,
            skills: formAddProjectRequirement.skills,
        });
    }, [formAddProjectRequirement]);

    // ========== HANDLE CHANGE  ========== //
    const handleChange = (event, nameSelect) => {
        setFormData({ ...formData, [nameSelect]: event.value });
        // Handle dependent dropdowns
        switch (nameSelect) {
            case 'categories':
                // Reset subcategories when category changes
                setFormData((prev) => ({ ...prev, subcategories: '' }));
                // Fetch subcategories filtered by the selected category
                dispatch(getSubCategoryFramework(event.value));
                break;
            case 'subcategories':
                // Reset skills when subcategory changes
                setFormData((prev) => ({ ...prev, skills: '' }));
                // Fetch skills filtered by the selected subcategory
                dispatch(getSkillFramework(event.value));
                break;
            default:
                break;
        }
    };

    // ========== HANDLE CHANGE ========== //
    const handleConfirmDeleteProject = () => {
        if (confirmDelete) {
            dispatch(deleteMyProject(id));
        } else {
            toaster.create({
                title: 'Please confirm that you understand the consequences of deleting this project.',
                type: 'error',
            });
        }
    };

    const handleSaveProjectRequirement = () => {
        const updatedFormData = {
            teamRole: formData.teamRole[0] || '',
            role: formData.role[0] || '',
            industries: formData.industries[0] || '',
            experienceLevel: formData.experienceLevel[0] || '',
            categories: formData.categories[0] || '',
            subcategories: formData.subcategories[0] || '',
            skills: formData.skills[0] || '',
        };

        // Kiểm tra xem dữ liệu có đầy đủ không trước khi gửi
        if (
            !updatedFormData.teamRole ||
            !updatedFormData.role ||
            !updatedFormData.industries ||
            !updatedFormData.experienceLevel ||
            !updatedFormData.skills ||
            !updatedFormData.subcategories
        ) {
            toaster.create({
                title: 'Please fill in all required information.',
                type: 'error',
            });
            return;
        }

        // Log lại dữ liệu đã sửa đổi
        console.log('Updated Form Data:', updatedFormData);

        // Gửi dữ liệu đi
        dispatch(addProjectRequirement(updatedFormData));
    };

    return (
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
                                    <SelectCustom
                                        required
                                        label="Team Role"
                                        collection={projectTeamRoleFramework}
                                        onChange={(e) => handleChange(e, 'teamRole')}
                                        value={formData.teamRole}
                                        name="teamRole"
                                    />
                                </div>
                                <div className="relative mb-8">
                                    <SelectCustom
                                        required
                                        label="Role"
                                        collection={projectRoleFramework}
                                        onChange={(e) => handleChange(e, 'role')}
                                        value={formData.role}
                                        name="role"
                                    />
                                </div>
                                <div className="relative mb-8">
                                    <SelectCustom
                                        required
                                        label="Industries"
                                        collection={industryFramework}
                                        onChange={(e) => handleChange(e, 'industries')}
                                        value={formData.industries}
                                        name="industries"
                                    />
                                </div>
                                <div className="relative mb-8">
                                    <SelectCustom
                                        required
                                        label="Experience Level"
                                        collection={experienceLevelFramework}
                                        onChange={(e) => handleChange(e, 'experienceLevel')}
                                        value={formData.experienceLevel}
                                        name="experienceLevel"
                                    />
                                </div>
                                <div className="relative mb-8">
                                    <SelectCustom
                                        required
                                        label="Category"
                                        collection={categoryFramework}
                                        onChange={(e) => handleChange(e, 'categories')}
                                        value={formData.categories}
                                        name="category"
                                    />
                                </div>
                                <div className="relative mb-8">
                                    <SelectCustom
                                        required
                                        label="Sub Category"
                                        collection={subCategoryFramework}
                                        onChange={(e) => handleChange(e, 'subcategories')}
                                        value={formData.subcategories}
                                        name="subcategories"
                                    />
                                </div>
                                <div className="relative mt-8">
                                    <SelectCustom
                                        required
                                        label="Skill"
                                        collection={skillFramework}
                                        onChange={(e) => handleChange(e, 'skills')}
                                        value={formData.skills}
                                        name="skills"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <div className="">
                                        <Button
                                            height={50}
                                            className="mt-[14px] text-sm px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                                            borderRadius={4}
                                            loading={isLoadingCreateProjectRequirement}
                                            loadingText="Loading..."
                                            spinnerPlacement="start"
                                            onClick={handleSaveProjectRequirement}
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
                                        content associated with it. There is no way back, please be
                                        careful with this option.
                                    </p>
                                </div>
                                <label htmlFor="delete-project" className="mt-[16px]">
                                    <input
                                        type="checkbox"
                                        id="delete-project"
                                        className="w-4 h-4 mr-[10px]"
                                        value={confirmDelete}
                                        onChange={() => setConfirmDelete(!confirmDelete)}
                                    />
                                    I understand the consequences of deleting this project.
                                </label>
                                <div className="flex justify-end">
                                    <div className="">
                                        <Button
                                            height={50}
                                            className="mt-[14px] text-sm px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                                            borderRadius={4}
                                            loading={isLoadingDeleteMyProject}
                                            loadingText="Deleting..."
                                            spinnerPlacement="start"
                                            onClick={handleConfirmDeleteProject}
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
                    {/* ProjectActivity */}
                    <ProjectActivity />
                </div>
            </div>
        </div>
    );
};

export default ProjectManage;
