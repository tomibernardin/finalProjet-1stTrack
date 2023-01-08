package com.integrator.group2backend.controller;

import com.integrator.group2backend.entities.Policy;
import com.integrator.group2backend.entities.PolicyItem;
import com.integrator.group2backend.service.PolicyItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/policyitem")
public class PolicyItemController {
    private final PolicyItemService policyItemService;
    @Autowired
    public PolicyItemController(PolicyItemService policyItemService) {
        this.policyItemService = policyItemService;
    }
    @PostMapping
    private ResponseEntity<PolicyItem> addPolicy(@RequestBody PolicyItem policyItem){
        return ResponseEntity.ok(this.policyItemService.addPolicyItem(policyItem));
    }
    @PostMapping("/list")
    private ResponseEntity<List<PolicyItem>> addPolicyList(@RequestBody List<PolicyItem> policyItemList){
        return ResponseEntity.ok(this.policyItemService.addPolicyItemList(policyItemList));
    }
    @GetMapping
    private ResponseEntity<List<PolicyItem>> getAllPolicy(){
        List<PolicyItem> list = this.policyItemService.getAllPolicyItem();
        if(!list.isEmpty()){
            return ResponseEntity.ok(list);
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/{id}")
    private ResponseEntity<PolicyItem> getPolicyById(@PathVariable Long id){
        Optional<PolicyItem> policyItem = this.policyItemService.getPolicyItemById(id);
        if(policyItem.isPresent()){
            return ResponseEntity.ok(policyItem.get());
        }
        return ResponseEntity.notFound().build();
    }

}
