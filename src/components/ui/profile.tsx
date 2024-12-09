'use client'
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const Profile: React.FC = () => {
    return <Avatar size={64} icon={<UserOutlined />} />;
};

export default Profile;