import {Card, Col, Container} from "react-bootstrap";
import {NewsArticleDTO} from "./NewsArticleDTO";
import React from "react";
import colors from "../../colors"; // Import the colors

type Props = {
    article: NewsArticleDTO
};

export const NewsArticleComponent = (props: Props) => {
    return (
        <Container>
            <Col md={5}>
                <Card className="mb-5">
                    <Card.Header className="fw-bold h4 text-light" style={{backgroundColor: colors.shamrock_green}}>
                        📌{props.article.title}
                    </Card.Header>
                    <Card.Body className="bg-light">
                        {props.article.content}
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        🗓️{new Date(props.article.postDate).toLocaleDateString()} |
                        🕑{new Date(props.article.postDate).toLocaleTimeString()}
                    </Card.Footer>
                </Card>
            </Col>
        </Container>
    )
}