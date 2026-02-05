import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/TaskCard.css'
import { prettify } from '../helpers/debug.js';
import { API_URL } from '../helpers/utils.js';

const TaskCard = ({ task, handleDelete, handleUpdate }) => {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(task.message);

    const saveChanges = async () => {
        // Если текст не изменился, ничего не делаем
        if (text === task.message) {
            setEditing(false);
            return;
        }

        try {
            const resp = await fetch(`${API_URL}tasks/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }) // Отправляем только измененное поле
            });

            if (resp.ok) {
                const updatedTask = await resp.json();
                handleUpdate(updatedTask); // Синхронизируем стейт App.jsx
                setEditing(false);
            }
        } catch (e) {
            console.error("Ошибка при сохранении:", e);
        }
    };


    const handleDragStart = (e) => {
        const svgIcon = document.getElementById('drag-ghost-svg');

        if (svgIcon) {
            // 15, 15 — это координаты курсора относительно иконки
            e.dataTransfer.setDragImage(svgIcon, 15, 15);
        }

        e.dataTransfer.setData("taskId", task.id);
    }



    return (<div
        className='task-card c1'
        draggable={true}
        onDragStart={handleDragStart}

    >
        <div className='card-header frlc'>Task
            <div className='card-delete'
                onClick={() => handleDelete(task.id)}
            >
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">                    <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />                </svg>
            </div >
        </div >


        {/* EDIT FIELD */}
        <div
            onClick={() => setEditing(true)}
            className='card-body'

        >
            {editing ?
                <textarea
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={saveChanges}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            saveChanges(); // Сохранение по Enter
                        }
                    }}
                ></textarea >
                :
                text
                // prettify(task, 2)
            }
        </div >



        <div className='card-deadline frcc'>Deadline: {new Date(task.deadline).toLocaleString('ru-RU')}</div >
        <div className='card-footer frcc'>footer</div >
        {/* {JSON.stringify(task)} */}
    </div >
    )
}

export default TaskCard;
