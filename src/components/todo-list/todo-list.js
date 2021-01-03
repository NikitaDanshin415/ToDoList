import React from "react";

import TodoListItem from "../todo-list-item/";
import './todo-list.css';

const ToDoList = ({ todos, onImportant, onDone, onDeleted }) => {

    const elements = todos.map((item)=>{
        const {key, ...itemProps} = item;

        return(
            <li key={key} className={"list-group-item"}>
                <TodoListItem{...itemProps}
                    onDeleted={()=>onDeleted(key)}
                    onImportant={()=>onImportant(key)}
                    onDone={()=>onDone(key)}
                />
            </li>
        );
    })

    return(
        <ul className={"list-group todo-list"}>
            {elements}
        </ul>
    );
}

export default ToDoList