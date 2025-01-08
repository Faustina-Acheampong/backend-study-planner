'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { AlertCircle, Loader2, Plus } from 'lucide-react';
import { createCourse } from '@/store/course/courseSlice';
import { Days, Status } from '@/types/course';
import { CreateCourseFormData } from '@/types/form';

interface CreateCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const days: Days[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const statuses: Status[] = ['Ongoing', 'Upcoming', 'Completed'];

export default function CreateCourseModal({ isOpen, onClose }: CreateCourseModalProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [formData, setFormData] = useState<CreateCourseFormData>({
        course_name: '',
        course_day: 'Monday' as Days,
        course_code: '',
        course_instructor: '',
        course_semester: '',
        course_location: '',
        course_description: '',
        course_time: {
            start: '',
            end: ''
        },
        course_status: 'Ongoing' as Status,
        user_id: '' // Replace with authenticated user ID
    });

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
            setFormData({
                course_name: '',
                course_day: 'Monday',
                course_code: '',
                course_instructor: '',
                course_semester: '',
                course_location: '',
                course_description: '',
                course_time: {
                    start: '',
                    end: ''
                },
                course_status: 'Ongoing',
                user_id: ''
            });
            setError(null);
        }, 200);
    };

    const validateForm = () => {
        if (!/^[A-Z]{2}[0-9]{4}$/.test(formData.course_code)) {
            setError('Course code must be in the format: AB1234');
            return false;
        }
    
        if (formData.course_semester && 
            !/^(Autumn|Winter|Spring|Summer)-([1-9]|10)$/.test(formData.course_semester)) {
            setError('Semester must be in the format: Autumn-1');
            return false;
        }

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(formData.course_time.start) || 
            !timeRegex.test(formData.course_time.end)) {
            setError('Time must be in 24-hour format (HH:MM)');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
     
        try {
            await dispatch(createCourse(formData)).unwrap();
            router.refresh();
            handleClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create course');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('course_time.')) {
            const timeField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                course_time: {
                    ...prev.course_time,
                    [timeField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
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
                <div className="flex min-h-full items-center justify-center p-4">
                    {/* Modal Content */}
                    <div 
                        className={`w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ${
                            isAnimating 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-95'
                        }`}
                    >
                        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>

                        {error && (
                            <div className="mb-4 p-4 text-red-600 bg-red-50 rounded-lg flex gap-2 items-start">
                                <AlertCircle className="h-5 w-5" />
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Course Name
                                    </label>
                                    <input
                                        type="text"
                                        name="course_name"
                                        value={formData.course_name}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                        maxLength={250}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Course Code (e.g., AB1234)
                                    </label>
                                    <input
                                        type="text"
                                        name="course_code"
                                        value={formData.course_code}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                        pattern="[A-Z]{2}[0-9]{4}"
                                        placeholder="AB1234"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Day
                                    </label>
                                    <select
                                        name="course_day"
                                        value={formData.course_day}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    >
                                        {days.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        name="course_status"
                                        value={formData.course_status}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Start Time (HH:MM)
                                    </label>
                                    <input
                                        type="time"
                                        name="course_time.start"
                                        value={formData.course_time.start}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        End Time (HH:MM)
                                    </label>
                                    <input
                                        type="time"
                                        name="course_time.end"
                                        value={formData.course_time.end}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Instructor
                                    </label>
                                    <input
                                        type="text"
                                        name="course_instructor"
                                        value={formData.course_instructor}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                        maxLength={250}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Semester (e.g., Autumn-1)
                                    </label>
                                    <input
                                        type="text"
                                        name="course_semester"
                                        value={formData.course_semester}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="Season-Number"
                                        pattern="(Autumn|Winter|Spring|Summer)-([1-9]|10)"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="course_location"
                                        value={formData.course_location}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        maxLength={250}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="course_description"
                                        value={formData.course_description}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Course'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}