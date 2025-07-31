package com.springboot.backend.service;

import java.util.List;
import java.util.Optional;
import com.springboot.backend.model.Reward;
import com.springboot.backend.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardService {
    
    @Autowired
    private RewardRepository rewardRepository;
    
    public Reward createReward(Reward reward) {
        return rewardRepository.save(reward);
    }
    
    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }
    
    public Optional<Reward> getRewardById(Long id) {
        return rewardRepository.findById(id);
    }
    
    public Reward updateReward(Long id, Reward rewardDetails) {
        Optional<Reward> rewardOpt = rewardRepository.findById(id);
        if (rewardOpt.isPresent()) {
            Reward reward = rewardOpt.get();
            reward.setRewardCode(rewardDetails.getRewardCode());
            reward.setPointsRequired(rewardDetails.getPointsRequired());
            reward.setRewardValue(rewardDetails.getRewardValue());
            reward.setIsActive(rewardDetails.getIsActive());
            return rewardRepository.save(reward);
        }
        return null;
    }
    
    public void deleteReward(Long id) {
        rewardRepository.deleteById(id);
    }
}
