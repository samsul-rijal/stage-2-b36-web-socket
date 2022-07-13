// import hook
import React, { useEffect, useState } from 'react'

import NavbarAdmin from '../components/NavbarAdmin'
import { Container, Row, Col } from 'react-bootstrap'

// import components here
import Contact from '../components/complain/Contact'

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title
    
    // code here
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])

    const loadContact = () => {
        socket.emit("load custommer contacts")

        socket.on("custommer contacts", (data) => {
            console.log(data);

            
            let dataContacts = data.filter(item => item.status !== 'admin')

            dataContacts = dataContacts.map((item) => ({
                ...item,
                message: "Click here to start message"
            }))

            setContacts(dataContacts)
            console.log(dataContacts);
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
            <NavbarAdmin title={title} />
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
