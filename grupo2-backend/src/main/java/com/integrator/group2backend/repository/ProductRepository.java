package com.integrator.group2backend.repository;

import com.integrator.group2backend.customFilters.ProductRepositoryCustom;
import com.integrator.group2backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> , ProductRepositoryCustom {
    List<Product> findByCityId(Long id);
    List<Product> findByCategoryId(Long id);
    List<Product> findByUserId(Long id);
    List<Product> findByCityIdAndCategoryId(Long city_id, Long category_id);
    List<Product> findByCityIdAndCategoryIdAndGuests(Long city_id, Long category_id, Integer guests);
    @Query(value = "SELECT * FROM product p INNER JOIN reservation r ON r.product_id = p.id WHERE ((r.check_in_date between :checkInDate and :checkOutDate) OR (r.check_out_date between :checkInDate and :checkOutDate));", nativeQuery = true)
    List<Product> searchProductByCheckInDateCheckOutDate(@Param("checkInDate") Date checkInDate, @Param("checkOutDate") Date checkOutDate);
    @Query(value = "SELECT * FROM product p INNER JOIN reservation r ON r.product_id = p.id WHERE p.city_id = :city AND ((r.check_in_date between :checkInDate and :checkOutDate) OR (r.check_out_date between :checkInDate and :checkOutDate));", nativeQuery = true)
    List<Product> searchProductByCityCheckInDateCheckOutDate(@Param("city") Long city, @Param("checkInDate") Date checkInDate, @Param("checkOutDate") Date checkOutDate);
    @Query(value = "SELECT * FROM product p INNER JOIN reservation r ON r.product_id = p.id WHERE p.city_id = :city AND p.category_id = :category AND ((r.check_in_date between :checkInDate and :checkOutDate) OR (r.check_out_date between :checkInDate and :checkOutDate));", nativeQuery = true)
    List<Product> searchProductByCityCategoryCheckInDateCheckOutDate(@Param("city") Long city, @Param("category") Long category, @Param("checkInDate") Date checkInDate, @Param("checkOutDate") Date checkOutDate);
}
