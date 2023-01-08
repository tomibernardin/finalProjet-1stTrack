package com.integrator.group2backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@Getter
@Setter
public class ProductUpdateDTO {
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
    private Float latitude;
    private Float longitude;
    private Long category_id;
    private Long city_id;
    private ArrayList<Long> features_id;
    private ArrayList<Long> policyItems_id;
    private ArrayList<MultipartFile> addImages;
    private ArrayList<Long> removeImages;
    private Long user_id;
}
