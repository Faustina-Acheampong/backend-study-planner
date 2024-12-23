import React from 'react';
import { CourseCard } from '@/components/courses/CourseCard';
import Link from 'next/link';
import { CourseType } from '@/types/course';

const CoursesWidget = () => {
    const { data: courses, isLoading, error } = useGetCoursesQuery();
      
    if (isLoading) {
        return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    if (error) {
        return (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load courses</p>
          </div>
        );
      }

      return (
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Courses</h1>
            <Link 
              href="/courses/all" 
              className="px-4 py-2 text-sm rounded border hover:bg-gray-50"
            >
              Show All
            </Link>
          </div>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {courses?.slice(0, 5).map((course:CourseType) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      );
    }


export default CoursesWidget;
