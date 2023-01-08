package com.integrator.group2backend.dto;

import com.integrator.group2backend.entities.*;
import lombok.Getter;
import lombok.Setter;


import javax.persistence.Id;
import java.util.Set;

@Getter
@Setter
public class ProductSimpleDTO {
    @Id
    private Long id;
    private String title;
    private String description;
    private Integer rooms;
    private Integer beds;
    private Integer bathrooms;
    private Integer guests;
    private Float dailyPrice;
    private Float latitude;
    private Float longitude;
    private Category category;
    private City city;
    private Set<Feature> features;
    private Set<PolicyItem> policyItems;
    private Set<Image> images;
}
