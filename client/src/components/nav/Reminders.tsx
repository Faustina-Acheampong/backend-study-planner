'use client'

import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useSelectors } from '@/store/hooks';
import RemindersModal from './RemindersModal';
import { CourseType } from '@/types/course';
import { useAppDispatch } from '@/store/hooks';
import { setReminders } from '@/store/reminders/remindersSlice';
import { ReminderType } from '@/types/reminder';

const Reminders = () => {
    const { reminders, courses } = useSelectors();
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const dispatch = useAppDispatch();

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const day = new Date().getDay();
    const dayName = days[day - 1];

    const time = new Date().getHours();

    const classesToday = courses.filter((i: CourseType) => i.course_day === dayName);

    const courseReminders: ReminderType[] = classesToday.map((i: CourseType) => {
        const startTime = parseInt(i.course_time.start.slice(0, 2));

        return {
            type: "courses",
            id: i.id,
            course_name: i.course_name,
            time_left: startTime - time,
            unread: true
        }
    });

    useEffect(() => {
        if (courseReminders) {
            dispatch(setReminders(courseReminders));
        }
    }, [courses]);

    return (
        <div
            className='relative'
        >
            <button
                className='relative hover:cursor-pointer mx-2'
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                <Bell
                    size={24}
                    strokeWidth={1}
                />
                {
                    reminders &&
                    <div
                        className='w-2 h-2 rounded-full bg-error-100 absolute right-1 top-0'
                    >

                    </div>
                }
            </button>
            {
                isModalOpen &&
                <RemindersModal
                    setIsModalOpen={setIsModalOpen}
                />
            }
        </div>
    );
};

export default Reminders;
