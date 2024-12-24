'use client';
import React from 'react';
import { Avatar } from 'antd';
import '@/styles/components/Profile.scss';

interface ProfileProps {
    title: string;
    description: string;
    avatarProps: React.ComponentProps<typeof Avatar>; // Props for Avatar component
    type: string;
}

const Profile: React.FC<ProfileProps> = ({ title, description, avatarProps, type = "vertical" }) => {
    return (
        <div className={`profile-wrapper ${type}`}>
            <Avatar {...avatarProps} />
            <h3>{title}</h3>
            {type == "vertical" ? <p>{description}</p> : <></>}
        </div>
    );
};

export default Profile;
