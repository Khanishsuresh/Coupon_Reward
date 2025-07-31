package com.springboot.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "userPoints")
public class UserPoints {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long totalPoints;

    @Column(nullable = false)
    private Long pointsEarned;

    @Column(nullable = false)
    private Long pointsSpent;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UserPoints() {
        this.totalPoints = 0L;
        this.pointsEarned = 0L;
        this.pointsSpent = 0L;
    }

    public UserPoints(User user_id, Long totalPoints) {
        this();
        this.user = user_id;
        this.totalPoints = totalPoints;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user_id) {
        this.user = user_id;
    }

    public Long getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Long totalPoints) {
        this.totalPoints = totalPoints;
    }

    public Long getPointsEarned() {
        return pointsEarned;
    }

    public void setPointsEarned(Long pointsEarned) {
        this.pointsEarned = pointsEarned;
    }

    public Long getPointsSpent() {
        return pointsSpent;
    }

    public void setPointsSpent(Long pointsSpent) {
        this.pointsSpent = pointsSpent;
    }
}
