import RightSidebar from "components/common/RightSidebar";
import React from "react";

const Badges = () => {
    const badges = [
        {
            id: 1,
            name: "Kid Zone",
            img: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2021/06/Group-33757-5-65x65.png",
            description: "If user earned 50 points credit then unlocked this badge.",
            people: [
                { name: "Alice", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Bob", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Charlie", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "David", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Emma", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
            ],
        },
        {
            id: 2,
            name: "Kid Zone",
            img: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2021/06/Group-33757-5-65x65.png",
            description: "If user earned 50 points credit then unlocked this badge.",
            people: [
                { name: "Alice", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Bob", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Charlie", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "David", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Emma", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
            ],
        },
        {
            id: 3,
            name: "Kid Zone",
            img: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2021/06/Group-33757-5-65x65.png",
            description: "If user earned 50 points credit then unlocked this badge.",
            people: [
                { name: "Alice", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Bob", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Charlie", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "David", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Emma", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
            ],
        },
        {
            id: 4,
            name: "Kid Zone",
            img: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2021/06/Group-33757-5-65x65.png",
            description: "If user earned 50 points credit then unlocked this badge.",
            people: [
                { name: "Alice", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Bob", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Charlie", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "David", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
                { name: "Emma", avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/69/1659591625-bpthumb.png" },
            ],
        },
    ];

    return (
        <>
            <div className="flex gap-8">
                <div className="w-10/12">
                    <div className="">
                        <div className="bg-white rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4">Badges({badges.length})</h4>
                            <hr className="mb-4" />
                            <div className="flex flex-wrap gap-6">
                                {badges.map((badge) => (
                                    <div key={badge.id} className="bg-[#F8F9FA]  rounded-xl p-6 w-[21rem] h-[24.5rem] text-center border">
                                        <img src={badge.img} alt={badge.name} className="w-16 h-16 mx-auto rounded-lg" />
                                        <h3 className="text-lg font-semibold mt-4">{badge.name}</h3>
                                        <p className="text-[#6F7F92] text-[1rem] mt-4">{badge.description}</p>
                                        <div className="mt-4 bg-white w-[18rem] h-[6.75rem]">
                                            <div className="flex justify-center -space-x-5">
                                                {badge.people.map((person, index) => (
                                                    <img
                                                        key={index}
                                                        src={person.avatar}
                                                        alt={person.name}
                                                        className="w-10 h-10 rounded-full border border-white mt-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125 hover:z-10 hover:shadow-lg"
                                                    />
                                                ))}
                                            </div>

                                            <p className="text-gray-400 text-[0.9rem] mt-2">People who have earned this</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <RightSidebar />
            </div>
        </>
    );
};

export default Badges;
