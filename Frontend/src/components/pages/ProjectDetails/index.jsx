import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import img_logo_project from '../../../assets/images/background/1656677876-bpthumb.jpg';
import { IconlyEditSquare } from 'components/UI/Iconly';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProjectDetails } from 'api/project';
import { HStack, Image, Tag } from '@chakra-ui/react';
import ProjectMenu from './components/ProjectMenu';
import RightProject from './components/RightProject';

const ProjectDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // ========== STATE FROM REDUX ========== //
    const project = useSelector((state) => state.project.myProjectDetails);

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
                        'https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg'
                    }
                    alt={project.name}
                    aspectRatio={10 / 3}
                    width="100%"
                    objectFit="cover"
                    onError={(e) => {
                        e.target.src =
                            'https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg';
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
            <div className="w-full px-[16px]">
                {/* ProjectMenu */}
                <ProjectMenu />
            </div>
            <div className="px-[16px]">
                <div className="flex w-full gap-8">
                    <div className="w-10/12">
                        <div className="bg-[#ffffff] rounded-md">
                            <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                                <h5 className="mb-0">Secter</h5>
                                <Link
                                    to={'/project/edit-project/stage'}
                                    className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                                >
                                    <IconlyEditSquare size={20} color={'#ffffff'} />
                                </Link>
                            </div>
                            <div className="p-8">
                                <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                                    <li className="px-[16px] mb-10">
                                        <div className="mb-2 text-sm font-medium uppercase">
                                            INDUSYTIES
                                        </div>
                                        <div>
                                            <p className="mb-2 text-base font-medium text-black">
                                                {project?.industries?.length > 0
                                                    ? project.industries.map((industry) => (
                                                          <HStack key={industry.id} spacing={2}>
                                                              <Tag.Root size={'lg'} mt={2}>
                                                                  <Tag.Label>
                                                                      {industry.name}
                                                                  </Tag.Label>
                                                              </Tag.Root>
                                                          </HStack>
                                                      ))
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="px-[16px] mb-10">
                                        <div className="mb-2 text-sm font-medium uppercase">
                                            STAGE
                                        </div>
                                        <div>
                                            <p className="mb-2 text-base font-medium text-black">
                                                {project?.stage?.name || 'N/A'}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-[#ffffff] rounded-md mt-8">
                            <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                                <h5 className="mb-0">Revenue</h5>
                                <Link
                                    to={'/project/edit-project/revenue'}
                                    className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                                >
                                    <IconlyEditSquare size={20} color={'#ffffff'} />
                                </Link>
                            </div>
                            <div className="p-8">
                                <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                                    <li className="px-[16px] mb-10">
                                        <div className="mb-2 text-sm font-medium uppercase">
                                            MONTH / YEAR
                                        </div>
                                        <div>
                                            {project?.revenues?.length > 0 ? (
                                                project.revenues.map((revenue, index) => {
                                                    const isLastItem =
                                                        index === project.revenues.length - 1; // Kiểm tra phần tử cuối cùng
                                                    const date = new Date(revenue.date);

                                                    return (
                                                        <p
                                                            key={index}
                                                            className={`mb-2 text-base font-medium text-black 
          ${!isLastItem ? 'border-b-[1px] border-[#f4f5f6] pb-2' : ''}`}
                                                        >
                                                            {date.toLocaleDateString('en-CA')}
                                                        </p>
                                                    );
                                                })
                                            ) : (
                                                <p className="mb-2 text-base font-medium text-black">
                                                    N/A
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                    <li className="px-[16px] mb-10">
                                        <div className="mb-2 text-sm font-medium uppercase">
                                            AMOUNT
                                        </div>
                                        <div>
                                            {project?.revenues?.length > 0 ? (
                                                project.revenues.map((revenue, id) => {
                                                    const isLastItem =
                                                        id === project.revenues.length - 1; // Kiểm tra nếu đây là phần tử cuối cùng

                                                    return (
                                                        <p
                                                            key={id}
                                                            className={`mb-2 text-base font-medium text-black ${
                                                                !isLastItem
                                                                    ? 'border-b-[1px] border-[#f4f5f6] pb-2'
                                                                    : ''
                                                            }`}
                                                        >
                                                            {revenue.amount} ({revenue.currency})
                                                        </p>
                                                    );
                                                })
                                            ) : (
                                                <p className="mb-2 text-base font-medium text-black">
                                                    N/A
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                    {/* <li className="px-[16px] mb-10">
                    <div className="mb-2 text-sm font-medium uppercase">
                      CURRENCY
                    </div>
                    <div>
                      <p className="mb-2 text-base font-medium text-black">
                        {project?.revenues
                          ?.map((revenue) => revenue.currency)
                          .join(", ") || "N/A"}
                      </p>
                    </div>
                  </li> */}
                                </ul>
                                {/* {project?.revenues?.length > 0 ? (
                  <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                    {project.revenues.map((revenue, id) => {
                      const date = new Date(revenue.date);
                      return (
                        <li className="px-[16px] mb-10" key={id}>
                          <div className="mb-2 text-sm font-medium uppercase">
                            REVENUE DETAILS
                          </div>
                          <div className="flex gap-2">
                            <p className="mb-2 text-base font-medium text-black">
                              {date.toLocaleDateString("en-CA")} {"_"}{" "}
                              {revenue.amount}
                              {" - "}
                              {revenue.currency}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mb-2 text-base font-medium text-black">N/A</p>
                )} */}
                            </div>
                        </div>
                        <div className="bg-[#ffffff] rounded-md mt-8">
                            <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                                <h5 className="mb-0">Funding Sources</h5>
                                <Link
                                    to={'/project/edit-project/funding-sources'}
                                    className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                                >
                                    <IconlyEditSquare size={20} color={'#ffffff'} />
                                </Link>
                            </div>
                            <div className="p-8">
                                <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                                    <li className="px-[16px] mb-10">
                                        <div className="mb-2 text-sm font-medium uppercase">
                                            NAME
                                        </div>
                                        <div>
                                            {project?.funding_sources?.length > 0 ? (
                                                project.funding_sources.map(
                                                    (funding_sources, index) => {
                                                        const isLastItem =
                                                            index ===
                                                            project.funding_sources.length - 1; // Kiểm tra phần tử cuối cùng
                                                        return (
                                                            <p
                                                                key={index}
                                                                className={`mb-2 text-base font-medium text-black ${
                                                                    !isLastItem
                                                                        ? 'border-b-[1px] border-[#f4f5f6] pb-2'
                                                                        : ''
                                                                }`}
                                                            >
                                                                {funding_sources.name}
                                                            </p>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <p className="mb-2 text-base font-medium text-black">
                                                    N/A
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                    <li className="px-[16px] mb-10">
                                        <div className="mb-2 text-sm font-medium uppercase">
                                            AMOUNT
                                        </div>
                                        <div>
                                            {project?.funding_sources?.length > 0 ? (
                                                project.funding_sources.map(
                                                    (funding_sources, index) => {
                                                        const isLastItem =
                                                            index ===
                                                            project.funding_sources.length - 1; // Kiểm tra phần tử cuối cùng
                                                        return (
                                                            <p
                                                                key={index}
                                                                className={`mb-2 text-base font-medium text-black ${
                                                                    !isLastItem
                                                                        ? 'border-b-[1px] border-[#f4f5f6] pb-2'
                                                                        : ''
                                                                }`}
                                                            >
                                                                {funding_sources.amount} (
                                                                {funding_sources.currency})
                                                            </p>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <p className="mb-2 text-base font-medium text-black">
                                                    N/A
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-[#ffffff] rounded-md mt-8">
                            <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                                <h5 className="mb-0">More</h5>
                                <Link
                                    to={'/project/edit-project/additional-info'}
                                    className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                                >
                                    <IconlyEditSquare size={20} color={'#ffffff'} />
                                </Link>
                            </div>
                            <div className="p-8">
                                <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                                    <li className="px-[16px] mb-10">
                                        <div className="mb-2 text-sm font-medium uppercase">
                                            {project?.additional_infos
                                                ?.map((additional_info) => additional_info.name)
                                                .join(', ') || 'N/A'}
                                        </div>
                                        <div>
                                            <p className="mb-2 text-base font-medium text-black">
                                                {project?.additional_infos
                                                    ?.map(
                                                        (additional_info) => additional_info.content
                                                    )
                                                    .join(', ') || 'N/A'}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/12">
                        {/* RightProject */}
                        <RightProject />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
