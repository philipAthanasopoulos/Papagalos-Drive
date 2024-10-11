package org.example.schoolioapi.controller;

import org.example.schoolioapi.domain.NewsArticle;
import org.example.schoolioapi.service.NewsArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class NewsArticleController {
    private final NewsArticleService newsArticleService;

    public NewsArticleController(NewsArticleService newsArticleService) {
        this.newsArticleService = newsArticleService;
    }

    @GetMapping("/news")
    public List<NewsArticle> getAllNews() {
        return newsArticleService.getAllNews();
    }

    @PostMapping("/news")
    public void createArticle(@RequestParam String title, @RequestParam String content) {
        newsArticleService.saveArticle(new NewsArticle(title, content));
    }

}
