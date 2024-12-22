'use client'
import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import Reminders from './Reminders';
import User from './User';
import Button from '../shared/Button';
import { useAppDispatch } from '@/store/hooks';
import { useSelectors } from '@/store/hooks';
import { clearTokens } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';

const Nav = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { refreshToken } = useSelectors();

    const handleClick = async () => {
        if (refreshToken) {
            try {
                await dispatch(clearTokens(refreshToken));
                router.push('/login');
            } catch (error) {
                console.log('failed to logout');
            }
        };
    };

    return (
        <div
            className='container flex justify-between items-center'
        >
            <Breadcrumbs />
            <div
                className='flex gap-2 items-center'
            >
                <Reminders />
                <User />
                <Button
                    type='danger'
                    label="logout"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

export default Nav;
