package com.fraud.fraud_backend.controller;

import com.fraud.fraud_backend.entity.FraudAlert;
import com.fraud.fraud_backend.entity.TransactionEntity;
import com.fraud.fraud_backend.repository.FraudAlertRepository;
import com.fraud.fraud_backend.repository.TransactionRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class TransactionController {

    private final TransactionRepository transactionRepository;
    private final FraudAlertRepository fraudAlertRepository;

    public TransactionController(
            TransactionRepository transactionRepository,
            FraudAlertRepository fraudAlertRepository) {

        this.transactionRepository = transactionRepository;
        this.fraudAlertRepository = fraudAlertRepository;
    }

    @GetMapping("/transactions")
    public List<TransactionEntity> getTransactions() {
        return transactionRepository.findAll();
    }

    @PostMapping("/transactions")
    public TransactionEntity createTransaction(
            @RequestBody TransactionEntity tx) {

        tx.setTimestamp(LocalDateTime.now());

        TransactionEntity saved =
                transactionRepository.save(tx);

        // Auto-create alert for HIGH risk transactions
        if ("HIGH".equalsIgnoreCase(tx.getRiskLevel())) {

            FraudAlert alert = new FraudAlert();

            alert.setFraudScore(tx.getFraudScore());
            alert.setRiskLevel(tx.getRiskLevel());
            alert.setStatus("OPEN");

            fraudAlertRepository.save(alert);
        }

        return saved;
    }
}