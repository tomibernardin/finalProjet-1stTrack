package com.integrator.group2backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;

@Setter
@Getter
public class ReservationDTO {
    private Long id;
    private Double finalPrice;
    private Time checkInTime;
    private Date checkInDate;
    private Date checkOutDate;
    private ProductSimpleDTO product;
    private CurrentUserDTO user;
}
