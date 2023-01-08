package com.integrator.group2backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.integrator.group2backend.entities.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Id;
import java.util.Set;

@Getter
@Setter
public class ProductViewDTO {
    @Id
    private Long id;
    private String title;
    private String description;
    private Integer rooms;
    private Integer beds;
    private Integer bathrooms;
    private Integer guests;
    private Float dailyPrice;
    private String address;
    private Integer number;
    private Integer floor;
    private String apartment;
    private Long user_id;
    private Float latitude;
    private Float longitude;
    private Category category;
    private City city;
    private Set<Feature> features;
    private Set<PolicyDTO> policies;
    @JsonIgnoreProperties(value = { "product" })
    private Set<Image> images;
    @JsonIgnoreProperties(value = { "product" , "user"})
    private Set<Reservation> reservations;
}