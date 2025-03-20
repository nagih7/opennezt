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
import { useMemo } from "react";
import {
   handleCreateComment,
   handleGetListComment,
   handleGetUserCommentReactions,
   handleReactComment,
   handleGetListReplyComment,
} from "api/newfeeds";
import { useDispatch, useSelector } from "react-redux";
import { resetComment, updateCommentReaction } from "states/modules/article";
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
import NewCommentForm from "../NewCommentForm";
import { Pagination } from "antd";
import { resetReply } from "states/modules/article";

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
      isLoadingReactComment,
      onetimecomments,
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

   const handleCloseComment = async () => {
      await dispatch(resetComment());
      dispatch(resetReply());
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

   //==============Reaction===============
   useEffect(() => {
      if (onetimecomments.length > 0) {
         onetimecomments.forEach((cmt) => {
            if (cmt._id) {
               dispatch(handleGetUserCommentReactions(cmt._id));
            }
         });
      }
   }, [onetimecomments, dispatch]);

   const reactionMap = useMemo(() => {
      return new Map(
         comment_reactions.map((r) => [r.target_id.toString(), r.type])
      );
   }, [comment_reactions]);

   const handleCommentReaction = useCallback(
      (commentId, formData) => {
         const reactionType = formData.get("type");
         dispatch(updateCommentReaction({ commentId, reactionType }));

         //Gọi API để update server
         dispatch(handleReactComment({ commentId, data: formData }));
      },
      [dispatch]
   );
   //===============End=================
   //Form
   const handleFormSubmit = useCallback(
      (formData) => {
         dispatch(handleCreateComment({ data: formData }));
      },
      [dispatch]
   );
   //End
   //Reply Comment Logic
   const replyCommentState = useSelector((state) => state.article);
   const [replyCommentList, setReplyCommentList] = useState({
      // [parent_id]: {
      //    replyComments: [],
      //    pagination: {
      //       page: 1,
      //       limit: 3,
      //       hasMore: true,
      //    },
      //    isLoading: false,
      // },
   });

   const {
      reply_comments_pagination,
      isLoadingGetReplyComments,
      replyComments,
   } = replyCommentState;

   useEffect(() => {
      if (replyComments && replyComments.length > 0) {
         const parentId = replyComments[0].parent_id;

         setReplyCommentList((prevState) => {
            // Kiểm tra xem parentId đã tồn tại trong state chưa
            const existingReplies = prevState[parentId]?.replyComments || [];

            // Lọc ra những comments mới để tránh trùng lặp
            const newReplies = replyComments.filter(
               (newReply) =>
                  !existingReplies.some(
                     (existing) => existing._id === newReply._id
                  )
            );

            return {
               ...prevState,
               [parentId]: {
                  replyComments: [...existingReplies, ...newReplies],
                  pagination: reply_comments_pagination,
               },
            };
         });
      }
   }, [replyComments, isLoadingGetReplyComments, reply_comments_pagination]);

   const [replyDataFilter, setReplyDataFilter] = useState({
      limit: 3,
      page: 1,
      hasMore: true,
      article_id: feed._id,
      parent_id: "",
   });

   const getParentId = useCallback(
      (comment) => {
         if (comment._id && replyCommentList[comment._id]) {
            if (replyCommentList[comment._id].pagination.hasMore === true) {
               setReplyDataFilter((prev) => ({
                  ...prev,
                  parent_id: comment._id,
                  limit: replyCommentList[comment._id].pagination?.limit || 3,
                  hasMore:
                     replyCommentList[comment._id].pagination?.hasMore ?? true,
                  page: replyCommentList[comment._id].pagination?.page || 1,
               }));
            }
         } else {
            // Nếu comment là comment gốc hoặc chưa có trong replyCommentList
            setReplyDataFilter((prev) => ({
               ...prev,
               parent_id: comment._id,
               limit: 3,
               hasMore: true,
               page: 1,
            }));
         }
         // Nếu comment là reply comment (có parent_id), lấy pagination của parent
      },
      [replyCommentList]
   );

   const hideReplies = useCallback((comment) => {
      setReplyCommentList((prevState) => ({
         ...prevState,
         [comment._id]: {},
      }));
   }, []);

   useEffect(() => {
      if (replyDataFilter.parent_id) {
         dispatch(handleGetListReplyComment({ dataFilter: replyDataFilter }));
      }
   }, [replyDataFilter, dispatch]);
   //End reply comment logic
   return (
      <div
         className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden"
         onClick={handleCloseComment}
         style={{ zIndex: 100 }}
      >
         <div
            className="bg-[#ffffff] w-[50vw] max-h-[90vh] mb-8 rounded-md p-8 overflow-y-auto"
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
            {comment.map((cmt, index) => {
               if (index === comment.length - 1) {
                  return (
                     <Comment
                        key={index}
                        comment={cmt}
                        ref={lastElementRef}
                        reaction={reactionMap.get(cmt._id)}
                        onCommentReaction={handleCommentReaction}
                        isLoading={isLoadingReactComment}
                        setParentId={getParentId}
                        replyCommentList={replyCommentList[cmt._id]}
                        hideReplies={hideReplies}
                     />
                  );
               } else {
                  return (
                     <Comment
                        key={index}
                        comment={cmt}
                        reaction={reactionMap.get(cmt._id)}
                        onCommentReaction={handleCommentReaction}
                        isLoading={isLoadingReactComment}
                        setParentId={getParentId}
                        replyCommentList={replyCommentList[cmt._id]}
                        hideReplies={hideReplies}
                     />
                  );
               }
            })}
            <NewCommentForm article_id={_id} onSubmit={handleFormSubmit} />
         </div>
      </div>
   );
};

CommentList.displayName = "CommentList";

export default CommentList;
