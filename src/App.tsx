import SideBar from 'components/common/SideBar';
import './App.css';
import Router from 'Router';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== '/admin' ? <SideBar></SideBar> : null}
      <Router />
    </div>
  );
}

export default App;
