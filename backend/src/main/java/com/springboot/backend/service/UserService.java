package com.springboot.backend.service;

import java.util.List;
import java.util.Optional;
import com.springboot.backend.model.User;
import org.springframework.stereotype.Service;
import com.springboot.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public User updateUser(Long id, User userDetails) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            return userRepository.save(user);
        }
        return null;
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
