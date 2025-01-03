import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { AxiosError } from "axios";

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
  const [isAddModalOpen, setAddModalOpen] = useState(false);
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

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks/");
      setTasks(response.data);
    } catch (error) {
      handleError("Error fetching tasks", error);
    }
  };

  const handleError = (message: string, error: unknown) => {
    if (error instanceof AxiosError) {
      console.error(`${message}:`, error);
      alert(`${message}: ${error.response?.data?.message || error.message}`);
    } else {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred");
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post("http://localhost:8000/api/tasks/", formData);
      fetchTasks();
      setAddModalOpen(false);
    } catch (error) {
      handleError("Error adding task", error);
    }
  };

  const handleEditTask = async () => {
    if (!editTaskId) return;
    try {
      await axios.put(`http://localhost:8000/api/tasks/${editTaskId}`, formData);
      fetchTasks();
      setAddModalOpen(false);
      setIsEditMode(false);
      setEditTaskId(null);
    } catch (error) {
      handleError("Error editing task", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
      fetchTasks(); // Fetch the updated tasks list
    } catch (error) {
      handleError("Error deleting task", error);
    }
  };

  const openEditModal = (task: Task) => {
    setFormData({
      task_title: task.task_title,
      task_description: task.task_description,
      task_due_date: task.task_due_date,
      task_priority: task.task_priority,
      user_id: task.user_id, 
      assignment_id: task.assignment_id || null,
    });
    setEditTaskId(task.id);
    setIsEditMode(true);
    setAddModalOpen(true);
  };

  const handleToggleCompleted = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
        ...task,
        is_task_completed: !task.is_task_completed,
      });
      fetchTasks();
    } catch (error) {
      handleError("Error toggling task completion", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col p-4 border rounded shadow-sm bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <input
                type="checkbox"
                checked={task.is_task_completed}
                onChange={() => handleToggleCompleted(task.id)}
                className="mr-2"
              />
              <span className="font-semibold">{task.task_title}</span>
            </div>
            <p className="text-sm text-gray-600">{task.task_description}</p>
            <p className="text-sm text-gray-600">
              Priority: <strong>{task.task_priority}</strong>
            </p>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => openEditModal(task)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isAddModalOpen && (
        <Modal
          title={isEditMode ? "Edit Task" : "Add Task"}
          onClose={() => {
            setAddModalOpen(false);
            setIsEditMode(false);
            setEditTaskId(null);
          }}
          onSave={isEditMode ? handleEditTask : handleAddTask}
          formData={formData}
          handleInputChange={(field, value) =>
            setFormData((prev) => ({ ...prev, [field]: value }))
          }
        />
      )}
    </div>
  );
};

export default TaskComponent;
