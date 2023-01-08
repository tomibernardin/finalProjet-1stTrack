package com.integrator.group2backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "PolicyItem")
public class PolicyItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "policy_id", referencedColumnName = "id")
    private Policy policy;

    @ManyToMany(mappedBy = "policyItems", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private Set<Product> products;
}
