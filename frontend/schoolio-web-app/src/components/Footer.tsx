import { Col, Container, Row } from 'react-bootstrap';
import { Facebook, Github, Google, Instagram, Linkedin, Twitter } from 'react-bootstrap-icons';
import colors from '../colors';


export const Footer = () => {
  return (
    <div className="text-white" style={{background:`${colors.sandy_brown}`, flexShrink:"0"}}>
  <Container>
    <Row className="pt-4 pb-3">
      <Col className="text-center">
        <p>&copy; {new Date().getFullYear()} Papagalos Drive. All rights reserved.</p>
      </Col>
    </Row>
  </Container>
</div>
  );
}