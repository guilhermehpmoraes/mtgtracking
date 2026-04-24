package com.mtgtracking.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.mtgtracking")
public class MtgTrackingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(MtgTrackingBackendApplication.class, args);
    }
}