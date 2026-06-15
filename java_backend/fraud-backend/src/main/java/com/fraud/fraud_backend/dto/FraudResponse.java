package com.fraud.fraud_backend.dto;

public class FraudResponse {

    private double fraud_score;
    private int is_fraud;
    private String risk_level;
    private double threshold_used;

    public double getFraud_score() {
        return fraud_score;
    }

    public void setFraud_score(double fraud_score) {
        this.fraud_score = fraud_score;
    }

    public int getIs_fraud() {
        return is_fraud;
    }

    public void setIs_fraud(int is_fraud) {
        this.is_fraud = is_fraud;
    }

    public String getRisk_level() {
        return risk_level;
    }

    public void setRisk_level(String risk_level) {
        this.risk_level = risk_level;
    }

    public double getThreshold_used() {
        return threshold_used;
    }

    public void setThreshold_used(double threshold_used) {
        this.threshold_used = threshold_used;
    }
}