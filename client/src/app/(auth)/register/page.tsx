'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from "@/components/auth/Input";
import { RegisterRequestProps } from '@/types/user';
import Button from '@/components/shared/Button';
import { useAppDispatch } from '@/store/hooks';
import { registerUser } from '@/store/user/userSlice';

export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<RegisterRequestProps>({
        username: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await dispatch(registerUser(formData));
            setFormData({
                username: "",
                email: "",
                password: ""
            });

            prompt('Account Successfully Created! Login to continue');
            router.push('/login');
        } catch (error) {
            console.log('wrong credentials');
        }
    };

    return (
        <div
            className="container"
        >
            <h2
                className="font-semibold text-3xl text-center py-14"
            >
                Create Account
            </h2>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-5 pb-2'
            >
                <Input
                    id="username"
                    label="Username"
                    errorMessage={usernameErrorMessage}
                    onChange={({ target }) => setFormData({ ...formData, username: target.value })}
                />
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
                    label='Register'
                    type='fill'
                    fullWidth={true}
                />
            </form>
            <Button
                label="Have an account? Login"
                type='outline'
                fullWidth={true}
                onClick={() => { router.push('/login') }}
            />
        </div>
    );
};
