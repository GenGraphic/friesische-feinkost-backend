import React, {useState, useEffect} from 'react';
import { json, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LogIn = () => {
    const [inputAdmin, setInputAdmin] = useState('');
    const [inputPass, setInputPass] = useState('');
    const navigator = useNavigate();

    useEffect(() => {
        handleLogOut();
    }, [])

    //first make sure user is loged out
    const handleLogOut = () => {
        fetch('https://friesische-feinkost.de/api/log_out.php')
        .then(response => response.json())
        .then(data => {
            if(data.success === true) {
                navigator('/');
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    //handle log in and modify the status in db
    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('adminName', inputAdmin);
        formData.append('adminPass', inputPass)

        try {
            const response = await fetch('https://friesische-feinkost.de/api/log_in.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({inputAdmin, inputPass}),
            });
            const data = await response.json();

            if (data) {
                console.log('Login successful');
                navigator('/Locations');
            } else {
                alert("Sie haben falsche Admin Name oder Password eingegeben, versuchen Sie nochmal. Wenn Sie weiter Probleme haben, kontaktieren Sie ihre Developer: gengraphicservices@gmail.com")
            }
        } catch (error) {
            console.log(json(error));
            alert("Sie haben falsche Admin Name oder Password eingegeben, versuchen Sie nochmal. Wenn Sie weiter Probleme haben, kontaktieren Sie ihre Developer: gengraphicservices@gmail.com")
        }
    }

  return (
    <Container className='position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center'>
        <img src={require('../img/logo.png')} alt="Logo" width={500}/>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Admin Name</Form.Label>
                <Form.Control type="email" placeholder="Admin Name eingeben" onChange={(e) => setInputAdmin(e.target.value)}/>
                <Form.Text className="text-muted">
                Bitte teilen Sie es mit niemandem!
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setInputPass(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>
                Submit
            </Button>
        </Form>
    </Container>
    
  )
}

export default LogIn
