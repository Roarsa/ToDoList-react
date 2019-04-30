import ReactDOM from 'react-dom';
import React from 'react';
import ToDoList from './components/ToDoList/ToDoList';

import './style.sass';

const container = document.querySelector('#react-app');
ReactDOM.render(<ToDoList />, container);
