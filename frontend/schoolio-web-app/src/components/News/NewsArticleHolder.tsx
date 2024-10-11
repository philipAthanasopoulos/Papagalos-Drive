import {useEffect, useState} from "react";
import {NewsArticleComponent} from "./NewsArticleComponent";
import {ArticleDTO} from "./ArticleDTO";
import {webApi} from "../../env/env";
import axios from "axios";
import {Container} from "react-bootstrap";


export const NewsArticleHolder = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [newsArticles, setNewsArticles] = useState<ArticleDTO[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            console.log(webApi)
            try {
                const response = await axios.get<ArticleDTO[]>(`${webApi}/news`);
                const newArticles = response.data.map(article => new ArticleDTO(article));
                setNewsArticles(newArticles);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                fetchNews();
            }
        };
        fetchNews();
    }, []);

    return (
        <Container className="pt-5">
            <>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {newsArticles.map((article) => (
                            <NewsArticleComponent key={article.id} article={article} />
                        ))}
                    </ul>
                )}
            </>
        </Container>
    );
}