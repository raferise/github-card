import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleableCard from './components/ToggleableCard'


function App() {
  return (
    <div className="App" style={{ textAlign:"left", padding:"10px" }}>
      <ToggleableCard username="infinitymeme"></ToggleableCard>
    </div>
  );
}

export default App;
