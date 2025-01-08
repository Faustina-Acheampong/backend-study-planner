import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { AxiosError } from "axios";

// Task and FormData interfaces
interface Task {
  id: string;
  task_title: string;
  task_description: string;
  task_due_date: string;
  is_task_completed: boolean;
  task_priority: "Low" | "Medium" | "High";
  task_status: "pending" | "completed";
  user_id: string;
  assignment_id?: string | null;
  time?: string[];
}

type FormData = {
  task_title: string;
  task_description: string;
  task_due_date: string;
  task_priority: "Low" | "Medium" | "High";
  user_id: string;
  assignment_id?: string | null;
};

const TaskComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    task_title: "",
    task_description: "",
    task_due_date: "",
    task_priority: "Medium",
    user_id: "675fe38b7a00a3f44db1269b",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks/");
      setTasks(response.data);
    } catch (error) {
      handleError(error, "Error fetching tasks");
    }
  };

  // Add task handler
  const handleAddTask = async () => {
    try {
      await axios.post("http://localhost:8000/api/tasks/", formData);
      fetchTasks();
      closeModal();
    } catch (error) {
      handleError(error, "Error adding task");
    }
  };

  const handleEditTask = async () => {
    if (!editTaskId) return;

    // Temporarily useing a static user_id (valid ObjectId)
    const cleanedData = {
      ...formData,
      user_id: "675fe38b7a00a3f44db1269b", // Static user_id (valid ObjectId)
    };

    console.log("Cleaned Form Data (before sending):", cleanedData);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/tasks/${editTaskId}`,
        cleanedData
      );
      console.log("Task updated:", response.data);
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error("Error editing task:", error);
      handleError(error, "Error editing task");
    }
  };
  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      handleError(error, "Error deleting task");
    }
  };

  // Toggle completion status of a task
  const handleToggleCompleted = async (taskId: string) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/tasks/${taskId}/toggle-completed`
      );
      fetchTasks();
    } catch (error) {
      handleError(error, "Error toggling task completion");
    }
  };

  // Open modal for adding/editing tasks
  const openModal = (task?: Task) => {
    if (task) {
      setFormData({
        task_title: task.task_title,
        task_description: task.task_description,
        task_due_date: task.task_due_date,
        task_priority: task.task_priority,
        user_id: task.user_id || task.user_id,
        assignment_id: task.assignment_id || null,
      });
      setEditTaskId(task.id);
      setIsEditMode(true);
    } else {
      setFormData({
        task_title: "",
        task_description: "",
        task_due_date: "",
        task_priority: "Medium",
        user_id: "675fe38b7a00a3f44db1269b",
      });
      setIsEditMode(false);
      setEditTaskId(null);
    }
    setModalOpen(true);
  };

  // // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setEditTaskId(null);
  };

  // Handle errors globally
  const handleError = (error: unknown, message: string) => {
    if (error instanceof AxiosError) {
      console.error(message, error);
      alert(`${message}: ${error.response?.data?.message || error.message}`);
    } else {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred");
    }
  };

  return (
    <div className="container">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tasks (To Do)</h1>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search"
            className="border text-black rounded p-2 w-1/3"
          />
          <button className="border  rounded px-4 py-2">Sort by:</button>
          <button
            onClick={() => openModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col p-4 border  text-center bg-gray-300 hover:bg-gray-400 text-gray-900 transition my-4 font-semibold rounded-lg shadow-inner"
            >
              <div className="flex items-center justify-between mb-2 bg-white rounded-lg shadow-inner p-2 ">
                <span className="font-semibold bg-white rounded-lg shadow-inner p-2 mb-4 ">
                  {task.task_title}
                </span>
                <input
                  type="checkbox"
                  checked={task.is_task_completed}
                  onChange={() => handleToggleCompleted(task.id)}
                  className="mr-2"
                />
              </div>
              <p className="text-sm text-gray-600 bg-white rounded-lg shadow-inner p-2 mb-4">
                {task.task_description}
              </p>
              <p className="text-sm text-gray-600 bg-white rounded-lg shadow-inner p-2 mb-4">
                Priority: <strong>{task.task_priority}</strong>
              </p>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => openModal(task)}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-inner  hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg shadow-inner  hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <Modal
            title={isEditMode ? "Edit Task" : "Add Task"}
            onClose={closeModal}
            onSave={isEditMode ? handleEditTask : handleAddTask}
            formData={formData}
            handleInputChange={(field, value) =>
              setFormData((prev) => ({ ...prev, [field]: value }))
            }
          />
        )}
      </div>
    </div>
  );
};

export default TaskComponent;
