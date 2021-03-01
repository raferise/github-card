import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleableCard from './components/ToggleableCard';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';


function App() {
  const [form, setForm] = useState({final:"infinitymeme",current:""});

  function handleFormChange(event) {
    setForm((form) => ({...form, current:event.target.value}));
  }
  function finalize() {
    setForm((form) => ({...form, final:form.current}));
  }
  function handleKeyPress(event) {
    if (event.code === "Enter") finalize();
  }

  return (
    <div className="App" style={{ textAlign:"left", padding:"10px" }}>
      <InputGroup className="mb-3" onKeyPress={handleKeyPress}>
        <FormControl value={form.current} onChange={handleFormChange}
          placeholder="Github username"
          aria-label="Github username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-primary" onClick={finalize}>Update Card</Button>
        </InputGroup.Append>
      </InputGroup>
      <ToggleableCard username={form.final}></ToggleableCard>
    </div>
  );
}

export default App;