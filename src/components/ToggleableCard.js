import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import GithubAPI from '../apis/GithubAPI';

function ToggleableCard(props) {
    const [showUser, setShowUser] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (showUser && props.username !== userData.login) {
            GithubAPI.getUser(props.username).then((user) => {
                user.fetched = true;
                setUserData(user);
            });
        }
    }, [props.username, userData.login, showUser]);

    function handleToggle() {
        setShowUser(state => !state);
    }

    return (
        <>
            <Button variant="primary" onClick={handleToggle}>Toggle Card</Button>
            {showUser && 
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={userData.avatar_url} />
                    {(userData.fetched ? 
                        <>
                            <Card.Body>
                                <Card.Title>{userData.name}</Card.Title>
                                <Card.Subtitle className="text-muted" style={{marginBottom:".25rem"}}>{userData.login}</Card.Subtitle>
                                <Card.Text>
                                    {userData.bio ? userData.bio : "Github user"}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <svg className="mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
                                <span className="">Repositories:</span> {userData.public_repos}
                            </Card.Footer>
                        </>
                        :
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Spinner animation="border" role="status" style={{textAlign: "center"}}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>)
                    }
                </Card>
            }
        </>
    )
}

export default ToggleableCard;