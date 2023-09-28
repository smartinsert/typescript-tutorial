export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export type Actions =
  | { type: 'add'; payload: string }
  | { type: 'remove'; payload: number }
  | { type: 'done'; payload: number };

export const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    case 'remove':
      return state.filter((todo) => todo.id != action.payload);
    case 'done':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: true } : todo
      );
    default:
      return state;
  }
};

export const completedTodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), todo: action.payload, isDone: true }];
    case 'remove':
      return state.filter((todo) => todo.id != action.payload);
    default:
      return state;
  }
};
