import { Avatar, Stack, Tabs } from '@chakra-ui/react';
import { IconlyChat, IconlyHome, IconlyProfile, IconlyUser } from 'components/UI/Iconly';
import React from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import img_project from '../../../../../../../assets/images/logo/opennezt_black.png';
import img_avt from '../../../../../../../assets/images/background/avt.jpg';
import { useSelector } from 'react-redux';
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants/typeConstants';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Conversations = () => {
    const navigate = useNavigate();
    // ========== STATE FROM REDUX STORE =========== //
    const { conversations } = useSelector((state) => state.chat);

    // ========== COMPONENT RENDER =========== //
    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <Tabs.Root defaultValue="message" variant="plain" className="flex flex-col h-full">
                <Stack className="bg-[#ffffff] rounded-md p-[13px]">
                    <Tabs.List bg="bg.muted" className="bg-white" rounded="l3" p="1">
                        <Tabs.Trigger value="message" textStyle="xs" className="bg-white text-black">
                            <IconlyChat size={16} color={'#000000'} />
                            Message
                        </Tabs.Trigger>
                        <Tabs.Trigger value="friend" textStyle="xs" className="bg-white text-black">
                            <IconlyUser size={16} color={'#000000'} />
                            Friends
                        </Tabs.Trigger>
                        <Tabs.Trigger value="projects" textStyle="xs" className="bg-white text-black">
                            <IconlyUser size={16} color={'#000000'} />
                            Projects
                        </Tabs.Trigger>
                        <Tabs.Indicator rounded="l2" />
                    </Tabs.List>
                </Stack>
                <Tabs.Content
                    value="message"
                    className="flex-1 h-full overflow-y-scroll scrollbar-hide"
                >
                    {conversations.map((conversation, index) => {
                        return (
                            <Stack
                                key={index}
                                onClick={() => navigate(`/conversation/${conversation._id}`)}
                                className="p-[15px] bg-[#ffffff] cursor-pointer"
                                direction={'row'}
                            >
                                {(() => {
                                    switch (conversation.type.name) {
                                        case DIRECT_CONVERSATION:
                                            return (
                                                <Stack
                                                    className="items-center gap-3"
                                                    direction={'row'}
                                                >
                                                    <Avatar.Root size={'xl'}>
                                                        <Avatar.Fallback
                                                            name={conversation.members[0].name}
                                                        />
                                                        <Avatar.Image
                                                            src={conversation.members[0].avatar}
                                                        />
                                                    </Avatar.Root>
                                                    <div className="flex-1">
                                                        <span className="flex items-center gap-2 text-sm font-medium">
                                                            {conversation.members[0]?.name}
                                                            <CheckCircleFilled className="text-blue-500" />
                                                        </span>
                                                        <p className="text-xs mb-0 text-[#6f7f92] font-medium">
                                                            {conversation.last_message?.content ||
                                                                'No message'}
                                                        </p>
                                                    </div>
                                                </Stack>
                                            );
                                        case GROUP_CONVERSATION:
                                            return (
                                                <Stack
                                                    className="items-center gap-3"
                                                    direction={'row'}
                                                >
                                                    <Avatar.Root size={'xl'}>
                                                        <Avatar.Fallback name={'OpenNezt'} />
                                                        <Avatar.Image src={img_project} />
                                                    </Avatar.Root>
                                                    <div>
                                                        <span className="text-sm font-medium">
                                                            OpenNezt
                                                        </span>
                                                        <p className="text-xs mb-0 text-[#6f7f92] font-medium">
                                                            {conversation.members.length} members
                                                        </p>
                                                    </div>
                                                </Stack>
                                            );
                                        default:
                                            return null;
                                    }
                                })()}
                                <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                                    <span>{moment(conversation.updated_at).fromNow()}</span>
                                </div>
                            </Stack>
                        );
                    })}
                </Tabs.Content>
                <Tabs.Content value="friend">
                    <div className="flex-1 max-h-[400px] overflow-y-scroll scrollbar-hide">
                        <div className="bg-[#ffffff]">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="text-sm w-full outline-none px-[10px] h-[45px] py-[5px] bg-white"
                            />
                        </div>
                        <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={img_avt}
                                        alt=""
                                        className="w-[35px] h-[35px] rounded-full"
                                    />
                                    <span className="flex items-center gap-2 text-sm font-medium">
                                        Bui Hoang Duy
                                        <CheckCircleFilled className="text-blue-500" />
                                    </span>
                                </div>
                                <a href="#" className="px-[15px]">
                                    <IconlyProfile size={18} color={'#6f7f92'} />
                                </a>
                            </div>
                        </div>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="projects">
                    <div className="flex-1 max-h-[400px] overflow-y-scroll scrollbar-hide">
                        <div className="bg-[#ffffff]">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="text-sm w-full outline-none px-[10px] h-[45px] py-[5px] bg-white"
                            />
                        </div>
                        <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={img_project}
                                        alt=""
                                        className="w-[35px] h-[35px] rounded-full"
                                    />
                                    <span className="text-sm font-medium">OpenNezt</span>
                                </div>
                                <a href="#" className="px-[15px]">
                                    <IconlyHome size={15} color={'#6f7f92'} />
                                </a>
                            </div>
                        </div>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
};

export default Conversations;
