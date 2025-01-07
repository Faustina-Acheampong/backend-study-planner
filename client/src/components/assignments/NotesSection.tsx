"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface Note {
  id: number;
  title: string;
  date: string;
}

export default function NotesSection() {
  const [notes] = useState<Note[]>([
    { id: 1, title: "Assignment 3", date: "12 January 2025" },
    { id: 2, title: "Assignment 3", date: "09 march 2025" },
  ]);

  return (
    <div className="rounded-lg border p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
        <button className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </button>
      </div>
      <div className="divide-y">
        {notes.map((note) => (
          <div key={note.id} className="flex items-center justify-between py-4">
            <span className="font-medium text-gray-900">{note.title}</span>
            <span className="text-sm text-gray-500">{note.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
