import React, { forwardRef, useState } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { IconlyDelete, IconlyMoreCircle } from "components/UI/Iconly";
import avt from "assets/images/background/avt.jpg";
import { IconlyChat } from "components/UI/Iconly";
import { IconlyHeart } from "components/UI/Iconly";
import { IconlySend } from "components/UI/Iconly";
import { IconlyEdit } from "components/UI/Iconly";
import {
   differenceInDays,
   differenceInHours,
   differenceInMinutes,
   differenceInSeconds,
} from "date-fns";

const Article = forwardRef(
   (
      { feed, reaction, onReaction, isLoading, onSelect, onEdit, onDelete },
      ref
   ) => {
      const {
         _id,
         user,
         project,
         content,
         reaction_count,
         created_at,
         comment_count,
      } = feed;

      const displayReaction = () => {
         if (reaction == "like") {
            return (
               <div
                  onClick={() => handleReactionClick("like")}
                  style={{ cursor: "pointer" }}
               >
                  <IconlyHeart
                     size={25}
                     color={"#6f7f92"}
                     backgroundColor={"#6f7f92"}
                  />
               </div>
            );
         }
         if (reaction == undefined) {
            return (
               <div
                  onClick={() => handleReactionClick("like")}
                  style={{ cursor: "pointer" }}
               >
                  <IconlyHeart size={25} color={"#6f7f92"} />
               </div>
            );
         }
      };

      const handleReactionClick = (type) => {
         if (isLoading) return;
         const data = new FormData();
         data.append("type", type);
         data.append("target_type", "article");
         onReaction(_id, data);
      };

      const handleSetClick = () => {
         onSelect(feed);
      };

      const handleEdit = () => {
         onEdit(feed);
      };

      const [isConfirmDelete, setIsConfirmDelete] = useState(false);

      const openFormDelete = () => {
         setIsConfirmDelete(true);
      };

      const handleDelete = () => {
         onDelete(_id);
      };

      //==================================================================================================
      //Posted Date Logic
      //==================================================================================================
      const postedAt = new Date(created_at);
      const postedDate = postedAt.toDateString();
      const today = new Date();
      const day = differenceInDays(today, postedAt);
      const hour = differenceInHours(today, postedAt) % 24;
      const minute = differenceInMinutes(today, postedAt) % 60;
      const second = differenceInSeconds(today, postedAt) % 60;
      //==================================================================================================
      //End of Posted Date Logic
      //==================================================================================================

      return (
         <div
            className="bg-[#ffffff] w-full max-h-full mb-8 rounded-md p-8"
            ref={ref}
         >
            <div className="flex items-center gap-3">
               <div className="w-[65px]">
                  <img src={avt} className="w-[65px]  rounded-full" />
               </div>
               <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-2 w-9/12 text-base font-medium">
                     <div className="flex items-center gap-2">
                        {user[0].name}
                        <CheckCircleFilled className="text-[#3897f0]" />
                        <span className="text-sm">posted in</span>
                        <span className="text-sm">{project[0]}</span>
                     </div>
                     <span className="text-xs text-gray-500">
                        {day <= 7
                           ? day == 0
                              ? hour == 0
                                 ? minute == 0
                                    ? second + "s"
                                    : minute + "m"
                                 : hour + "h"
                              : day + "d"
                           : postedDate}
                     </span>
                  </div>
                  <div onClick={handleEdit}>
                     <IconlyMoreCircle
                        size={30}
                        color={"#6f7f92"}
                        className="w-3/12"
                     />
                  </div>
                  <div onClick={handleDelete}>
                     <IconlyDelete
                        size={30}
                        color={"#6f7f92"}
                        className="w-3/12"
                     />
                  </div>
               </div>
            </div>
            <div className="mt-6">
               <p className="my-[6px]">{content.caption}</p>
            </div>
            <div className="flex flex-wrap gap-2 ">
               {content.attachment &&
                  content.attachment.length > 0 &&
                  content.attachment.map((img, index) => {
                     return <img src={img} key={index} />;
                  })}
            </div>
            <div className="flex items-center border-b-[1px] border-gray-200 pb-2 text-sm gap-2 mt-[18px]">
               <span className="text-[#6f7f92]"></span>
            </div>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3 pt-[16px] text-[#6f7f92]">
                  <a className="flex items-center gap-1 text-current no-underline">
                     {displayReaction(reaction)}
                     <span className="text-sm">
                        {reaction_count > 0
                           ? reaction_count > 1000
                              ? Math.floor(reaction_count / 1000) + "k"
                              : reaction_count
                           : " "}{" "}
                     </span>
                  </a>
                  <a
                     className="flex items-center gap-1 text-current no-underline"
                     onClick={handleSetClick}
                     style={{ cursor: "pointer" }}
                  >
                     <IconlyChat size={20} color={"#6f7f92"} />
                     <span className="text-sm">
                        {comment_count > 0
                           ? comment_count > 1000
                              ? Math.floor(comment_count / 1000) + "k"
                              : comment_count
                           : " "}{" "}
                     </span>
                  </a>
               </div>
               <div className="flex items-center gap-1 pt-[16px] text-[#6f7f92]">
                  <IconlySend size={22} color={"#6f7f92"} />
                  <span>Share</span>
               </div>
            </div>
            <div className="flex items-center w-full justify-between p-[10px] rounded-md border-[1px] border-gray-200 gap-3 mt-[20px]">
               <div className="w-8 h-8">
                  <img src={avt} className="rounded-full w-8 h-8" />
               </div>
               <div className="flex items-center justify-between">
                  <div>
                     <input
                        type="text"
                        placeholder="Write a comment..."
                        className="w-[630px] h-9 bg-[#ffffff] pr-[50px] outline-none"
                     />
                  </div>

                  <button className="w-9 h-9 bg-[#f8f9fa] rounded-md flex items-center justify-center">
                     <IconlyEdit size={20} color={"#6f7f92"} />
                  </button>
               </div>
            </div>
         </div>
      );
   }
);

Article.displayName = "Article";

export default Article;
