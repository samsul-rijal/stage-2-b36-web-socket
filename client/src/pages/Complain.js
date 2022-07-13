// import hook
import React, { useEffect } from 'react'

import Navbar from '../components/Navbar'
import { Container, Row, Col } from 'react-bootstrap'

// import components here
import Contact from '../components/complain/Contact'

// import socket.io-client 
import {io} from 'socket.io-client'
import { useState } from 'react'

// initial variable outside component
let socket
export default function Complain() {
    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    // code here
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])

    const loadContact = () => {
        socket.emit("load admin contact")

        socket.on("admin contact", (data) => {
            console.log(data);

            const dataContact = {
                ...data,
                message: "Click here to start message"
            }
            setContacts([dataContact])
        })
    }

    useEffect(() =>{
        socket = io('http://localhost:5000')
        // code here
        loadContact()

        return () => {
            socket.disconnect()
        }
    }, [])

    // code here
    const onClickContact = (data) => {
        console.log(data);
        setContact(data)
    }
    
    return (
        <>
            <Navbar title={title} />
            {/* code here */}
            <Container>
                <Row>
                    <Col>
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
