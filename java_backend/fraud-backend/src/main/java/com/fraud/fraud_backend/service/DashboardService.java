package com.fraud.fraud_backend.service;

import com.fraud.fraud_backend.dto.DashboardStats;
import com.fraud.fraud_backend.repository.FraudAlertRepository;
import com.fraud.fraud_backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final FraudAlertRepository alertRepository;
    private final MuleDetectionService muleDetectionService;

    public DashboardService(
            TransactionRepository transactionRepository,
            FraudAlertRepository alertRepository,
            MuleDetectionService muleDetectionService) {

        this.transactionRepository = transactionRepository;
        this.alertRepository = alertRepository;
        this.muleDetectionService = muleDetectionService;
    }

    public DashboardStats getStats() {

        DashboardStats stats = new DashboardStats();

        stats.setTotalTransactions(
                transactionRepository.count());

        stats.setTotalAlerts(
                alertRepository.count());

        stats.setSuspiciousAccounts(
                muleDetectionService
                        .detectMuleAccounts()
                        .size());

        return stats;
    }
}