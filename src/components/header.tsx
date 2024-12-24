"use client";
import React from "react";
import Profile from "@/components/ui/profile";
import Search from "@/components/ui/search";
import { UserOutlined } from "@ant-design/icons";
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <header>
            
            <div className="logo-box">
                <i className="ri-menu-line icon-custom"></i>
                <div className="text">
                    <Image
                        src={"/images/logo.svg"}
                        alt="Picture of the author"
                        width={32}
                        height={32}
                    />
                    <span>Studio</span>
                </div>
            </div>
            <div className="search-box">
                <Search />
            </div>
            <div className="profile-box">
                <i className="ri-message-2-line icon-custom"></i>
                <i className="ri-question-line icon-custom"></i>
                <Profile
                    title="Bệnh viện Bạch Mai"
                    avatarProps={{
                        size: 24,
                        icon: <UserOutlined />,
                    }}
                    type="horizontal"
                />
            </div>
        </header>
    );
};

export default Header;
