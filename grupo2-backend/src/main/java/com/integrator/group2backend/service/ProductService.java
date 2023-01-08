package com.integrator.group2backend.service;

import com.integrator.group2backend.dto.*;
import com.integrator.group2backend.entities.Category;
import com.integrator.group2backend.entities.City;
import com.integrator.group2backend.entities.Feature;
import com.integrator.group2backend.entities.Image;
import com.integrator.group2backend.entities.PolicyItem;
import com.integrator.group2backend.entities.Product;
import com.integrator.group2backend.entities.Reservation;
import com.integrator.group2backend.entities.User;
import com.integrator.group2backend.exception.DataIntegrityViolationException;
import com.integrator.group2backend.exception.ResourceNotFoundException;
import com.integrator.group2backend.exception.UnauthorizedProductException;
import com.integrator.group2backend.repository.ProductRepository;
import com.integrator.group2backend.utils.MapperService;
import com.integrator.group2backend.utils.UpdateProductCompare;
import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductService {
    public static final Logger logger = Logger.getLogger(ProductService.class);
    private final ProductRepository productRepository;
    private final MapperService mapperService;
    private final UpdateProductCompare updateProductCompare;
    private final CategoryService categoryService;
    private final FeatureService featureService;
    private final PolicyItemService policyItemService;
    private final ImageService imageService;
    private final CityService cityService;
    private final PolicyService policyService;
    private final UserService userService;

    public ProductService(ProductRepository productRepository, MapperService mapperService, UpdateProductCompare updateProductCompare,
                          CategoryService categoryService, FeatureService featureService, PolicyItemService policyItemService,
                          ImageService imageService, CityService cityService, PolicyService policyService, UserService userService) {
        this.productRepository = productRepository;
        this.mapperService = mapperService;
        this.updateProductCompare = updateProductCompare;
        this.categoryService = categoryService;
        this.featureService = featureService;
        this.policyItemService = policyItemService;
        this.imageService = imageService;
        this.cityService = cityService;
        this.policyService = policyService;
        this.userService = userService;
    }

    /*public Product addProduct(Product product) {
        logger.info("Se agrego un producto correctamente");
        return productRepository.save(product);
    }*/
    public ProductViewDTO addProduct(ProductCreateDTO newProduct) throws DataIntegrityViolationException, ResourceNotFoundException {
        if (!(newProduct.getImage() == null || newProduct.getPolicyItems_id() == null || newProduct.getCategory_id() == null || newProduct.getFeatures_id() == null || newProduct.getCity_id() == null || newProduct.getUser_id() == null)) {


            Product product = new Product();
            Set<Image> imageList = new HashSet<>();
            Set<Feature> featureList = new HashSet<>();
            Set<PolicyItem> policyItemsList = new HashSet<>();

            product.setTitle(newProduct.getTitle());
            product.setDescription(newProduct.getDescription());
            product.setRooms(newProduct.getRooms());
            product.setBeds(newProduct.getBeds());
            product.setBathrooms(newProduct.getBathrooms());
            product.setGuests(newProduct.getGuests());
            product.setDailyPrice(newProduct.getDailyPrice());
            product.setAddress(newProduct.getAddress());
            product.setNumber(newProduct.getNumber());
            product.setFloor(newProduct.getFloor());
            product.setApartment(newProduct.getApartment());
            product.setLatitude(newProduct.getLatitude());
            product.setLongitude(newProduct.getLongitude());

            // We create the product
            Product createdProduct = productRepository.save(product);

            Optional<User> user = this.userService.findById(newProduct.getUser_id());
            if (user.isEmpty()) {
                throw new ResourceNotFoundException("User not found");
            }
            product.setUser(user.get());

            Optional<Category> category = categoryService.searchCategoryById(newProduct.getCategory_id());
            product.setCategory(category.get());

            Optional<City> city = cityService.getCityById(newProduct.getCity_id());
            product.setCity(city.get());

            for (Long featureId : newProduct.getFeatures_id()) {
                Optional<Feature> feature = featureService.searchFeatureById(featureId);
                featureList.add(feature.get());
            }
            product.setFeatures(featureList);


            for (Long policyItemId : newProduct.getPolicyItems_id()) {
                Optional<PolicyItem> policyItem = policyItemService.getPolicyItemById(policyItemId);
                policyItemsList.add(policyItem.get());
            }
            product.setPolicyItems(policyItemsList);

            for (MultipartFile images : newProduct.getImage()) {
                Image image = imageService.addImage(images);
                if (image != null) {
                    image.setProduct(createdProduct);
                    imageList.add(image);
                }
            }
            product.setImages(imageList);

            // We update the created product with its relationships
            createdProduct = productRepository.save(createdProduct);
            logger.info("Se agrego un producto correctamente");

            return this.getProductViewDTO(createdProduct);
        } else {
            throw new DataIntegrityViolationException("Cannot create the product");
        }
    }

    public ResponseEntity<List<ProductViewDTO>> listAllProducts() throws ResourceNotFoundException {
        List<Product> searchedProducts = productRepository.findAll();
        if (searchedProducts.isEmpty()) {
            logger.error("Error al listar todos los productos");
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se listaron todos los productos");
        return ResponseEntity.ok(this.getProductViewDTOList(searchedProducts));
    }

    public ResponseEntity<List<ProductViewDTO>> listRandomAllProducts() throws ResourceNotFoundException {
        List<Product> searchedProducts = productRepository.findAll();
        if ((searchedProducts.isEmpty())) {
            logger.error("Error al listar todos los productos aleatoriamente");
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se listaron todos los productos aleatoriamente");
        Collections.shuffle(searchedProducts);

        return ResponseEntity.ok(this.getProductViewDTOList(searchedProducts));
    }

    public ProductViewDTO searchProductById(Long productId) throws ResourceNotFoundException {
        Optional<Product> product = productRepository.findById(productId);

        if (product.isEmpty()) {
            logger.error("El producto especificado no existe con id " + productId);
            throw new ResourceNotFoundException("No value present: ");
        }

        return this.getProductViewDTO(product.get());
    }

    public Optional<Product> getProductById(Long id) {
        return this.productRepository.findById(id);
    }

    public ProductViewDTO updateProduct(Long productId, ProductUpdateDTO productUpdate) throws ResourceNotFoundException, UnauthorizedProductException {
        Optional<Product> oldProduct = this.productRepository.findById(productId);
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (oldProduct.isEmpty()) {
            logger.error("El producto especificado no existe con id " + productId);
            throw new ResourceNotFoundException("No value present: ");
        }

        if (principal instanceof String) {
            CurrentUserDTO currentUserDTO = this.userService.getCurrentUser((String) principal);
            if(oldProduct.get().getUser().getId().equals(currentUserDTO.getId())){
                Product updatedProduct = updateProductCompare.updateProductCompare(oldProduct.get(), productUpdate);
                productRepository.save(updatedProduct);
                return this.getProductViewDTO(updatedProduct);
            }
        }
        throw new UnauthorizedProductException("Unauthorized product");
    }

    public void deleteProduct(Long id) throws ResourceNotFoundException, UnauthorizedProductException {
        Optional<Product> product = productRepository.findById(id);
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (product.isEmpty()) {
            logger.error("El producto especificado no existe con id " + id);
            throw new ResourceNotFoundException("No value present: ");
        }

        if (principal instanceof String) {
            CurrentUserDTO currentUserDTO = this.userService.getCurrentUser((String) principal);
            if(product.get().getUser().getId().equals(currentUserDTO.getId())){
                logger.info("El producto con id " + id + " ha sido borrado");
                productRepository.deleteById(id);
                return;
            }
        }

        throw new UnauthorizedProductException("Unauthorized product");
    }

    public List<ProductViewDTO> customProductFilter(Integer rooms, Integer beds, Integer bathrooms, Integer guests, Long city_id, Long category_id,
                                                    Float minPrice, Float maxPrice, String checkInDate, String checkOutDate, Boolean random) throws Exception {

        List<Product> foundByCustomFilter = productRepository.customDynamicQuery(rooms, beds, bathrooms, guests, city_id, category_id, minPrice, maxPrice);
        List<Product> auxList = new ArrayList<>();
        auxList.addAll(foundByCustomFilter);

        if (checkInDate != null && checkOutDate != null) {
            SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
            Date formattedCheckInDate = dateFormatter.parse(checkInDate);
            Date formattedCheckOutDate = dateFormatter.parse(checkOutDate);
            for (Product productFilter : foundByCustomFilter) {
                for (Reservation reservation : productFilter.getReservations()) {
                    if ((reservation.getCheckInDate().getTime() >= formattedCheckInDate.getTime() && reservation.getCheckInDate().getTime() <= formattedCheckOutDate.getTime())
                            || (reservation.getCheckOutDate().getTime() >= formattedCheckInDate.getTime() && reservation.getCheckOutDate().getTime() <= formattedCheckOutDate.getTime())) {
                        auxList.remove(productFilter);
                    }
                }
            }
            logger.info("Se filtraron los productos disponibles en las fechas especificadas.");
        }
        if (auxList.isEmpty()) {
            logger.error("No hay reservas disponibles para los filtros especificados.");
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se aplicaron los filtros especificados.");
        if (random) {
            logger.info("Se mezclo la lista de productos.");
            Collections.shuffle(auxList);
        }
        return this.getProductViewDTOList(auxList);
    }

    public List<ProductViewDTO> listProductByCityId(Long city_id) throws ResourceNotFoundException {
        List<Product> productFoundByCityId = productRepository.findByCityId(city_id);
        if (productFoundByCityId.isEmpty()) {
            logger.error("No se encontraron los productos correspondientes a la Ciudad con ID " + city_id);
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se encontraron los productos correspondientes a la Ciudad con ID " + city_id);
        return this.getProductViewDTOList(productFoundByCityId);
    }

    public List<ProductViewDTO> listProductByCategoryId(Long category_id) throws ResourceNotFoundException {
        List<Product> productFoundByCategoryId = productRepository.findByCategoryId(category_id);
        if (productFoundByCategoryId.isEmpty()) {
            logger.error("NO se encontraron los productos correspondientes a la Categoria con ID " + category_id);
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se encontraron los productos correspondientes a la Categoria con ID " + category_id);
        return this.getProductViewDTOList(productFoundByCategoryId);
    }

    public List<ProductViewDTO> searchProductsByCityCheckInDateCheckOutDate(Long city, Date checkInDate, Date checkOutDate) throws ResourceNotFoundException {
        List<Product> productFoundByCityCheckInDateCheckOutDate = productRepository.searchProductByCityCheckInDateCheckOutDate(city, checkInDate, checkOutDate);
        if (productFoundByCityCheckInDateCheckOutDate.isEmpty()) {
            logger.error("No se encontraron los productos correspondientes la Ciudad con ID " + city + "  en las fechas especificadas.");
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se encontraron los productos correspondientes la Ciudad con ID " + city + " en las fechas especificadas.");
        return this.getProductViewDTOList(productFoundByCityCheckInDateCheckOutDate);
    }

    public List<ProductViewDTO> listProductByCityIdAndCategoryId(Long city_id, Long category_id) throws ResourceNotFoundException {
        List<Product> productFoundByCityIdAndCategoryId = productRepository.findByCityIdAndCategoryId(city_id, category_id);
        if (productFoundByCityIdAndCategoryId.isEmpty()) {
            logger.error("No se encontraron los productos correspondientes a la Ciudad con ID " + city_id + " y a la Categoria con ID " + category_id);
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se encontraron los productos correspondientes a la Ciudad con ID " + city_id + " y a la Categoria con ID " + category_id);
        return this.getProductViewDTOList(productFoundByCityIdAndCategoryId);
    }

    public List<ProductViewDTO> listProductByCityIdAndCategoryIdAndGuests(Long city_id, Long category_id, Integer guests) throws ResourceNotFoundException {
        List<Product> productFoundByCityIdAndCategoryIdAndGuests = productRepository.findByCityIdAndCategoryIdAndGuests(city_id, category_id, guests);
        if (productFoundByCityIdAndCategoryIdAndGuests.isEmpty()) {
            logger.error("No se encontraron los productos correspondientes a la Ciudad con ID " + city_id + ", a la Categoria con ID " + category_id + " y para " + guests + " inquilinos.");
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se encontraron los productos correspondientes a la Ciudad con ID " + city_id + ", a la Categoria con ID " + category_id + " y para " + guests + " inquilinos.");
        return this.getProductViewDTOList(productFoundByCityIdAndCategoryIdAndGuests);
    }

    public List<ProductViewDTO> searchProductsByCityExcludingDates(Long city, Date checkInDate, Date checkOutDate) throws ResourceNotFoundException {
        List<Product> productFoundByCityId = productRepository.findByCityId(city);
        List<Product> productFoundByCityCheckInDateCheckOutDate = productRepository.searchProductByCityCheckInDateCheckOutDate(city, checkInDate, checkOutDate);
        List<Product> auxList = new ArrayList<>();
        auxList.addAll(productFoundByCityId);
        for (Product productCity : productFoundByCityId) {
            for (Product productDate : productFoundByCityCheckInDateCheckOutDate) {
                if (productCity.equals(productDate)) {
                    auxList.remove(productCity);
                }
            }
        }
        if (auxList.isEmpty()) {
            logger.error("No se encontraron los productos correspondientes la Ciudad con ID " + city + "  en las fechas especificadas.");
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se encontraron los productos correspondientes la Ciudad con ID " + city + " en las fechas especificadas.");
        return this.getProductViewDTOList(auxList);
    }

    public List<ProductViewDTO> searchProductByCityCategoryCheckInDateCheckOutDate(Long city, Long category, Date checkInDate, Date checkOutDate) throws ResourceNotFoundException {
        List<Product> productFoundByCityIdAndCategoryId = productRepository.findByCityIdAndCategoryId(city, category);
        List<Product> productFoundByCityCheckInDateCheckOutDate = productRepository.searchProductByCityCategoryCheckInDateCheckOutDate(city, category, checkInDate, checkOutDate);
        List<Product> auxList = new ArrayList<>();
        auxList.addAll(productFoundByCityIdAndCategoryId);
        for (Product productCityCategory : productFoundByCityIdAndCategoryId) {
            for (Product productDate : productFoundByCityCheckInDateCheckOutDate) {
                if (productCityCategory.equals(productDate)) {
                    auxList.remove(productCityCategory);
                }
            }
        }
        if (auxList.isEmpty()) {
            logger.error("No se encontraron los productos correspondientes la Ciudad con ID " + city + " y Categoria con ID " + category + " en las fechas especificadas.");
            throw new ResourceNotFoundException("No value present: ");
        }
        logger.info("Se encontraron los productos correspondientes la Ciudad con ID " + city + " y Categoria con ID " + category + " en las fechas especificadas.");
        return this.getProductViewDTOList(auxList);
    }

    public List<ProductViewDTO> findByUserId(Long id) {
        List<Product> productList = this.productRepository.findByUserId(id);
        if (productList.isEmpty()) {
            logger.error("No se encontraron los productos correspondientes el usuario con ID " + id);
            return this.getProductViewDTOList(productList);
        }
        logger.info("Se encontraron los productos correspondientes al usuario con ID " + id);
        return this.getProductViewDTOList(productList);
    }

    private List<ProductViewDTO> getProductViewDTOList(List<Product> products) {
        List<ProductViewDTO> listDTO = new ArrayList<>();
        for (Product p : products) {
            ProductViewDTO productViewDTO = this.mapperService.convert(p, ProductViewDTO.class);
            productViewDTO.setPolicies(this.getPolicies(p.getPolicyItems()));
            listDTO.add(productViewDTO);
        }
        return listDTO;
    }

    private ProductViewDTO getProductViewDTO(Product product) {
        ProductViewDTO productViewDTO = this.mapperService.convert(product, ProductViewDTO.class);
        productViewDTO.setPolicies(this.getPolicies(product.getPolicyItems()));
        if(product.getUser().getId() != null){
            productViewDTO.setUser_id(product.getUser().getId());
        }
        return productViewDTO;
    }

    private Set<PolicyDTO> getPolicies(Set<PolicyItem> policyItems) {
        return this.policyService.converPolicyItems(policyItems);
    }
}
