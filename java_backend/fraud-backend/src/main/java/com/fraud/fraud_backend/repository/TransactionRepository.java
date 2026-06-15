package com.fraud.fraud_backend.repository;

import com.fraud.fraud_backend.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository
        extends JpaRepository<TransactionEntity, Long> {
}