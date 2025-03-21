import React from "react";
import avt from "assets/images/background/avt.jpg";
import { CheckCircleFilled } from "@ant-design/icons";
import { Image } from "@chakra-ui/react";
import {
   differenceInDays,
   differenceInHours,
   differenceInMinutes,
   differenceInSeconds,
} from "date-fns";

const ReplyComment = ({ reply, onReplyReaction }) => {
   if (!reply?._id || !reply?.user?.[0]) return null;

   const { _id, content, user, created_at } = reply;
   const userData = user[0];

   const postedAt = new Date(created_at);
   const postedDate = postedAt.toDateString();
   const today = new Date();
   const day = differenceInDays(today, postedAt);
   const hour = differenceInHours(today, postedAt) % 24;
   const minute = differenceInMinutes(today, postedAt) % 60;
   const second = differenceInSeconds(today, postedAt) % 60;

   const handleReaction = (type) => {
      if (onReplyReaction) {
         const data = new FormData();
         data.append("type", type);
         data.append("target_type", "comment");
         onReplyReaction(_id, data);
      }
   };

   return (
      <div className="mb-3">
         <div className="flex items-center gap-2">
            <div className="w-[32px] h-[32px]">
               {userData.avatar ? (
                  <img
                     src={userData.avatar}
                     className="rounded-full w-full h-full"
                  />
               ) : (
                  <img src={avt} className="rounded-full w-full h-full" />
               )}
            </div>
            <div className="flex items-center">
               <a
                  href=""
                  className="flex items-center gap-1 text-sm font-medium no-underline text-black"
               >
                  <span className="hover:text-[#3897f0]">{userData.name}</span>
                  {userData.verified && (
                     <CheckCircleFilled className="text-[#3897f0] w-[12px] h-[12px]" />
                  )}
               </a>
               <div className="pl-3">
                  <span className="text-[#6f7f92] text-xs">replied </span>
                  <a className="text-[#6f7f92] text-xs no-underline hover:underline">
                     <span>
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
                  </a>
               </div>
            </div>
         </div>

         <div className="flex flex-col justify-center py-[12px] bg-[#f8f9fa] rounded-md px-[16px] ml-[40px] my-[5px]">
            <p className="text-sm mb-0">{content.caption}</p>
         </div>

         <div className="flex items-center gap-3 py-[5px] ml-[40px]">
            <div className="flex items-center gap-1">
               <span
                  className="text-xs text-[#6f7f92] hover:text-[#3897F0]"
                  onClick={() => handleReaction("like")}
               >
                  Like
               </span>
            </div>
            <div>
               <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6f7f92]">
                     <a
                        href=""
                        className="no-underline ml-[2px] text-black font-medium"
                     >
                        {reply.reaction_count > 0
                           ? reply.reaction_count > 1000
                              ? Math.floor(reply.reaction_count / 1000) + "k"
                              : reply.reaction_count
                           : " "}
                     </a>
                  </span>
               </div>
            </div>
         </div>

         {content.image && (
            <div className="ml-[40px]">
               <Image height="150px" src={content.image} />
            </div>
         )}
      </div>
   );
};

export default ReplyComment;
