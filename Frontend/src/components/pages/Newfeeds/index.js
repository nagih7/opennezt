import React, {
   useState,
   useEffect,
   useRef,
   useMemo,
   useCallback,
} from "react";
import "./styles.scss";
import Article from "./components/Article";
import NewArticle from "./components/NewAricle";
import {
   getListFeeds,
   getUserReactionsList,
   handleReactArticle,
   handleCreateArticle,
   handleUpdateArticle,
   handleDeleteArticle,
} from "../../../api/newfeeds";
import { useDispatch, useSelector } from "react-redux";
import RightSidebar from "components/common/RightSidebar";
import { updateReaction } from "states/modules/article";
import CreateAricleForm from "./components/CreateAricleForm";
import CommentList from "./components/CommentList";
import UpdateArticleForm from "./components/UpdateArticleForm";

function NewFeeds() {
   const dispatch = useDispatch();

   const {
      feeds,
      onetimefeeds,
      reactions,
      isLoadingGetFeeds,
      isLoadingReactArticle,
      pagination,
   } = useSelector((state) => state.article);

   const { nextCursor, limit, hasMore } = pagination;

   const [dataFilter, setDataFilter] = useState({
      cursor: 0,
      limit: limit,
   });

   useEffect(() => {
      if (feeds.length === 0) {
         dispatch(
            getListFeeds({
               cursor: new Date(),
               limit: limit,
            })
         );
      }
   }, [dispatch, feeds.length, limit]);

   useEffect(() => {
      // Chỉ gọi API khi cursor thay đổi (không phải lần đầu load)
      if (dataFilter.cursor !== 0) {
         dispatch(getListFeeds(dataFilter));
      }
   }, [dispatch, dataFilter]);
   //Xử lí bất đồng bộ
   const isLoadingRef = useRef(isLoadingGetFeeds); // Tạo một ref để lưu trạng thái
   const cursorRef = useRef(nextCursor);
   useEffect(() => {
      isLoadingRef.current = isLoadingGetFeeds; // Cập nhật giá trị ref mỗi khi trạng thái thay đổi
   }, [isLoadingGetFeeds]);
   useEffect(() => {
      cursorRef.current = nextCursor;
   }, [nextCursor]);
   //End
   //Lướt xuống bài viết cuối thì load tiếp
   const observerRef = useRef(null);

   const lastElementRef = useCallback(
      (node) => {
         // Ngắt kết nối observer cũ
         if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
         }

         // Tạo observer mới nếu có node và hasMore
         if (node && hasMore) {
            observerRef.current = new IntersectionObserver(
               (entries) => {
                  const first = entries[0];
                  if (
                     first.isIntersecting &&
                     hasMore &&
                     !isLoadingRef.current
                  ) {
                     setDataFilter({
                        cursor: cursorRef.current,
                        limit: limit,
                     });
                  }
               },
               { threshold: 0.1 }
            );

            observerRef.current.observe(node);
         }
      },
      [hasMore, limit]
   );
   //Reaction User's Status
   // Tải trạng thái reaction của người dùng hiện tại
   useEffect(() => {
      if (onetimefeeds.length > 0) {
         // Lấy tất cả article IDs
         const articleIds = onetimefeeds
            .filter((feed) => feed._id)
            .map((feed) => feed._id);

         // Gọi API một lần với array của IDs
         if (articleIds.length > 0) {
            dispatch(getUserReactionsList(articleIds));
         }
      }
   }, [onetimefeeds, dispatch]);

   const reactionMap = useMemo(() => {
      return new Map(reactions.map((r) => [r.target_id.toString(), r.type]));
   }, [reactions]);
   //End Reaction User's Status
   //Form Create Article
   const [isOpenForm, setIsOpenForm] = useState(false);

   const handleOpenForm = useCallback(() => {
      setIsOpenForm(true);
   }, []);

   const handleCloseForm = useCallback(() => {
      setIsOpenForm(false);
   }, []);

   const handleReaction = useCallback(
      (articleId, formData) => {
         const reactionType = formData.get("type");
         dispatch(updateReaction({ articleId, reactionType }));

         //Gọi API để update server
         dispatch(handleReactArticle({ articleId, data: formData }));
      },
      [dispatch]
   );

   const handleFormSubmit = useCallback(
      (formData) => {
         const newFormData = new FormData();
         newFormData.append("caption", formData.content.caption);
         formData.content.attachment.forEach((file) => {
            newFormData.append("attachment", file);
         });
         newFormData.append(
            "hashtags",
            JSON.stringify(formData.content.hashtags)
         );
         newFormData.append("audience", formData.audience);
         newFormData.append("status", formData.status);
         newFormData.append("project_id", formData.project_id);
         dispatch(handleCreateArticle({ data: newFormData }));
      },
      [dispatch]
   );
   //End Form Create Article

   //Comment Article
   const [selectedArticle, setSelectedArticle] = useState({});
   const [isOpenComment, setIsOpenComment] = useState(false);
   const handleSelectArticle = useCallback(async (feed) => {
      setSelectedArticle(feed);
      setIsOpenComment(true);
   }, []);

   const handleCloseComment = useCallback(() => {
      setIsOpenComment(false);
      setSelectedArticle({});
   }, []);

   //End Comment Article

   //Update Article
   const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
   const handleOpenUpdateForm = useCallback(async (feed) => {
      setSelectedArticle(feed);
      setIsOpenUpdateForm(true);
   }, []);
   const handleCloseUpdateForm = useCallback(async () => {
      setSelectedArticle({});
      setIsOpenUpdateForm(false);
   }, []);

   const handleUpdateFormSubmit = useCallback(
      (id, formData) => {
         const newFormData = new FormData();
         newFormData.append("caption", formData.content.caption);
         formData.content.attachment.forEach((file) => {
            newFormData.append("attachment", file);
         });
         newFormData.append(
            "hashtags",
            JSON.stringify(formData.content.hashtags)
         );
         newFormData.append("audience", formData.audience);
         newFormData.append("status", formData.status);
         newFormData.append("project_id", formData.project_id);
         dispatch(handleUpdateArticle({ id: id, data: newFormData }));
      },
      [dispatch]
   );
   //End Update Article
   //Delete Article
   const handleDetele = useCallback(
      (id) => {
         dispatch(handleDeleteArticle({ id }));
      },
      [dispatch]
   );
   //End Delete Article
   return (
      <div>
         <div className="flex w-full gap-8 pt-4 px-[16px]">
            <div className="w-8/12">
               {isOpenUpdateForm ? (
                  <UpdateArticleForm
                     feed={selectedArticle}
                     onClose={handleCloseUpdateForm}
                     onSubmit={handleUpdateFormSubmit}
                  />
               ) : null}
               {isOpenComment ? (
                  <CommentList
                     key={selectedArticle._id}
                     feed={selectedArticle}
                     onClose={handleCloseComment}
                     reaction={reactionMap.get(selectedArticle._id)}
                     onReaction={handleReaction}
                     isLoading={isLoadingReactArticle}
                  />
               ) : null}
               {isOpenForm ? (
                  <CreateAricleForm
                     onSubmitForm={handleFormSubmit}
                     onCloseForm={handleCloseForm}
                  />
               ) : null}
               <div>
                  <NewArticle onOpenForm={handleOpenForm} />
               </div>
               {feeds.map((feed, index) => {
                  if (index === feeds.length - 1) {
                     return (
                        <Article
                           key={feed._id}
                           ref={lastElementRef}
                           feed={feed}
                           reaction={reactionMap.get(feed._id)}
                           onReaction={handleReaction}
                           isLoading={isLoadingReactArticle}
                           onSelect={handleSelectArticle}
                           onEdit={handleOpenUpdateForm}
                           onDelete={handleDetele}
                        />
                     );
                  } else {
                     return (
                        <Article
                           key={feed._id}
                           feed={feed}
                           reaction={reactionMap.get(feed._id)}
                           onReaction={handleReaction}
                           isLoading={isLoadingReactArticle}
                           onSelect={handleSelectArticle}
                           onEdit={handleOpenUpdateForm}
                           onDelete={handleDetele}
                        />
                     );
                  }
               })}
            </div>
            <RightSidebar />
         </div>
      </div>
   );
}

export default NewFeeds;
