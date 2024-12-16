'use client'
import React, { forwardRef } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    id: string,
    errorMessage: string | null,
    label: string,
    placeholder?: string
};

const Input = forwardRef<HTMLInputElement, InputProps>(({
    id,
    errorMessage,
    label,
    placeholder,
    ...rest
}, ref) => {
    return (
        <div
            className='flex flex-col gap-2'
        >
            <label
                htmlFor={id}
                className='text-base'
            >
                {label}
            </label>
            <input
                ref={ref}
                id={id}
                placeholder={placeholder}
                {...rest}
                className='h-10 rounded-lg border border-greyLight invalid:border-error-100 px-2'
            />
            {errorMessage &&
                <div
                    className='pl-3 text-error-100 text-xs'
                >
                    {errorMessage}
                </div>
            }
        </div>
    );
});

export default Input;
