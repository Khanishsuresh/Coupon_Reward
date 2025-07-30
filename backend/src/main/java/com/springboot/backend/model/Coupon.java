package com.springboot.backend.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "coupon")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String couponCode;
    
    @Column(nullable = false)
    private Long discountAmount;
    
    @Column(nullable = false)
    private Long minimumOrderAmount;
    
    @Column(nullable = false)
    private LocalDate validTill;
    
    @Column(nullable = false)
    private Boolean isValid;

    public Coupon() {
        this.isValid = true;
    }

    public Coupon(String couponCode, Long discountAmount, Long minimumOrderAmount, LocalDate validTill) {
        this();
        this.couponCode = couponCode;
        this.discountAmount = discountAmount;
        this.minimumOrderAmount = minimumOrderAmount;
        this.validTill = validTill;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public LocalDate getValidTill() {
        return validTill;
    }

    public void setValidTill(LocalDate validTill) {
        this.validTill = validTill;
    }

    public Boolean getIsValid() {
        return isValid;
    }

    public void setIsValid(Boolean isValid) {
        this.isValid = isValid;
    }

    public Long getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Long discountAmount) {
        this.discountAmount = discountAmount;
    }

    public Long getMinimumOrderAmount() {
        return minimumOrderAmount;
    }

    public void setMinimumOrderAmount(Long minimumOrderAmount) {
        this.minimumOrderAmount = minimumOrderAmount;
    }
}
