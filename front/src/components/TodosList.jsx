import React from 'react';
import '../assets/css/card.css'

const TodoCard = ({ todo, handleDelete }) => {
    return (<div className='todo-card'>
        {/* {JSON.stringify(todo)} */}
        <h4>{todo.header}</h4>
        <p>{todo.message}</p>
        <div className='closebut' onClick={(e) => {
            e.stopPropagation(); // Останавливаем событие, чтобы оно не шло к родителю
            handleDelete(todo.id);
        }}></div>
    </div >
    )
}
const TodosList = ({ todos, handleDelete,handleSelect }) => {
    return (
        <>
            {todos.map((todo) => {
                return <TodoCard
                    key={todo.id}
                    todo={todo}
                    handleDelete={handleDelete}
                    onClick={()=> handleSelect(todo.id)}
                />; // Добавлен / и закрыта скобка }
            })}

        </>
    )
};
export default TodosList;
