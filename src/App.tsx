import './App.css';
import Todos from './pages/Todos';
import { Provider } from 'react-redux'
import { store } from './store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Todos />
      </Provider>

    </div>
  );
}

export default App;
