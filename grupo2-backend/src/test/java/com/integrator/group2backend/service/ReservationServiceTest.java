package com.integrator.group2backend.service;

import com.integrator.group2backend.dto.ReservationDTO;
import com.integrator.group2backend.dto.ReservationSimpleDTO;
import com.integrator.group2backend.entities.Product;
import com.integrator.group2backend.entities.Reservation;
import com.integrator.group2backend.entities.User;
import com.integrator.group2backend.exception.DataIntegrityViolationException;
import com.integrator.group2backend.exception.DateParseException;
import com.integrator.group2backend.repository.ReservationRepository;
import com.integrator.group2backend.utils.MapperService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;

@RunWith(MockitoJUnitRunner.class)
public class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;
    @Mock
    private MapperService mapperService;
    @Mock
    private ProductService productService;

    private ReservationService reservationService;


    @Before
    public void setUp() {
        this.reservationService = new ReservationService(this.reservationRepository, this.mapperService, this.productService);
    }


    @Test
    public void testListAllReservationsWithNoEmptyList() {
        List<Reservation> list = Collections.singletonList(new Reservation());
        Mockito.when(this.reservationRepository.findAll()).thenReturn(list);
        Mockito.when(this.mapperService.mapList(eq(list), eq(ReservationDTO.class))).thenReturn(Collections.singletonList(new ReservationDTO()));

        this.reservationService.listAllReservations();

        Mockito.verify(this.reservationRepository, times(1)).findAll();
        Mockito.verify(this.mapperService, times(1)).mapList(eq(list), eq(ReservationDTO.class));
    }

    @Test
    public void testListAllReservationWithEmptyList() {
        Mockito.when(this.reservationRepository.findAll()).thenReturn(Collections.emptyList());

        this.reservationService.listAllReservations();

        Mockito.verify(this.reservationRepository, times(1)).findAll();
        //Mockito.verify(this.mapperService, times(0)).mapList(any(), any());
    }

    @Test
    public void searchReservationById() {
        Mockito.when(this.reservationRepository.findById(eq(1L))).thenReturn((Optional.empty()));

        this.reservationService.searchReservationById(1L);

        Mockito.verify(this.reservationRepository, times(1)).findById(eq(1L));
    }

    @Test
    public void testFindReservationByUserIdWhenNoEmptyList() {
        List<Reservation> reservationtList = Collections.singletonList(new Reservation());

        Mockito.when(this.reservationRepository.findReservationByUserId(1L)).thenReturn(reservationtList);
        Mockito.when(this.mapperService.mapList(eq(reservationtList), eq(ReservationDTO.class))).thenReturn(null);

        this.reservationService.findReservationByUserId(1L);

        Mockito.verify(this.reservationRepository, times(1)).findReservationByUserId(eq(1L));
        Mockito.verify(this.mapperService, times(1)).mapList(eq(reservationtList), eq(ReservationDTO.class));
    }

    @Test
    public void testFindReservationByUserIdWithEmptyList() {
        Mockito.when(this.reservationRepository.findReservationByUserId(1L)).thenReturn(Collections.emptyList());

        this.reservationService.findReservationByUserId(1L);

        Mockito.verify(this.reservationRepository, times(1)).findReservationByUserId(eq(1L));
        Mockito.verify(this.mapperService, times(1)).mapList(eq(Collections.emptyList()), eq(ReservationDTO.class));
    }

    @Test
    public void addReservation() throws DateParseException, DataIntegrityViolationException {
        Product product = new Product();
        product.setId(10L);
        product.setDailyPrice(52.5f);

        User user = new User();
        user.setId(1L);

        Reservation reservation = new Reservation();

        Calendar c1 = Calendar.getInstance();
        c1.set(Calendar.MONTH, 10);
        c1.set(Calendar.DATE, 23);
        c1.set(Calendar.YEAR, 2029);
        Date checkin = c1.getTime();

        c1.set(Calendar.DATE, 26);
        Date checkout = c1.getTime();


        reservation.setCheckInDate(checkin);
        reservation.setCheckOutDate(checkout);
        reservation.setProduct(product);
        reservation.setUser(user);


        ArgumentCaptor<Reservation> reservationArgumentCaptor = ArgumentCaptor.forClass(Reservation.class);
        Mockito.when(this.reservationRepository.save(reservationArgumentCaptor.capture())).thenReturn(null);
        Mockito.when(this.productService.getProductById(eq(10L))).thenReturn(Optional.of(product));
        Mockito.when(this.mapperService.convert(any(), eq(ReservationDTO.class))).thenReturn(new ReservationDTO());


        this.reservationService.addReservation(reservation);

        Reservation capturedReservation = reservationArgumentCaptor.getValue();

        Assert.assertNotNull(capturedReservation.getCheckInDate());
        Assert.assertNotNull(capturedReservation.getUser());
        Assert.assertEquals(10L, capturedReservation.getProduct().getId(), 1);
        Assert.assertEquals(210.5, capturedReservation.getFinalPrice(), 1);

    }

    @Test
    public void findReservationsByCheckInDateAndCheckOutDate() {
    }

    @Test
    public void testFindByProductIdWhenNoEmptyList() {
        List<Reservation> reservationtList = Collections.singletonList(new Reservation());

        Mockito.when(this.reservationRepository.findReservationByProductId(1L)).thenReturn(reservationtList);
        Mockito.when(this.mapperService.mapList(eq(reservationtList), eq(ReservationSimpleDTO.class))).thenReturn(null);

        this.reservationService.findByProductId(1L);

        Mockito.verify(this.reservationRepository, times(1)).findReservationByProductId(eq(1L));
        Mockito.verify(this.mapperService, times(1)).mapList(eq(reservationtList), eq(ReservationSimpleDTO.class));

    }
}