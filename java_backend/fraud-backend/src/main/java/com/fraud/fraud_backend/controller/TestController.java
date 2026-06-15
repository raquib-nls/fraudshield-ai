package com.fraud.fraud_backend.controller;

import com.fraud.fraud_backend.dto.FraudRequest;
import com.fraud.fraud_backend.dto.FraudResponse;
import com.fraud.fraud_backend.service.FastApiService;
import com.fraud.fraud_backend.service.TransactionService;
import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    private final FastApiService fastApiService;
    private final TransactionService transactionService;

    public TestController(
            FastApiService fastApiService,
            TransactionService transactionService) {

        this.fastApiService = fastApiService;
        this.transactionService = transactionService;
    }

    @GetMapping("/")
    public String home() {
        return "Fraud Backend Running";
    }

    @PostMapping("/transaction")
    public FraudResponse transaction(
            @RequestBody FraudRequest request) {

        return transactionService.processTransaction(request);
    }
}