import React from "react";
import logo from "assets/images/logo/OpenNezt_icon_black.png";

function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-[#ffffff] px-[16px] py-[80px] ">
        <div className="flex gap-4 w-full mx-[-16px]">
          <div className="w-4/12">
            <img src={logo} />
          </div>
          <div className="w-2/12">
            <div>
              <h5>
                <span>COMPANY</span>
              </h5>
              <div>
                <ul className="mb-0 pl-0">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Blog Detail</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-2/12">
            <div>
              <h5>
                <span>COMMUNITY</span>
              </h5>
              <div>
                <ul className="mb-0 pl-0">
                  <li>
                    <a href="#">Activity</a>
                  </li>
                  <li>
                    <a href="#">Timeline</a>
                  </li>
                  <li>
                    <a href="#">Forums</a>
                  </li>
                  <li>
                    <a href="#">Friends</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-2/12">
            <div>
              <h5>
                <span>HELP</span>
              </h5>
              <div>
                <ul className="mb-0 pl-0">
                  <li>
                    <a href="#">Frequently Asked Questions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms & Condition</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-2/12">
            <div>
              <h5>
                <span>FOLLOW US</span>
              </h5>
              <div>
                <ul className="mb-0 pl-0">
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li>
                    <a href="#">Dribbble</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
