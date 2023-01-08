package com.integrator.group2backend.dto;

import com.integrator.group2backend.entities.City;
import com.integrator.group2backend.entities.Reservation;
import com.integrator.group2backend.entities.Roles;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String jwt;
    private City city;
    private Set<Reservation> reservations = new HashSet<>();
    private Roles roles;
}
