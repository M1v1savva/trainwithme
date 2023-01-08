import React, { useState } from "react"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert';
import axios from "axios"
import './../App.css'

function Home({ tableData, setTableData }) {
    
    const HANDLE_URL = process.env.REACT_APP_PROD_HANDLE_URL;

    console.log('handle url')
    console.log(HANDLE_URL)

    const [handle, setHandle] = useState("");
    const [rank, setRank] = useState("");
    const [message, setMessage] = useState("");
    const [formStatus, setFormStatus] = useState(0);

    const onChange = (event) => {
        setHandle(event.target.value);
    }

    const changeUser = () => {
        setHandle("");
        setFormStatus(0);
    }

    const sendHandle = async() => {
        setFormStatus(1);
        try {
            const res = await axios.post(HANDLE_URL, {
                handle,
            })
            const newRank = res.data.rank;
            const newMessage = res.data.message;
            if (newRank === 'no user') {
                setFormStatus(3);
            } else {
                setRank(newRank);
                setMessage(newMessage);
                setFormStatus(2);
            }
        } catch(error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }  
        }
    }

    const getProfileLink = () => {
        const p1 = "https://codeforces.com/profile/"
        const p2 = handle
        return p1.concat(p2)
    }

    const getHandleLink = () => {
        const rank_to_style = {
            'unrated': 'handle-unrated',
            'headquarters': 'handle-black',
            'newbie': 'handle-grey',
            'pupil': 'handle-green',
            'specialist': 'handle-cyan',
            'expert': 'handle-blue',
            'candidate master': 'handle-purple',
            'master': 'handle-orange',
            'international master': 'handle-orange',
            'grandmaster': 'handle-red',
            'international grandmaster': 'handle-red',
            'legendary grandmaster': 'handle-nutella'
        }
        return (
            <a href={getProfileLink()} className={rank_to_style[rank]}>{handle}</a>
        )   
    }

    const getHandleComponent = () => {
        return (
            <div className='handle2'>
                {getHandleLink()}
            </div>
        )
    }

    const buildForm = () => {
        if (formStatus === 0) {
            return (
            <div>
            <Form className='form'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter your codeforces handle to load your total results.</Form.Label>
                    <Form.Control value={handle} onChange={onChange} type="text" placeholder="codeforces handle" />
                </Form.Group>
                <Button variant="success" type="submit" onClick={sendHandle}>
                    Search
                </Button>
            </Form>
            </div>
            )
        } else if (formStatus === 3) {
            return (
            <div>
            <Form className='form'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter your codeforces handle to load your total results.</Form.Label>
                    <Form.Control value={handle} onChange={onChange} type="text" placeholder="codeforces handle" />
                </Form.Group>
                <Alert className='invalid-handle' variant='danger'>
                    The handle you entered does not exist
                </Alert>
                <Button variant="success" type="submit" onClick={sendHandle}>
                    Search
                </Button>
            </Form>
            </div>
            )
        } else if (formStatus === 1) {
            return (
            <div>
                <p className='form'>Loading...</p> 
                <p className='form1'>This can take up to 20 seconds if the server was not used for a while.</p>
            </div>
            )
        } else if (formStatus === 2) {
            return (
            <div className='form'>
                <p className='handle1'>Loaded results for:</p>
                {getHandleComponent()}
                <p>{message}</p>
                <Button variant="warning" type="submit" onClick={changeUser}>
                    Change user
                </Button>
            </div>
            )     
        }
    }

    return (
      <div>
        <h1 className='title'>2023 weekly mashups</h1>
        <p className='title1'>Weekly 20-problem mashups from codeforces archive. </p>
        {buildForm()}
        <div className='mashups-list'>
          <h3>Mashups list</h3> 
          <h4 className='single-week'>Week #1, January 9-15</h4>
          <div className='single-contest-links'>
            <a className='single-link' href='https://codeforces.com/contestInvitation/dccfb1a6ca7e134ef3b233e87b1f7703304d3df8'>Contest link</a>
            <Link className='single-link' to='/standings'>Results</Link>
          </div>
        </div>
      </div>
    )
}

export default Home;