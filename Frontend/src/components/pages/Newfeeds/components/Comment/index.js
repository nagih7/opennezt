import React, { forwardRef } from "react";
import avt from "assets/images/background/avt.jpg";
import anh_angry from "assets/images/icon/logo/angry.png";
import anh_like from "assets/images/icon/logo/like.png";
import like from "assets/images/icon/reaction/like.png";
import dislike from "assets/images/icon/reaction/dislike.png";
import {
   differenceInDays,
   differenceInHours,
   differenceInMinutes,
   differenceInSeconds,
} from "date-fns";

import { CheckCircleFilled } from "@ant-design/icons";

const Comment = forwardRef(({ comment }, ref) => {
   const { content, user, created_at } = comment;

   const postedAt = new Date(created_at);
   const postedDate = postedAt.toDateString();
   const today = new Date();
   const day = differenceInDays(today, postedAt);
   const hour = differenceInHours(today, postedAt) % 24;
   const minute = differenceInMinutes(today, postedAt) % 60;
   const second = differenceInSeconds(today, postedAt) % 60;

   return (
      <div className="pt-[20px]">
         <ul className="pl-0">
            <li ref={ref}>
               <div className="flex items-center gap-2">
                  <div className="w-[40px] h-[40px]">
                     {user[0].avatar ? (
                        <img src={user.avatar} className="rounded-full" />
                     ) : (
                        <img src={avt} className="rounded-full" />
                     )}
                  </div>
                  <div className="flex items-center">
                     <a
                        href=""
                        className="flex items-center gap-1 text-sm font-medium no-underline text-black"
                     >
                        <span className="hover:text-[#3897f0]">
                           {user[0].name}
                        </span>
                        <CheckCircleFilled className="text-[#3897f0] w-[14px] h-[14px]" />
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
               <div className="flex flex-col justify-center py-[12px] bg-[#f8f9fa] rounded-md px-[16px] ml-[56px] my-[5px]">
                  <p className="text-sm mb-0">{content.caption}</p>
               </div>
               <div className="flex items-center gap-3 py-[5px] ml-[56px]">
                  <div className="flex items-center gap-1">
                     <span className="text-xs text-[#6f7f92]">Like</span>
                  </div>
                  <a
                     href=""
                     className="no-underline text-[#6f7f92] text-xs font-medium"
                  >
                     Reply
                  </a>
                  <div>
                     <div className="flex items-center gap-2">
                        <span className="text-xs text-[#6f7f92]">
                           <a
                              href=""
                              className="no-underline ml-[2px] text-black font-medium"
                           >
                              {comment.reaction_count}{" "}
                           </a>
                        </span>
                        {/* <div>
                           <div>
                              <ul className="pl-0">
                                 <li>
                                    <img
                                       src={anh_angry}
                                       className="w-[18px] h-[18px]"
                                    />
                                 </li>
                              </ul>
                           </div>
                        </div> */}
                     </div>
                  </div>
               </div>
            </li>
         </ul>
      </div>
   );
});

Comment.displayName = "Comment";

export default Comment;
