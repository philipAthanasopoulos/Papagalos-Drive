import { Col, Container, Row } from 'react-bootstrap';
import { Facebook, Github, Google, Instagram, Linkedin, Twitter } from 'react-bootstrap-icons';
import colors from '../colors';


export const Footer = () => {
  return (
    <div  className="text-white py-4" style={{background:`${colors.sandy_brown}`, flexShrink:"0"}}>
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left">
          </Col>
          <Col md={6} className="text-center text-md-right">
          <br />
            <div className="d-flex justify-content-center justify-content-md-end">
              <a href="https://facebook.com" className="text-white mx-2">
                <Facebook size={24} />
              </a>
              <a href="https://github.com" className="text-white mx-2">
                <Github size={24} />
              </a>
              <a href="https://google.com" className="text-white mx-2">
                <Google size={24} />
              </a>
              <a href="https://instagram.com" className="text-white mx-2">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-white mx-2">
                <Linkedin size={24} />
              </a>
              <a href="https://twitter.com" className="text-white mx-2">
                <Twitter size={24} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Papagalos Drive. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}