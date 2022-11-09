import { TextColor } from './styles';
import Header from 'component/Header';

function Login(): JSX.Element {
  return (
    <div className="App">
      <Header />

      <header className="App-header">
        <TextColor>
          Edit <code>src/App.tsx</code> and save to reload.
        </TextColor>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Login;
