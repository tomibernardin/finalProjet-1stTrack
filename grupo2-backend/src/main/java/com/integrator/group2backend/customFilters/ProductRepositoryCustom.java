package com.integrator.group2backend.customFilters;

import com.integrator.group2backend.entities.Product;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
@Repository
public interface ProductRepositoryCustom {
    List<Product> customDynamicQuery(Integer rooms, Integer beds, Integer bathrooms, Integer guests, Long city_id, Long category_id, Float minPrice, Float maxPrice);
}
