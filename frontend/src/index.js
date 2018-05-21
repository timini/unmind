import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { initApp } from './App';

initApp(document.getElementById('root'));
registerServiceWorker();
