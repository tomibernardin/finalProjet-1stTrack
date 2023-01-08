package com.integrator.group2backend.service;

import com.integrator.group2backend.entities.PolicyItem;
import com.integrator.group2backend.repository.PolicyItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyItemService {
    private final PolicyItemRepository policyItemRepository;
    @Autowired
    public PolicyItemService(PolicyItemRepository policyItemRepository) {
        this.policyItemRepository = policyItemRepository;
    }
    public PolicyItem addPolicyItem(PolicyItem policyItem){
        return policyItemRepository.save(policyItem);
    }
    public List<PolicyItem> addPolicyItemList(List<PolicyItem> policyItemList){
        return policyItemRepository.saveAll(policyItemList);
    }
    public List<PolicyItem> getAllPolicyItem(){
        return policyItemRepository.findAll();
    }
    public Optional<PolicyItem> getPolicyItemById(Long id){
        return policyItemRepository.findById(id);
    }
}
