interface CourseStatusProps {
  course_status: string;
}

export function CourseStatus({ course_status }: CourseStatusProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
      course_status === 'Ongoing' ? 'bg-green-100 text-green-800' :
      course_status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
      course_status === 'Completed' ? 'bg-purple-100 text-purple-800' :
      course_status === 'Archived' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-800'
    }`}>
      <div className={`w-2 h-2 rounded-full ${
        course_status === 'Ongoing' ? 'bg-green-400' :
        course_status === 'Upcoming' ? 'bg-blue-400' :
        course_status === 'Completed' ? 'bg-purple-400' :
        course_status === 'Archived' ? 'bg-gray-400' : 'bg-gray-400'
      }`} />
      <span>{course_status || 'Ongoing'}</span>
    </div>
  );
}