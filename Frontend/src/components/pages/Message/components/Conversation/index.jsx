import { IconlyAddUser, IconlyArrowLeft2 } from 'components/UI/Iconly';
import { ArrowsAltOutlined, MoreOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants/typeConstants';
import { Popover, Portal, Stack } from '@chakra-ui/react';
import { Tooltip } from 'components/UI/tooltip';
import ConversationHeader from './components/ConversationHeader';
import InviteMemberModal from './components/InviteMemberModal';
import { setModalInviteMember } from 'states/modules/project';
import NoChat from './components/NoChat';
import Chat from './components/Chat';

const Conversation = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;

    // ========== STATE FROM REDUX ========== //

    const { conversation } = useSelector((state) => state.chat);

    // ========== STATE ========== //

    const [isOpenMoreActions, setIsOpenMoreActions] = useState(false);

    // ========== HANDLE FUNCTION MODAL ========== //
    const handleOpenModal = () => {
        dispatch(setModalInviteMember(true));
        setIsOpenMoreActions(false);
    };

    // ========== HANDLE FUNCTION POPPER ========== //
    const onOpenChange = (open) => {
        setIsOpenMoreActions(open.open);
    };

    if (id) {
        return (
            <>
                <div className="flex justify-between p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
                    <div className="flex items-center">
                        <Link to={'/conversation'} className="flex justify-center items-center w-[50px] h-11">
                            <IconlyArrowLeft2 size={18} color={'#6f7f92'} />
                        </Link>
                        {(() => {
                            switch (conversation?.type?.name) {
                                case DIRECT_CONVERSATION:
                                    return (
                                        <ConversationHeader
                                            name={conversation?.members[0]?.name}
                                            logo={conversation?.members[0]?.avatar}
                                        />
                                    );
                                case GROUP_CONVERSATION:
                                    return (
                                        <ConversationHeader
                                            name={conversation?.members[0]?.name}
                                            logo={conversation?.members[0]?.avatar}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                    <div className="flex items-center">
                        <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                            <ArrowsAltOutlined />
                        </span>

                        <Popover.Root
                            positioning={{ placement: 'bottom-end' }}
                            open={isOpenMoreActions}
                            onOpenChange={(open) => onOpenChange(open)}
                        >
                            <Popover.Trigger asChild>
                                <span
                                    className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11 cursor-pointer"
                                    onClick={() => setIsOpenMoreActions(!isOpenMoreActions)}
                                >
                                    <Tooltip
                                        content="More"
                                        openDelay={0}
                                        closeDelay={100}
                                        positioning={{ placement: 'top' }}
                                    >
                                        <MoreOutlined />
                                    </Tooltip>
                                </span>
                            </Popover.Trigger>
                            <Portal>
                                <Popover.Positioner>
                                    <Popover.Content>
                                        <Popover.Arrow />
                                        <Popover.Body className="p-[15px]">
                                            <Stack spacing={4}>
                                                <Stack
                                                    spacing={4}
                                                    direction={'row'}
                                                    align={'center'}
                                                    cursor={'pointer'}
                                                    onClick={handleOpenModal}
                                                >
                                                    <IconlyAddUser size={24} color="#6f7f92" />
                                                    Invite to project
                                                </Stack>
                                            </Stack>
                                        </Popover.Body>
                                    </Popover.Content>
                                </Popover.Positioner>
                            </Portal>
                        </Popover.Root>
                        <InviteMemberModal conversation={conversation} />
                    </div>
                </div>
                <Chat />
            </>
        );
    } else {
        return <NoChat />;
    }
};

export default Conversation;
