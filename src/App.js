import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleableCard from './components/ToggleableCard';
import GithubCard from './components/GithubCard';
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
      //workaround for the fact that height:auto doesn't have transitions
      let preHeight = suggestionsBox.current.clientHeight;
      suggestionsBox.current.style.transitionDuration = "0"; //disable transitions
      suggestionsBox.current.style.height = "auto"; //calc auto height (what it should be)
      let autoHeight = suggestionsBox.current.clientHeight;
      suggestionsBox.current.style.height = preHeight+"px"; //back to what it was
      suggestionsBox.current.style.transitionDuration = ""; //enable transitions
      if (suggestionsBox.current.clientHeight || true) { //forces re-eval of clientHeight for css transition, wrapped in if so ESLint doesn't complain about unused expressions
        suggestionsBox.current.style.height = autoHeight+"px"; //apply auto height and watch the transition fly
      }
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
          placeholder="Github username"
          aria-label="Github username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-primary" onClick={finalize}>Update Card</Button>
        </InputGroup.Append>
        
      </InputGroup>
      <GithubCard username={form.final}></GithubCard>
      <h3>Toggleable Version:</h3>
      <ToggleableCard username={form.final}></ToggleableCard>
    </div>
  );
}

export default App;