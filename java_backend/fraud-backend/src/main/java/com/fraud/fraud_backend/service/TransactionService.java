package com.fraud.fraud_backend.service;

import com.fraud.fraud_backend.dto.FraudRequest;
import com.fraud.fraud_backend.dto.FraudResponse;
import com.fraud.fraud_backend.entity.TransactionEntity;
import com.fraud.fraud_backend.repository.TransactionRepository;

import java.time.LocalDateTime;


import org.springframework.stereotype.Service;
import com.fraud.fraud_backend.entity.FraudAlert;
import com.fraud.fraud_backend.repository.FraudAlertRepository;

@Service
public class TransactionService {

    private final TransactionRepository repository;
    private final FastApiService fastApiService;
    private final FraudAlertRepository alertRepository;

    public TransactionService(
            TransactionRepository repository,
            FastApiService fastApiService,
            FraudAlertRepository alertRepository) {

        this.repository = repository;
        this.fastApiService = fastApiService;
        this.alertRepository = alertRepository;
    }

    public FraudResponse processTransaction(
            FraudRequest request) {

        FraudResponse response = fastApiService.getFraudScore(request);

        TransactionEntity tx = new TransactionEntity();
        tx.setSender(request.getSender());

        tx.setReceiver(request.getReceiver());

        tx.setAmount(request.getAmount());

        tx.setTimestamp(LocalDateTime.now());

        tx.setFraudScore(
                response.getFraud_score());

        tx.setIsFraud(
                response.getIs_fraud());

        tx.setRiskLevel(
                response.getRisk_level());

        repository.save(tx);

        if (response.getFraud_score() >= 0.001) {

            FraudAlert alert = new FraudAlert();

            alert.setFraudScore(
                    response.getFraud_score());

            alert.setRiskLevel(
                    response.getRisk_level());

            alert.setStatus("OPEN");

            alertRepository.save(alert);
        }

        return response;
    }
}