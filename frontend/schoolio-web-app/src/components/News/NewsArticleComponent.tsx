import {Card, Col, Container} from "react-bootstrap";
import {NewsArticleDTO} from "./NewsArticleDTO";
import React from "react";
import colors from "../../colors"; // Import the colors

type Props = {
    article: NewsArticleDTO,
    fire?: boolean
};

export const NewsArticleComponent = (props: Props) => {
    return (
        <Container>
            <Col md={5}>
                <Card className="mb-5">
                    <Card.Header className="fw-bold h4 text-light" style={{backgroundColor: colors.shamrock_green}}>
                        {props.fire && (<picture>
                            <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp"
                                    type="image/webp"/>
                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.gif" alt="🔥" width="32"
                                 height="32"/>
                        </picture>)}
                        📌{props.article.title}
                    </Card.Header>
                    <Card.Body className="bg-light">
                        {props.article.content}
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        🗓️{new Date(props.article.postDate).toLocaleDateString()} |
                        🕑{new Date(props.article.postDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                    </Card.Footer>
                </Card>
            </Col>
        </Container>
    )
}