import { render } from 'react-dom';
import { App } from './app';
import './styles/style.scss';
import './i18n/i18n';

const rootElement = document.getElementById('root');
render(<App />, rootElement);
