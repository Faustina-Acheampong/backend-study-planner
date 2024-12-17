import React from 'react';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
    type: 'fill' | 'outline',
    fullWidth?: Boolean,
    label: string
};

const Button = <C extends React.ElementType = "button">({
    type = 'fill',
    fullWidth = false,
    label,
    ...rest
}: ButtonProps) => {
    return (
        <button
            className={[
                'h-10 px-4 py-2 flex items-center justify-center text-sm font-bold rounded-lg',
                fullWidth ? 'w-full' : 'min-w-11',
                type === 'fill' ? 'bg-primary-100 text-white' : 'border border-primary-100 text-primary-100'
            ].join(' ')}
            {...rest}
        >
            {label}
        </button>
    );
};

export default Button;
