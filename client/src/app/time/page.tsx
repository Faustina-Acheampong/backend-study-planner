"use client";


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface Task {
  id: string;
  task_title: string;
  task_description: string;
  task_due_date: string;
  is_task_completed: boolean;
  task_priority: "High" | "Medium" | "Low";
  task_status: string;
  user_id: string;
  assignment_id: string | null;
  time: any[];
}

interface CourseTime {
  start: string;
  end: string;
}

interface Course {
  id: string;
  course_name: string;
  course_status: "Upcoming" | "Ongoing" | "Completed";
  course_time: CourseTime;
  course_day: string;
  course_code: string;
  course_instructor: string;
  course_semester: string;
  course_location: string;
  course_description: string;
  is_archived: boolean;
  user_id: string;
}

interface CourseResponse {
  success: boolean;
  count: number;
  archivedCount: number;
  data: Course[];
}

export default function TimePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksResponse, coursesResponse] = await Promise.all([
            fetch(`${baseUrl}/api/tasks`),
            fetch(`${baseUrl}/api/courses`),
        ]);
        console.log(`asdasdsad ${process.env.BASE_URL}/api/tasks`)

        if (!tasksResponse.ok || !coursesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const tasksData = await tasksResponse.json();
        const coursesData: CourseResponse = await coursesResponse.json();

        setTasks(tasksData);
        setCourses(coursesData.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_task_completed).length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  // Calculate course statistics
  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (course) => course.course_status === "Completed"
  ).length;
  const ongoingCourses = courses.filter(
    (course) => course.course_status === "Ongoing"
  ).length;
  const upcomingCourses = courses.filter(
    (course) => course.course_status === "Upcoming"
  ).length;

  // Priority distribution
  const highPriorityTasks = tasks.filter(
    (task) => task.task_priority === "High"
  ).length;
  const mediumPriorityTasks = tasks.filter(
    (task) => task.task_priority === "Medium"
  ).length;
  const lowPriorityTasks = tasks.filter(
    (task) => task.task_priority === "Low"
  ).length;

  const taskCompletionData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedTasks, totalTasks - completedTasks],
        backgroundColor: ["#4CAF50", "#FF5252"],
        borderColor: ["#43A047", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const priorityDistributionData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Tasks by Priority",
        data: [highPriorityTasks, mediumPriorityTasks, lowPriorityTasks],
        backgroundColor: ["#FF5252", "#FFC107", "#4CAF50"],
      },
    ],
  };

  const courseStatusData = {
    labels: ["Completed", "Ongoing", "Upcoming"],
    datasets: [
      {
        data: [completedCourses, ongoingCourses, upcomingCourses],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        borderColor: ["#43A047", "#1E88E5", "#FFB300"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container space-y-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold">{totalTasks}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Task Completion</h3>
          <p className="text-3xl font-bold">
            {completionPercentage.toFixed(1)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
          <p className="text-3xl font-bold">{totalCourses}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Completed Courses</h3>
          <p className="text-3xl font-bold">{completedCourses}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Task Completion Status</h3>
          <div className="w-full h-64 flex items-center justify-center">
            <Pie data={taskCompletionData} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Tasks by Priority</h3>
          <div className="w-full h-64 flex items-center justify-center">
            <Bar
              data={priorityDistributionData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Course Status Distribution
          </h3>
          <div className="w-full h-64 flex items-center justify-center">
            <Pie data={courseStatusData} />
          </div>
        </div>
      </div>
    </div>
  );
}