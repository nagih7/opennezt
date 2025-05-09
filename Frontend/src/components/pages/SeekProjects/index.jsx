import React, { useState } from 'react';
import AccessLog from './components/AccessLog';
import FilterHeader from './components/FilterHeader';
import ListProjects from './components/ListProjects';

const SeekProjects = () => {
    // ========== STATE  ========== //
    const [action, setAction] = useState('grid');

    return (
        <div className="pt-[35px] w-full px-[16px] flex gap-8 ">
            <div className="bg-gray-100 w-10/12 relative">
                <FilterHeader action={action} setAction={setAction} />
                <ListProjects action={action} />
            </div>
            <AccessLog />
        </div>
    );
};

export default SeekProjects;
