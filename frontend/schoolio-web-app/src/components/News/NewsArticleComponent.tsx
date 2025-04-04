import {Card, Container} from "react-bootstrap";
import {NewsArticleDTO} from "./NewsArticleDTO";
import React from "react";
import colors from "../../colors"; // Import the colors

type Props = {
    article: NewsArticleDTO
};

export const NewsArticleComponent = (props: Props) => {
    return (
        <Container>
            <Card className="mb-3" style={{ backgroundColor: "white", color: colors.black }}>
                <Card.Body>
                    <Card.Title style={{ color: colors.carrot_orange }}>{props.article.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.article.postDate.toString()}</Card.Subtitle>
                    <Card.Text>{props.article.content}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}