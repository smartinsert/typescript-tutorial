import React, { useReducer } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoReducer, completedTodoReducer } from './components/model';
import { DragDropContext } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todos, dispatchTodos] = useReducer(TodoReducer, []);
  const [completedTodos, dispatchCompletedTodos] = useReducer(
    completedTodoReducer,
    []
  );

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField dispatchTodos={dispatchTodos} />
        <TodoList
          todos={todos}
          completedTodos={completedTodos}
          dispatchTodos={dispatchTodos}
          dispatchCompletedTodos={dispatchCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
