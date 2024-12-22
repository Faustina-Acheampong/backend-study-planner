'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
    const pathname = usePathname();
    console.log(pathname);
    const [pathnameArray, setPathnameArray] = useState<string[]>([]);

    function splitPathToArray(path: string): string[] {
        return path.replace(/^\/|\/$/g, '').split('/');
    }

    useEffect(() => {
        setPathnameArray(splitPathToArray(pathname));
    }, [pathname]);

    return (
        <div
            className='flex gap-1'
        >
            <Link
                href="/"
                className="capitalize font-bold hover:font-extrabold text-black"
            >
                Study Planner
            </Link>
            {pathnameArray.map((segment, index) => (
                <React.Fragment key={index}>
                    <p>/</p>
                    {index === pathnameArray.length - 1 ? (
                        <span className="capitalize text-greyDark">{segment}</span>
                    ) : (
                        <Link
                            href={`/${pathnameArray.slice(0, index + 1).join('/')}`}
                            className="capitalize hover:font-medium"
                        >
                            {segment}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumbs;
