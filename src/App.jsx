import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]); // State to store tasks
  const [newTodo, setNewTodo] = useState(""); // State for new task input
  const [editingIndex, setEditingIndex] = useState(null); // Index of the task being edited
  const [editingText, setEditingText] = useState(""); // State for editing task text

  // Function to handle adding a new todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, isCompleted: false }]);
      setNewTodo(""); // Clear input after adding
    }
  };

  // Function to delete a todo
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Function to mark a todo as completed
  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  // Function to start editing a todo
  const editTodo = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  // Function to save the edited todo
  const saveTodo = () => {
    const updatedTodos = todos.map((todo, i) =>
      i === editingIndex ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div
    className="flex justify-center items-center min-h-screen bg-gray-100"
    style={{ backgroundImage: 'url("/public/react.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do App</h1>
        
        {/* Input field for new task */}
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border border-gray-300 rounded-l px-4 py-2 w-full"
            placeholder="Add a new task"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            Add
          </button>
        </div>

        {/* To-Do List */}
        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
              {editingIndex === index ? (
                <div className="flex flex-grow">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="border border-gray-300 rounded-l px-4 py-2 w-full"
                  />
                  <button
                    onClick={saveTodo}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span
                    className={`flex-grow ${
                      todo.isCompleted ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => toggleComplete(index)}
                      className={`px-4 py-1 rounded ${
                        todo.isCompleted
                          ? "bg-gray-400 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {todo.isCompleted ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => editTodo(index)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(index)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
