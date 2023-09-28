import React, { useRef, useState } from 'react';
import { Actions } from './model';
import './styles.css';

interface Props {
  dispatchTodos: React.Dispatch<Actions>;
}

const InputField: React.FC<Props> = ({ dispatchTodos }: Props) => {
  const [todo, setTodo] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatchTodos({ type: 'add', payload: todo });
      setTodo('');
    }
  };

  return (
    <form
      className='input'
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type='input'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder='Enter a task'
        className='input__box'
      />
      <button
        className='input__submit'
        type='submit'
      >
        {' '}
        Go{' '}
      </button>
    </form>
  );
};

export default InputField;
