package com.integrator.group2backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;

@Getter
@Setter
public class ReservationPublicDTO {
    private Long id;
    public Date checkInDate;
    public Date checkOutDate;
    private ProductSimpleDTO product;
}
