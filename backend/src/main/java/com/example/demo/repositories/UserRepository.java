package com.example.demo.repositories;
import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    @Query(value = "update user set average_rating = :averageRating, rating_count= :ratingCount where id = :ratedUserId", nativeQuery = true)
    void addUserRating(int ratedUserId, float averageRating, int ratingCount);

    @Query(value = "select * from user where id = :ratedUserId", nativeQuery = true)
    Optional<User> findUser(int ratedUserId);

    @Query(value = """ 
            select * from user
            where name like '%'||:name||'%'
            or surname like '%'||:name||'%'
            and username like '%'||:username||'%'
            and email_address like '%'||:email_address||'%'
            and account_status = coalesce(:status, status)
            and role = coalesce(:role, role)
            """, nativeQuery = true)
    List<User> findAllWithFilters(String name, String username, String email_address, Integer status, Integer role);

    @Query(value = "update user set account_status=1 where id = :userId", nativeQuery = true)
    void unblockUser(int userId);

    @Query(value = "update user set account_status=2 where id = :userId", nativeQuery = true)
    void blockUser(int userId);

    @Query(value = "select * from user where username = :username", nativeQuery = true)
    Optional<User> findByUsername(String username);
    @Query(value = "select * from user where email_address = :email_address", nativeQuery = true)
    Optional<User> findByEmail(String email_address);

    @Query(value = "select * from user where id in (select user_id from user_notification_settings where new_help_offers = true)", nativeQuery = true)
    List<User> findAllForNewHelpOffersNotification();

    @Query(value = "select * from user where id in (select user_id from user_notification_settings where new_help_requests = true)", nativeQuery = true)
    List<User> findAllForNewHelpRequestsNotification();



    @Query(value = "update user set reset_password_code = :randomCode where id = :userId", nativeQuery = true)
    void updateRandomCode(int randomCode, int userId);




}
