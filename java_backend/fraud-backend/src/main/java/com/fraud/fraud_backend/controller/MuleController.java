package com.fraud.fraud_backend.controller;

import com.fraud.fraud_backend.service.MuleDetectionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class MuleController {

    private final MuleDetectionService muleDetectionService;

    public MuleController(
            MuleDetectionService muleDetectionService) {

        this.muleDetectionService = muleDetectionService;
    }

    @GetMapping("/mule-accounts")
    public Map<String, Integer> getMuleAccounts() {

        return muleDetectionService
                .detectMuleAccounts();
    }
}