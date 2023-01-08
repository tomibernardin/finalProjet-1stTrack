package com.integrator.group2backend.controller;

import com.integrator.group2backend.dto.ReservationDTO;
import com.integrator.group2backend.dto.ReservationSimpleDTO;
import com.integrator.group2backend.entities.Reservation;
import com.integrator.group2backend.exception.DataIntegrityViolationException;
import com.integrator.group2backend.exception.DateParseException;
import com.integrator.group2backend.service.ReservationService;
import com.integrator.group2backend.utils.MapperService;
import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.text.ParseException;
import java.util.*;

@RestController
@RequestMapping("/reservation")
public class ReservationController {
    public static final Logger logger = Logger.getLogger(ReservationController.class);

    private final ReservationService reservationService;
    private final MapperService mapperService;

    public ReservationController(ReservationService reservationService, MapperService mapperService) {
        this.reservationService = reservationService;
        this.mapperService = mapperService;
    }
    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody Reservation reservation) throws DataIntegrityViolationException, DateParseException {
        return ResponseEntity.ok(reservationService.addReservation(reservation));
    }
    @GetMapping
    public ResponseEntity<List<ReservationDTO>> listAllReservations() {
        return ResponseEntity.ok(reservationService.listAllReservations());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> seachReservationById(@PathVariable("id") Long reservationId){
        return ResponseEntity.ok(this.mapperService.convert(reservationService.searchReservationById(reservationId).get(), ReservationDTO.class));
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<List<ReservationDTO>> seachReservationByUserId(@PathVariable("id") Long userId){
        return ResponseEntity.ok(reservationService.findReservationByUserId(userId));
    }
    @GetMapping("/product/{id}")
    public ResponseEntity<List<ReservationSimpleDTO>> getReservationByProductId(@PathVariable("id") Long productId){
        return ResponseEntity.ok(reservationService.findByProductId(productId));
    }
    @RequestMapping(params = {"checkInDate" , "checkOutDate"})
    public ResponseEntity<List<ReservationDTO>> findReservationsByCheckInDateAndCheckOutDate(@RequestParam String checkInDate, @RequestParam String checkOutDate) throws Exception{
        return ResponseEntity.ok(reservationService.findReservationsByCheckInDateAndCheckOutDate(checkInDate, checkOutDate));
    }
}
