'use client'
import React, { useState, useEffect } from 'react';
import { CourseType, Days, Status } from '@/types/course';
import { Loader2 } from 'lucide-react';

interface CourseEditModalProps {
    course: CourseType;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<CourseType>) => Promise<void>;
}

const days: Days[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const statuses: Status[] = ['Ongoing', 'Upcoming', 'Completed', 'Archived'];

export default function CourseEditModal({ 
    course, 
    isOpen, 
    onClose,
    onSubmit 
}: CourseEditModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [formData, setFormData] = useState({
        course_name: course.course_name,
        course_day: course.course_day,
        course_code: course.course_code,
        course_instructor: course.course_instructor,
        course_semester: course.course_semester || '',
        course_location: course.course_location || '',
        course_description: course.course_description || '',
        course_time: {
            start: course.course_time.start,
            end: course.course_time.end
        },
        course_status: course.course_status
    });

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(onClose, 200); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await onSubmit(formData);
            handleClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update course');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Only trim if it's not the description field
        if (name !== 'course_description' && typeof value === 'string') {
            setFormData(prev => ({
                ...prev,
                [name]: value.trim()
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
                        <h2 className="text-xl font-semibold mb-4">Edit Course</h2>

                        {error && (
                            <div className="mb-4 p-4 text-red-600 bg-red-50 rounded-lg">
                                {error}
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
                                        placeholder="Enter course location"
                                        onBlur={(e) => {
                                            e.target.value = e.target.value.trim();
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Course Code
                                    </label>
                                    <input
                                        type="text"
                                        name="course_code"
                                        value={formData.course_code}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                        pattern="[A-Z]{2}[0-9]{4}"
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
                                        Start Time
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
                                        End Time
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
                                        Semester
                                    </label>
                                    <input
                                        type="text"
                                        name="course_semester"
                                        value={formData.course_semester}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        pattern="(Autumn|Winter|Spring|Summer)-([1-9]|10)"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                        <span className="text-xs text-gray-500 ml-1">(250 characters max)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="course_location"
                                        value={formData.course_location}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        maxLength={250}
                                        placeholder="Enter course location"
                                        onBlur={(e) => {
                                            e.target.value = e.target.value.trim();
                                        }}
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
                                        onBlur={(e) => {
                                            const trimmedValue = e.target.value.trim();
                                            setFormData(prev => ({
                                                ...prev,
                                                course_description: trimmedValue
                                            }));
                                        }}
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
                                    className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Changes'
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