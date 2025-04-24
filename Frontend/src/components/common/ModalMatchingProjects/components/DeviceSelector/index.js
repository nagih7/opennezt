import React, { useState, useEffect, useRef } from 'react'
import { IconlyArrowDown2 } from 'components/UI/Iconly'

const DeviceSelector = ({ icon, selectedDevice, devices, onSelect, deviceType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Determine dropdown width based on device type
    const getDropdownWidth = () => {
        switch(deviceType) {
            case 'audio-output':
                return 'w-[500px]';
            case 'audio-input':
            case 'video':
            default:
                return 'w-[300px]';
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div 
                className="flex items-center gap-2 cursor-pointer py-1 px-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {icon}
                <span className='truncate w-36 2xl:w-[200px]'>{selectedDevice?.label || 'No device selected'}</span>
                <IconlyArrowDown2 size={20} color={'#000000'} />
            </div>
            
            {isOpen && (
                <div className={`2xl:max-h-[150px] 2xl:overflow-x-scroll absolute z-10 bottom-[40px] -mb-1 2xl:bottom-auto 2xl:mt-1 ${getDropdownWidth()} bg-white shadow-lg rounded-md py-1 border`}>
                    {devices.map((device) => (
                        <div 
                            key={device.deviceId}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onSelect(device);
                                setIsOpen(false);
                            }}
                        >
                            {device.label || `Device (${device.deviceId.slice(0, 5)}...)`}
                        </div>
                    ))}
                    {devices.length === 0 && (
                        <div className="px-4 py-2 text-gray-500">No devices found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DeviceSelector;