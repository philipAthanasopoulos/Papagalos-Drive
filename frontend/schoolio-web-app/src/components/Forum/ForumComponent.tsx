import {Button, Card, Container, Row} from "react-bootstrap";
import colors from "../../colors";

export const ForumComponent = () => {
    return (
        <Container>
            <Card className="d-flex justify-content-center align-items-center w-auto">
                <Card.Body className="text-center">
                    <Card.Title>📬Forum</Card.Title>
                    <Card.Text>
                        🚧🦺 Υπό κατασκευή! 🏗️🚧
                    </Card.Text>
                </Card.Body>

                <Card.Link href="/" className="mb-3">
                    <Button style={{backgroundColor: colors.shamrock_green}} className="border-0">⬅️Αρχική</Button>
                </Card.Link>
            </Card>
        </Container>

    )
}