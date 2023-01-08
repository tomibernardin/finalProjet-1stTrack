package com.integrator.group2backend.service;

import com.integrator.group2backend.dto.ReservationDTO;
import com.integrator.group2backend.dto.ReservationSimpleDTO;
import com.integrator.group2backend.entities.Product;
import com.integrator.group2backend.entities.Reservation;
import com.integrator.group2backend.exception.DataIntegrityViolationException;
import com.integrator.group2backend.exception.DateParseException;
import com.integrator.group2backend.repository.ReservationRepository;
import com.integrator.group2backend.utils.MapperService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ProductService productService;
    private final MapperService mapperService;
    public static final Logger logger = Logger.getLogger(ReservationService.class);

    public ReservationService(ReservationRepository reservationRepository, MapperService mapperService, ProductService productService) {
        this.reservationRepository = reservationRepository;
        this.mapperService = mapperService;
        this.productService = productService;
    }
    public List<ReservationDTO> listAllReservations() {
        List<Reservation> searchedReservations = reservationRepository.findAll();
        if (searchedReservations.isEmpty()){
            logger.error("Error al listar todas las reservas.");
        }else {
            logger.info("Se listaron todas las reservas.");
        }
        return this.mapperService.mapList(searchedReservations, ReservationDTO.class);
    }
    public Optional<ReservationDTO> searchReservationById(Long id) {
        Optional reservationFound = reservationRepository.findById(id);
        if (reservationFound.isEmpty()){
            logger.error("Error al listar la reserva con id " + id);
        }else {
            logger.info("Se listo la reserva con id " + id);
        }
        return reservationFound;
    }
    public List<ReservationDTO> findReservationByUserId(Long user_id) {
        List<Reservation> reservationsByUser = this.reservationRepository.findReservationByUserId(user_id);
        List<ReservationDTO> dtoReservationsByUser = this.mapperService.mapList(reservationsByUser, ReservationDTO.class);
        if (reservationsByUser.isEmpty()){
            logger.error("Error al listar todas las reservas ddel usuario con id " + user_id);
        }else {
            logger.info("Se listaron todas las reservas del usuario con id " + user_id);
        }
        return dtoReservationsByUser;
    }
    public ReservationDTO addReservation(Reservation reservation) throws DataIntegrityViolationException, DateParseException {

        String datePattern = "yyyy-MM-dd";
        DateFormat df = new SimpleDateFormat(datePattern);
        String checkInDate = df.format(reservation.getCheckInDate());
        String checkOutDate = df.format(reservation.getCheckOutDate());
        Date todayDate;
        try {
            todayDate = df.parse(df.format(new Date()));
        }catch (ParseException exception){
            throw new DateParseException("An error ocurred parsing dates");
        }

        if(checkInDate.equals(checkOutDate)){
            throw new DataIntegrityViolationException("The dates cannot be equal");
        }
        // If checkIn or checkOut date occurs before todayDate or checkout occurs before checkIn, throw an error
        System.out.println(reservation.getCheckInDate());
        System.out.println(todayDate);
        System.out.println(reservation.getCheckInDate().compareTo(todayDate));
        System.out.println(reservation.getCheckOutDate().compareTo(todayDate));
        if(reservation.getCheckInDate().compareTo(todayDate) < 0 || reservation.getCheckOutDate().compareTo(todayDate) < 0 || reservation.getCheckOutDate().compareTo(reservation.getCheckInDate()) < 0){
            throw new DataIntegrityViolationException("The dates are chronologically invalid");
        }
        if(findReservationsByCheckInDateAndCheckOutDateAndProductId(checkInDate, checkOutDate, reservation.getProduct().getId()).isEmpty()){
            Product p = this.productService.getProductById(reservation.getProduct().getId()).get();
            Double priceForDay = p.getDailyPrice().doubleValue();
            Integer days = (int) (reservation.getCheckOutDate().getTime() - reservation.getCheckInDate().getTime()) / 86400000 + 1;
            System.out.println("Reservation check in date "+ reservation.getCheckInDate().getTime());
            System.out.println("Reservation check in date "+ reservation.getCheckInDate());
            System.out.println("Reservation check out date " +reservation.getCheckOutDate().getTime());
            System.out.println("Reservation check out date " +reservation.getCheckOutDate());
            reservation.setFinalPrice(days * priceForDay);
            logger.info("Se ha registrado una nueva reserva.");
            return this.mapperService.convert(this.reservationRepository.save(reservation), ReservationDTO.class);
        }else {
            System.out.println(findReservationsByCheckInDateAndCheckOutDateAndProductId(checkInDate, checkOutDate, reservation.getProduct().getId()));
            throw new DataIntegrityViolationException("The range of dates is already taken");
        }

    }
    public List<ReservationSimpleDTO> findByProductId(Long productId) {
        List<Reservation> reservationsById = this.reservationRepository.findReservationByProductId(productId);
        if (reservationsById.isEmpty()) {
            logger.error("Error al listar todas las reservas del producto con id " + productId);
        }else {
            logger.info("Se listaron todas las reservas del producto con id " + productId);
        }
        return this.mapperService.mapList(reservationsById, ReservationSimpleDTO.class);
    }
    public List<ReservationDTO> findReservationsByCheckInDateAndCheckOutDate(String checkInDate, String checkOutDate) throws DateParseException {
        /*DateTimeFormatter dateTimeFormatter  = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate formattedCheckInDate = LocalDate.parse(checkInDate, dateTimeFormatter);
        LocalDate formattedCheckOutDate = LocalDate.parse(checkOutDate, dateTimeFormatter);*/
        Date formattedCheckInDate = null;
        Date formattedCheckOutDate = null;

        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
        try{
            formattedCheckInDate = dateFormatter.parse(checkInDate);
            formattedCheckOutDate = dateFormatter.parse(checkOutDate);
        }
        catch (ParseException e){
            throw new DateParseException("An error ocurred parsing dates");
        }


        List<Reservation> reservationsByDate = this.reservationRepository.newFindReservationsByCheckInDateAndCheckOutDate(formattedCheckInDate, formattedCheckOutDate);
        if (reservationsByDate.isEmpty()){
            logger.error("Error al buscar reservas en el rango de fechas correspondiente.");
        }else {
            logger.info("Se encontraron reservas en el rango de fechas correspondiente.");
        }
        return this.mapperService.mapList(reservationsByDate, ReservationDTO.class);
    }

    public List<ReservationDTO> findReservationsByCheckInDateAndCheckOutDateAndProductId(String checkInDate, String checkOutDate, Long productId) throws DateParseException {
        Date formattedCheckInDate = null;
        Date formattedCheckOutDate = null;

        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
        try{
            formattedCheckInDate = dateFormatter.parse(checkInDate);
            formattedCheckOutDate = dateFormatter.parse(checkOutDate);
        }
        catch (ParseException e){
            throw new DateParseException("An error ocurred parsing dates");
        }


        List<Reservation> reservationsByDate = this.reservationRepository.newFindReservationsByCheckInDateAndCheckOutDateAndProductId(formattedCheckInDate, formattedCheckOutDate, productId);
        if (reservationsByDate.isEmpty()){
            logger.error("Error al buscar reservas en el rango de fechas correspondiente.");
        }else {
            logger.info("Se encontraron reservas en el rango de fechas correspondiente.");
        }
        return this.mapperService.mapList(reservationsByDate, ReservationDTO.class);
    }
}
