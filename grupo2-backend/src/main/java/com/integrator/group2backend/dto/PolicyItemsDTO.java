package com.integrator.group2backend.dto;

import com.integrator.group2backend.entities.PolicyItem;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PolicyItemsDTO {
    private Long id;
    private String name;

    public PolicyItemsDTO(PolicyItem policyItem) {
        this.id = policyItem.getId();
        this.name = policyItem.getName();
    }
}
