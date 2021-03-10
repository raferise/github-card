import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleableCard from './components/ToggleableCard';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import GithubAPI from './apis/GithubAPI';
import { useState, useRef, useEffect } from 'react';
import { getDebouncer } from "./apis/DebounceAPI";


function App() {
  //form holds current text input value {current} and last submitted value {final}
  const [form, setForm] = useState({final:"infinitymeme",current:""});
  const suggestionsBox = useRef(); //component ref for manual sizing for transitions
  const formInput = useRef(); //component ref for checking if focused
  const [suggestions, setSuggestions] = useState([]); //array of search results for username suggestions
  const [showSuggestions, setShowSuggestions] = useState(true);

  //use a ref so the timers persist thru renders
  //unfortunately it makes it kinda ugly to call since you add a .current but that's just react
  const getSuggestions = useRef(getDebouncer(loadSuggestions, 500));
  function loadSuggestions(partialUsername) {
    if (partialUsername) GithubAPI.getSuggestions(partialUsername).then(suggs => {
      setSuggestions(suggs);
    });
  }
  
  function handleFormChange(event) {
    setForm((form) => ({...form, current:event.target.value}));
    setShowSuggestions(true);
    getSuggestions.current(event.target.value);
  }
  function finalize() {
    setForm((form) => ({...form, final:form.current}));
    setShowSuggestions(false);
  }
  function handleUseSuggestion(event) {
    setForm({final:event.target.innerText, current:event.target.innerText});
  }
  function handleKeyDown(event) {
    if (event.code === "Enter") {
      finalize();
    } else if (event.code === "Tab") {
      handleFocusIn();
      event.preventDefault();
    }
  }
  useEffect(() => {
    //handles animations on search bar
    if (showSuggestions) {
      suggestionsBox.current.style.transitionDuration = "0"; //disable transitions
      suggestionsBox.current.style.height = "auto"; //calc auto height
      let h = suggestionsBox.current.clientHeight; //store auto height
      suggestionsBox.current.style.height = "0px"; //back to 0
      suggestionsBox.current.style.transitionDuration = ""; //enable transitions
      if (!suggestionsBox.current.clientHeight) //eval of clientHeight for transition
      suggestionsBox.current.style.height = h+"px"; //apply auto height and watch the transition fly
    } else {
      suggestionsBox.current.style.height = "0px";
    }
  }, [showSuggestions, suggestions])

  function handleFocusIn(event) {
    setShowSuggestions(true);
  }
  function handleFocusOut(event) {
    setShowSuggestions(false);
  }

  return (
    <div className="App">
      <InputGroup className="mb-3" onKeyDown={handleKeyDown}>
          <ListGroup className="suggestions" ref={suggestionsBox}>
            {suggestions.items && suggestions.items.map(user => ( 
              // use mouse down instead of click since blur happens on mouse down, not mouse up
              // causing the box to minimize
              <ListGroup.Item action onMouseDown={handleUseSuggestion} key={user.id}>
                {user.login}
              </ListGroup.Item>
              ))}
          </ListGroup>
        <FormControl value={form.current}
          onChange={handleFormChange}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
          onClick={handleFocusIn}
          ref={formInput}
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