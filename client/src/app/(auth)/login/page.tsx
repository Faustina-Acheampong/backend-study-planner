'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from "@/components/auth/Input";
import { LoginRequestProps } from '@/types/user';
import Button from '@/components/shared/Button';
import { useAppDispatch } from '@/store/hooks';
import { setTokens } from '@/store/user/userSlice';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<LoginRequestProps>({
        email: "",
        password: ""
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await dispatch(setTokens(formData));
            setFormData({
                email: "",
                password: ""
            });

            router.push('/');
        } catch (error) {
            console.log('wrong credentials');
        }
    }

    return (
        <div
            className="container"
        >
            <h2
                className="font-semibold text-3xl text-center py-14"
            >
                Welcome Back!
            </h2>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-5 pb-2'
            >
                <Input
                    id="email"
                    label="Email"
                    errorMessage={emailErrorMessage}
                    onChange={({ target }) => setFormData({ ...formData, email: target.value })}
                />
                <Input
                    id="password"
                    label="Password"
                    errorMessage={passwordErrorMessage}
                    onChange={({ target }) => setFormData({ ...formData, password: target.value })}
                />
                <Button
                    label='Login'
                    type='fill'
                    fullWidth={true}
                />
            </form>
            <Button
                label="Don’t have an account? Register"
                type='outline'
                fullWidth={true}
                onClick={() => { router.push('/register') }}
            />
        </div>
    );
};
