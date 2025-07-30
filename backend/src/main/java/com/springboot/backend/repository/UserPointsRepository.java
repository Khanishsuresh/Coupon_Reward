package com.springboot.backend.repository;

import java.util.Optional;
import com.springboot.backend.model.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPointsRepository extends JpaRepository<UserPoints, Long> {
    Optional<UserPoints> findByUser(User user);
    Optional<UserPoints> findByUserId(Long userId);
    
    @Query("SELECT up FROM UserPoints up WHERE up.user.id = :userId")
    Optional<UserPoints> findPointsByUserId(Long userId);
    
    @Query("SELECT SUM(up.totalPoints) FROM UserPoints up")
    Long getTotalPointsInSystem();
}
