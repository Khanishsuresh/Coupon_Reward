package com.springboot.backend.service;

import java.util.List;
import java.util.Optional;
import com.springboot.backend.model.UserPoints;
import com.springboot.backend.repository.UserPointsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPointsService {
    
    @Autowired
    private UserPointsRepository userPointsRepository;
    
    public UserPoints createUserPoints(UserPoints userPoints) {
        return userPointsRepository.save(userPoints);
    }
    
    public List<UserPoints> getAllUserPoints() {
        return userPointsRepository.findAll();
    }
    
    public Optional<UserPoints> getUserPointsById(Long id) {
        return userPointsRepository.findById(id);
    }
    
    public UserPoints updateUserPoints(Long id, UserPoints userPointsDetails) {
        Optional<UserPoints> userPointsOpt = userPointsRepository.findById(id);
        if (userPointsOpt.isPresent()) {
            UserPoints userPoints = userPointsOpt.get();
            userPoints.setTotalPoints(userPointsDetails.getTotalPoints());
            userPoints.setPointsEarned(userPointsDetails.getPointsEarned());
            userPoints.setPointsSpent(userPointsDetails.getPointsSpent());
            return userPointsRepository.save(userPoints);
        }
        return null;
    }
    
    public void deleteUserPoints(Long id) {
        userPointsRepository.deleteById(id);
    }
}
