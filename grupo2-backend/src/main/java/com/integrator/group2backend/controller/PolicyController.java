package com.integrator.group2backend.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.integrator.group2backend.entities.Policy;
import com.integrator.group2backend.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/policy")
public class PolicyController {
    private final PolicyService policyService;

    @Autowired
    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping
    private ResponseEntity<Policy> addPolicy(@RequestBody Policy policy){
        return ResponseEntity.ok(this.policyService.addPolicy(policy));
    }

    @PostMapping("/list")
    private ResponseEntity<List<Policy>> addPolicy(@RequestBody List<Policy> policyList){
        return ResponseEntity.ok(this.policyService.addPolicyList(policyList));
    }

    @GetMapping("/{id}")
    private ResponseEntity<Policy> getPolicyById(@PathVariable Long id){
        Optional<Policy> policy = this.policyService.getPolicyById(id);
        if(policy.isPresent()){
            return ResponseEntity.ok(policy.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    private ResponseEntity<List<Policy>> getAllPolicy(){
        List<Policy> list = this.policyService.getAllPolicy();
        if(!list.isEmpty()){
            return ResponseEntity.ok(list);
        }
        return ResponseEntity.notFound().build();
    }
}
