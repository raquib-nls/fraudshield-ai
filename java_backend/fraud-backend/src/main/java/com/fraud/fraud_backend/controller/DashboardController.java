package com.fraud.fraud_backend.controller;

import com.fraud.fraud_backend.dto.DashboardStats;
import com.fraud.fraud_backend.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    public DashboardStats getDashboard() {

        return dashboardService.getStats();
    }
}