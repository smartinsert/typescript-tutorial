import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({
  index,
  todo,
  todos,
  setTodos,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    if (!edit && !todo.isDone) {
      setEdit(!edit);
    }
  };

  const handleEditSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable
      draggableId={todo.id.toString()}
      index={index}
    >
      {(provided) => (
        <form
          className='single_todo'
          onSubmit={(e) => handleEditSubmit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className='single_todo_text'
            />
          ) : todo.isDone ? (
            <s className='single_todo_text'>{todo.todo}</s>
          ) : (
            <span className='single_todo_text'>{todo.todo}</span>
          )}
          <div>
            <span
              className='icon'
              onClick={() => handleEdit(todo)}
            >
              <AiFillEdit />
            </span>
            <span
              className='icon'
              onClick={() => handleDelete(todo.id)}
            >
              <AiFillDelete />
            </span>
            <span
              className='icon'
              onClick={() => handleDone(todo.id)}
            >
              <MdOutlineDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
