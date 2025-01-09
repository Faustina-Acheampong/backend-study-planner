"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCourseById,
  selectSelectedCourse,
  selectLoading,
  selectError,
  updateCourse,
} from "@/store/course/courseSlice";
import { Pencil, Trash2, Archive } from "lucide-react";
import CourseEditModal from "@/components/courses/EditCourseModal";
import ArchiveCourseModal from "@/components/courses/ArchiveCourseModal";
import CourseDeleteModal from "@/components/courses/DeleteCourseModal";
import { CourseInfo } from "@/components/courses/CourseInfo";
import { CourseSchedule } from "@/components/courses/CourseSchedule";
import { CourseStatus } from "@/components/courses/CourseStatus";
import { CourseType } from "@/types/course";
import axios from "axios";
import Link from "next/link";

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectSelectedCourse);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);

  // delete assignment
  const deleteAssignment = (id) => {
    setAssignments((prevAssignments) =>
      prevAssignments.filter((assignment) => assignment.id !== id)
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  const handleEditSubmit = async (updatedData: Partial<CourseType>) => {
    await dispatch(updateCourse({ id, data: updatedData })).unwrap();
    router.refresh();
    setIsEditModalOpen(false);
  };

  const handleArchive = () => {
    setIsArchiveModalOpen(true);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/assignments/course/${id}`
        );
        setAssignments(response.data);
        console.log("data", response.data);
      } catch (err: unknown) {
        console.error("Error:", err);
      }
    };

    fetchAssignments();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-200 h-60 w-full" />
          <div className="p-6 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-64" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-7 bg-gray-200 rounded w-24" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <div className="p-4 text-red-600 bg-red-50">
          Error loading course: {error}
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="w-full bg-white rounded-[19px] border-gray-400 overflow-hidden">
      {/* Header with action buttons */}
      <div className="bg-greyDark h-40 w-full relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={handleArchive}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Archive className="h-4 w-4" />
            Archive
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6">
        {/* Course title and status */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-lg text-black font-bold">{course.course_name}</h1>
          <CourseStatus course_status={course.course_status} />
        </div>

        {/* Course metadata grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CourseInfo title="COURSE CODE" value={course.course_code} />
          <CourseInfo
            title="SEMESTER"
            value={course.course_semester || "Not specified"}
          />
          <CourseInfo title="INSTRUCTOR" value={course.course_instructor} />
        </div>

        {/* Schedule section */}
        <CourseSchedule
          course_day={course.course_day}
          course_time={course.course_time}
          course_location={course.course_location || "Not specified"}
        />

        {/* Description section */}
        {course.course_description && (
          <div className="mt-8 w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="bg-whiteForced rounded-lg shadow-sm border border-gray-100 text-black p-4">
              {course.course_description}
            </p>
          </div>
        )}

        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Assignments</h1>
          <div className="flex flex-row justify-between items-start space-x-6 mb-4 p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="flex flex-col space-y-4 w-full max-w-sm">
              <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
                Add
              </button>
              <input
                type="text"
                placeholder="Add an Assignment"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              />
              <input
                type="text"
                placeholder="Category"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              />
            </div>
          </div>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">No</th>
                <th className="border border-gray-200 px-4 py-2">Assignment</th>
                <th className="border border-gray-200 px-4 py-2">Due Date</th>
                <th className="border border-gray-200 px-4 py-2">Category</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, i) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {i + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <Link
                      href={`/assignments/${a.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {a.title}
                    </Link>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {new Date(a.due_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {a.category}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        a.status === "IN PROGRESS" || a.status === "In Progress"
                          ? "bg-blue-500"
                          : a.status === "NOT STARTED" ||
                            a.status === "Not Started"
                          ? "bg-gray-400"
                          : a.status === "DONE" || a.status === "FINISHED"
                          ? "bg-green-500"
                          : a.status === "PENDING" || a.status === "Pending"
                          ? "bg-orange-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteAssignment(a.id)}
                      className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-lg py-2 px-4 transition duration-200 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CourseEditModal
        course={course}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
      />

      <ArchiveCourseModal
        courseId={id}
        courseName={course.course_name}
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
      />

      <CourseDeleteModal
        courseId={id}
        courseName={course.course_name}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      {/* Notes section */}
      {/* Assignments section */}
    </div>
  );
}
