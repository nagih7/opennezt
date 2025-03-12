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
} from "../../../api/newfeeds";
import { useDispatch, useSelector } from "react-redux";
import RightSidebar from "components/common/RightSidebar";
import { updateReaction } from "states/modules/article";
import CreateAricleForm from "./components/CreateAricleForm";
import { set } from "lodash";

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
      cursor: nextCursor,
      limit: limit,
   });

   useEffect(() => {
      dispatch(getListFeeds(dataFilter));
   }, [dataFilter, dispatch]);

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

   useEffect(() => {
      observerRef.current = new IntersectionObserver(
         (entries) => {
            const first = entries[0];
            if (
               first.isIntersecting === true &&
               hasMore === true &&
               isLoadingRef.current === false
            ) {
               setDataFilter({
                  cursor: cursorRef.current,
                  limit: limit,
               });
            }
         },
         { root: null, rootMargin: "0px", threshold: 0.1 }
      );
   }, [hasMore, isLoadingGetFeeds, nextCursor, limit]);
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
   // Tải trạng thái reaction của người dùng hiện tại
   useEffect(() => {
      if (onetimefeeds.length > 0) {
         onetimefeeds.forEach((feed) => {
            if (feed._id) {
               dispatch(getUserReactionsList(feed._id));
            }
         });
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
         dispatch(handleCreateArticle({ data: formData }));
      },
      [dispatch]
   );
   //End Form Create Article
   return (
      <div>
         <div className="flex gap-8 pt-4 ">
            <div className="pl-4">
               {isOpenForm ? (
                  <CreateAricleForm
                     onSubmitForm={handleFormSubmit}
                     onCloseForm={handleCloseForm}
                  />
               ) : null}
               <NewArticle onOpenForm={handleOpenForm} />
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
