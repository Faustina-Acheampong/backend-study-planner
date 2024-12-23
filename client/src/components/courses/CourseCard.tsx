import { CourseType } from '@/types/course';
import Link from 'next/link';

interface CourseCardProps {
    course: CourseType;
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
      <Link href={`/courses/${course.id}`}>
       <div className="cursor-pointer">
        <div className="bg-gray-700 h-32 rounded-t-lg"></div>
        <div className="bg-gray-100 p-4 rounded-b-lg">
          <h3 className="font-medium mb-2">{course.course_name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <span className="bg-white px-3 py-1 text-sm rounded">
                {course.course_day}
              </span>
            </div>
            <span className="text-sm">{course.course_code}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};