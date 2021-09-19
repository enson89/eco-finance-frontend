import './App.css';
import HorizontalTabs from './ControlledTabs.js';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-interface">
        <img className="App-logo" src={logo} alt="EcoFinance"></img>
        <text className="App-Name"> EcoFinance </text>
        <div>
          <HorizontalTabs />
        </div>
      </header>
    </div>
  );
}

export default App;
