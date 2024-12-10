'use client'
import { useParams } from 'next/navigation';

export default function NotePage() {
    const params = useParams<{ id: string }>();
    const id = params.id;

    return (
        <div
            className="container"
        >
            Single Note Page
            {/* page with all details about one note */}
            {/* fetch data by id from url */}
        </div>
    );
};
