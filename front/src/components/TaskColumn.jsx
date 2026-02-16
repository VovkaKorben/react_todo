import React from 'react';
import TaskCard from './TaskCard.jsx'
import '../assets/css/TaskColumn.css'
import '../assets/css/flex.css'

const TaskColumn = ({ header, tasks, state, handleCreate, handleDelete, handleUpdate, handleTaskMove }) => {

    // const showTasks = [...tasks].filter(t => t.state === state);
const showTasks = tasks.filter(t => t.state === state).sort((a, b) => (a.order || 0) - (b.order || 0));
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


        // 2. ПРЕДОХРАНИТЕЛЬ: Если ближайшая уже активна — ВЫХОДИМ.
        // Пока ты возишь мышкой внутри "зоны" одной полоски, код ниже не выполнится.
        if (closestSep && closestSep.classList.contains('active')) return;

        // 3. Только если цель РЕАЛЬНО сменилась — обновляем всех
        seps.forEach(sep => {
            sep.classList.toggle('active', sep === closestSep);
        });

        /* if (closestSep.classList.contains('active')) return;
         seps.forEach(sep => {
             sep.classList.toggle('active', sep === closestSep);
         });*/
    }
    const handleDragLeave = (e) => {
        const seps = e.currentTarget.querySelectorAll('.sep');
        seps.forEach(sep => sep.classList.remove('active'));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId"); // Получаем ID из TaskCard.jsx
        const activeSep = e.currentTarget.querySelector('.sep.active');

        if (activeSep) {
            const newOrder = parseInt(activeSep.dataset.order);
            handleTaskMove(taskId, state, newOrder);
        }

        // Снимаем подсветку со всех сепараторов
        const seps = e.currentTarget.querySelectorAll('.sep');
        seps.forEach(sep => sep.classList.remove('active'));
    };

    return (

        <div
            className='task-column'
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >

            {/* column caption */}
            <div
                className='header frcc'
            style={{ backgroundColor: `${header[1]}50` }}
            >
                {header[0].toUpperCase()}
                {showTasks.length > 0 && ` [ ${showTasks.length} ]`}
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
                            headerColor={header[1]}
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
