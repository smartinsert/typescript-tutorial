import React, { useEffect, useRef, useState } from 'react';
import { Actions, Todo } from './model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import './styles.css';

interface Props {
  todo: Todo;
  dispatchTodos: React.Dispatch<Actions>;
  dispatchCompletedTodos: React.Dispatch<Actions>;
}

const SingleTodo: React.FC<Props> = ({
  todo,
  dispatchTodos,
  dispatchCompletedTodos,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    dispatchTodos({ type: 'done', payload: id });
    dispatchCompletedTodos({ type: 'done', payload: id });
  };

  const handleDelete = (id: number) => {
    dispatchTodos({ type: 'remove', payload: id });
    dispatchCompletedTodos({ type: 'remove', payload: id });
  };

  const handleEdit = (todo: Todo) => {
    if (!edit && !todo.isDone) {
      setEdit(!edit);
    }
  };

  const handleEditSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatchTodos({ type: 'add', payload: editTodo });
    dispatchTodos({ type: 'remove', payload: id });
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
      className='single_todo'
      onSubmit={(e) => handleEditSubmit(e, todo.id)}
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
  );
};

export default SingleTodo;
