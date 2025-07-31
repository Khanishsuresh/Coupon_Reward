package com.springboot.backend.controller;

import com.springboot.backend.model.Reward;
import com.springboot.backend.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "*")
public class RewardController {
    
    @Autowired
    private RewardService rewardService;
    
    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Reward> getRewardById(@PathVariable Long id) {
        Reward reward = rewardService.getRewardById(id).orElse(null);
        if (reward != null) {
            return ResponseEntity.ok(reward);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public Reward createReward(@RequestBody Reward reward) {
        return rewardService.createReward(reward);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Reward> updateReward(@PathVariable Long id, @RequestBody Reward reward) {
        Reward updated = rewardService.updateReward(id, reward);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable Long id) {
        rewardService.deleteReward(id);
        return ResponseEntity.ok().build();
    }
}
