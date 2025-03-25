import React, { forwardRef, useCallback, useState } from "react";
import avt from "assets/images/background/avt.jpg";
import { Image } from "@chakra-ui/react";
import {
   differenceInDays,
   differenceInHours,
   differenceInMinutes,
   differenceInSeconds,
} from "date-fns";

import ReplyComment from "../ReplyComment";
import { CheckCircleFilled } from "@ant-design/icons";

const Comment = forwardRef(
   (
      {
         comment,
         reaction,
         replyReactionMap,
         onCommentReaction,
         isLoading,
         setParentId,
         replyCommentList,
         handleClickReply,
         selectComment,
         handleReactionReplyComment,
      },
      ref
   ) => {
      const [showReplies, setShowReplies] = useState(false);

      if (!comment?._id || !comment?.user?.[0]) {
         return null;
      }

      const { _id, content, user, created_at } = comment;
      const userData = user[0];

      const postedAt = new Date(created_at);
      const postedDate = postedAt.toDateString();
      const today = new Date();
      const day = differenceInDays(today, postedAt);
      const hour = differenceInHours(today, postedAt) % 24;
      const minute = differenceInMinutes(today, postedAt) % 60;
      const second = differenceInSeconds(today, postedAt) % 60;

      const handleReaction = (type) => {
         if (isLoading) return;
         const data = new FormData();
         data.append("type", type);
         data.append("target_type", "comment");
         onCommentReaction(_id, data);
      };

      const handleSetParentId = () => {
         setParentId(comment);
      };

      const handleToggleReplies = () => {
         if (!showReplies && setParentId && comment) {
            setParentId(comment);
         }
         setShowReplies(!showReplies);
      };

      const handleReply = () => {
         selectComment(comment);
         handleClickReply();
      };

      return (
         <div className="pt-[20px]">
            <ul className="pl-0">
               <li ref={ref}>
                  <div className="flex items-center gap-2">
                     <div className="w-[40px] h-[40px]">
                        {userData.avatar ? (
                           <img
                              src={userData.avatar}
                              className="rounded-full"
                           />
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
                              {userData.name}
                           </span>
                           <CheckCircleFilled className="text-[#3897f0] w-[14px] h-[14px]" />
                        </a>
                        <div className="pl-3">
                           <span className="text-[#6f7f92] text-xs">
                              replied{" "}
                           </span>
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
                     {comment.content.image ? (
                        <div className="flex p-2 ">
                           <Image
                              width="15vw"
                              className="rounded-md"
                              src={comment.content.image}
                           />
                        </div>
                     ) : null}
                  </div>
                  <div className="flex items-center gap-3 py-[5px] ml-[56px]">
                     <div className="flex items-center gap-1">
                        {reaction == "like" ? (
                           <span
                              className="text-xs text-[#3897F0] font-semibold"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleReaction("like")}
                           >
                              Like
                           </span>
                        ) : (
                           <span
                              className="text-xs text-[#6f7f92]"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleReaction("like")}
                           >
                              Like
                           </span>
                        )}
                     </div>
                     <a
                        onClick={handleReply}
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
                                 {comment.reaction_count > 0
                                    ? comment.reaction_count > 1000
                                       ? Math.floor(
                                            comment.reaction_count / 1000
                                         ) + "k"
                                       : comment.reaction_count
                                    : " "}{" "}
                              </a>
                           </span>
                        </div>
                     </div>
                  </div>
               </li>
            </ul>

            {/* Reply Comments Section */}
            {replyCommentList && showReplies && (
               <div className="ml-[56px]">
                  <div className="border-l-2 border-gray-200 pl-4">
                     {replyCommentList.replyComments.map((reply) => (
                        <ReplyComment
                           key={reply._id}
                           reply={reply}
                           reaction={replyReactionMap.get(reply._id)}
                           onReplyReaction={onCommentReaction}
                           handleReactionReplyComment={
                              handleReactionReplyComment
                           }
                        />
                     ))}
                  </div>

                  {replyCommentList.pagination?.hasMore && (
                     <button
                        onClick={handleSetParentId}
                        className="text-[#6f7f92] text-sm font-medium hover:text-[#3897f0] mt-2"
                     >
                        View more replies...
                     </button>
                  )}
               </div>
            )}

            {/* Reply Toggle Button */}
            <div className="ml-[56px] mt-2">
               <span
                  onClick={handleToggleReplies}
                  className="text-[#6f7f92] text-sm cursor-pointer hover:text-[#3897f0]"
               >
                  {comment.reply_count > 0
                     ? replyCommentList &&
                       replyCommentList.replyComments.length > 0
                        ? showReplies
                           ? `Hide replies (${replyCommentList.replyComments.length})`
                           : `Show replies (${replyCommentList.replyComments.length})`
                        : `Show replies (${comment.reply_count})`
                     : null}
               </span>
            </div>
         </div>
      );
   }
);

Comment.displayName = "Comment";

export default Comment;
