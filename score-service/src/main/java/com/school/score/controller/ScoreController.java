package com.school.score.controller;

import com.school.score.model.Score;
import com.school.score.repository.ScoreRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scores")
@CrossOrigin
public class ScoreController {

    private final ScoreRepository repository;

    public ScoreController(ScoreRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Score addScore(@RequestBody Score score) {
        return repository.save(score);
    }

    @GetMapping
    public List<Score> getScores() {
        return repository.findAll();
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
