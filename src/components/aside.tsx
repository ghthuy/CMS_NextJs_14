"use client";
import React, { useState } from "react";
import {
    UserOutlined,
} from "@ant-design/icons";
import { Icon } from '@iconify/react';
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import Profile from "@/components/ui/profile";
import authApiRequest from '@/apiRequests/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from "@/app/app-provider";

import '@/styles/components/Aside.scss';

const items: MenuProps["items"] = [
    {
        label: <Link href={"/overview"}>Tổng quan</Link>,
        key: "overview",
        icon: <Icon icon="ic:round-dashboard" width="21px" />,
    },
    {
        label: <Link href={"/doctors"}>Bác sĩ</Link>,
        key: "doctor",
        icon: <Icon icon="fluent:doctor-24-regular" width="21px" />,
    },
    {
        label: <Link href={"/videos"}>Videos</Link>,
        key: "video",
        icon: <Icon icon="ic:outline-video-library" width="21px" />,
    },
    {
        label: <Link href={"/asset"}>Tài sản</Link>,
        key: "asset",
        icon: <Icon icon="tabler:pig-money" width="21px" />,
    },
    {
        label: <Link href={"/asset_label"}>Nhãn tài sản</Link>,
        key: "asset_label",
        icon: <Icon icon="ic:outline-folder" width="21px" />,
    },
    {
        label: <Link href={"/problem"}>Vấn đề</Link>,
        key: "problem",
        icon: <Icon icon="ph:warning-bold" width="21px" />,
    },
    {
        label: <Link href={"/channel"}>Kênh</Link>,
        key: "channel",
        icon: <Icon icon="gg:profile" width="21px" />,
    },
    {
        label: <Link href={"/policy"}>Chính sách</Link>,
        key: "policy",
        icon: <Icon icon="mingcute:paper-line" width="21px" />,
    },
    {
        label: <Link href={"/analytics"}>Số liệu phân tích</Link>,
        key: "analytics",
        icon: <Icon icon="majesticons:analytics-line" width="21px" />,
    },
    {
        label: <Link href={"/campaign"}>Chiến dịch</Link>,
        key: "campaign",
        icon: <Icon icon="material-symbols:campaign-outline" width="21px" />,
    },
    {
        label: <Link href={"/allow_list"}>Danh sách cho phép</Link>,
        key: "allow_list",
        icon: <Icon icon="mdi:award" width="21px" />,
    },
    {
        label: <Link href={"/report"}>Báo cáo</Link>,
        key: "report",
        icon: <Icon icon="mdi:text-box-outline" width="21px" />,
    },
    {
        label: <Link href={"/update_content"}>Cập nhật nội dung</Link>,
        key: "update_content",
        icon: <Icon icon="teenyicons:box-outline" width="21px" />,
    },
    {
        label: <Link href={"/setting"}>Cài đặt</Link>,
        key: "setting",
        icon: <Icon icon="ri-settings-3-line" width="21px" />,
    },
    {
        label: <Link href={"/feedback"}>Send feedback</Link>,
        key: "feedback",
        icon: <Icon icon="ri-feedback-line" width="21px" />,
    },
    {
        label: "Đăng xuất",
        key: "logout",
        icon: <Icon icon="ri-logout-box-r-line" width="21px" />,
    },
];

const Aside: React.FC = () => {
    const [current, setCurrent] = useState("overview");
    const router = useRouter()
    const pathname = usePathname()
    const { setUser } = useAppContext()

    const logout = async () => {
        // Your logout logic here
        try {
            console.log("Logging out...");
            await authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
                router.push(`/login`)
            })
        } catch (error) {
            console.log("Error logging out...", error);
            // handleErrorApi({error})
            authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
                router.push(`/login?redirectFrom=${pathname}`)
            })
        } finally {
            setUser(null)
            router.refresh()
            localStorage.removeItem('sessionToken')
            localStorage.removeItem('sessionTokenExpiresAt')
        }
    };

    const onClick: MenuProps["onClick"] = (e) => {
        if (e.key === "logout") {
            logout();
        } else {
            setCurrent(e.key);
        }
    };

    return (
        <section id="aside">
            <Profile
                title="Người quản lý nội dung"
                description="Bệnh viện Bạch Mai"
                avatarProps={{
                    size: 70,
                    icon: <UserOutlined />,
                }}
            />
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="inline"
                items={items}
            />
        </section>
    );
};

export default Aside;
