import { Avatar } from '@mui/material';
import React from 'react';

const AvatarAndName = () => {

    const pseudo = localStorage.getItem("pseudo");

    return (
        <div className='user'>
            <Avatar size={200}/>
            <span className='pseudo'>{pseudo}</span>
        </div>
    );
};

export default AvatarAndName;