"use client";

import { createSubTodoList, deleteSubTodo, getTodoList, updateSubTodo } from '@/actions/todo';
import SmallHeader from '@/components/smallHeader';
import { subTodo } from '@/entities/todo';
import React, { useState, useEffect } from 'react';
import { Search, ListFilter } from 'lucide-react'; // Importing icons for search and sort

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("priority");

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
        setTodos(response.data.todos);

      } catch (error: any) {
        setError(error.message || 'Error fetching note');
      }
    };

    fetchNote(); // fetchNote fonksiyonunu useEffect içinde çağırın

  }, []); // useEffect'in id parametresine bağımlı olmasını sağlıyoruz

  const handleAddTodo = async () => {
    let response = await createSubTodoList({
      content: newTodo,
      completed: false,
      priority: priority,
      id: params.id,
    });

    if (response && response.success) {
      setTodos([...todos, {
        _id: response.data._id,
        content: response.data.content,
        priority: response.data.priority,
        completed: response.data.completed,
      }]);
      setNewTodo("");
      setPriority(1);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    let response = await deleteSubTodo({
      id_first: params.id,
      id_second: id
    });

    if (response && response.success) {
      setTodos(todos.filter(todo => todo._id !== id));
    }
  };

  const handleCompleteTodo = async (_id: string) => {
    let response = await updateSubTodo({
      id_first: params.id,
      id_second: _id,
      content: todos.find(todo => todo._id === _id)?.content || "",
      priority: todos.find(todo => todo._id === _id)?.priority || 1,
      completed: !todos.find(todo => todo._id === _id)?.completed || false
    });

    if (response && response.success) {
      setTodos(
        todos.map(todo =>
          todo._id === _id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortOption === "priority") {
      return a.priority - b.priority;
    } else if (sortOption === "completed") {
      return Number(a.completed) - Number(b.completed);
    }
    return 0;
  });

  return (
    <div className="p-4 sm:gap-4 sm:py-4 sm:px-8 max-w-full min-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Todo List</h1>
        <div className="flex flex-col sm:flex-row items-center space-x-2">
          <div className="relative mb-2 sm:mb-0">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded-md border-gray-700 pl-10 sm:pl-4"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative mb-2 sm:mb-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border p-2 rounded-md  border-gray-700  pl-10"
            >
              <option value="priority">Priority</option>
              <option value="completed">Completed</option>
            </select>
            <ListFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
          className="border p-2 rounded-md flex-grow mr-0 sm:mr-2 mb-2 sm:mb-0  border-gray-700 text-white"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3)}
          className="border p-2 rounded-md mb-2 sm:mb-0  border-gray-700 "
        >
          <option value={1}>Priority 1</option>
          <option value={2}>Priority 2</option>
          <option value={3}>Priority 3</option>
        </select>
        <button
          onClick={handleAddTodo}
          className="bg-gray-700 py-2 px-4 rounded-md text-white ml-0 sm:ml-2"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        {sortedTodos.map(todo => (
          <div
            key={todo._id}
            className={`p-4 border rounded-md flex justify-between items-center ${
              todo.completed ? "bg-gray-500 border-gray-700 text-white" : " border-gray-600"
            }`}
          >
            <span className={todo.completed ? "line-through text-white" : ""}>{todo.content}</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs">Priority: {todo.priority}</span>
              <button
                onClick={() => handleCompleteTodo(todo._id)}
                className={`py-1 px-2 rounded-md ${
                  todo.completed ? "bg-green-500" : "bg-gray-600"
                } text-white`}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDeleteTodo(todo._id)}
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
