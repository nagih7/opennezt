import AvatarDefault from "../../../../../assets/images/default/AvatarDefault.png";
import React from "react";
import { useSelector } from "react-redux";
import { Input } from "antd";
const NewArticle = ({ onOpenForm }) => {
   const { authUser } = useSelector((state) => state.auth);
   const handleClick = () => {
      onOpenForm();
   };
   return (
      <>
         <div className="flex gap-3 bg-[#ffffff] p-8 rounded-md mb-4">
            <img
               src={authUser.avatar || AvatarDefault}
               className="w-[50px] h-[50px] rounded-full"
            ></img>
            <Input
               style={{
                  borderRadius: "8px",
                  cursor: "pointer",
               }}
               placeholder={`${authUser.name} do you want to create a article?`}
               onClick={handleClick}
               readOnly={true}
            />
         </div>
      </>
   );
};

export default NewArticle;
