import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  task_title: string;
  task_description: string;
  task_priority: string;
}
const TasksWidget = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string>(''); 
    useEffect(() => {
      const fetchTasks = async () => {
        const todayFormatted = new Date().toISOString().split("T")[0]; 
  
        try {
          const response = await axios.get('http://localhost:8000/api/tasks/tasks-by-date', {
            params: { date: todayFormatted }, 
          });
          setTasks(response.data); 
        } catch (err) {
          setError('Failed to load tasks'); 
          console.error('Error fetching tasks:', err);
        } finally {
          setLoading(false); 
        }
      };
  
      fetchTasks(); 
    }, []);
  
    return (
      <div className="flex flex-col p-4 border text-center bg-purple-100 hover:bg-purple-200 text-gray-900 transition my-4 font-semibold rounded-lg shadow-inner">
        <div className="text-center p-6 bg-white-100 rounded-xl shadow-lg flex-row">
          <h1 className="w-full py-2 px-4 block bg-white-100 rounded-lg text-gray-900 font-semibold transition my-4 text-center font-sans">
            Today's Tasks
          </h1>
          <div>
            {loading ? (
              <p>Loading tasks...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p> 
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.id} className="my-2">
                  <h3>{task.task_title}</h3>
                  <p>{task.task_description || 'No description available'}</p>
                  <p>Priority: {task.task_priority}</p>
                </div>
              ))
            ) : (
              <p>No tasks for today</p>
            )}
          </div>
        </div>
      </div>
    );
  };
export default TasksWidget;
