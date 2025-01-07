export default function AssignmentHeader() {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Assignment Title</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
          <span className="mr-2">📅</span>
          10 January 2025
        </span>
        <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-700">
          <span className="mr-2">📑</span>
          Category 1
        </span>
        <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
          <span className="mr-2">👥</span>3 Participants
        </span>
        <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-sm text-yellow-700">
          <span className="mr-2">⏳</span>
          In Progress
        </span>
      </div>
    </div>
  );
}
