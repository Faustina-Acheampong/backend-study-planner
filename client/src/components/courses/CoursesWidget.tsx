'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import { 
    fetchCourses, 
    selectCourses, 
    selectLoading, 
    selectError 
} from '@/store/course/courseSlice';
import type { CourseType } from '@/types/course';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CourseCard from './CourseCard';

const CoursesWidget = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    
    const courses = useAppSelector(selectCourses);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    useEffect(() => {
        dispatch(fetchCourses({ include_archived: false }));
    }, [dispatch]);

    const handleShowAll = () => {
        router.push('/courses');
    };

    if (loading) {
        return (
            <div className="w-full space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Courses</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-gray-200 h-[180px] rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full p-4 text-red-600 bg-red-50 rounded-lg">
                Error loading courses: {error}
            </div>
        );
    }

    const displayedCourses = courses.slice(0, 5);

    return (
        <div className = "container">
            <div className="w-full space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Courses</h3>
                    <Button
                        type="outline"
                        label="Show All"
                        onClick={handleShowAll}
                    />
                </div>

                {/* Course grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {displayedCourses.map((course: CourseType) => (
                        <div key={course.id} className="flex flex-col">
                            <CourseCard course={course} />
                        </div>
                    ))}

                    {displayedCourses.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No courses available. Add your first course to get started.
                        </div>
                    )}
                </div>
            </div>
        </div>    
    );
};

export default CoursesWidget;