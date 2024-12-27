import { CourseInfo } from "./CourseInfo";

interface ScheduleProps {
    course_day: string;
    course_time: {
      start: string;
      end: string;
    };
    course_location: string;
  }
  
  export function CourseSchedule({ course_day, course_time, course_location }: ScheduleProps) {
    const days = course_day.split(',').map(day => day.trim());
  
    return (
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Schedule</h2>
        <div className="space-y-4">
          {days.map((day, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <CourseInfo title="DAY" value={day} />
              <CourseInfo title="TIME" value={`${course_time.start} - ${course_time.end}`} />
              <CourseInfo title="LOCATION" value={course_location} />
            </div>
          ))}
        </div>
      </div>
    );
  }