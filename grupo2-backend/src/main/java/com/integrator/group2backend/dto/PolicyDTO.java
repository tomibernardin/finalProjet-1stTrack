package com.integrator.group2backend.dto;

import com.integrator.group2backend.entities.Policy;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Setter
@Getter
public class PolicyDTO {
    private Long id;
    private String name;
    private Set<PolicyItemsDTO> policyItems;

    public PolicyDTO(Policy policy) {
        this.id = policy.getId();
        this.name = policy.getName();
        this.policyItems = new HashSet<>();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PolicyDTO)) return false;
        PolicyDTO policyDTO = (PolicyDTO) o;
        return Objects.equals(id, policyDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
