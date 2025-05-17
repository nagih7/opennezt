import { IconlyCategory } from "components/UI/Iconly";
import React from "react";
import { useSelector } from "react-redux";
import { User, PaginationData, FormRecruitTalents } from "../../types";

interface RootState {
    talent: {
        talents: Array<{
            user: User;
        }>;
        formRecruitTalents: FormRecruitTalents;
        paginationRecruitTalents: PaginationData;
    };
}

const RecruitTalentsHeader: React.FC = () => {
    const { talents, paginationRecruitTalents } = useSelector((state: RootState) => state.talent);

    const startIndex = (paginationRecruitTalents.currentPage - 1) * paginationRecruitTalents.perPage + 1;
    const endIndex = Math.min(startIndex + talents.length - 1, paginationRecruitTalents.totalRecord);

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center w-full bg-[#ffffff] rounded-md p-[16px] mb-8">
            <p className="mb-0">
                Showing {startIndex}-{endIndex} of {paginationRecruitTalents.totalRecord} results
            </p>
            <div className="flex items-center">
                <div className="px-[13px] py-[10px]">
                    <ul className="flex items-center gap-2 pl-0 m-0">
                        <li>
                            <a href="#">
                                <IconlyCategory size={20} color={"#6f7f92"} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <IconlyCategory size={20} color={"#6f7f92"} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <IconlyCategory size={20} color={"#6f7f92"} />
                            </a>
                        </li>
                    </ul>
                </div>
                <form action="" className="pr-3 bg-[#f8f9fa] rounded-md">
                    <select
                        name=""
                        id=""
                        className="bg-[#f8f9fa] text-[#6f7f92] rounded-md p-3 outline-none">
                        <option value="">Default sorting</option>
                        <option value="">Sort by popularity</option>
                    </select>
                </form>
            </div>
        </div>
    );
};

export default RecruitTalentsHeader; 