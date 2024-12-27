interface CourseStatusProps {
    course_status: string;
  }
  
  export function CourseStatus({ course_status }: CourseStatusProps) {
    return (
      <div className={`px-3 py-2 rounded-lg text-white font-medium ${
        course_status === 'Ongoing' ? 'bg-green-500' :
        course_status === 'Upcoming' ? 'bg-blue-500' :
        course_status === 'Completed' ? 'bg-purple-500' :
        course_status === 'Archived' ? 'bg-gray-500' : 'bg-gray-400'
      }`}>
        {course_status || 'Active'}
      </div>
    );
  }