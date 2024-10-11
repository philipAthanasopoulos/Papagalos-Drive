package org.example.schoolioapi.service;

import org.example.schoolioapi.domain.NewsArticle;
import org.example.schoolioapi.repository.NewsArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsArticleService {
    private final NewsArticleRepository newsArticleRepository;

    public NewsArticleService(NewsArticleRepository newsArticleRepository) {
        this.newsArticleRepository = newsArticleRepository;
    }

    public void saveArticle(NewsArticle article) {
        this.newsArticleRepository.save(article);
    }

    public void deleteArticle(NewsArticle article) {
        this.newsArticleRepository.deleteById(article.getId());
    }

    public List<NewsArticle> getAllNews() {
        return newsArticleRepository.findAll();
    }
}
