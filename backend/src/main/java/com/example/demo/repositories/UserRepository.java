package com.example.demo.repositories;
import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
   /* @Query(value = "update user set average_rating = :averageRating, rating_count= :ratingCount where id = :ratedUserId", nativeQuery = true)
    void addUserRating(int ratedUserId, float averageRating, int ratingCount);*/

    @Query(value = "select * from users where id = :ratedUserId", nativeQuery = true)
    Optional<User> findUser(int ratedUserId);

    @Query(value = """ 
            select * from users
            where name like '%'||:name||'%'
            or surname like '%'||:name||'%'
            and username like '%'||:username||'%'
            and email_address like '%'||:email_address||'%'
            and account_status = coalesce(:status, status)
            and role = coalesce(:role, role)
            """, nativeQuery = true)
    List<User> findAllWithFilters(String name, String username, String email_address, Integer status, Integer role);

    @Query(value = "update users set account_status=1 where id = :userId", nativeQuery = true)
    void unblockUser(int userId);

    @Query(value = "update users set account_status=2 where id = :userId", nativeQuery = true)
    void blockUser(int userId);

    @Query(value = "select * from users where username = :username", nativeQuery = true)
    Optional<User> findByUsername(String username);

}
