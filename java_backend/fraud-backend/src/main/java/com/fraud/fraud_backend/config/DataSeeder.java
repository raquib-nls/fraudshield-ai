package com.fraud.fraud_backend.config;

import com.fraud.fraud_backend.entity.FraudAlert;
import com.fraud.fraud_backend.entity.TransactionEntity;
import com.fraud.fraud_backend.repository.FraudAlertRepository;
import com.fraud.fraud_backend.repository.TransactionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TransactionRepository transactionRepository;
    private final FraudAlertRepository fraudAlertRepository;

    public DataSeeder(
            TransactionRepository transactionRepository,
            FraudAlertRepository fraudAlertRepository) {

        this.transactionRepository = transactionRepository;
        this.fraudAlertRepository = fraudAlertRepository;
    }

    @Override
    public void run(String... args) {

        // Prevent duplicate inserts
        if (transactionRepository.count() == 0) {

            for (int i = 1; i <= 20; i++) {

                TransactionEntity tx = new TransactionEntity();

                tx.setSender("ACC00" + i);
                tx.setReceiver("ACC00" + ((i % 5) + 1));
                tx.setAmount(i * 1000);

                if (i % 4 == 0) {
                    tx.setFraudScore(0.92);
                    tx.setRiskLevel("HIGH");
                    tx.setIsFraud(1);
                }
                else if (i % 3 == 0) {
                    tx.setFraudScore(0.65);
                    tx.setRiskLevel("MEDIUM");
                    tx.setIsFraud(0);
                }
                else {
                    tx.setFraudScore(0.12);
                    tx.setRiskLevel("LOW");
                    tx.setIsFraud(0);
                }

                transactionRepository.save(tx);
            }
        }

        if (fraudAlertRepository.count() == 0) {

            for (int i = 1; i <= 10; i++) {

                FraudAlert alert = new FraudAlert();

                if (i <= 3) {
                    alert.setFraudScore(0.92);
                    alert.setRiskLevel("HIGH");
                }
                else if (i <= 6) {
                    alert.setFraudScore(0.65);
                    alert.setRiskLevel("MEDIUM");
                }
                else {
                    alert.setFraudScore(0.12);
                    alert.setRiskLevel("LOW");
                }

                alert.setStatus("OPEN");

                fraudAlertRepository.save(alert);
            }
        }

        System.out.println("Demo data loaded successfully!");
    }
}