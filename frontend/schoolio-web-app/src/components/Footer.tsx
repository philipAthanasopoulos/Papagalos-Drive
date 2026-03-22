import {Col, Container, Row} from 'react-bootstrap';
import {Github, Instagram} from 'react-bootstrap-icons';
import colors from '../colors';


export const Footer = () => {
    return (
        <Container fluid className="text-white py-4" style={{background: `${colors.shamrock_green}`}}>
            <Row className="text-center justify-content-center">
                <Col xs={12} className="mb-2">
                    <a href="https://github.com/philipAthanasopoulos/Papagalos-Drive" target="_blank"
                       rel="noreferrer" className="text-white me-3">
                        <Github size={22}/>
                    </a>
                    <a href="https://www.instagram.com/papagalos.drive/" target="_blank"
                       rel="noreferrer" className="text-white">
                        <Instagram size={22}/>
                    </a>
                </Col>
                <Col xs={12}>
                    <p className="mb-0 small">&copy; {new Date().getFullYear()} Papagalos Drive. All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    );
}