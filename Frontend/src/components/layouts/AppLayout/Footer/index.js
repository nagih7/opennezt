import React from 'react';
import logo from 'assets/images/logo/opennezt_full_black.png';

function Footer() {
    return (
        <footer className="w-full pt-8">
            <div className="bg-[#ffffff] px-[16px] py-[80px] ">
                <div className="flex gap-8 w-full">
                    <div className="w-4/12">
                        <img src={logo} className="pb-8" />
                        <div>
                            <div>
                                <p className="text-[#6f7f92]">Download app from</p>
                                <div className="flex items-center gap-3">
                                    <a href="#" className="w-[150px]">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" />
                                    </a>
                                    <a href="#" className="w-[150px]">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Google_Play_Store_badge_FR.svg/1280px-Google_Play_Store_badge_FR.svg.png" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/12">
                        <div>
                            <h5 className="mb-[14px]">
                                <span className="text-sm font-semibold">COMPANY</span>
                            </h5>
                            <div>
                                <ul className="flex flex-col gap-3 mb-0 pl-0">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Blog Detail
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/12">
                        <div>
                            <h5>
                                <span className="text-sm font-semibold">COMMUNITY</span>
                            </h5>
                            <div>
                                <ul className="flex flex-col gap-3 mb-0 pl-0">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Activity
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Timeline
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Forums
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Friends
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/12">
                        <div>
                            <h5>
                                <span className="text-sm font-semibold">HELP</span>
                            </h5>
                            <div>
                                <ul className="flex flex-col gap-3 mb-0 pl-0">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Frequently Asked Questions
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Terms & Condition
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/12">
                        <div>
                            <h5>
                                <span className="text-sm font-semibold">FOLLOW US</span>
                            </h5>
                            <div>
                                <ul className="flex flex-col gap-3 mb-0 pl-0">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-[#6f7f92] py-[10px] no-underline"
                                        >
                                            Dribbble
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#ffffff] border-t-[1px] border-[#e0e0e0]">
                <div className="px-8">
                    <div className="flex justify-center py-[16px]">
                        <span className="font-medium">© 2025 OpenNezt. All Rights Reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
