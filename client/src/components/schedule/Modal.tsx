import React from "react";

type ModalProps = {
  title: string;
  onClose: () => void;
  onSave: () => void;
  formData: {
    [key: string]: string | null;
  };
  handleInputChange: (field: string, value: string) => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  onSave,
  formData,
  handleInputChange,
}) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <input
        type="text"
        placeholder="Title"
        value={formData["task_title"] || ""}
        onChange={(e) => handleInputChange("task_title", e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <textarea
        placeholder="Description"
        value={formData["task_description"] || ""}
        onChange={(e) => handleInputChange("task_description", e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <select
        value={formData["task_priority"] || "Medium"}
        onChange={(e) => handleInputChange("task_priority", e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={formData["task_due_date"] || ""}
        onChange={(e) => handleInputChange("task_due_date", e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={onSave} className="bg-blue-500 text-white p-2 rounded w-full">
        Save
      </button>
      <button
        onClick={onClose}
        className="bg-gray-500 text-white p-2 rounded w-full mt-2"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default Modal;
