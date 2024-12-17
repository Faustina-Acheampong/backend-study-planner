import React from 'react';
import { useSelectors } from '@/store/hooks';

const User = () => {
    const { user } = useSelectors();

    if (user) {
        return (
            <div
                className='flex flex-col px-6 gap-1'
            >
                <p
                    className='font-semibold text-md text-black'
                >
                    {user.username}
                </p>
                <p
                    className='text-md text-black font-thin'
                >
                    ID: {user.id.slice(0, 6)}
                </p>
            </div>
        );
    }
};

export default User;
