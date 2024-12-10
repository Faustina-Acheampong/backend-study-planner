import React from 'react';
import TimeWidget from '../time/TimeWidget';
import TasksWidget from '../tasks/TasksWidget';

const Menu = () => {
    return (
        <div
            className='container'
        >
            Menu
            {/*this is left menu */}

            {/* Shortcuts Component */}
            <TimeWidget />
            <TasksWidget />
        </div>
    );
};

export default Menu;
