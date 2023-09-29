import React from 'react';
import './styles.css';
import { Todo } from './model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

export interface Props {
  todos: Todo[];
  completedTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  completedTodos,
  setTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className='container'>
      <Droppable droppableId='TodosActive'>
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver} ? 'dragactive' : ''`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {(provided, snapshot) => (
          <div
            className={`todos remove ${snapshot.isDraggingOver} ? 'dragcomplete' : ''`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
