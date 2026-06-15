package com.fraud.fraud_backend.service;

import com.fraud.fraud_backend.dto.FraudRequest;
import com.fraud.fraud_backend.dto.FraudResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FastApiService {

    public FraudResponse getFraudScore(FraudRequest request) {

        RestTemplate restTemplate = new RestTemplate();

        String url = "http://127.0.0.1:8000/score";

        return restTemplate.postForObject(
                url,
                request,
                FraudResponse.class
        );
    }
}