"use client";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Assignment {
  id: number;
  title: string;
  due_date: string;
  status: string;
  course_id: number;
}

export default function AssignmentPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [assignment, setAssignment] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [notes, setNotes] = useState([
    { title: "First Note", date: "2025-01-08", no: 1 },
    { title: "Second Note", date: "2025-01-07", no: 2 },
    { title: "Third Note", date: "2025-01-06", no: 3 },
  ]);
  const [inputValueNote, setInputValueNote] = useState("");

  const handleAddNote = () => {
    if (inputValueNote.trim() === "") return;

    const newNote = {
      title: inputValueNote,
      date: new Date().toLocaleDateString("en-GB"),
      no: notes.length + 1,
    };

    setNotes([...notes, newNote]);
    setInputValueNote("");
  };

  // Data for task

  const [tasks, setTasks] = useState([
    {
      title: "Task 1",
      date: "2025-01-12",
      status: "In Progress",
    },
    {
      title: "Task 2",
      date: "2025-01-15",
      status: "Not Started",
    },
    {
      title: "Task 3",
      date: "2025-01-20",
      status: "Done",
    },
  ]);

  const [inputValueTask, setInputValueTask] = useState("");

  const handleAddTask = () => {
    if (inputValueTask.trim() === "") return;

    const newTask = {
      title: inputValueTask,
      date: new Date().toLocaleDateString("en-GB"),
      no: tasks.length + 1,
      status: "Not Started",
    };

    setTasks([...tasks, newTask]);
    setInputValueTask("");
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
      } catch (err: unknown) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return date.toLocaleDateString("en-GB", options); // 'en-GB' formatı ile gün, ay, yıl sırası sağlanır
  };

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
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
            <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg ">
              <i className="fas fa-users mr-2"></i>
              {assignment.participants.map((participant, index) => (
                <span
                  key={index}
                  className={`ml-2 ${index === 0 ? "" : "ml-2"}`}
                >
                  {participant}
                </span>
              ))}
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              scelerisque, leo ac vehicula consectetur, velit tortor tincidunt
              ante, ut lacinia velit felis id est. Sed auctor magna ac risus
              facilisis tincidunt. Morbi vehicula nulla vitae nisl fermentum, eu
              interdum orci suscipit. Nullam scelerisque lectus nec diam auctor,
              et faucibus nulla pharetra. Quisque euismod, metus euismod
              vulputate lobortis, nisl magna convallis magna, a varius nulla
              neque id leo. Sed sit amet orci id ipsum accumsan venenatis vel at
              eros. Aliquam in sagittis erat. Fusce placerat magna eu neque
              auctor, at maximus augue vulputate. Ut ornare viverra libero, ac
              venenatis justo viverra in. Integer sagittis ipsum felis, non
              euismod lorem viverra non. Integer sit amet volutpat purus. Aenean
              vehicula sed neque eget cursus. Mauris imperdiet ligula sed nunc
              dictum, nec efficitur nulla tincidunt. Vivamus mollis felis ac leo
              varius, et cursus magna venenatis. Duis tincidunt bibendum eros,
              ac placerat nulla suscipit eget.
            </p>
          </div>
          <div className="flex flex-wrap -mx-2 ">
            <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
              <h2 className="text-xl font-bold mb-4">Notes</h2>
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-200">No</th>
                    <th className="py-2 px-4 bg-gray-200">Title</th>
                    <th className="py-2 px-4 bg-gray-200">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note) => (
                    <tr key={note.no}>
                      <td className="py-2 px-4">{note.no}</td>
                      <td className="py-2 px-4">{note.title}</td>
                      <td className="py-2 px-4">{formatDate(note.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-row items-center space-x-4 mt-2">
                <input
                  value={inputValueNote}
                  onChange={(e) => setInputValueNote(e.target.value)}
                  type="text"
                  placeholder="Enter note"
                  className="border border-gray-300 rounded-lg p-2 w-64"
                />
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                  onClick={handleAddNote}
                >
                  Add Note
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-2">
              <h2 className="text-xl font-bold mb-4">Tasks</h2>
              <div className="flex justify-between items-center mb-4">
                <input
                  onChange={(e) => setInputValueTask(e.target.value)}
                  type="text"
                  placeholder="Add Task"
                  className="border border-gray-300 rounded-lg p-2 w-64"
                />
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                  onClick={handleAddTask}
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
                    <tr key={index}>
                      <td className="py-2 px-4">
                        <input type="checkbox" />
                      </td>
                      <td className="py-2 px-4">{task.title}</td>
                      <td className="py-2 px-4">{task.date}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`${
                            task.status === "In Progress"
                              ? "bg-blue-600"
                              : task.status === "Not Started"
                              ? "bg-gray-600"
                              : "bg-black"
                          } text-white px-2 py-1 rounded-lg`}
                        >
                          {task.status.toUpperCase()}
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
  );
}
