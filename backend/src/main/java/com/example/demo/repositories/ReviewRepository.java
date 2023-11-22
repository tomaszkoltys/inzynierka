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


}
