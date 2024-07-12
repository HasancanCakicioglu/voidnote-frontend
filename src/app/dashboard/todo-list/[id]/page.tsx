"use client";

import { createSubTodoList, deleteSubTodo, deleteTodoList, getTodoList, updateSubTodo } from '@/actions/todo';
import SmallHeader from '@/components/smallHeader';
import { subTodo } from '@/entities/todo';
import React, { useState,useEffect } from 'react';

type TodoItem = {
  _id: number;
  content: string;
  priority: 1 | 2 | 3;
  completed: boolean;
};

const TodoListPage = ({ params }: { params: { id: string } }) => {
  const [todos, setTodos] = useState<subTodo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [priority, setPriority] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!params.id) return; 

        const response = await getTodoList({
          id: params.id  
        });
        if (!response) {
          setError('Error fetching note');
          return;
        }
        setTodos(response.data.todos)

      } catch (error: any) {
        setError(error.message || 'Error fetching note');
      }
    };

    fetchNote(); // fetchNote fonksiyonunu useEffect içinde çağırın

  }, []); // useEffect'in id parametresine bağımlı olmasını sağlıyoruz

  const handleAddTodo = async () => {
    const newTodoItem: TodoItem = {
      _id: Date.now(),
      content: newTodo,
      priority,
      completed: false,
    };

    let response = await createSubTodoList({
      content: newTodoItem.content,
      completed: newTodoItem.completed,
      priority: newTodoItem.priority,
      id: params.id,

    })

    if (response && response.success) {
      setTodos([...todos,{
        _id: response.data.id,
        content: response.data.content,
        priority: response.data.priority,
        completed: response.data.completed,

      
      }])
      setNewTodo("");
      setPriority(1);
    }

    
  };

  const handleDeleteTodo = async (_id: string) => {
    let response = await deleteSubTodo({
      id_first: params.id,
      id_second: _id
    });

    if (response && response.success) {
      setTodos(todos.filter(todo => todo._id !== _id));
    }

  };

  const handleCompleteTodo = async(_id: string) => {

    let response = await updateSubTodo({
      id_first: params.id,
      id_second: _id,
      content: todos.find(todo => todo._id === _id)?.content || "",
      priority: todos.find(todo => todo._id === _id)?.priority || 1,
      completed: !todos.find(todo => todo._id === _id)?.completed || false
    })

    if (response && response.success) {
      setTodos(
        todos.map(todo =>
          todo._id === _id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }

  };

  return (
    <div className="sm:gap-4 sm:py-4 sm:p-14">
    <SmallHeader/>
      <h1 className="content-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="content"
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
          className="bg-primary content-primary-foreground py-2 px-4 rounded-md text-white"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        {todos.map(todo => (
          <div
            key={todo._id}
            className={`p-4 border rounded-md flex justify-between items-center ${
              todo.completed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <span className={todo.completed ? "line-through" : ""}>{todo.content}</span>
            <div className="flex items-center space-x-2">
              <span className="content-xs">Priority: {todo.priority}</span>
              <button
                onClick={() => handleCompleteTodo(todo._id)}
                className={`py-1 px-2 rounded-md ${
                  todo.completed ? "bg-green-500" : "bg-gray-500"
                } content-white`}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="bg-red-500 content-white py-1 px-2 rounded-md"
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
