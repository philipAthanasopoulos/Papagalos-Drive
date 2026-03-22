import {Container, Row} from 'react-bootstrap';
import colors from '../colors';


export const Footer = () => {
    return (
        <Container fluid className="text-white" style={{background: `${colors.sandy_brown}`}}>
            <Row className="pt-4 pb-3 text-center">
                <p>&copy; {new Date().getFullYear()} Papagalos Drive. All rights reserved.</p>
            </Row>
        </Container>
    );
}