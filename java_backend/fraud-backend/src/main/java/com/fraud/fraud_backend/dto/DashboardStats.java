package com.fraud.fraud_backend.dto;

public class DashboardStats {

    private long totalTransactions;
    private long totalAlerts;
    private long suspiciousAccounts;
    private long highRiskTransactions;

    public long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public long getTotalAlerts() {
        return totalAlerts;
    }

    public void setTotalAlerts(long totalAlerts) {
        this.totalAlerts = totalAlerts;
    }

    public long getHighRiskTransactions() {
        return highRiskTransactions;
    }

    public void setHighRiskTransactions(long highRiskTransactions) {
        this.highRiskTransactions = highRiskTransactions;
    }

    public long getSuspiciousAccounts() {
        return suspiciousAccounts;
    }

    public void setSuspiciousAccounts(long suspiciousAccounts) {
        this.suspiciousAccounts = suspiciousAccounts;
    }
}