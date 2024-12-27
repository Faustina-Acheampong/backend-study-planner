'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { AlertCircle, Loader2 } from 'lucide-react';
import { deleteCourse } from '@/store/course/courseSlice';

interface CourseDeleteModalProps {
    courseId: string;
    courseName: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function CourseDeleteModal({ 
    courseId, 
    courseName, 
    isOpen, 
    onClose 
}: CourseDeleteModalProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(onClose, 200); // Match the transition duration
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await dispatch(deleteCourse(courseId)).unwrap();
            router.refresh();
            router.push('/courses');
            handleClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete course');
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="relative z-10">
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    isAnimating ? 'bg-opacity-25' : 'bg-opacity-0'
                }`}
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    {/* Modal Content */}
                    <div 
                        className={`w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ${
                            isAnimating 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-95'
                        }`}
                    >
                        {/* Title */}
                        <h3 className="text-xl font-semibold mb-2">
                            Delete Course
                        </h3>
                        
                        {/* Message */}
                        <div className="mt-2 text-gray-600">
                            Are you sure you want to delete <span className="font-medium text-gray-900">{courseName}</span>? 
                            This action cannot be undone.
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 p-4 text-red-600 bg-red-50 rounded-lg flex gap-2 items-start">
                                <AlertCircle className="h-5 w-5" />
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isDeleting}
                                className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete Course'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}