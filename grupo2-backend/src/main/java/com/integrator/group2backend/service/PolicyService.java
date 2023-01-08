package com.integrator.group2backend.service;

import com.integrator.group2backend.dto.PolicyDTO;
import com.integrator.group2backend.dto.PolicyItemsDTO;
import com.integrator.group2backend.entities.Policy;
import com.integrator.group2backend.entities.PolicyItem;
import com.integrator.group2backend.repository.PolicyRepository;
import com.integrator.group2backend.utils.MapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class PolicyService {
    private final PolicyRepository policyRepository;
    private final MapperService mapperService;

    @Autowired
    public PolicyService(PolicyRepository policyRepository, MapperService mapperService) {
        this.policyRepository = policyRepository;
        this.mapperService = mapperService;

    }

    public Policy addPolicy(Policy policy) {
        return this.policyRepository.save(policy);
    }

    public List<Policy> addPolicyList(List<Policy> policyList) {
        return this.policyRepository.saveAll(policyList);
    }

    public List<Policy> getAllPolicy() {
        return this.policyRepository.findAll();
    }

    public Optional<Policy> getPolicyById(Long id) {
        return this.policyRepository.findById(id);
    }

    public Set<PolicyDTO> converPolicyItems(Set<PolicyItem> policyItems) {
        Set<PolicyDTO> policies = new HashSet<>();
        Map<Long, Set<PolicyItemsDTO>> map = new HashMap<>();

        for (PolicyItem item : policyItems) {
            policies.add(new PolicyDTO(item.getPolicy()));
            if (!map.containsKey(item.getPolicy().getId())) {
                map.put(item.getPolicy().getId(), new HashSet<>() {{    //creo y agrego PolicyItemDTO al mismo tiempo
                    add(new PolicyItemsDTO(item));
                }});
            } else {
                map.get(item.getPolicy().getId()).add(new PolicyItemsDTO(item));
            }
        }

        for (PolicyDTO policyDTO: policies ) {
            policyDTO.setPolicyItems(map.get(policyDTO.getId()));
        }

        return policies;
    }
}
