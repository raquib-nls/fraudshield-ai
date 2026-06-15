package com.fraud.fraud_backend.service;

import com.fraud.fraud_backend.entity.TransactionEntity;
import com.fraud.fraud_backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MuleDetectionService {

    private final TransactionRepository repository;

    public MuleDetectionService(
            TransactionRepository repository) {

        this.repository = repository;
    }

    public Map<String, Integer> detectMuleAccounts() {

        List<TransactionEntity> transactions =
                repository.findAll();

        Map<String, Integer> receiverCount =
                new HashMap<>();

        for (TransactionEntity tx : transactions) {

            String receiver = tx.getReceiver();

            receiverCount.put(
                    receiver,
                    receiverCount.getOrDefault(
                            receiver, 0) + 1);
        }

        Map<String, Integer> suspiciousAccounts =
                new HashMap<>();

        for (Map.Entry<String, Integer> entry :
                receiverCount.entrySet()) {

            if (entry.getValue() >= 2) {

                suspiciousAccounts.put(
                        entry.getKey(),
                        entry.getValue());
            }
        }

        return suspiciousAccounts;
    }
}