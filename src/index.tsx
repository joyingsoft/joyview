import React from 'react';
import { render } from 'react-dom';
import { App } from './app';
import './styles/style.scss';

const rootElement = document.getElementById('root');
render(<App />, rootElement);
