import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import Article from "./components/Article";
import { getListFeeds } from "api/newfeeds";
import { useDispatch, useSelector } from "react-redux";
import RightSidebar from "components/common/RightSidebar";

function NewFeeds() {
   const dispatch = useDispatch();

   const { feeds, isLoadingGetFeeds, pagination } = useSelector(
      (state) => state.article
   );
   const { nextCursor, limit, hasMore } = pagination;

   const [dataFilter, setDataFilter] = useState({
      cursor: nextCursor,
      limit: limit,
   });

   useEffect(() => {
      dispatch(getListFeeds(dataFilter));
   }, [dataFilter, dispatch]);

   return (
      <div className="flex gap-8 pt-4 ">
         <div className="pl-4">
            {Array(5)
               .fill(0)
               .map((_, index) => (
                  <Article key={index} />
               ))}
         </div>
         <RightSidebar />
      </div>
   );
}

export default NewFeeds;
