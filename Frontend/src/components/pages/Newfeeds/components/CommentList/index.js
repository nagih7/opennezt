import React, { useEffect, useState } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { IconlyMoreCircle } from "components/UI/Iconly";
import anh_1 from "assets/images/background/cute-little-girl-with-handmaded-wings-running-outdoors-field-having-fun-copy.webp";
import anh_angry from "assets/images/icon/logo/angry.png";
import anh_like from "assets/images/icon/logo/like.png";
import like from "assets/images/icon/reaction/like.png";
import dislike from "assets/images/icon/reaction/dislike.png";
import anh_happy from "assets/images/icon/logo/happy.png";
import avt from "assets/images/background/avt.jpg";
import { IconlyChat } from "components/UI/Iconly";
import { IconlyHeart } from "components/UI/Iconly";
import { IconlySend } from "components/UI/Iconly";
import { IconlyEdit } from "components/UI/Iconly";
import { handleGetListComment } from "api/newfeeds";
import { useDispatch, useSelector } from "react-redux";
import { resetComment } from "states/modules/article";
import { useRef, useCallback } from "react";
import {
   differenceInDays,
   differenceInHours,
   differenceInMinutes,
   differenceInSeconds,
} from "date-fns";

import Comment from "../Comment";
import { use } from "react";
import { first, set } from "lodash";

const CommentList = ({ feed, reaction, onReaction, isLoading, onClose }) => {
   const {
      _id,
      user,
      project,
      content,
      reaction_count,
      created_at,
      comment_count,
   } = feed;

   const {
      comment,
      isLoadingGetComments,
      comment_reactions,
      comment_pagination,
      isLoadingGetUserCommentReactions,
   } = useSelector((state) => state.article);

   const { hasMore, page, limit } = comment_pagination;

   const dispatch = useDispatch();

   const [dataFilter, setDataFilter] = useState({
      articleId: _id,
      limit: 10,
      page: 1,
   });

   useEffect(() => {
      dispatch(handleGetListComment(dataFilter));
   }, [dispatch, dataFilter]);

   const displayReaction = () => {
      if (reaction == "like") {
         return (
            <div className="flex items-center gap-1 w-[25px]">
               <img src={like}></img>
            </div>
         );
      }
      if (reaction == "dislike") {
         return (
            <div className="flex items-center gap-1 w-[25px]">
               <img src={dislike}></img>
            </div>
         );
      }
      if (reaction == undefined) {
         return (
            <div className="flex items-center gap-1">
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

   const handleCloseComment = async () => {
      await dispatch(resetComment());
      onClose();
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

   //Xử lí bất đồng bộ
   const isLoadingRef = useRef(isLoadingGetComments); // Tạo một ref để lưu trạng thái
   const hasMoreRef = useRef(hasMore);
   const pageRef = useRef(page);
   const idRef = useRef(_id);
   useEffect(() => {
      if (idRef.current !== _id) {
         idRef.current = _id;
      }
   });
   useEffect(() => {
      isLoadingRef.current = isLoadingGetComments; // Cập nhật giá trị ref mỗi khi trạng thái thay đổi
   }, [isLoadingGetComments]);
   useEffect(() => {
      pageRef.current = page;
   }, [page]);
   useEffect(() => {
      hasMoreRef.current = hasMore;
   }, [hasMore]);
   //Lướt xuống bài viết cuối thì load tiếp
   const observerRef = useRef(null);

   useEffect(() => {
      observerRef.current = new IntersectionObserver(
         (entries) => {
            const first = entries[0];
            if (
               first.isIntersecting === true &&
               hasMoreRef.current === true &&
               isLoadingRef.current === false
            ) {
               setDataFilter({
                  articleId: idRef.current,
                  page: pageRef.current,
                  limit: 10,
               });
            }
         },
         { root: null, rootMargin: "0px", threshold: 0.1 }
      );
   }, [hasMore, isLoadingGetComments, limit, page, _id]);
   //End
   const lastElementRef = useCallback((node) => {
      if (observerRef.current) {
         observerRef.current.disconnect();
      }
      if (node) {
         observerRef.current?.observe(node);
      }
   }, []);
   //Reaction User's Status
   return (
      <div
         className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden"
         onClick={handleCloseComment}
         style={{ zIndex: 100 }}
      >
         <div
            className="bg-[#ffffff] w-[800px] max-h-[90vh] mb-8 rounded-md p-8 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
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
                        <span className="text-sm">posted about</span>
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
                  <IconlyMoreCircle
                     size={30}
                     color={"black"}
                     className="w-3/12"
                  />
               </div>
            </div>
            <div className="mt-6">
               <p className="my-[6px]">{content.caption}</p>
            </div>
            <div>
               {content.attachment &&
                  content.attachment.length > 0 &&
                  content.attachment.map((img, index) => {
                     return <img src={img} key={index} />;
                  })}
            </div>
            <div className="flex items-center border-b-[1px] border-gray-200 pb-2 text-sm gap-2 mt-[18px]">
               <div className="pr-[15px] flex gap-2">
                  {/* <ul className="flex relative top-2 gap-2 pl-0">
                  <li>
                     <img src={anh_angry} className="w-6 h-6" />
                  </li>
                  <li>
                     <img
                        src={anh_happy}
                        className="absolute left-[15px] top-0 w-6 h-6"
                     />
                  </li>
                  <li>
                     <img
                        src={anh_like}
                        className="absolute left-[30px] top-0 w-6 h-6"
                     />
                  </li>
               </ul> */}
                  <div
                     className="flex items-center gap-1 w-[30px]"
                     onClick={() => handleReactionClick("like")}
                  >
                     <img src={like}></img>
                  </div>
                  <div
                     className="flex items-center gap-1 w-[30px]"
                     onClick={() => handleReactionClick("dislike")}
                  >
                     <img src={dislike}></img>
                  </div>
               </div>
               <span className="text-[#6f7f92]">
                  {/* <span>Reacted by </span>
               <a
                  
                  className="text-black font-medium text-current no-underline"
               >
                  Vuong Manh Nghia
               </a>
               <span> And</span> */}
                  <span className="font-medium text-black">
                     {reaction_count > 0
                        ? reaction_count > 1000
                           ? Math.floor(reaction_count / 1000) + "k"
                           : reaction_count
                        : " "}{" "}
                  </span>
               </span>
               <a
                  href=""
                  className="text-current no-underline text-sm font-medium text-[#517ec5]"
               >
                  {comment_count == 0 ? "" : comment_count + "comments"}
               </a>
            </div>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3 pt-[16px] text-[#6f7f92]">
                  <a
                     href=""
                     className="flex items-center gap-1 text-current no-underline"
                  >
                     {displayReaction(reaction)}
                     <span className="text-sm">React</span>
                  </a>
                  <a
                     href=""
                     className="flex items-center gap-1 text-current no-underline"
                  >
                     <IconlyChat size={20} color={"#6f7f92"} />
                     <span className="text-sm">Comment</span>
                  </a>
               </div>
               <div className="flex items-center gap-1 pt-[16px] text-[#6f7f92]">
                  <IconlySend size={22} color={"#6f7f92"} />
                  <span>Share</span>
               </div>
            </div>
            {comment.map((cmt, index) => {
               if (index === comment.length - 1) {
                  return (
                     <Comment key={index} comment={cmt} ref={lastElementRef} />
                  );
               } else {
                  return <Comment key={index} comment={cmt} />;
               }
            })}
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
      </div>
   );
};

CommentList.displayName = "CommentList";

export default CommentList;
