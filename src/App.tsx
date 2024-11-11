import styled from 'styled-components';
import './App.css';
import Router from 'Router';
import './style/color.css';
import './style/font.css';

function App() {
  return (
    <AppContainer className="App">
      <Router />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
`;
