'use client'
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = [
    // {
    //     label: <Link href={"/login"}>Login</Link>,
    //     key: 'login',
    //     icon: <MailOutlined />,
    // },
    {
        label: <Link href={"/"}>Home Page</Link>,
        key: 'homepage',
        icon: <MailOutlined />,
    },
    {
        label: <Link href={"/users"}>Manage Users</Link>,
        key: 'users',
        icon: <MailOutlined />,
    },
    {
        label: <Link href={"/blogs"}>Manage Blogs</Link>,
        key: 'blogs',
        icon: <AppstoreOutlined />,

    },

];

const Aside: React.FC = () => {
    const [current, setCurrent] = useState('login');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]}  mode="inline" items={items} />;
};

export default Aside;