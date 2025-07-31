package com.springboot.backend.repository;

import java.util.*;
import java.time.LocalDate;
import com.springboot.backend.model.Coupon;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByCouponCode(String couponCode);
    List<Coupon> findByIsValidTrue();
    
    @Query("SELECT c FROM Coupon c WHERE c.isValid = true AND c.validTill >= :currentDate")
    List<Coupon> findActiveValidCoupons(LocalDate currentDate);
    
    boolean existsByCouponCode(String couponCode);
}
