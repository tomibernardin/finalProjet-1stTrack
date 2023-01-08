package com.integrator.group2backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @JsonIgnoreProperties(value = { "product" })
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Image categoryImage;

    @JsonIgnoreProperties(value = { "product" })
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Image categoryIllustration;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Product> products = new HashSet<>();
}