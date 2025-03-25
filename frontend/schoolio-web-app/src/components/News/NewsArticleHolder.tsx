import {useEffect, useState} from "react";
import {NewsArticleComponent} from "./NewsArticleComponent";
import {NewsArticleDTO} from "./NewsArticleDTO";
import {apiBaseURL} from "../../env/env";
import axios from "axios";
import {Container} from "react-bootstrap";


export const NewsArticleHolder = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [newsArticles, setNewsArticles] = useState<NewsArticleDTO[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            console.log(apiBaseURL)
            try {
                const response = await axios.get<NewsArticleDTO[]>(`${apiBaseURL}/news`);
                const newArticles = response.data.map(article => new NewsArticleDTO(article));
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