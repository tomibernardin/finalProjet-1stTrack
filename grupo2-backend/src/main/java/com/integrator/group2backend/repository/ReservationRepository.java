package com.integrator.group2backend.repository;

import com.integrator.group2backend.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findReservationByUserId(Long user_id);

    List<Reservation> findReservationByProductId(Long product_id);

//    @Query(value = "SELECT * FROM reservation r WHERE ((r.check_in_date between :checkInDate and :checkOutDate) OR (r.check_out_date between :checkInDate and :checkOutDate));", nativeQuery = true)
//    List<Reservation> findReservationsByCheckInDateAndCheckOutDate(@Param("checkInDate") Date checkInDate, @Param("checkOutDate") Date checkOutDate);
    @Query(value = "SELECT * FROM reservation r" +
            " WHERE (r.check_in_date <= :checkInDate AND :checkOutDate <= r.check_out_date) OR" +
            " (r.check_in_date >= :checkInDate AND :checkOutDate >= r.check_out_date) OR" +
            " (r.check_in_date <= :checkOutDate AND :checkOutDate <= r.check_out_date) OR" +
            " (r.check_in_date <= :checkInDate AND :checkInDate <= r.check_out_date);", nativeQuery = true)
    List<Reservation> newFindReservationsByCheckInDateAndCheckOutDate(@Param("checkInDate") Date checkInDate, @Param("checkOutDate") Date checkOutDate);

    @Query(value = "SELECT * FROM reservation r" +
            " WHERE ((r.check_in_date <= :checkInDate AND :checkOutDate <= r.check_out_date) OR" +
            " (r.check_in_date >= :checkInDate AND :checkOutDate >= r.check_out_date) OR" +
            " (r.check_in_date <= :checkOutDate AND :checkOutDate <= r.check_out_date) OR" +
            " (r.check_in_date <= :checkInDate AND :checkInDate <= r.check_out_date)" +
            " ) AND r.product_id = :productId ;", nativeQuery = true)
    List<Reservation> newFindReservationsByCheckInDateAndCheckOutDateAndProductId(@Param("checkInDate") Date checkInDate, @Param("checkOutDate") Date checkOutDate, @Param("productId") Long productId);
    List<Reservation> findReservationsByCheckInDateAndCheckOutDateAndProductId(Date checkInDate, Date checkOutDate, Long product_id);
}
