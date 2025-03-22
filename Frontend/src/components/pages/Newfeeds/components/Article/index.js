import React, { forwardRef, useState, useRef, useEffect } from "react";
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
import { Button } from "@chakra-ui/react";

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
         handleClickMore();
         onEdit(feed);
      };

      const [isConfirmDelete, setIsConfirmDelete] = useState(false);

      const handleClickDelete = () => {
         setIsConfirmDelete(!isConfirmDelete);
      };

      const handleDelete = async () => {
         onDelete(_id);
      };

      //
      const [isShowMore, setIsShowMore] = useState(false);
      const handleClickMore = () => {
         setIsShowMore(!isShowMore);
      };
      const dropdownRef = useRef(null);

      useEffect(() => {
         const handleClickOutside = (event) => {
            if (
               dropdownRef.current &&
               !dropdownRef.current.contains(event.target)
            ) {
               setIsShowMore(false);
            }
         };

         document.addEventListener("mousedown", handleClickOutside);
         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, []);

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
            {isConfirmDelete ? (
               <div
                  className="fixed inset-0 flex justify-center items-center z-[999999] bg-gray-900 bg-opacity-50"
                  onClick={handleClickDelete}
               >
                  <div className="bg-[#ffffff] w-[600px] p-8 rounded-md mb-4">
                     <div className="flex items-center justify-center border-b-[0.5px] border-[#6f7f92] p-2 font-medium">
                        Delete Post?
                     </div>
                     <span className="text-sm p-2">
                        {`Are you sure wan't to delete this post. After delete
                        you are not able to get it back`}
                     </span>
                     <div>
                        <div className="flex justify-end gap-1">
                           <Button
                              onClick={handleClickDelete}
                              className="rounded-md bg-[#FFFFFF] hover:bg-gray-300 font-medium text-[15px]"
                           >
                              Cancel
                           </Button>
                           <Button
                              onClick={handleDelete}
                              className="rounded-md bg-[#0866FF] hover:bg-[#3897F0] font-medium text-[#FFFFFF] text-[15px]"
                           >
                              Delete
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            ) : null}

            <div className="flex items-center gap-3">
               <div className="w-[65px]">
                  <img src={avt} className="w-[65px]  rounded-full" />
               </div>
               <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-2 w-9/12 text-base font-medium">
                     <div className="flex items-center gap-1">
                        {user[0].name}
                        <CheckCircleFilled className="text-[#3897f0]" />
                        <span className="text-sm">posted in</span>
                        <span className="">
                           {feed?.project_name || "no name"}
                        </span>
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
                  {/* */}

                  <div>
                     <div className="relative" ref={dropdownRef}>
                        <div
                           className="flex text-2xl items-start pr-4"
                           style={{ cursor: "pointer" }}
                           onClick={handleClickMore}
                        >
                           ...
                        </div>
                        {isShowMore && (
                           <div className="absolute top-full right-0 bg-white shadow-lg rounded-md z-[99999] min-w-[200px] border border-gray-100">
                              <ul className="p-0 m-2">
                                 <li
                                    className="px-3 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                                    onClick={handleClickDelete}
                                 >
                                    <IconlyDelete size={25} color={"#6f7f92"} />
                                    <span className="text-sm p-2">
                                       Delete post
                                    </span>
                                 </li>
                                 <li
                                    className="px-3 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                                    onClick={handleEdit}
                                 >
                                    <IconlyEdit
                                       size={25}
                                       color={"#6f7f92"}
                                       backgroundColor={"#6f7f92"}
                                    />
                                    <span className="text-sm p-2">
                                       Edit post
                                    </span>
                                 </li>
                              </ul>
                           </div>
                        )}
                     </div>
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
                     return (
                        <img
                           key={index}
                           src={
                              typeof img === "string"
                                 ? img
                                 : URL.createObjectURL(img)
                           }
                        />
                     );
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
         </div>
      );
   }
);

Article.displayName = "Article";

export default Article;
