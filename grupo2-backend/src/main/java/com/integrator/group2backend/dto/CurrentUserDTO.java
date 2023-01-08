package com.integrator.group2backend.dto;

import com.integrator.group2backend.entities.City;
import com.integrator.group2backend.entities.Roles;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurrentUserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private City city;
    private Roles roles;
}
