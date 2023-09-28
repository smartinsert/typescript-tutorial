import React from 'react';
import './styles.css';
import { Actions, Todo } from './model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

export interface Props {
  todos: Todo[];
  completedTodos: Todo[];
  dispatchTodos: React.Dispatch<Actions>;
  dispatchCompletedTodos: React.Dispatch<Actions>;
}

const TodoList: React.FC<Props> = ({
  todos,
  completedTodos,
  dispatchTodos,
  dispatchCompletedTodos,
}: Props) => {
  return (
    <div className='container'>
      <Droppable droppableId='TodoList'>
        {(provided) => (
          <div
            className='todos'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Active Tasks</span>
            {todos.map((todo) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                dispatchTodos={dispatchTodos}
                dispatchCompletedTodos={dispatchCompletedTodos}
              />
            ))}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodoRemove'>
        {(provided) => (
          <div
            className='todos remove'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Completed Tasks</span>
            {completedTodos.map((todo) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                dispatchTodos={dispatchTodos}
                dispatchCompletedTodos={dispatchCompletedTodos}
              />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
