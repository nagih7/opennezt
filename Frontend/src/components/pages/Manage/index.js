import React, { useEffect, useState } from 'react';
import { IconlyActivity, IconlyChart, IconlyUser, IconlyWallet } from 'components/UI/Iconly';
import { useSelector } from 'react-redux';
import { getTotalUsers } from 'api/manage';
import store from 'states/configureStore';
import { useNavigate } from 'react-router-dom';

function Manage() {
    const navigate = useNavigate();
    const [totalUsersView, setTotalUsers] = useState(0);
    const totalUsers = useSelector((state) => state.manage.totalUsers);

    useEffect(() => {
        store.dispatch(getTotalUsers());
    }, []);

    useEffect(() => {
        if (totalUsers !== 0) {
            setTotalUsers(totalUsers);
        }
    }, [totalUsers]);

    return (
        <div className="px-[16px] py-8 flex flex-col gap-8">
            <div className="flex justify-around gap-8 mb-8">
                <div className="bg-[#ffffff] p-8 rounded-md flex items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <span>Total Users</span>
                        {totalUsersView}
                        <span>last week</span>
                    </div>
                    <IconlyUser color={'#000000'} size={70} />
                </div>
                <div className="bg-[#ffffff] p-8 rounded-md flex items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <span>Total Users</span>
                        44,278
                        <span>last year</span>
                    </div>
                    <IconlyActivity color={'#000000'} size={70} />
                </div>
                <div className="bg-[#ffffff] p-8 rounded-md flex items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <span>Total Users</span>
                        44,278
                        <span>last 9 days</span>
                    </div>
                    <IconlyChart color={'#000000'} size={70} />
                </div>
                <div className="bg-[#ffffff] p-8 rounded-md flex items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <span>Total Money</span>
                        44,278
                        <span>last 6 days</span>
                    </div>
                    <IconlyWallet color={'#000000'} size={70} />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="cursor-pointer" onClick={() => navigate('users')}>
                    User Manage
                </div>
                <div className="border-b-[1px] my-2" />
                <div className="cursor-pointer" onClick={() => navigate('roles')}>
                    Role Manage
                </div>
                <div className="border-b-[1px] my-2" />
                <div className="cursor-pointer" onClick={() => navigate('types')}>
                    Type Manage
                </div>
                <div className="border-b-[1px] my-2" />
                <div className="cursor-pointer" onClick={() => navigate('industries')}>
                    Industry Manage
                </div>
                <div className="border-b-[1px] my-2" />
                <div className="cursor-pointer" onClick={() => navigate('experience-levels')}>
                    Experience Level Manage
                </div>
                <div className="border-b-[1px] my-2" />
                <div className="cursor-pointer" onClick={() => navigate('categories')}>
                    Category Manage
                </div>
                <div className="border-b-[1px] my-2" />
                <div className="cursor-pointer" onClick={() => navigate('skills')}>
                    Skill Manage
                </div>
                <div className="border-b-[1px] my-2" />
                <div className="cursor-pointer" onClick={() => navigate('organizations')}>
                    Organization Manage
                </div>
            </div>
        </div>
    );
}

export default Manage;
