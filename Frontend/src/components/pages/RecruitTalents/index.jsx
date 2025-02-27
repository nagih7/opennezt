import React, { useCallback, useState } from "react";
import styles from "./styles.module.scss";
import { getTalentDetails } from "api/talent";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { getRequestAddFriend } from "api/notification";
import RecruitWrap from "./RecuitWrap";
import ListTalents from "./ListTalents";
import LazyLoading from "components/UI/LazyLoading";
import {
  IconlyArrowRight2,
  IconlyCategory,
  IconlyHeart,
  IconlyShow,
  IconlyStar,
} from "components/UI/Iconly";
import img_bag from "assets/images/background/bag.jpg";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";

const TalentProfile = React.lazy(() =>
  import("components/common/TalentProfile")
);

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

function RecruitTalents() {
  const dispatch = useDispatch();

  const [modalTalentDetails, setModalTalentDetails] = useState(false);

  const handleGetDetailTalent = useCallback(
    (id) => {
      setModalTalentDetails(true);
      dispatch(getTalentDetails(id));
      dispatch(getRequestAddFriend(id));
    },
    [dispatch]
  );

  const handleClosePopup = () => {
    setModalTalentDetails(false);
  };

  return (
    // <div className={styles.searchContainer}>
    // 	<RecruitWrap />
    // 	<ListTalents handleGetDetailTalent={handleGetDetailTalent} />

    // 	<Modal
    // 		footer={null}
    // 		title=""
    // 		okText="OK"
    // 		open={modalTalentDetails}
    // 		onOk={handleClosePopup}
    // 		confirmLoading={false}
    // 		onCancel={handleClosePopup}
    // 		width={1000}>
    // 		<LazyLoading>
    // 			<TalentProfile />
    // 		</LazyLoading>
    // 	</Modal>
    // </div>
    <div className="w-full">
      <div
        className="h-[300px] text-[#ffffff] pl-8 py-32 bg-local bg-center "
        style={{
          backgroundImage:
            "url(https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/buddypress/groups/14/cover-image/62be922d671b9-bp-cover-image.jpg)",
          objectFit: "cover",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <span className="text-3xl font-semibold mb-[10px]">Shop</span>
          <ul className="m-0 pl-0 flex items-center gap-2">
            <li>
              <a
                href="#"
                className="text-[#ffffff] no-underline font-semibold text-sm"
              >
                HOME
              </a>
            </li>
            <li>
              <span className="flex items-center">
                <IconlyArrowRight2 size={18} color={"#ffffff"} />
                <span className="font-semibold text-sm">PRODUCT</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-8">
        <div className="px-[16px]">
          <div className="flex w-full gap-8">
            <div className="w-3/12 ">
              <div className="bg-[#ffffff] rounded-md mb-8">
                <SelectRoot collection={frameworks} size="sm" width="320px">
                  {/* <SelectLabel></SelectLabel> */}
                  <SelectTrigger>
                    <SelectValueText placeholder="Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.items.map((movie) => (
                      <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
              <div className="bg-[#ffffff] rounded-md mb-8">
                <SelectRoot collection={frameworks} size="sm" width="320px">
                  {/* <SelectLabel></SelectLabel> */}
                  <SelectTrigger>
                    <SelectValueText placeholder="Expertise area required" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.items.map((movie) => (
                      <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
              <div className="bg-[#ffffff] rounded-md mb-8">
                <SelectRoot collection={frameworks} size="sm" width="320px">
                  {/* <SelectLabel></SelectLabel> */}
                  <SelectTrigger>
                    <SelectValueText placeholder="Stage of Development" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.items.map((movie) => (
                      <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
              <div className="bg-[#ffffff] rounded-md mb-8">
                <SelectRoot collection={frameworks} size="sm" width="320px">
                  {/* <SelectLabel></SelectLabel> */}
                  <SelectTrigger>
                    <SelectValueText placeholder="Compensation" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.items.map((movie) => (
                      <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
              <div className="bg-[#ffffff] rounded-md mb-8">
                <SelectRoot collection={frameworks} size="sm" width="320px">
                  {/* <SelectLabel></SelectLabel> */}
                  <SelectTrigger>
                    <SelectValueText placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.items.map((movie) => (
                      <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
              <div className="bg-[#ffffff] rounded-md mb-8">
                <SelectRoot collection={frameworks} size="sm" width="320px">
                  {/* <SelectLabel></SelectLabel> */}
                  <SelectTrigger>
                    <SelectValueText placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.items.map((movie) => (
                      <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
            </div>
            <div className="w-9/12">
              <div className="flex justify-between items-center bg-[#ffffff] rounded-md p-[16px] mb-8">
                <p className="mb-0">Showing 1–16 of 16 results</p>
                <div className="flex items-center">
                  <div className="px-[13px] py-[10px]">
                    <ul className="m-0 pl-0 flex items-center gap-2">
                      <li>
                        <a href="#">
                          <IconlyCategory size={20} color={"#6f7f92"} />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <IconlyCategory size={20} color={"#6f7f92"} />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <IconlyCategory size={20} color={"#6f7f92"} />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <form action="" className="pr-3 bg-[#f8f9fa] rounded-md">
                    <select
                      name=""
                      id=""
                      className="bg-[#f8f9fa] text-[#6f7f92] rounded-md p-3 outline-none"
                    >
                      <option value="">Default sorting</option>
                      <option value="">Sort by popularity</option>
                    </select>
                  </form>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div
                  className="relative group h-[380px]"
                  onMouseEnter={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 1));
                  }}
                  onMouseLeave={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 0));
                  }}
                >
                  <div className="relative">
                    <span className="absolute top-[12px] left-[12px] z-10 bg-[#2f65b9] text-white text-sm px-[5px] py-[2px] rounded-md">
                      Sale!
                    </span>
                    <div className="relative group">
                      <a href="#">
                        <div>
                          <img
                            src={img_bag}
                            alt=""
                            className="w-[280px] h-[280px] rounded-md"
                          />
                        </div>
                      </a>
                      <div
                        className="absolute top-[15px] right-[15px] fade-element"
                        style={{
                          opacity: 0, // Mặc định opacity là 0
                          transition: "opacity 0.7s ease-in-out",
                        }}
                      >
                        <ul className="m-0 pl-0 flex flex-col gap-2">
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyShow size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyHeart size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-[-61px] group-hover:bottom-[-21px] group-hover:translate-x-0 translate-x-full transition-all duration-700 ease-in-out left-0 w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
                    <span>
                      <a
                        href="#"
                        className="text-black no-underline font-semibold"
                      >
                        Bag
                      </a>
                    </span>
                    <div>
                      <span className="text-[#6f7f92] text-sm font-medium">
                        <span>$18.00 </span>-<span> $45.00</span>
                      </span>
                    </div>
                    <div>
                      <ul className="m-0 pl-0 flex items-center gap-1">
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                      </ul>
                    </div>
                    <div
                      className="mt-[16px] fade-element"
                      style={{
                        opacity: 0, // Mặc định opacity là 0
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      <a
                        href=""
                        className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md"
                      >
                        VIEW PRODUCTS
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="relative group h-[380px]"
                  onMouseEnter={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 1));
                  }}
                  onMouseLeave={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 0));
                  }}
                >
                  <div className="relative">
                    <span className="absolute top-[12px] left-[12px] z-10 bg-[#2f65b9] text-white text-sm px-[5px] py-[2px] rounded-md">
                      Sale!
                    </span>
                    <div className="relative group">
                      <a href="#">
                        <div>
                          <img
                            src={img_bag}
                            alt=""
                            className="w-[280px] h-[280px] rounded-md"
                          />
                        </div>
                      </a>
                      <div
                        className="absolute top-[15px] right-[15px] fade-element"
                        style={{
                          opacity: 0, // Mặc định opacity là 0
                          transition: "opacity 0.7s ease-in-out",
                        }}
                      >
                        <ul className="m-0 pl-0 flex flex-col gap-2">
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyShow size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyHeart size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-[-61px] group-hover:bottom-[-21px] group-hover:translate-x-0 translate-x-full transition-all duration-700 ease-in-out left-0 w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
                    <span>
                      <a
                        href="#"
                        className="text-black no-underline font-semibold"
                      >
                        Bag
                      </a>
                    </span>
                    <div>
                      <span className="text-[#6f7f92] text-sm font-medium">
                        <span>$18.00 </span>-<span> $45.00</span>
                      </span>
                    </div>
                    <div>
                      <ul className="m-0 pl-0 flex items-center gap-1">
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                      </ul>
                    </div>
                    <div
                      className="mt-[16px] fade-element"
                      style={{
                        opacity: 0, // Mặc định opacity là 0
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      <a
                        href=""
                        className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md"
                      >
                        VIEW PRODUCTS
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="relative group h-[380px]"
                  onMouseEnter={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 1));
                  }}
                  onMouseLeave={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 0));
                  }}
                >
                  <div className="relative">
                    <span className="absolute top-[12px] left-[12px] z-10 bg-[#2f65b9] text-white text-sm px-[5px] py-[2px] rounded-md">
                      Sale!
                    </span>
                    <div className="relative group">
                      <a href="#">
                        <div>
                          <img
                            src={img_bag}
                            alt=""
                            className="w-[280px] h-[280px] rounded-md"
                          />
                        </div>
                      </a>
                      <div
                        className="absolute top-[15px] right-[15px] fade-element"
                        style={{
                          opacity: 0, // Mặc định opacity là 0
                          transition: "opacity 0.7s ease-in-out",
                        }}
                      >
                        <ul className="m-0 pl-0 flex flex-col gap-2">
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyShow size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyHeart size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-[-61px] group-hover:bottom-[-21px] group-hover:translate-x-0 translate-x-full transition-all duration-700 ease-in-out left-0 w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
                    <span>
                      <a
                        href="#"
                        className="text-black no-underline font-semibold"
                      >
                        Bag
                      </a>
                    </span>
                    <div>
                      <span className="text-[#6f7f92] text-sm font-medium">
                        <span>$18.00 </span>-<span> $45.00</span>
                      </span>
                    </div>
                    <div>
                      <ul className="m-0 pl-0 flex items-center gap-1">
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                      </ul>
                    </div>
                    <div
                      className="mt-[16px] fade-element"
                      style={{
                        opacity: 0, // Mặc định opacity là 0
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      <a
                        href=""
                        className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md"
                      >
                        VIEW PRODUCTS
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="relative group h-[380px]"
                  onMouseEnter={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 1));
                  }}
                  onMouseLeave={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 0));
                  }}
                >
                  <div className="relative">
                    <span className="absolute top-[12px] left-[12px] z-10 bg-[#2f65b9] text-white text-sm px-[5px] py-[2px] rounded-md">
                      Sale!
                    </span>
                    <div className="relative group">
                      <a href="#">
                        <div>
                          <img
                            src={img_bag}
                            alt=""
                            className="w-[280px] h-[280px] rounded-md"
                          />
                        </div>
                      </a>
                      <div
                        className="absolute top-[15px] right-[15px] fade-element"
                        style={{
                          opacity: 0, // Mặc định opacity là 0
                          transition: "opacity 0.7s ease-in-out",
                        }}
                      >
                        <ul className="m-0 pl-0 flex flex-col gap-2">
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyShow size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyHeart size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-[-61px] group-hover:bottom-[-21px] group-hover:translate-x-0 translate-x-full transition-all duration-700 ease-in-out left-0 w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
                    <span>
                      <a
                        href="#"
                        className="text-black no-underline font-semibold"
                      >
                        Bag
                      </a>
                    </span>
                    <div>
                      <span className="text-[#6f7f92] text-sm font-medium">
                        <span>$18.00 </span>-<span> $45.00</span>
                      </span>
                    </div>
                    <div>
                      <ul className="m-0 pl-0 flex items-center gap-1">
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                      </ul>
                    </div>
                    <div
                      className="mt-[16px] fade-element"
                      style={{
                        opacity: 0, // Mặc định opacity là 0
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      <a
                        href=""
                        className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md"
                      >
                        VIEW PRODUCTS
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="relative group h-[380px]"
                  onMouseEnter={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 1));
                  }}
                  onMouseLeave={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 0));
                  }}
                >
                  <div className="relative">
                    <span className="absolute top-[12px] left-[12px] z-10 bg-[#2f65b9] text-white text-sm px-[5px] py-[2px] rounded-md">
                      Sale!
                    </span>
                    <div className="relative group">
                      <a href="#">
                        <div>
                          <img
                            src={img_bag}
                            alt=""
                            className="w-[280px] h-[280px] rounded-md"
                          />
                        </div>
                      </a>
                      <div
                        className="absolute top-[15px] right-[15px] fade-element"
                        style={{
                          opacity: 0, // Mặc định opacity là 0
                          transition: "opacity 0.7s ease-in-out",
                        }}
                      >
                        <ul className="m-0 pl-0 flex flex-col gap-2">
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyShow size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyHeart size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-[-61px] group-hover:bottom-[-21px] group-hover:translate-x-0 translate-x-full transition-all duration-700 ease-in-out left-0 w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
                    <span>
                      <a
                        href="#"
                        className="text-black no-underline font-semibold"
                      >
                        Bag
                      </a>
                    </span>
                    <div>
                      <span className="text-[#6f7f92] text-sm font-medium">
                        <span>$18.00 </span>-<span> $45.00</span>
                      </span>
                    </div>
                    <div>
                      <ul className="m-0 pl-0 flex items-center gap-1">
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                      </ul>
                    </div>
                    <div
                      className="mt-[16px] fade-element"
                      style={{
                        opacity: 0, // Mặc định opacity là 0
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      <a
                        href=""
                        className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md"
                      >
                        VIEW PRODUCTS
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="relative group h-[380px]"
                  onMouseEnter={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 1));
                  }}
                  onMouseLeave={(e) => {
                    const children =
                      e.currentTarget.querySelectorAll(".fade-element");
                    children.forEach((child) => (child.style.opacity = 0));
                  }}
                >
                  <div className="relative">
                    <span className="absolute top-[12px] left-[12px] z-10 bg-[#2f65b9] text-white text-sm px-[5px] py-[2px] rounded-md">
                      Sale!
                    </span>
                    <div className="relative group">
                      <a href="#">
                        <div>
                          <img
                            src={img_bag}
                            alt=""
                            className="w-[280px] h-[280px] rounded-md"
                          />
                        </div>
                      </a>
                      <div
                        className="absolute top-[15px] right-[15px] fade-element"
                        style={{
                          opacity: 0, // Mặc định opacity là 0
                          transition: "opacity 0.7s ease-in-out",
                        }}
                      >
                        <ul className="m-0 pl-0 flex flex-col gap-2">
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyShow size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center"
                            >
                              <IconlyHeart size={20} color={"#2f65b9"} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-[-61px] group-hover:bottom-[-21px] group-hover:translate-x-0 translate-x-full transition-all duration-700 ease-in-out left-0 w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
                    <span>
                      <a
                        href="#"
                        className="text-black no-underline font-semibold"
                      >
                        Bag
                      </a>
                    </span>
                    <div>
                      <span className="text-[#6f7f92] text-sm font-medium">
                        <span>$18.00 </span>-<span> $45.00</span>
                      </span>
                    </div>
                    <div>
                      <ul className="m-0 pl-0 flex items-center gap-1">
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                        <li>
                          <IconlyStar size={18} color={"#ffb800"} />
                        </li>
                      </ul>
                    </div>
                    <div
                      className="mt-[16px] fade-element"
                      style={{
                        opacity: 0, // Mặc định opacity là 0
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      <a
                        href=""
                        className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md"
                      >
                        VIEW PRODUCTS
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitTalents;
