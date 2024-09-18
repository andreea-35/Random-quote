import logo from './logo.svg';
import './App.css';
import RandomQuote from './Components/Random-Quote/RandomQuote';
import CreditsBar from './Components/Credits/Credits';
import Title from './Components/Title/Title';

function App() {
  return (
    <div>
      <Title/> 
      <RandomQuote/> 
      <CreditsBar/>
    </div>
  );
}

export default App;
