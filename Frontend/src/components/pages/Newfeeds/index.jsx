import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import Article from "./components/Article";
import { getListFeeds } from "api/newfeeds";
import { useDispatch, useSelector } from "react-redux";

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
      console.log("fetching data");
   }, [dataFilter, dispatch]);

   console.log(feeds);
   console.log(nextCursor);
   return (
      <div>
         {feeds.map((feed, index) => (
            <Article key={index} data={feed} />
         ))}
      </div>
   );
}

export default NewFeeds;
