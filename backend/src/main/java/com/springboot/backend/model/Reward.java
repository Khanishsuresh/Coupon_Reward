package com.springboot.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reward")
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String rewardCode;
    
    @Column(nullable = false)
    private Long pointsRequired;
    
    @Column(nullable = false)
    private Long rewardValue;
    
    @Column(nullable = false)
    private Boolean isActive;

    public Reward() {
        this.isActive = true;
    }

    public Reward(String rewardCode, Long pointsRequired, Long rewardValue) {
        this();
        this.rewardCode = rewardCode;
        this.pointsRequired = pointsRequired;
        this.rewardValue = rewardValue;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRewardCode() {
        return rewardCode;
    }

    public void setRewardCode(String rewardCode) {
        this.rewardCode = rewardCode;
    }

    public Long getPointsRequired() {
        return pointsRequired;
    }

    public void setPointsRequired(Long pointsRequired) {
        this.pointsRequired = pointsRequired;
    }

    public Long getRewardValue() {
        return rewardValue;
    }

    public void setRewardValue(Long rewardValue) {
        this.rewardValue = rewardValue;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
