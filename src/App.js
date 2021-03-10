import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleableCard from './components/ToggleableCard';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import GithubAPI from './apis/GithubAPI';
import {useState, useRef} from 'react';


function App() {
  const [form, setForm] = useState({final:"infinitymeme",current:""});
  const suggestionsBox = useRef();
  const [suggestions, setSuggestions] = useState([]);

  function handleFormChange(event) {
    setForm((form) => ({...form, current:event.target.value}));
  }
  function finalize() {
    setForm((form) => ({...form, final:form.current}));
    GithubAPI.getSuggestions(form.current).then(r => setSuggestions(r));
  }
  function handleUseSuggestion(event) {
    setForm({final:event.target.innerText, current:event.target.innerText});
  }
  function handleKeyPress(event) {
    if (event.code === "Enter") finalize();
  }
  function handleFocusIn(event) {
    suggestionsBox.current.style.transitionDuration = "0"; //disable transitions
    suggestionsBox.current.style.height = "auto"; //calc auto height
    let h = suggestionsBox.current.clientHeight; //store auto height
    suggestionsBox.current.style.height = "0px"; //back to 0
    suggestionsBox.current.style.transitionDuration = ""; //enable transitions
    if (!suggestionsBox.current.clientHeight) //eval of clientHeight for transition
    suggestionsBox.current.style.height = h+"px"; //apply auto height and watch the transition fly
  }
  function handleFocusOut(event) {
    suggestionsBox.current.style.height = "0px";
  }

  return (
    <div className="App">
      <InputGroup className="mb-3" onKeyPress={handleKeyPress}>
          <ListGroup className="suggestions" ref={suggestionsBox}>
            {suggestions.items && suggestions.items.map(user => ( 
              <ListGroup.Item action onMouseDown={handleUseSuggestion} key={user.id}>
                {user.login}
              </ListGroup.Item>
              ))}
          </ListGroup>
        <FormControl value={form.current}
          onChange={handleFormChange}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
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