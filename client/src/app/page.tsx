import AssignmentsWidget from "@/components/assignments/AssignmentsWidget";
import CoursesWidget from "@/components/courses/CoursesWidget";
import ScheduleWidget from "@/components/schedule/ScheduleWidget";

export default function Home() {
  return (
    <>
      <ScheduleWidget />
      <CoursesWidget />
      <AssignmentsWidget />
    </>
  );
};
