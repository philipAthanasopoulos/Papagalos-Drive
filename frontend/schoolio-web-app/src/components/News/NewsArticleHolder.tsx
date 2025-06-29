import {useEffect, useState} from "react";
import {NewsArticleComponent} from "./NewsArticleComponent";
import {NewsArticleDTO} from "./NewsArticleDTO";
import {apiBaseURL} from "../../env/env";
import axios from "axios";
import {Container} from "react-bootstrap";
import LoadingComponent from "../Loading/LoadingComponent";


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
                    <LoadingComponent />
                ) : (
                    <ul>
                        {newsArticles.map((article,index) => (
                            <NewsArticleComponent key={article.id} article={article} fire={index===0}/>
                        ))}
                    </ul>
                )}
            </>
        </Container>
    );
}