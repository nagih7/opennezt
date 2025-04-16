import RightSidebar from "components/common/RightSidebar";
import React from "react";
import { Avatar, Tabs } from '@chakra-ui/react'
import BookmarkedArticle from "./BookmarkArticle";
import BookmarkProject from "./BookmarkProject";
import BookmarkTalent from "./BookmarkTalent";
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
                    <Tabs.Root defaultValue="Articles" >
                        <div className=" rounded-lg p-6">
                            <Tabs.List >
                                <div className="flex justify-between bg-white  p-4 font-bold w-full">
                                    <div className='flex'>
                                        <Tabs.Trigger className="text-lg font-semibold" value="Articles">
                                            Articles
                                        </Tabs.Trigger>
                                        <Tabs.Trigger value="Project" className="text-lg font-semibold">
                                            Project
                                        </Tabs.Trigger>
                                        <Tabs.Trigger value="Talent" className="text-lg font-semibold">
                                            Talent
                                        </Tabs.Trigger>
                                    </div>
                                </div>
                            </Tabs.List>

                            <Tabs.Content value="Articles" >
                                <BookmarkedArticle />
                            </Tabs.Content>

                            <Tabs.Content value="Project" className="flex flex-wrap gap-6 mt-4">
                                <BookmarkProject />
                            </Tabs.Content>

                            <Tabs.Content value="Talent" className="flex flex-wrap gap-6 mt-4">
                                <BookmarkTalent />
                            </Tabs.Content>
                        </div>
                    </Tabs.Root>
                </div>
                <RightSidebar />
            </div>
        </>
    );
};

export default Badges;
