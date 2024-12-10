import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Button, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { getPendingProjects, updateRequestStatus } from "api/project";

function NotificationProject() {
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.authUser);
    const pendingRequests = useSelector((state) => state.project.pendingProjects);
    const loading = useSelector((state) => state.project.loadingPendingProjects);

    const fetchPendingRequests = useCallback(async () => {
        try {
            await dispatch(getPendingProjects({
                email: authUser.email
            }));
        } catch (error) {
            message.error('Failed to fetch pending requests');
        }
    }, [dispatch, authUser.email]);

    useEffect(() => {
        fetchPendingRequests();
    }, [fetchPendingRequests]);

    const handleUpdateStatus = async (record, status) => {
        try {
            await dispatch(updateRequestStatus({
                request_id: record.project_id,
                status: status  
            }));
            message.success(`Request ${status} successfully`);
            fetchPendingRequests();
        } catch (error) {
            message.error('Failed to update request status');
        }
    };
    const columns = [
        {
            title: "Project Name",
            dataIndex: "project_name",
            key: "project_name",
        },
        {
            title: 'Sender Email',
            dataIndex: 'sender_email',
            key: 'sender_email',
        },
        {
            title: 'Role',
            dataIndex: 'role_project',
            key: 'role_project',
            render: (role) => (
                <Tag color="blue">{role.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'pending' ? 'gold' : 'green'}>
                    {status.toUpperCase()}
                </Tag>
            ),
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
                </div>
            ),
        }
    ];

    return (
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
    );
}

export default NotificationProject;