'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
    fetchCourses, 
    selectCourses, 
    selectLoading, 
    selectError 
} from '@/store/course/courseSlice';
import CourseCard from '@/components/courses/CourseCard';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Days, Status } from '@/types/course';

const days: Days[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const statuses: Status[] = ['Ongoing', 'Upcoming', 'Completed', 'Archived'];


export default function CoursesPage() {
    const dispatch = useAppDispatch();
    const courses = useAppSelector(selectCourses);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedSemester, setSelectedSemester] = useState<string>('');
    const [showFilters, setShowFilters] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 20;

    useEffect(() => {
        // Reset to first page when filters change
        setCurrentPage(1);
        
        const filters = {
            course_name: searchTerm,
            course_day: selectedDay,
            course_status: selectedStatus,
            course_semester: selectedSemester,
            include_archived: selectedStatus === 'Archived'
        };

        dispatch(fetchCourses(filters));
    }, [dispatch, searchTerm, selectedDay, selectedStatus, selectedSemester]);

    // Pagination calculations
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    Error loading courses: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Courses</h1>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                        <Filter className="h-5 w-5 text-gray-400" />
                    </button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow">
                        {/* Day Filter */}
                        <select
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                            className="p-2 border rounded-lg"
                        >
                            <option value="">All Days</option>
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="p-2 border rounded-lg"
                        >
                            <option value="">All Statuses</option>
                            {statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>

                        {/* Semester Filter */}
                        <input
                            type="text"
                            placeholder="Semester (e.g., Fall-2024)"
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(e.target.value)}
                            className="p-2 border rounded-lg"
                        />
                    </div>
                )}
            </div>

            {/* Courses Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="bg-gray-200 h-[180px] rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : currentCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {currentCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No courses found matching your criteria.
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-10 h-10 rounded-lg ${
                                currentPage === index + 1
                                    ? 'bg-purple-600 text-white'
                                    : 'border hover:bg-gray-50'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

