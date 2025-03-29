import { IconlyAddUser, IconlyArrowLeft2, IconlySend, IconlyStar } from 'components/UI/Iconly';

import { ArrowsAltOutlined, LinkOutlined, MoreOutlined, RollbackOutlined, WechatOutlined } from '@ant-design/icons';
import img_avt from '../../../../../assets/images/background/avt.jpg';
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation, getMessages, sendMessage } from 'api/chat';
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants/typeConstants';
import { Alert, Avatar, Blockquote, Button, CloseButton, Dialog, Popover, Portal, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import { Tooltip } from 'components/UI/tooltip';
import SelectCustom from 'components/UI/SelectCustom';
import InputCustom from 'components/UI/InputCustom';
import { debounce } from 'lodash';
import { inviteMember, searchMyProjects } from 'api/project';
import { getProjectRoleFramework } from 'api/user';
import './index.scss';
import { setModalInviteMember } from 'states/modules/project';
import store from 'states/configureStore';

const Conversation = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { id } = params;

    // ========== STATE FROM REDUX ========== //
    const { authUser } = useSelector((state) => state.auth);
    const { conversation } = useSelector((state) => state.chat);
    const { projectRoleFramework, projectTeamRoleFramework } = useSelector((state) => state.user);
    const { myProjectsBySearch, isLoadingSearchMyProjects, isOpenModalInviteMember } = useSelector(
        (state) => state.project
    );

    // ========== STATE ========== //
    const [message, setMessage] = useState('');
    const [isOpenMoreActions, setIsOpenMoreActions] = useState(false);
    const [projectSelected, setProjectSelected] = useState(null);
    const [formRequest, setFormRequest] = useState({
        teamRole: '',
        role: '',
    });

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (!projectRoleFramework || !projectRoleFramework.length) {
            dispatch(getProjectRoleFramework());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(getConversation(id));
        }
    }, [dispatch, id]);
    useEffect(() => {
        if (id && conversation._id) {
            dispatch(getMessages(conversation._id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, conversation._id]);

    // Add ref for auto-scrolling
    const messagesContainerRef = useRef(null);

    // Auto scroll to bottom when messages change
    useEffect(() => {
        if (messagesContainerRef.current && conversation?.messages?.length) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [conversation?.messages]);

    // ========== HANDLE FUNCTION ========== //
    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        dispatch(sendMessage(conversation._id, message));
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // ========== HANDLE FUNCTION MODAL ========== //
    const handleOpenModal = () => {
        dispatch(setModalInviteMember(true));
        setIsOpenMoreActions(false);
    };
    const handleClose = () => {
        dispatch(setModalInviteMember(false));
    };

    // ========== HANDLE FUNCTION POPPER ========== //
    const onOpenChange = (open) => {
        setIsOpenMoreActions(open.open);
    };

    // ========== HANDLE FUNCTION SEARCH PROJECT ========== //
    const handleSearchProject = debounce((e) => {
        if (e.target.value === '') {
            return;
        }
        dispatch(searchMyProjects(e.target.value));
    }, 300);

    // ========== HANDLE FUNCTION REMOVE PROJECT ========== //
    const handleRemoveProject = () => {
        setProjectSelected(null);
        setFormRequest({
            teamRole: '',
            role: '',
        });
    };

    const handleChangeFormRequest = (e, field) => {
        setFormRequest((prev) => ({
            ...prev,
            [field]: e.value[0],
        }));
    };

    // ========== HANDLE CONFIRM INVITE ========== //
    const handleConfirmInvite = async () => {
        await store.dispatch(
            inviteMember(projectSelected._id, { ...formRequest, userId: conversation.members[0]._id })
        );
        setFormRequest({
            teamRole: '',
            role: '',
        });
        setProjectSelected(null);
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
                                        <div className="flex items-center">
                                            <span className="mr-[8px]">
                                                <Avatar.Root size={'md'}>
                                                    <Avatar.Fallback name={conversation?.members[0]?.name} />
                                                    <Avatar.Image src={conversation?.members[0]?.avatar} />
                                                </Avatar.Root>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {conversation?.members[0]?.name}
                                                <CheckCircleFilled className="text-blue-500" />
                                            </span>
                                        </div>
                                    );
                                case GROUP_CONVERSATION:
                                    return (
                                        <div className="flex items-center">
                                            <span className="mr-[8px]">
                                                <img src={img_avt} alt="" className=" w-[35px] h-[35px] rounded-full" />
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {conversation?.members[0]?.name}
                                                <CheckCircleFilled className="text-blue-500" />
                                            </span>
                                        </div>
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
                        <Dialog.Root
                            size={'lg'}
                            open={isOpenModalInviteMember}
                            placement={'center'}
                            motionPreset="slide-in-bottom"
                        >
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <Dialog.Header className='p-4'>
                                            <Text className='mb-0 text-xl font-medium'>Invite to project</Text>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <Stack>
                                                <Alert.Root status="info">
                                                    <Alert.Indicator />
                                                    <Alert.Title>
                                                        Do you want to invite people to join the project?
                                                    </Alert.Title>
                                                </Alert.Root>
                                                <Stack
                                                    spacing={4}
                                                    className="flex flex-col gap-2 my-4"
                                                    {!projectSelected && (
                                                        <>
                                                            <InputCustom
                                                                label="Project"
                                                                required
                                                                placeholder="Start typing to search for a project"
                                                                onChange={handleSearchProject}
                                                                loading={isLoadingSearchMyProjects}
                                                            />
// <<<<<<< trongtruong
//                                                             <div
//                                                                 className={`${
//                                                                     myProjectsBySearch?.length >= 4
//                                                                         ? 'flex flex-col items-center max-h-[150px] p-0 m-0 overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-track-gray-200 w-full'
//                                                                         : ''
//                                                                 }`}
//                                                             >
//                                                                 {myProjectsBySearch?.length > 0 && (
//                                                                     <Stack
//                                                                         spacing={4}
//                                                                         className="gap-0 w-full"
//                                                                     >
//                                                                         {myProjectsBySearch.map(
//                                                                             (project, idx) => (
//                                                                                 <Stack
//                                                                                     key={idx}
//                                                                                     direction={
//                                                                                         'row'
//                                                                                     }
//                                                                                     align={'center'}
//                                                                                     className="px-[15px] hover:bg-[#f6f5f5] py-[10px] border-b border-gray-200"
//                                                                                     cursor={
//                                                                                         'pointer'
//                                                                                     }
//                                                                                     onClick={() =>
//                                                                                         setFormRequest(
//                                                                                             {
//                                                                                                 ...formRequest,
//                                                                                                 project:
//                                                                                                     project,
//                                                                                             }
//                                                                                         )
//                                                                                     }
//                                                                                 >
//                                                                                     <Avatar.Root
//                                                                                         size={'sm'}
//                                                                                     >
//                                                                                         <Avatar.Fallback
//                                                                                             name={
//                                                                                                 project.name
//                                                                                             }
//                                                                                         />
//                                                                                         <Avatar.Image
//                                                                                             src={
//                                                                                                 project.logo
//                                                                                             }
//                                                                                         />
//                                                                                     </Avatar.Root>
//                                                                                     <Text className="mb-0 ">
//                                                                                         {
//                                                                                             project.name
//                                                                                         }
//                                                                                     </Text>
//                                                                                 </Stack>
//                                                                             )
//                                                                         )}
//                                                                     </Stack>
//                                                                 )}
//                                                             </div>
//                                                         </>
//                                                     )}
//                                                     <div className='flex flex-col gap-4'>
//                                                         {formRequest.project && (
//                                                             <>
//                                                                 <Stack
//                                                                     spacing={4}
//                                                                     direction={'row'}
//                                                                     align={'center'}
//                                                                     className="flex justify-between w-full px-[3px] py-[3px] rounded-md "
//                                                                 >
//                                                                     <Stack
//                                                                         spacing={4}
//                                                                         direction={'row'}
//                                                                         align={'center'}
//                                                                     >
//                                                                         <Avatar.Root size={'sm'}>
//                                                                             <Avatar.Fallback
//                                                                                 name={
//                                                                                     formRequest
//                                                                                         .project
//                                                                                         .name
//                                                                                 }
//                                                                             />
//                                                                             <Avatar.Image
//                                                                                 src={
//                                                                                     formRequest
//                                                                                         .project
//                                                                                         .logo
//                                                                                 }
//                                                                             />
//                                                                         </Avatar.Root>
//                                                                         <Text className="mb-0">
//                                                                             {
//                                                                                 formRequest.project
//                                                                                     .name
//                                                                             }
//                                                                         </Text>
//                                                                     </Stack>
//                                                                     <CloseButton
//                                                                         className="w-[20px] h-[20px] "
//                                                                         size={'xs'}
//                                                                         onClick={
//                                                                             handleRemoveProject
//                                                                         }
//                                                                     />
//                                                                 </Stack>

//                                                                 <SelectCustom
//                                                                     height="40px"
//                                                                     label="Team Role"
//                                                                     required
//                                                                     collection={
//                                                                         projectTeamRoleFramework
//                                                                     }
//                                                                     // onChange={(e) =>
//                                                                     //     handleChangeFormRequest(e, 'teamRole')
//                                                                     // }
//                                                                     value={formRequest.teamRole}
//                                                                 />
//                                                                 <SelectCustom
//                                                                     height="40px"
//                                                                     label="Role"
//                                                                     required
//                                                                     collection={
//                                                                         projectRoleFramework
//                                                                     }
//                                                                     // onChange={(e) =>
//                                                                     //     handleChangeFormRequest(e, 'role')
//                                                                     // }
//                                                                     value={formRequest.role}
//                                                                 />
//                                                             </>
//                                                         )}
//                                                     </div>
// =======
//                                                             {myProjectsBySearch?.length > 0 && (
//                                                                 <Stack spacing={4}>
//                                                                     {myProjectsBySearch.map((project, idx) => (
//                                                                         <Stack
//                                                                             key={idx}
//                                                                             spacing={4}
//                                                                             direction={'row'}
//                                                                             align={'center'}
//                                                                             cursor={'pointer'}
//                                                                             onClick={() => setProjectSelected(project)}
//                                                                         >
//                                                                             <Avatar.Root size={'md'}>
//                                                                                 <Avatar.Fallback name={project.name} />
//                                                                                 <Avatar.Image src={project.logo} />
//                                                                             </Avatar.Root>
//                                                                             <Text>{project.name}</Text>
//                                                                         </Stack>
//                                                                     ))}
//                                                                 </Stack>
//                                                             )}
//                                                         </>
//                                                     )}
//                                                     {projectSelected && (
//                                                         <>
//                                                             <Stack spacing={4} direction={'row'} align={'center'}>
//                                                                 <Stack spacing={4} direction={'row'} align={'center'}>
//                                                                     <Avatar.Root size={'md'}>
//                                                                         <Avatar.Fallback name={projectSelected.name} />
//                                                                         <Avatar.Image src={projectSelected.logo} />
//                                                                     </Avatar.Root>
//                                                                     <Text>{projectSelected.name}</Text>
//                                                                 </Stack>
//                                                                 <CloseButton onClick={handleRemoveProject} />
//                                                             </Stack>

//                                                             <SelectCustom
//                                                                 height="40px"
//                                                                 label="Team Role"
//                                                                 required
//                                                                 collection={projectTeamRoleFramework}
//                                                                 onChange={(e) => handleChangeFormRequest(e, 'teamRole')}
//                                                                 value={formRequest.teamRole}
//                                                             />
//                                                             <SelectCustom
//                                                                 height="40px"
//                                                                 label="Role"
//                                                                 required
//                                                                 collection={projectRoleFramework}
//                                                                 onChange={(e) => handleChangeFormRequest(e, 'role')}
//                                                                 value={formRequest.role}
//                                                             />
//                                                         </>
//                                                     )}
// >>>>>>> v1
                                                </Stack>
                                                <Blockquote.Root
                                                    colorPalette="yellow"
                                                    style={{
                                                        borderInlineStartWidth: '4px',
                                                        borderInlineStartColor: '#fef08a',
                                                    }}
                                                >
                                                    <Blockquote.Content cite="OpenNezt">
                                                        If you would like to invite someone to this project, please let
                                                        me know what position you would like the person to fill.
                                                    </Blockquote.Content>
                                                    <Blockquote.Caption>
                                                        — <cite>OpenNezt</cite>
                                                    </Blockquote.Caption>
                                                </Blockquote.Root>
                                            </Stack>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger asChild>
                                                <Button variant="outline" className='bg-[#f6f5f5] rounded-md' onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                            </Dialog.ActionTrigger>
                                            <Button
                                                onClick={handleConfirmInvite}
                                                borderRadius={4}
                                                loading={false}
                                                className='bg-[#2f65b9] text-white text-sm rounded-md font-medium'
                                                loadingText="Loading..."
                                                spinnerPlacement="start"
                                            >
                                                INVITE
                                            </Button>
                                        </Dialog.Footer>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton onClick={handleClose} size="sm" />
                                        </Dialog.CloseTrigger>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    </div>
                </div>
                <div className="flex flex-1 flex-col text-[#6f7f92] items-center w-full overflow-hidden">
                    <div
                        className="flex-1 overflow-y-scroll scrollbar-hide bg-[#ffffff] w-full"
                        ref={messagesContainerRef}
                    >
                        <div className="flex justify-center pt-[15px] pb-[1px] w-full">
                            <div className="px-[10px] py-[5px]">
                                <span className="text-xs">Start of conversation</span>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center justify-center w-full">
                            <div className="after:z-20 px-[11px] rounded-md text-xs font-semibold text-[#2f65b9] py-[5px] my-[11px]">
                                {moment(conversation?.createdAt).format('MMMM D, YYYY')}
                            </div>
                            {conversation?.messages?.map((message, idx) => {
                                switch (message?.user?._id) {
                                    case authUser?._id:
                                        return (
                                            <div
                                                className="flex justify-end gap-[10px] px-[15px] w-full flex-row-reverse"
                                                key={idx}
                                            >
                                                {(() => {
                                                    switch (conversation?.messages[idx - 1]?.user._id) {
                                                        case message?.user?._id:
                                                            return (
                                                                <>
                                                                    <div className="w-[35px] h-[35px]" />
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <div className=" group flex flex-row-reverse pl-[10px] mb-[5px] w-full">
                                                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                                                <span className="text-sm font-medium">
                                                                                    <p className="mb-0">
                                                                                        {message?.content}
                                                                                    </p>
                                                                                </span>
                                                                                <span className="ml-[10px] text-xs font-semibold">
                                                                                    <span>
                                                                                        {moment(
                                                                                            message?.timestamp
                                                                                        ).format('HH:mm')}
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                                                <span className="mx-[5px] cursor-pointer">
                                                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                                                </span>
                                                                                <span className="mx-[5px] cursor-pointer">
                                                                                    <IconlyStar
                                                                                        size={15}
                                                                                        color={'#000000'}
                                                                                    />
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        default:
                                                            return (
                                                                <>
                                                                    <div className="w-[35px] h-[35px]">
                                                                        <img
                                                                            src={img_avt}
                                                                            alt=""
                                                                            className="w-[35px] h-[35px] rounded-full "
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <div className="group mb-[5px] flex flex-row-reverse pl-[10px] w-full">
                                                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                                                <span className="text-sm font-medium">
                                                                                    <p className="mb-0">
                                                                                        {message?.content}
                                                                                    </p>
                                                                                </span>
                                                                                <span className="ml-[10px] text-xs font-semibold">
                                                                                    <span>
                                                                                        {moment(
                                                                                            message?.timestamp
                                                                                        ).format('HH:mm')}
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                                                <span className="mx-[5px] cursor-pointer">
                                                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                                                </span>
                                                                                <span className="mx-[5px] cursor-pointer">
                                                                                    <IconlyStar
                                                                                        size={15}
                                                                                        color={'#000000'}
                                                                                    />
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                    }
                                                })()}
                                            </div>
                                        );
                                    default:
                                        return (
                                            <div className="flex gap-[10px] mb-[5px] px-[15px] w-full">
                                                {(() => {
                                                    switch (conversation?.messages[idx - 1]?.user._id) {
                                                        case message?.user?._id:
                                                            return (
                                                                <>
                                                                    <div className="w-[35px] h-[35px]" />
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <div className="w-full pl-0 mb-0">
                                                                            <div className="group flex pr-[10px] mb-[5px] w-full">
                                                                                <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                                                    <span className="text-sm font-medium">
                                                                                        <p className="mb-0">
                                                                                            {message?.content}
                                                                                        </p>
                                                                                    </span>
                                                                                    <span className="ml-[10px] text-xs font-semibold">
                                                                                        <span>
                                                                                            {moment(
                                                                                                message?.timestamp
                                                                                            ).format('HH:mm')}
                                                                                        </span>
                                                                                    </span>
                                                                                </div>
                                                                                <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <IconlyStar
                                                                                            size={15}
                                                                                            color={'#000000'}
                                                                                        />
                                                                                    </span>
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                                                                                    </span>
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        default:
                                                            return (
                                                                <>
                                                                    <div className="w-[35px] h-[35px]">
                                                                        <img
                                                                            src={img_avt}
                                                                            alt=""
                                                                            className="w-[35px] h-[35px] rounded-full "
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <div className="mb-[5px]"></div>
                                                                        <ul className="w-full pl-0 mb-0">
                                                                            <div className="group flex pr-[10px] mb-[5px] w-full">
                                                                                <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                                                    <span className="text-sm font-medium">
                                                                                        <p className="mb-0">
                                                                                            {message?.content}
                                                                                        </p>
                                                                                    </span>
                                                                                    <span className="ml-[10px] text-xs font-semibold">
                                                                                        <span>
                                                                                            {moment(
                                                                                                message?.timestamp
                                                                                            ).format('HH:mm')}
                                                                                        </span>
                                                                                    </span>
                                                                                </div>
                                                                                <span className="ml-[   5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <IconlyStar
                                                                                            size={15}
                                                                                            color={'#000000'}
                                                                                        />
                                                                                    </span>
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                                                                                    </span>
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </ul>
                                                                    </div>
                                                                </>
                                                            );
                                                    }
                                                })()}
                                            </div>
                                        );
                                }
                            })}
                        </div>
                    </div>
                    <div className="flex items-center border-t border-gray-200 w-full bg-[#ffffff]">
                        <div className="flex justify-center items-center w-[50px] h-[40px] my-1">
                            <LinkOutlined className="text-xl w-[30px] h-[30px]" />
                        </div>
                        <div className="py-[12px] w-full">
                            <input
                                onKeyDown={handleKeyDown}
                                value={message}
                                onChange={handleChangeMessage}
                                type="text"
                                placeholder="Write your message"
                                className="w-full outline-none"
                            />
                        </div>
                        <div
                            className="min-w-[40px] mx-[10px] my-1 h-[40px] flex justify-center rounded-md bg-[#2f65b9] items-center cursor-pointer"
                            onClick={handleSendMessage}
                        >
                            <IconlySend size={24} color={'#ffffff'} />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="flex justify-end p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
                    <a href="#" className="flex justify-center items-center w-[50px] h-11">
                        <IconlyStar size={18} color={'#6f7f92'} />
                    </a>
                    <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                        <ArrowsAltOutlined />
                    </span>
                </div>
                <div className="py-[16px] flex-1">
                    <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
                        <p className="mb-0 w-14 h-14">
                            <WechatOutlined className="text-8xl w-14 h-14 " />
                        </p>
                        <p className="mb-0 text-[#6f7f92]">Select a conversation to display messages</p>
                        <p className="mb-0 text-[#6f7f92]">or</p>
                        <p className="mb-0">
                            <Link
                                // to={'/messages/new-conversation'}
                                className="px-[28px] text-sm font-semibold py-[11px] bg-[#2f65b9] rounded-md no-underline text-[#ffffff]"
                            >
                                START A NEW CONVERSATION
                            </Link>
                        </p>
                    </div>
                </div>
            </>
        );
    }
};

export default Conversation;
