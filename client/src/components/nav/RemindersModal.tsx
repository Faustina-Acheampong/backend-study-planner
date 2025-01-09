import React from 'react';
import SingleReminder from './SingleReminder';
import { useSelectors } from '@/store/hooks';

type RemindersModalProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>;
};

const RemindersModal = ({ setIsModalOpen }: RemindersModalProps) => {
    const { reminders } = useSelectors();

    return (
        <div
            className='relative'
        >
            <div
                className='fixed bg-black bg-opacity-25 w-dvw h-dvh top-0 left-0'
                onClick={() => setIsModalOpen(false)}
            />
            <div
                className='absolute bg-white rounded-[18px] p-2 min-w-[440px] right-0 top-4 z-10 flex flex-col gap-2'
                onClick={() => setIsModalOpen(false)}
            >
                {reminders?.map(i => <SingleReminder {...i} key={i.id} />)}
            </div>
        </div>
    );
};

export default RemindersModal;
