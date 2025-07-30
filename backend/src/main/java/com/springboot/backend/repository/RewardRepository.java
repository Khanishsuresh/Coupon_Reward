package com.springboot.backend.repository;

import java.util.*;
import com.springboot.backend.model.Reward;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
    Optional<Reward> findByRewardCode(String rewardCode);
    List<Reward> findByIsActiveTrue();
    
    @Query("SELECT r FROM Reward r WHERE r.isActive = true AND r.pointsRequired <= :userPoints")
    List<Reward> findAffordableRewards(Long userPoints);
    
    boolean existsByRewardCode(String rewardCode);
}
