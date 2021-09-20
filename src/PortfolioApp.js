import './App.css';
import HorizontalTabs from './ControlledTabs.js';
import logo from './logo.svg';

function PortfolioApp() {
  return (
    <div className="Portfolio">
      <header className="Portfolio-interface">
        <img className="Portfolio-logo" src={logo} alt="EcoFinance"></img>
        <text className="Portfolio-App-Name"> EcoFinance </text>
        <div>
          <HorizontalTabs />
        </div>
      </header>
    </div>
  );
}

export default PortfolioApp;
