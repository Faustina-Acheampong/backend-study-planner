'use client'
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchCourseById, 
  selectSelectedCourse, 
  selectLoading, 
  selectError 
} from '@/store/course/courseSlice';
import { Pencil, Trash2, Archive } from 'lucide-react';

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;  
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectSelectedCourse);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  const handleEdit = () => {
    // Add your edit logic here
    console.log('Edit course', id);
  };

  const handleDelete = () => {
    // Add your delete logic here
    console.log('Delete course', id);
  };

  const handleArchive = () => {
    // Add your archive logic here
    console.log('Archive course', id);
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-[18px] overflow-hidden">
        <div className="animate-pulse space-y-4">
          {/* Header placeholder */}
          <div className="bg-greyDark h-60 w-full" />
          
          {/* Content placeholders */}
          <div className="p-6 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-64" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
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

  if (error) {
    return (
      <div className="w-full bg-white rounded-[18px] overflow-hidden">
        <div className="p-4 text-red-600 bg-red-50">
          Error loading course: {error}
        </div>
      </div>
    );
  }

  if (!course) return null;

  const schedules = course.course_day.split(',').map((day, index) => ({
    day: day.trim(),
    time: course.course_time,
    location: course.course_location
  }));

  return (
    <div className="w-full bg-white rounded-[18px] overflow-hidden">
      {/* Header with action buttons */}
      <div className="bg-greyDark h-60 w-full relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={handleEdit}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center gap-2">
            <Pencil size={16} />
            <span>Edit</span>
          </button>
          <button 
            onClick={handleArchive}
            className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white flex items-center gap-2">
            <Archive size={16} />
            <span>Archive</span>
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white flex items-center gap-2">
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-6">
        {/* Course title and status */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl font-bold">
            {course.course_name}
          </h1>
          <div className="space-y-2">
            <div className="inline-flex px-2 py-1 bg-greyDark rounded text-white text-sm font-bold tracking-wide">
              STATUS
            </div>
            <div className="px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
              {course.course_status || 'Active'}
            </div>
          </div>
        </div>

        {/* Course metadata grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <div className="inline-flex px-2 py-1 bg-greyDark rounded text-white text-sm font-bold tracking-wide">
              COURSE CODE
            </div>
            <div className="px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
              {course.course_code}
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex px-2 py-1 bg-greyDark rounded text-white text-sm font-bold tracking-wide">
              SEMESTER
            </div>
            <div className="px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
              {course.course_semester || 'Not specified'}
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex px-2 py-1 bg-greyDark rounded text-white text-sm font-bold tracking-wide">
              INSTRUCTOR
            </div>
            <div className="px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
              {course.course_instructor}
            </div>
          </div>
        </div>

        {/*  section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Schedule</h2>
          <div className="space-y-4">
            {schedules.map((schedule, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="inline-flex px-2 py-1 bg-greyDark rounded text-white text-sm font-bold tracking-wide">
                    DAY
                  </div>
                  <div className="px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    {schedule.day}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="inline-flex px-2 py-1 bg-greyDark rounded text-white text-sm font-bold tracking-wide">
                    TIME
                  </div>
                  <div className="px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    {`${schedule.time.start} - ${schedule.time.end}`}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="inline-flex px-2 py-1 bg-greyDark rounded text-white text-sm font-bold tracking-wide">
                    LOCATION
                  </div>
                  <div className="px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    {schedule.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description section */}
        {course.course_description && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">
              {course.course_description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};