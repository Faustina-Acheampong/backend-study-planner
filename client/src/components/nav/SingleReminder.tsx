import React from 'react';
import { ReminderType } from '@/types/reminder';
import { School, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { markReminderAsRead } from '@/store/reminders/remindersSlice';
import { useAppDispatch } from '@/store/hooks';

const SingleReminder = ({
    type,
    id,
    course_name,
    assignment_title,
    time_left,
    unread = true
}: ReminderType) => {
    const dispatch = useAppDispatch();

    return (
        <Link
            className='flex items-center gap-2 bg-whiteForced rounded-lg p-2'
            href={`/${type}/${id}`}
            onClick={() => { dispatch(markReminderAsRead(id)) }}
        >
            <div
                className='relative m-3'
            >
                {
                    type === "courses" ? <School size={24} strokeWidth={1} /> : <CalendarCheck size={24} strokeWidth={1} />
                }
                {
                    unread &&
                    <div
                        className='w-2 h-2 rounded-full bg-error-100 absolute right-1 top-0'
                    >

                    </div>
                }
            </div>
            <div
                className='w-full flex flex-col'
            >
                <p
                    className='text-sm'
                >
                    {course_name ? course_name : assignment_title}
                </p>
                <p
                    className='text-xs text-greyDark'
                >
                    {type === "courses" ?
                        time_left && time_left < 0 ? `This class is ongoing!`
                            : `Your class is going to start in ${time_left} hours`
                        : `Deadline is today!`}
                </p>
            </div>
            {
                type === "courses" &&
                <p
                    className='text-xs text-greyDark m-3 w-10'
                >
                    {time_left} h
                </p>
            }
        </Link>
    );
};

export default SingleReminder;
