import React from 'react';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
    type: 'fill' | 'outline' | 'danger',
    fullWidth?: Boolean,
    label: string
};

const Button = <C extends React.ElementType = "button">({
    type = 'fill',
    fullWidth = false,
    label,
    ...rest
}: ButtonProps) => {

    const colorStyle = type === 'fill' ? 'bg-primary-100 text-white' :
        type === 'outline' ? 'border border-primary-100 text-primary-100' :
            'bg-error-100 text-white';

    return (
        <button
            className={[
                'h-10 px-4 py-2 flex items-center justify-center text-sm font-bold rounded-lg hover:opacity-90',
                fullWidth ? 'w-full' : 'min-w-11',
                colorStyle
            ].join(' ')}
            {...rest}
        >
            {label}
        </button>
    );
};

export default Button;
