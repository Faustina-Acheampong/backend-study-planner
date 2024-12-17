'use client'
import React from "react";
import { usePathname } from "next/navigation";
import { StoreProvider } from "./StoreProvider";
import Menu from "@/components/menu/Menu";
import Nav from "@/components/nav/Nav";


const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const noNavPaths = ['/login/', '/register/'];
    const showNav = !noNavPaths.includes(pathname);

    return (
        <StoreProvider>
            <div
                className={showNav ? "grid grid-cols-1 md:grid-cols-8 xl:grid-cols-12 w-full gap-6 p-6" : "w-full flex justify-center items-center bg-primary-60 min-h-dvh h-full"}
            >
                {showNav &&
                    <div
                        className="col-span-1 md:col-span-3 xl:col-span-2"
                    >
                        <Menu />
                    </div>
                }
                <div
                    className="col-span-1 md:col-span-5 xl:col-span-10"
                >
                    {showNav && <Nav />}
                    <div
                        className={showNav ? "w-full flex flex-col gap-6 py-6" : "min-w-[320px] md:w-[440px]"}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </StoreProvider>
    );
};

export default ClientLayout;
