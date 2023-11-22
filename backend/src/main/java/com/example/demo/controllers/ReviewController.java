package com.example.demo.controllers;

import com.example.demo.entities.Review;
import com.example.demo.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping(value = "/addreview", consumes = {"*/*"})
    public ResponseEntity addReview(@RequestParam int user_id, @RequestParam int help_id,
                                    @RequestParam int value) {

        if (value >= 1 && value <= 5) {
            if (reviewRepository.findByHelpId(help_id).isPresent()) {
                var review = reviewRepository.findByHelpId(help_id).get();
                review.setReview_value(value);
                reviewRepository.save(review);
                return ResponseEntity.ok(review);
            }else {
                Review newReview = Review.builder()
                        .user_id(user_id)
                        .help_id(help_id)
                        .review_value(value)
                        .build();
                reviewRepository.save(newReview);
                return ResponseEntity.ok(newReview);
            }
        } else {
            return ResponseEntity.badRequest().body("Value must be in range from 1 to 5");
        }
    }

    @GetMapping(value = "/findreview")
    public @ResponseBody Review getReviewByHelp(@RequestParam int help_id) {
        return reviewRepository.findByHelpId(help_id).orElse(null);
    }

    @GetMapping(value = "/averagerating")
    public @ResponseBody Float getAverageRating(@RequestParam int user_id) {
        List<Review> reviewList = reviewRepository.findAllByUserId(user_id);
        var sum = reviewList.stream().map(review -> review.getReview_value())
                .reduce(0, (subtotal, element) -> subtotal + element);

        return (float) sum / reviewList.size();
    }

}
