import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import GithubAPI from '../apis/GithubAPI';

function ToggleableCard(props) {
    const [showUser, setShowUser] = useState(false);
    const [userData, setUserData] = useState({fetched:false});

    useEffect(() => {
        GithubAPI.getUser(props.username).then((user) => {
            user.fetched = true;
            setUserData(user);
        });
    }, [props.username]);

    function toggle() {
        setShowUser(state => !state);
    }

    return (
        <>
            <Button variant="primary" onClick={toggle}>Toggle User</Button>
            {showUser && (userData.fetched ? <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={userData.avatar_url} />
                <Card.Body>
                    <Card.Title>{userData.name}</Card.Title>
                    <Card.Subtitle>{userData.login}</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card> : <div>Loading...</div>)}
        </>
    )
}

export default ToggleableCard;