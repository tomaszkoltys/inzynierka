package com.example.demo.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class UserNotificationSettings {
    @Id
    private Integer user_id;
    @Nonnull
    private boolean new_help_offers=false;
    @Nonnull
    private boolean new_help_requests=false;
    @Nonnull
    private boolean accepted_help_offers=false;
    @Nonnull
    private boolean accepted_help_requests=false;

   public UserNotificationSettings(int id){
         this.user_id = id;
    }


}

