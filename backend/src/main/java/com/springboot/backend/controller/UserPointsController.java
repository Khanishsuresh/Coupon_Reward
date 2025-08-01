package com.springboot.backend.controller;

import com.springboot.backend.model.UserPoints;
import com.springboot.backend.service.UserPointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/userpoints")
@CrossOrigin(origins = "*")
public class UserPointsController {
    
    @Autowired
    private UserPointsService userPointsService;
    
    @GetMapping
    public List<UserPoints> getAllUserPoints() {
        return userPointsService.getAllUserPoints();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserPoints> getUserPointsById(@PathVariable Long id) {
        UserPoints userPoints = userPointsService.getUserPointsById(id).orElse(null);
        if (userPoints != null) {
            return ResponseEntity.ok(userPoints);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public UserPoints createUserPoints(@RequestBody UserPoints userPoints) {
        return userPointsService.createUserPoints(userPoints);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserPoints> updateUserPoints(@PathVariable Long id, @RequestBody UserPoints userPoints) {
        UserPoints updated = userPointsService.updateUserPoints(id, userPoints);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserPoints(@PathVariable Long id) {
        userPointsService.deleteUserPoints(id);
        return ResponseEntity.ok().build();
    }
}
