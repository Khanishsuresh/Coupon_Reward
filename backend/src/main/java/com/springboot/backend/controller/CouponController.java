package com.springboot.backend.controller;

import com.springboot.backend.model.Coupon;
import com.springboot.backend.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins = "*")
public class CouponController {
    
    @Autowired
    private CouponService couponService;
    
    @GetMapping
    public List<Coupon> getAllCoupons() {
        return couponService.getAllCoupons();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Coupon> getCouponById(@PathVariable Long id) {
        Coupon coupon = couponService.getCouponById(id).orElse(null);
        if (coupon != null) {
            return ResponseEntity.ok(coupon);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        return couponService.createCoupon(coupon);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Coupon> updateCoupon(@PathVariable Long id, @RequestBody Coupon coupon) {
        Coupon updated = couponService.updateCoupon(id, coupon);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        couponService.deleteCoupon(id);
        return ResponseEntity.ok().build();
    }
}
