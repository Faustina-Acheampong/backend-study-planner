'use client'
import { CourseType } from '@/types/course';
import Link from 'next/link';

interface CourseCardProps {
    course: CourseType;
    className?: string;
}

export default function CourseCard({ course, className = '' }: CourseCardProps) {
    // Split course days if there are multiple
    const days = course.course_day.split(',').map(day => day.trim());

    return (
        <Link 
            href={`/courses/${course.id}`}
            className="block transition-transform hover:scale-[1.02]"
        >
            <div className="h-full rounded-lg overflow-hidden">
                {/* Header with dark gray background */}
                <div className="bg-greyDark h-20 rounded-t-lg" />
                
                {/* Content area */}
                <div className="bg-greyLight p-4 rounded-b-lg">
                    {/* Course title */}
                    <h3 className="font-medium text-md mb-4">
                        {course.course_name}
                    </h3>
                    
                    {/* Tags container */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            {/* Day chips */}
                            {days.map((day, index) => (
                                <span 
                                    key={index} 
                                    className="bg-white px-3 py-1 text-xs rounded"
                                >
                                    {day}
                                </span>
                            ))}
                        </div>
                        <span className="px-3 py-1 text-xs">
                            {course.course_code}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}