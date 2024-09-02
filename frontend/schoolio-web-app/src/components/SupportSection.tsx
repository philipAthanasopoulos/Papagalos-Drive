import axios from 'axios'
import React from 'react'
import { Alert, Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Bug, ChatLeftText, Image, Laptop, Lightbulb, Pc, PcDisplay } from 'react-bootstrap-icons';
import colors from '../colors';


export const SupportSection = () => {

  const mailTypes = [
    {
      subject:"Bug",
      text:"Αναφορά bug",
      icon: <Bug/>,
      color: colors.red
    },
    {
      subject:"Suggetion",
      text:"Έχω κάτι να προτείνω",
      icon: <Lightbulb/>,
      color: colors.yellow

    },
    {
      subject:"General email",
      text:"Άλλο",
      icon: <ChatLeftText/>,
      color: colors.tealBlue
    },
];

  function openGmail(subject:string): void {
      const recipient = "papagalosdrive@gmail.com";
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}`;
      window.open(gmailUrl);
  }

  return (
    <Container>
      <Row>
        <Col>
          <Alert variant='info'>
            <ul>
              <li>
                <Laptop /> / <PcDisplay className='me-2'/> Συνιστούμε την αποστολή email μέσω υπολογιστή έναντι κινητής συσκευής.
              </li>
              <li>
                <Image className='me-2'/> Βοηθά ιδιαίτερα η αποστολή εικόνων ή βίντεο στο email σας.
              </li>
            </ul>
          </Alert>
        </Col>
      </Row>
      <Row>
        {mailTypes.map((type) => (
          <Col xs={12} sm={6} md={4} className='mb-2' key={type.subject}>
            <Button className='w-100' onClick={() => openGmail(type.subject)} style={{background:`${type.color}`, border:"none"}}>
              {type.icon} {type.text}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  )
}