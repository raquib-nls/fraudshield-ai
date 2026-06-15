package com.fraud.fraud_backend.repository;

import com.fraud.fraud_backend.entity.FraudAlert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FraudAlertRepository
        extends JpaRepository<FraudAlert, Long> {
}