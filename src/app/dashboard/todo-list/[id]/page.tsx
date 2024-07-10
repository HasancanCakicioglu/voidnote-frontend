"use client";

import React, { useState } from 'react';

type TodoItem = {
  id: number;
  text: string;
  priority: 1 | 2 | 3;
  isComplete: boolean;
};

const TodoListPage = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [priority, setPriority] = useState<1 | 2 | 3>(1);

  const handleAddTodo = () => {
    const newTodoItem: TodoItem = {
      id: Date.now(),
      text: newTodo,
      priority,
      isComplete: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
    setPriority(1);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleCompleteTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
          className="border p-2 rounded-md flex-grow mr-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3)}
          className="border p-2 rounded-md mr-2"
        >
          <option value={1}>Priority 1</option>
          <option value={2}>Priority 2</option>
          <option value={3}>Priority 3</option>
        </select>
        <button
          onClick={handleAddTodo}
          className="bg-primary text-primary-foreground py-2 px-4 rounded-md"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`p-4 border rounded-md flex justify-between items-center ${
              todo.isComplete ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <span className={todo.isComplete ? "line-through" : ""}>{todo.text}</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs">Priority: {todo.priority}</span>
              <button
                onClick={() => handleCompleteTodo(todo.id)}
                className={`py-1 px-2 rounded-md ${
                  todo.isComplete ? "bg-green-500" : "bg-gray-500"
                } text-white`}
              >
                {todo.isComplete ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500 text-white py-1 px-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListPage;
