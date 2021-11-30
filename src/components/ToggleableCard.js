import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import GithubCard from "./GithubCard";


function ToggleableCard(props) {
    const [showUser, setShowUser] = useState(false);
    function handleToggle() {
        setShowUser(state => !state);
    }
    return (
        <>
            <Button variant="primary" onClick={handleToggle}>Toggle Card</Button>
            {showUser && <GithubCard username={props.username}></GithubCard>}
        </>
    )
}

export default ToggleableCard;