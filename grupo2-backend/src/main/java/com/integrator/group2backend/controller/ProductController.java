package com.integrator.group2backend.controller;

import com.integrator.group2backend.dto.ProductCreateDTO;
import com.integrator.group2backend.dto.ProductUpdateDTO;
import com.integrator.group2backend.dto.ProductViewDTO;
import com.integrator.group2backend.entities.Product;
import com.integrator.group2backend.exception.DataIntegrityViolationException;
import com.integrator.group2backend.exception.ResourceNotFoundException;
import com.integrator.group2backend.exception.UnauthorizedProductException;
import com.integrator.group2backend.service.ProductService;
import com.integrator.group2backend.utils.MapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    private final MapperService mapperService;

    @Autowired
    public ProductController(ProductService productService, MapperService mapperService) {
        this.productService = productService;
        this.mapperService = mapperService;
    }

    @PostMapping
    public ResponseEntity<ProductViewDTO> createProduct(@ModelAttribute ProductCreateDTO product) throws DataIntegrityViolationException, ResourceNotFoundException {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    @GetMapping
    public ResponseEntity<List<ProductViewDTO>> listProducts(
            @RequestParam(required = false) Integer rooms, @RequestParam(required = false) Integer beds,
            @RequestParam(required = false) Integer bathrooms, @RequestParam(required = false) Integer guests,
            @RequestParam(required = false) Long city, @RequestParam(required = false) Long category,
            @RequestParam(required = false) Float minPrice, @RequestParam(required = false) Float maxPrice,
            @RequestParam(required = false) String checkInDate, @RequestParam(required = false) String checkOutDate)
            throws Exception {
        Boolean random = false;
        return ResponseEntity.ok(productService.customProductFilter(rooms, beds, bathrooms, guests, city, category, minPrice, maxPrice, checkInDate, checkOutDate, random));
    }

    @GetMapping("/random")
    public ResponseEntity<List<ProductViewDTO>> listRandomProducts(
            @RequestParam(required = false) Integer rooms, @RequestParam(required = false) Integer beds,
            @RequestParam(required = false) Integer bathrooms, @RequestParam(required = false) Integer guests,
            @RequestParam(required = false) Long city, @RequestParam(required = false) Long category,
            @RequestParam(required = false) Float minPrice, @RequestParam(required = false) Float maxPrice,
            @RequestParam(required = false) String checkInDate, @RequestParam(required = false) String checkOutDate) throws Exception {
        Boolean random = true;
        return ResponseEntity.ok(productService.customProductFilter(rooms, beds, bathrooms, guests, city, category, minPrice, maxPrice, checkInDate, checkOutDate, random));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductViewDTO> searchProductById(@PathVariable("id") Long productId) throws ResourceNotFoundException, UnauthorizedProductException {
        return ResponseEntity.ok(this.productService.searchProductById(productId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductViewDTO> updateProduct(@PathVariable("id") Long productId, @ModelAttribute ProductUpdateDTO productUpdate) throws ResourceNotFoundException, UnauthorizedProductException {
        return ResponseEntity.ok(this.productService.updateProduct(productId, productUpdate));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long productId) throws ResourceNotFoundException, UnauthorizedProductException {
        //boolean productExist = productService.searchProductById(productId).isPresent();
        ProductViewDTO productViewDTO = this.productService.searchProductById(productId);

        if (productViewDTO.getId() != null) {
            productService.deleteProduct(productId);
            return ResponseEntity.ok("El producto con id " + productId + " ha sido borrado");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<ProductViewDTO>> getProductByUserId(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(this.productService.findByUserId(id));
    }
    /*@GetMapping("/city/{id}")
    public ResponseEntity<List<ProductViewDTO>> getProductByCityId(@PathVariable Long id) {
        Optional<City> city = this.cityService.getCityById(id);
        if (city.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(this.productService.listProductByCityId(id));
    }
    @GetMapping("/category/{id}")
    public ResponseEntity<List<ProductViewDTO>> getProductByCategoryId(@PathVariable Long id) {
        Optional<Category> category = this.categoryService.searchCategoryById(id);
        if (category.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(this.productService.listProductByCategoryId(id));
    }
    @RequestMapping(params = "category")
    public ResponseEntity<List<ProductViewDTO>> searchProductByCategoryId(@RequestParam Long category) {
        List<ProductViewDTO> searchedProductsByCategory = productService.listProductByCategoryId(category);
        if (searchedProductsByCategory.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(searchedProductsByCategory);
    }

    @RequestMapping(params = "city")
    public ResponseEntity<List<ProductViewDTO>> searchProductByCityId(@RequestParam String city) {
        List<ProductViewDTO> searchedProductsByCityId = productService.listProductByCityId(Long.parseLong(city));
        if (searchedProductsByCityId.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(searchedProductsByCityId);
    }

    @RequestMapping(params = {"city", "category"})
    public ResponseEntity<List<ProductViewDTO>> searchProductByCityIdAndCategoryId(@RequestParam Long city, @RequestParam Long category) {
        List<ProductViewDTO> searchedProductsByCityIdAndCategoryId = productService.listProductByCityIdAndCategoryId(city, category);
        if (searchedProductsByCityIdAndCategoryId.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(searchedProductsByCityIdAndCategoryId);
    }

    @RequestMapping(params = {"city", "category", "guests"})
    public ResponseEntity<List<ProductViewDTO>> searchProductByFilter(@RequestParam Long city, @RequestParam Long category, @RequestParam Integer guests) {
        List<ProductViewDTO> searchProductByFilter = productService.listProductByCityIdAndCategoryIdAndGuests(city, category, guests);
        if (searchProductByFilter.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(searchProductByFilter);
    }
    @RequestMapping(params = {"city", "checkInDate", "checkOutDate"})
    public ResponseEntity<List<ProductViewDTO>> findByCityIdAndCheckInDateAndCheckOutDate(@RequestParam Long city, @RequestParam String checkInDate, @RequestParam String checkOutDate) throws Exception {
        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
        List<ProductViewDTO> searchedProductByCityCheckInDateCheckOutDate = productService.searchProductsByCityExcludingDates(city, dateFormatter.parse(checkInDate), dateFormatter.parse(checkOutDate));
        if (searchedProductByCityCheckInDateCheckOutDate.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(searchedProductByCityCheckInDateCheckOutDate);
    }

    @RequestMapping(params = {"city", "category", "checkInDate", "checkOutDate"})
    public ResponseEntity<List<ProductViewDTO>> findProductByCityCategoryCheckInDateCheckOutDate(@RequestParam Long city, @RequestParam Long category, @RequestParam String checkInDate, @RequestParam String checkOutDate) throws Exception {
        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
        List<ProductViewDTO> searchedProductByCityCategoryCheckInDateCheckOutDate = productService.searchProductByCityCategoryCheckInDateCheckOutDate(city, category, dateFormatter.parse(checkInDate), dateFormatter.parse(checkOutDate));
        if (searchedProductByCityCategoryCheckInDateCheckOutDate.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(searchedProductByCityCategoryCheckInDateCheckOutDate);
    }
*/
}
