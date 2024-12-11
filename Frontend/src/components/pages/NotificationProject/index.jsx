import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Button, message, Modal } from "antd"; 
import { CheckOutlined, CloseOutlined,StopOutlined  } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { getPendingProjects, updateRequestStatus, getProjectDetails } from "api/project";
import {getIdByEmail} from "api/profile";
import moment from "moment";
const TalentProfile = React.lazy(() =>
	import("components/common/TalentProfile")
);
import { getTalentDetails } from "api/talent";

const ProjectDetails = React.lazy(() => import("../../common/ProjectDetails"));

function NotificationProject() {
    const [openModalTalentDetails, setOpenModalTalentDetails] = useState(false);
    const [talentDetails, setTalentDetails] = useState(null);

    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.authUser);
    const pendingRequests = useSelector((state) => state.project.pendingProjects);
    const loading = useSelector((state) => state.project.loadingPendingProjects);
    const projectDetails = useSelector((state) => state.project.projectDetails);
    
    const [openModalProjectDetails, setOpenModalProjectDetails] = useState(false);

    const fetchPendingRequests = useCallback(async () => {
        try {
            await dispatch(getPendingProjects({ email: authUser.email }));
        } catch (error) {
            message.error('Failed to fetch pending requests');
        }
    }, [dispatch, authUser.email]);
   

    useEffect(() => {
        fetchPendingRequests();
        
    }, [fetchPendingRequests]);

    const handleOpenModalDetails = async (project_id) => {
        try {
            await dispatch(getProjectDetails(project_id));
            setOpenModalProjectDetails(true);
        } catch (error) {
            message.error('Failed to fetch project details');
        }
    };

    const handleUpdateStatus = async (record, status) => {
        try {
            await dispatch(updateRequestStatus({
                request_id: record.project_id,
                status
            }));
            message.success(`Request ${status} successfully`);
            fetchPendingRequests();
        } catch (error) {
            message.error('Failed to update request status');
        }
    };
    const handleOpenTalentDetails = async (email) => {
        try {
            const response = await dispatch(getIdByEmail(email));
    
            if (response.data.data.success && response.data.data.data) {
                const userId = response.data.data.data;
    
                const talentResponse = await dispatch(getTalentDetails(userId));
    
                if (talentResponse?.data.data) {
                    setTalentDetails(talentResponse.data.data);
                    setOpenModalTalentDetails(true);
                } else {
                    message.error('Failed to fetch talent details');
                }
            } else {
                message.error('Failed to get user ID');
            }
        } catch (error) {
            console.error("Error:", error);
            message.error('Failed to fetch talent details');
        }
    };
    const columns = [
        {
            title: "Project Name",
            dataIndex: "project_name",
            key: "project_name",
            render: (text, record) => (
                <Button 
                    type="link"
                    onClick={() => handleOpenModalDetails(record.project_id)}
                    style={{ padding: 0, height: 'auto' }}
                >
                    {text}
                </Button>
            )
        },
        {
            title: 'Sender Email',
            dataIndex: 'sender_email', 
            key: 'sender_email',
            render: (email) => (
                <Button
                    type="link"
                    onClick={() => handleOpenTalentDetails(email)}
                    style={{ padding: 0, height: 'auto' }}
                >
                    {email}
                </Button>
            )
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => <Tag color="blue">{role.toUpperCase()}</Tag>,
        },
        {
            title: 'Requested At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).fromNow()
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color;
                switch (status) {
                    case 'pending':
                        color = 'gold';
                        break;
                    case 'accepted':
                        color = 'green';
                        break;
                    case 'rejected':
                        color = 'red';
                        break;
                        case 'blocked':
                        color = 'red';
                        break;
                    default:
                        color = 'gray';
                }
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className={styles.actionButtons}>
                    <Button 
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={() => handleUpdateStatus(record, 'accepted')}
                        disabled={record.status !== 'pending'}
                    >
                        Accept
                    </Button>
                    <Button 
                        type="default" 
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleUpdateStatus(record, 'rejected')}    
                        disabled={record.status !== 'pending'}
                    >
                        Reject
                    </Button>
                    <Button 
                        type="default" 
                        danger
                        icon={<StopOutlined />}
                        onClick={() => handleUpdateStatus(record, 'blocked')}    
                        disabled={record.status !== 'pending'}
                    >
                        Block
                    </Button>
                </div>
            ),
        }
    ];

    return (
        <>
            <div className={styles.notificationContainer}>
                <h2>Project Requests</h2>
                <Table 
                    columns={columns}
                    dataSource={pendingRequests}
                    loading={loading}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                />
            </div>
            <Modal
                title=""
                open={openModalProjectDetails}
                onCancel={() => setOpenModalProjectDetails(false)}
                width={1280}
            >
                <React.Suspense fallback={<div>Loading...</div>}>
                    <ProjectDetails projectDetails={projectDetails} />
                </React.Suspense>
            </Modal>
            <Modal
                title=""
                open={openModalTalentDetails}
                onCancel={() => setOpenModalTalentDetails(false)} 
                width={1000}
            >
                <React.Suspense fallback={<div>Loading...</div>}>
                    <TalentProfile talent={talentDetails} />
                </React.Suspense>
            </Modal>
        </>
    );
}

export default NotificationProject;