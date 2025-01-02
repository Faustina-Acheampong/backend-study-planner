import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskComponent = () => {

  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false); 
  const [formData, setFormData] = useState({
    task_title: "",
    task_description: "",
    task_priority: "Medium",
    task_due_date: "",
    assignment_id: "", // Optional field for assignment association
  });
  const [editTaskId, setEditTaskId] = useState(null); 
  
  return (
    <div className="container">
        <h1>Allah</h1>
        <p>Bismillahi qurli waqtarli</p>
    </div>
  )
}

export default TaskComponent;