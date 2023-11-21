package com.example.demo.repositories;

import com.example.demo.entities.Review;
import com.example.demo.entities.UserNotificationSettings;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserNotificationSettingsRepository extends CrudRepository<UserNotificationSettings, Integer> {
    @Query(value = "select * from user_notification_settings where user_id =:user_id", nativeQuery = true)
    Optional<UserNotificationSettings> getUserSettings(int user_id);



}
