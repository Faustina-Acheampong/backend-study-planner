'use client'
import { useParams } from 'next/navigation';

export default function AssignmentPage() {
    const params = useParams<{ id: string }>();
    const id = params.id;

    return (
        <div
            className="container"
        >
            Single Assignment Page
            {/* page with all details about one assignment */}
            {/* fetch data by id from url */}
        </div>
    );
};
