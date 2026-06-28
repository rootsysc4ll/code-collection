import "./Home.css"

import trashIcon from "../assets/trash-icon.svg"
import todosIcon from "../assets/todos-icon.svg"

function Todo() {
    return (
        <div className="todo-container">
            <button className="open-details-button">
                &gt;
            </button>

            <span className="todo-name-text">
                this is the definition of some todo
            </span>

            <span className="todo-date-text">Todo date</span>

            <button className="delete-todo-button">
                <img className="trash-icon" src={trashIcon} alt="" />
            </button>
        </div>
    )
}

export default function Home() {
    return (
        <div id="home-page">
            <nav>
                <button>
                    <img id="todos-icon" src={todosIcon} alt="" />
                </button>
            </nav>
                
            <header>
                this is the header
            </header>

            <span id="todos-title">
                Hello! Here's yours todos:
            </span>

            <div id="todos-container">
                {/* 
                    this need to be generated via .map, specially because of the details, 
                    that need to be specific for each todo container 
                */}
                <Todo />
            </div>
                
        </div>
    )
}