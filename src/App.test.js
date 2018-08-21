import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TodoService from './todo.service'

jest.mock('./todo.service', () => {
  return class {
    fetch() {
      return new Promise((res, rej) => {
        res([{id: 'foo', body: 'bar'}])
      })
    }
  }
})

describe('APP', () => {
  it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
