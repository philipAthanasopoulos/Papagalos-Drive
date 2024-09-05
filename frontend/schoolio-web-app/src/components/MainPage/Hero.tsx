import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import notesImage from '../../images/notes.jpg'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import notes from '../../images/notes.jpg'
import study from '../../images/undraw_Reading_time_re_phf7.png'
import grades from '../../images/undraw_Teacher_re_sico.png'
import college from "../../images/college.gif"
import colors from '../../colors'
import { Link } from 'react-router-dom'
import { Youtube } from 'react-bootstrap-icons'

const Hero = () => {
  return (
    <div>
        <div className="d-flex flex-column align-items-center justify-content-center bg-white text-dark" >
            <Image src={college} width={370}></Image>
            <h1 className="display-4 text-center">
                <b>Βρές σημειώσεις από όλη την Ελλάδα</b>
            </h1>
            <Col>
            </Col>
            <p className="lead text-center">We are glad to have you here.</p>
            <Link to={"/"}>
                <Button size='lg' style={{background:`${colors.yellow}`,border:"none"}}>Δες δωρεάν!</Button>
            </Link>
        </div>

        <div className="d-flex vw-100 vh-100 align-items-center justify-content-center bg-light text-dark">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="mb-4 mb-md-0">
                        <Image src={study} alt="Notes" className="w-100 shadow-lg" />
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-start">
                        <h2>Discover Notes from All Over Greece</h2>
                        <p className="lead">Find notes from various subjects and universities.</p>
                    </Col>
                </Row>
            </Container>
        </div>

        <div className="d-flex vw-100 vh-100 align-items-center justify-content-center bg-light text-dark">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0">
                        <h2>Discover Notes from All Over Greece</h2>
                        <p className="lead">Find notes from various subjects and universities.</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <Image src={grades} alt="Notes" className="w-100 shadow-lg" />
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
  )
}

export default Hero