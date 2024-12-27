import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/shared/Button';
import { fetchCourses, selectCourses, selectLoading, selectError  } from '@/store/course/courseSlice';
import type { CourseType } from '@/types/course';

const CourseWidget = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const courses = useSelector(selectCourses);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
  
    useEffect(() => {
      // Only fetch non-archived courses by default
      dispatch(fetchCourses({ include_archived: false }));
    }, [dispatch]);
  
    const handleCourseClick = (courseId: string) => {
      navigate(`/courses/${courseId}`);
    };
  
    const handleShowAll = () => {
      navigate('/courses');
    };
  
    if (loading) {
      return (
        <div className="w-full space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="w-full p-4 text-error-100">
          Error loading courses: {error}
        </div>
      );
    }
  
    const displayedCourses = courses.slice(0, 5);
  
    return (
      <div className="w-full space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Courses</h2>
          <Button 
            type="outline"
            label="Show All"
            onClick={handleShowAll}
          />
        </div>
  
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {displayedCourses.map((course: CourseType) => (
            <div 
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className="bg-white rounded-lg cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="h-32 bg-gray-800" />
              <div className="p-4">
                <h3 className="font-medium mb-2">{course.course_name}</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-3 py-1 bg-gray-100 rounded-full">
                    {course.course_day}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full">
                    {course.course_code}
                  </span>
                </div>
              </div>
            </div>
          ))}
  
          {displayedCourses.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No courses available. Add your first course to get started.
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default CourseWidget;