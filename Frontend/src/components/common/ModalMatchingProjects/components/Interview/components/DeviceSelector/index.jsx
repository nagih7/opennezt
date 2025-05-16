import React, { useState, useEffect, useRef } from 'react'
import { IconlyArrowDown2 } from 'components/UI/Iconly'

const DeviceSelector = ({ icon, selectedDevice, devices, onSelect, deviceType }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const [position, setPosition] = useState('bottom') // Default position

    // Determine dropdown width based on device type
    const getDropdownWidth = () => {
        switch (deviceType) {
            case 'audio-output':
                return 'w-[500px]'
            case 'audio-input':
            case 'video':
            default:
                return 'w-[300px]'
        }
    }

    // Calculate dropdown position
    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const dropdownHeight = 150 // Approximate height of dropdown

            // If there's not enough space below, show the dropdown above
            if (spaceBelow < dropdownHeight) {
                setPosition('top')
            } else {
                setPosition('bottom')
            }
        }
    }, [isOpen])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [])

    // Handle keyboard navigation and accessibility
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        } else if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen)
            e.preventDefault()
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex items-center gap-2 p-2 transition-colors rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                tabIndex="0"
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={`Select ${deviceType} device`}
            >
                {icon}
                <span className="truncate w-36 2xl:w-[200px]">{selectedDevice?.label || 'No device selected'}</span>
                <IconlyArrowDown2
                    size={20}
                    color={'#000000'}
                    className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {isOpen && (
                <div
                    className={`
                        ${getDropdownWidth()} max-h-[150px] overflow-y-auto absolute z-20
                        bg-white shadow-lg rounded-md py-1 border
                        ${position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}
                        left-0
                    `}
                    role="listbox"
                >
                    {devices.map((device) => (
                        <div
                            key={device.deviceId}
                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                                selectedDevice?.deviceId === device.deviceId ? 'bg-blue-50 font-medium' : ''
                            }`}
                            onClick={() => {
                                onSelect(device)
                                setIsOpen(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    onSelect(device)
                                    setIsOpen(false)
                                    e.preventDefault()
                                }
                            }}
                            tabIndex="0"
                            role="option"
                            aria-selected={selectedDevice?.deviceId === device.deviceId}
                        >
                            {device.label || `Device (${device.deviceId.slice(0, 5)}...)`}
                        </div>
                    ))}
                    {devices.length === 0 && <div className="px-4 py-2 text-gray-500">No devices found</div>}
                </div>
            )}
        </div>
    )
}

export default DeviceSelector
