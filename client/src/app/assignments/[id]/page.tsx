"use client";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Assignment {
  id: number;
  title: string;
  course_id: number;
  due_date: string;
  category: string;
  participants: string[]; // Add participants
  status: string; // Add status
  statusClass: string; // Add statusClass for styles
}

interface Task {
  assignment: string;
  due_date: string;
  status: string;
  no: number;
}

interface Note {
  no: number;
  title: string;
  date: string;
}

export default function AssignmentPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [assignment, setAssignment] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Task
  const [tasks, setTasks] = useState<Task[]>([
    {
      no: 1,
      assignment: "Meeting with the team",
      due_date: "2025-02-01",
      status: "Not Started",
    },
    {
      no: 2,
      assignment: "Playing Football",
      due_date: "2025-03-02",
      status: "In Progress",
    },
    {
      no: 3,
      assignment: "Having Fika",
      due_date: "2025-03-05",
      status: "Done",
    },
  ]);

  //Note
  const [notes, setNotes] = useState<Note[]>([
    {
      no: 1,
      title: "Meeting with the team",
      date: "2025-01-08",
    },
    {
      no: 2,
      title: "Project deadline",
      date: "2025-01-15",
    },
    {
      no: 3,
      title: "Lunch with client",
      date: "2025-01-10",
    },
  ]);

  const [inputValueNote, setInputValueNote] = useState("");

  const addNote = () => {
    if (!inputValueNote.trim()) {
      return;
    }

    const currentDate = new Date().toLocaleString();

    const newNote = {
      title: inputValueNote,
      date: currentDate,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);

    setInputValueNote("");
  };

  //Task

  const [inputValueTask, setInputValueTask] = useState("");

  const addTask = () => {
    if (!inputValueTask.trim()) {
      return;
    }

    const currentDate = new Date().toLocaleString();

    const newTask = {
      assignment: inputValueTask,
      date: currentDate,
      status: "Not Started",
    };

    setTasks((prevTask) => [...prevTask, newTask]);

    setInputValueTask("");
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/assignments/${id}`
        );
        setAssignment(response.data);
        console.log("data", response.data);

        setLoading(false);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-800 h-20"></div>
        <div className="container mx-auto p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                <i className="fas fa-calendar-alt mr-2"></i>
                <span>{formatDate(assignment.due_date)}</span>
              </div>
              <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                <i className="fas fa-folder mr-2"></i>
                <span>{assignment.category}</span>
              </div>
              <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                <i className="fas fa-users mr-2"></i>
                {assignment.participants &&
                assignment.participants.length > 0 ? (
                  assignment.participants.map(
                    (participant: string, index: number) => (
                      <span key={index} className="ml-2">
                        {participant}
                      </span>
                    )
                  )
                ) : (
                  <span className="ml-2 text-gray-500">No Participants</span>
                )}
              </div>
              <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                <i className="fas fa-tasks mr-2"></i>
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    assignment.status === "IN PROGRESS" ||
                    assignment.status === "In Progress"
                      ? "bg-blue-500"
                      : assignment.status === "NOT STARTED" ||
                        assignment.status === "Not Started"
                      ? "bg-gray-400"
                      : assignment.status === "DONE" ||
                        assignment.status === "FINISHED"
                      ? "bg-green-500"
                      : assignment.status === "PENDING" ||
                        assignment.status === "Pending"
                      ? "bg-orange-500"
                      : "bg-gray-400"
                  }`}
                >
                  {assignment.status}
                </span>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h2>
                {" "}
                <b> Description </b>
              </h2>
              <p>Here is the description related to the assignment.</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus fermentum, ligula non venenatis tristique, libero nisl
                consectetur est, sed tristique enim justo eget odio. Integer nec
                massa vel justo facilisis tincidunt. Donec varius, justo at
                aliquam pulvinar, nulla urna dapibus felis, eget efficitur
                turpis arcu nec mauris. Curabitur id eros id elit euismod
                dapibus non a ligula. Sed a mauris at risus tristique consequat.
                Morbi congue, nisl in sagittis luctus, lectus odio varius elit,
                nec malesuada urna dolor a ligula. Nulla vitae felis ut nulla
                vehicula faucibus in nec nunc.
              </p>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                <h2 className="text-xl font-bold mb-4">Notes</h2>
                <div className="flex flex-row justify-between bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
                  <input
                    type="text"
                    value={inputValueNote}
                    onChange={(e) => setInputValueNote(e.target.value)}
                    placeholder="Enter note title"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-3/4"
                  />
                  <button
                    onClick={addNote}
                    className="ml-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Add Note
                  </button>
                </div>

                <table className="min-w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-200">No</th>
                      <th className="py-2 px-4 bg-gray-200">Title</th>
                      <th className="py-2 px-4 bg-gray-200">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((note, index) => (
                      <tr key={note.id}>
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{note.title}</td>
                        <td className="py-2 px-4">{formatDate(note.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full lg:w-1/2 px-2">
                <h2 className="text-xl font-bold mb-4">Tasks</h2>
                <div className="flex flex-row justify-between bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
                  <input
                    type="text"
                    placeholder="Add a new task"
                    onChange={(e) => setInputValueTask(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-3/4"
                  />
                  <button
                    onClick={addTask}
                    className="ml-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Add Task
                  </button>
                </div>
                <table className="min-w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-200">No</th>
                      <th className="py-2 px-4 bg-gray-200">Assignment</th>
                      <th className="py-2 px-4 bg-gray-200">Due Date</th>
                      <th className="py-2 px-4 bg-gray-200">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr
                        key={task.id}
                        className={index % 2 === 0 ? "bg-red-100" : ""}
                      >
                        <td className="py-2 px-4">
                          <input type="checkbox" />
                        </td>
                        <td className="py-2 px-4">{task.assignment}</td>
                        <td className="py-2 px-4 text-red-600">
                          {task.dueDate}
                        </td>
                        <td className="py-2 px-4">
                          <span
                            className={`${task.statusClass} px-2 py-1 rounded-lg`}
                          >
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
