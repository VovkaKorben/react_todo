import React from 'react';
import TaskCard from './TaskCard.jsx'
import '../assets/css/TaskColumn.css'
import '../assets/css/flex.css'

const TaskColumn = ({ header, tasks, state, handleCreate, handleDelete, handleUpdate }) => {

    const showTasks = [...tasks].filter(t => t.state === state);

    const handleDragOver = (e) => {
        // console.log(e);
        e.preventDefault();
        const seps = e.currentTarget.querySelectorAll('.sep');
        const mouseY = e.clientY;

        let closestSep = null;
        let minDistance = Number.POSITIVE_INFINITY;
        // 2. Ищем ближайшую
        seps.forEach((sep) => {
            const rect = sep.getBoundingClientRect();
            const sepCenterY = rect.top + rect.height / 2;
            const distance = Math.abs(mouseY - sepCenterY);

            if (distance < minDistance) {
                minDistance = distance;
                closestSep = sep;
            }
        });
        if (closestSep.classList.contains('active')) return;
        seps.forEach(sep => {
            sep.classList.toggle('active', sep === closestSep);
        });
    }
    const handleDragLeave = (e) => {
        const seps = e.currentTarget.querySelectorAll('.sep');
        seps.forEach(sep => sep.classList.remove('active'));
    };

    return (

        <div
            className='task-column'
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >

            {/* column caption */}
            <div className='header frcc c0'>
                {header.toUpperCase()}
                {showTasks.length > 0 && ` (${showTasks.length})`}
            </div>


            {/* add button for first column */}
            {state === 0 ?
                <div
                    className='header frcc c1 curp'
                    onClick={handleCreate}
                >  + ADD</div> : ''}

            {/* tasks */}
            <div className='sep' data-order={0} />
            {showTasks.map((task, i) => {
                return (
                    <React.Fragment key={task.id}>
                        {/* {i!==0 && } */}
                        <TaskCard
                            key={task.id}
                            task={task}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        />
                        <div className='sep' data-order={i + 1} />
                    </React.Fragment>
                );
            })}

        </div>
    )
};
export default TaskColumn;
