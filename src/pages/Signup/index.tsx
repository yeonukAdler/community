import { TextColor } from './styles';

function Home(): JSX.Element {
  return (
    <div className="App">
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

export default Home;
