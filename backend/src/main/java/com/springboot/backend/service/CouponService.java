package com.springboot.backend.service;

import java.util.List;
import java.util.Optional;
import com.springboot.backend.model.Coupon;
import org.springframework.stereotype.Service;
import com.springboot.backend.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CouponService {
    
    @Autowired
    private CouponRepository couponRepository;

    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }
    
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }
    
    public Optional<Coupon> getCouponById(Long id) {
        return couponRepository.findById(id);
    }
    
    public Coupon updateCoupon(Long id, Coupon couponDetails) {
        Optional<Coupon> couponOpt = couponRepository.findById(id);
        if (couponOpt.isPresent()) {
            Coupon coupon = couponOpt.get();
            coupon.setCouponCode(couponDetails.getCouponCode());
            coupon.setDiscountAmount(couponDetails.getDiscountAmount());
            coupon.setMinimumOrderAmount(couponDetails.getMinimumOrderAmount());
            coupon.setValidTill(couponDetails.getValidTill());
            coupon.setIsValid(couponDetails.getIsValid());
            return couponRepository.save(coupon);
        }
        return null;
    }
    
    public void deleteCoupon(Long id) {
        couponRepository.deleteById(id);
    }
}
