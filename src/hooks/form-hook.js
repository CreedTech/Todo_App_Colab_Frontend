import { useReducer } from 'react';

export const useFormInputs = (initialState) => {
  const reducer = (state, payload) => {
    switch (payload.type) {
      case 'text':
        return {
          ...state,
          [payload.name]: payload.value,
        };
      case 'check':
        return {
          ...state,
          [payload.name]: payload.value,
        };
      case 'select':
        return {
          ...state,
          [payload.name]: payload.value,
        };
      case 'reset':
        return initialState;
      default:
        return state;
    }
  };

  const [inputs, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: 'text', name: e.target.name, value: e.target.value });
  };

  const handleToggle = (e) => {
    dispatch({ type: 'check', name: e.target.name, value: e.target.checked });
  };

  const handleSelect = (e) => {
    dispatch({ type: 'select', name: e.target.name, value: e.target.value });
  };

  // const handleReset = () => {
  //     dispatch({type: 'reset'})
  // }

  return {
    inputs,
    bind: { onChange: handleChange },
    toggle: { onChange: handleToggle },
    select: { onChange: handleSelect },
  };
};
