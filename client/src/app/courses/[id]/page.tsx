'use client'
import { useParams } from 'next/navigation';

export default function CoursePage() {
    const params = useParams<{ id: string }>();
    const id = params.id;

    return (
        <div
            className="container"
        >
            Single Course Page
            {/* page with all details about one course */}
            {/* fetch data by id from url */}
        </div>
    );
};
