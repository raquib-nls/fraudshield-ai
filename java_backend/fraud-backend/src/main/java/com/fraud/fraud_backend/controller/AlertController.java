package com.fraud.fraud_backend.controller;

import com.fraud.fraud_backend.entity.FraudAlert;
import com.fraud.fraud_backend.repository.FraudAlertRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AlertController {

    private final FraudAlertRepository alertRepository;

    public AlertController(FraudAlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    @GetMapping("/alerts")
    public List<FraudAlert> getAlerts() {
        return alertRepository.findAll();
    }
}