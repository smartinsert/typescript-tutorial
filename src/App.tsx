import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    let addTodoToDestination,
      activeTodoBucket = todos,
      completeTodoBucket = completedTodos;

    if (source.droppableId === 'TodosActive') {
      addTodoToDestination = activeTodoBucket[source.index];
      activeTodoBucket.splice(source.index, 1);
    } else {
      addTodoToDestination = completeTodoBucket[source.index];
      completeTodoBucket.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosActive') {
      activeTodoBucket.splice(destination.index, 0, addTodoToDestination);
    } else {
      completeTodoBucket.splice(destination.index, 0, addTodoToDestination);
    }

    setCompletedTodos(completeTodoBucket);
    setTodos(activeTodoBucket);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAdd={handleAdd}
        />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
