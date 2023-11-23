package com.example.demo.repositories;

import com.example.demo.entities.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Integer> {

    @Query(value = "select * from review where help_id = :help_id", nativeQuery = true)
    Optional<Review> findByHelpId(int help_id);

    @Query(value = "select * from review where user_id = :user_id", nativeQuery = true)
    List<Review> findAllByUserId(int user_id);

    @Query(value = "SELECT COUNT(*) FROM review WHERE user_id = :user_id AND review_value = :review_value", nativeQuery = true)
    Long countByUser_idAndReview_value(int user_id, int review_value);
}
