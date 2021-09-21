import './App.css';
import HorizontalTabs from './ControlledTabs.js';
import logo from './logo.svg';

function logout (e) {
  //Back to Login Page
  window.location = "/App"
}

function PortfolioApp() {
  return (
    <div className="Portfolio">
      <header className="Portfolio-interface">
        <img className="Portfolio-logo" src={logo} alt="EcoFinance"></img>
        <text className="Portfolio-App-Name"> EcoFinance </text>
        <div>
          <HorizontalTabs />
        </div>
        <button className="login-button" onClick={logout}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default PortfolioApp;
