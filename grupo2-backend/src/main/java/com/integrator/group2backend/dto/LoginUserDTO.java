package com.integrator.group2backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
