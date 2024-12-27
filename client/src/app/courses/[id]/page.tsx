'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
    fetchCourseById, 
    selectSelectedCourse, 
    selectLoading, 
    selectError,
    deleteCourse,
    updateCourse 
} from '@/store/course/courseSlice';
import { Pencil, Trash2, Archive } from 'lucide-react';
import CourseEditModal from '@/components/courses/EditCourseModal';
import CourseDeleteModal from '@/components/courses/DeleteCourseModal';
import { CourseInfo } from '@/components/courses/CourseInfo';
import { CourseSchedule } from '@/components/courses/CourseSchedule';
import { CourseStatus } from '@/components/courses/CourseStatus';
import { CourseType } from '@/types/course';

export default function CoursePage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id;
    const dispatch = useAppDispatch();
    const course = useAppSelector(selectSelectedCourse);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchCourseById(id));
        }
    }, [dispatch, id]);

    const handleEditSubmit = async (updatedData: Partial<CourseType>) => {
        await dispatch(updateCourse({ id, data: updatedData })).unwrap();
        router.refresh();
        setIsEditModalOpen(false);
    };

    const handleArchive = async () => {
        // Add archive logic here - this will be implemented later
        console.log('Archiving course', id);
    };

    // Loading state
    if (loading) {
        return (
            <div className="w-full bg-white rounded-lg overflow-hidden">
                <div className="animate-pulse space-y-4">
                    <div className="bg-gray-200 h-60 w-full" />
                    <div className="p-6 space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-64" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-7 bg-gray-200 rounded w-24" />
                                    <div className="h-10 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                        <div className="h-32 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="w-full bg-white rounded-lg overflow-hidden">
                <div className="p-4 text-red-600 bg-red-50">
                    Error loading course: {error}
                </div>
            </div>
        );
    }

    if (!course) return null;

    return (
        <div className="w-full bg-white rounded-lg overflow-hidden">
            {/* Header with action buttons */}
            <div className="bg-gray-800 h-40 w-full relative">
                <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit
                    </button>
                    <button 
                        onClick={handleArchive}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        <Archive className="h-4 w-4" />
                        Archive
                    </button>
                    <button 
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>
            
            {/* Content section */}
            <div className="p-6">
                {/* Course title and status */}
                <div className="flex justify-between items-start mb-8">
                    <h1 className="text-lg font-bold">
                        {course.course_name}
                    </h1>
                    <CourseStatus course_status={course.course_status} />
                </div>

                {/* Course metadata grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <CourseInfo title="COURSE CODE" value={course.course_code} />
                    <CourseInfo 
                        title="SEMESTER" 
                        value={course.course_semester || 'Not specified'} 
                    />
                    <CourseInfo title="INSTRUCTOR" value={course.course_instructor} />
                </div>

                {/* Schedule section */}
                <CourseSchedule 
                    course_day={course.course_day}
                    course_time={course.course_time}
                    course_location={course.course_location || 'Not specified' }
                />

                {/* Description section */}
                {course.course_description && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-2">Description</h2>
                        <p className="bg-white rounded-lg shadow-sm border border-gray-100 text-black">
                            {course.course_description}
                        </p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <CourseEditModal
                course={course}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditSubmit}
            />

            <CourseDeleteModal
                courseId={id}
                courseName={course.course_name}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
}