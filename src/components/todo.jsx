import { useState, useEffect } from 'react'
import '../App.css';
import axios from 'axios';

function Todo({ token, logout }) {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        if (token) {
            fetchTodos().then(res => {setTodos(res)});
        }
    }, [token]);

    const url = import.meta.env.VITE_SERVER_URL + '/api/todo'
    console.log(url)

    const header = {
        'Authorization': `Bearer ${token}`
    }

    async function fetchTodos() {
        const response = await axios.get(url, { headers: header });
        return response.data.map(todo => ({ ...todo, id: todo._id }));
    }

    async function addTodo(todo) {
        const response = await axios.post('http://localhost:3001/api/todo', todo, { headers: header });
        return response.data;
    }

    async function deleteTodo(id) {
        const response = await axios.delete(`http://localhost:3001/api/todo/${id}`, { headers: header });
        return response.data;
    }

    async function updateTodo(id, todo) {
        const response = await axios.put(`http://localhost:3001/api/todo/${id}`, todo, { headers: header });
        return response.data;
    }

    function eachTodo(todo) {
        return (
            <div className={`todo ${todo.status ? "completed" : ""}`}>
                <li className="todo-item" key={todo.id}>
                    {todo.name}
                </li>
                <button className="complete-btn" onClick={() => {
                    updateTodo(todo.id, { status: !todo.status })
                    setTodos(
                        todos.map(t => {
                            if (t.id === todo.id) {
                                t.status = !t.status;
                            }
                            return t;
                        })
                    )
                }}>
                    <i className="fas fa-check"></i>
                </button>
                <button className="trash-btn" onClick={() => {
                    deleteTodo(todo.id)
                    setTodos(
                        todos.filter(t => t.id !== todo.id)
                    )
                }}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        )
    }

    const [input, setInput] = useState('');

    return (
        <div>
            <header>
                <h1 className="user-header"
                 onClick={() => logout()}>
                Todo List</h1>
            </header>

            <form>
                <input type="text" value={input} placeholder="Add a todo" onChange={e => setInput(e.target.value)} />
                <button type="submit" className='todo-button' onClick={(e) => {
                    e.preventDefault();
                    if (input) {
                        // setTodos([...todos, { text: input, id: Date.now(), status: 'active' }]);
                        addTodo({ name: input, status: false }).then(res => {
                            res.id = res._id;
                            setTodos(todos.concat(res));
                        });
                        setInput('');

                    }
                }}>
                    <i className="fas fa-plus-square"></i>
                </button>
            </form>

            <div className="todo-container">
                <ul className="todo-list" >
                    {todos.map(eachTodo)}
                </ul>
            </div>
        </div>
    )
}

export default Todo
