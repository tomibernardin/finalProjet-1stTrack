package com.integrator.group2backend.service;

import com.integrator.group2backend.dto.CurrentUserDTO;
import com.integrator.group2backend.dto.ProductCreateDTO;
import com.integrator.group2backend.dto.ProductUpdateDTO;
import com.integrator.group2backend.dto.ProductViewDTO;
import com.integrator.group2backend.entities.Category;
import com.integrator.group2backend.entities.City;
import com.integrator.group2backend.entities.Policy;
import com.integrator.group2backend.entities.PolicyItem;
import com.integrator.group2backend.entities.Product;
import com.integrator.group2backend.entities.User;
import com.integrator.group2backend.exception.DataIntegrityViolationException;
import com.integrator.group2backend.exception.ResourceNotFoundException;
import com.integrator.group2backend.exception.UnauthorizedProductException;
import com.integrator.group2backend.repository.ProductRepository;
import com.integrator.group2backend.utils.MapperService;
import com.integrator.group2backend.utils.UpdateProductCompare;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;

@RunWith(MockitoJUnitRunner.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    @Mock
    private MapperService mapperService;
    @Mock
    private CategoryService categoryService;
    @Mock
    private CityService cityService;
    @Mock
    private FeatureService featureService;
    @Mock
    private PolicyItemService policyItemService;
    @Mock
    private ImageService imageService;
    @Mock
    private UpdateProductCompare updateProductCompare;
    @Mock
    private UserService userService;
    @Mock
    private PolicyService policyService;
    private ProductService productService;


    @Before
    public void setUp() {
        this.productService = new ProductService(this.productRepository, this.mapperService, this.updateProductCompare,
                this.categoryService, this.featureService, this.policyItemService, this.imageService, this.cityService,
                this.policyService, this.userService);
    }


    @Test
    public void testSearchProductByIdSuccess() throws ResourceNotFoundException {
        Policy policy = new Policy();
        policy.setId(1L);
        policy.setName("policy name");

        PolicyItem policyItem = new PolicyItem();
        policyItem.setId(1L);
        policyItem.setName("policyitem name");
        policyItem.setPolicy(policy);

        Set<PolicyItem> policyItemsList = new HashSet<>();
        policyItemsList.add(policyItem);

        Product requestProduct = new Product();
        requestProduct.setTitle("Departamento");
        requestProduct.setPolicyItems(policyItemsList);

        ProductViewDTO p = new ProductViewDTO();
        p.setId(1L);

        CurrentUserDTO currentUserDTO = new CurrentUserDTO();
        currentUserDTO.setId(1L);
        User user = new User();
        user.setId(1L);

        requestProduct.setUser(user);

        Mockito.when(this.productRepository.findById(eq(1L))).thenReturn((Optional.of(requestProduct)));
        Mockito.when(this.policyService.converPolicyItems(eq(policyItemsList))).thenReturn(null);
        Mockito.when(this.mapperService.convert(eq(requestProduct), eq(ProductViewDTO.class))).thenReturn(p);

        this.productService.searchProductById(1L);
        Mockito.verify(this.productRepository, times(1)).findById(eq(1L));
        Mockito.verify(this.policyService, times(1)).converPolicyItems(eq(policyItemsList));
        Mockito.verify(this.mapperService, times(1)).convert(eq(requestProduct), eq(ProductViewDTO.class));
    }

    @Test
    public void testSearchProductByIdNotFound() throws UnauthorizedProductException {

        Mockito.when(this.productRepository.findById(eq(1L))).thenReturn((Optional.empty()));

        try {
            this.productService.searchProductById(1L);
        } catch (ResourceNotFoundException e) {
            Assert.assertEquals("No value present: ", e.getMessage());
        }

        Mockito.verify(this.productRepository, times(1)).findById(eq(1L));
        Mockito.verify(this.policyService, times(0)).converPolicyItems(any());
        Mockito.verify(this.mapperService, times(0)).convert(any(), any());
    }

    @Test
    public void testAddProductWithUncompletedRequest() throws ResourceNotFoundException {

        ProductCreateDTO request = new ProductCreateDTO();
        request.setTitle("Title");
        request.setUser_id(1L);

        try {
            this.productService.addProduct(request);
        } catch (DataIntegrityViolationException e) {
            Assert.assertEquals("Cannot create the product", e.getMessage());
        }
    }

    @Test
    public void testAddProductWithUserNotFound() throws DataIntegrityViolationException {
        ProductCreateDTO request = new ProductCreateDTO();
        request.setTitle("Title");
        request.setImage(Collections.EMPTY_SET);
        request.setPolicyItems_id(new ArrayList<>());
        request.setCategory_id(1L);
        request.setFeatures_id(new ArrayList<>());
        request.setCity_id(1L);
        request.setUser_id(1L);

        try {
            this.productService.addProduct(request);
        } catch (ResourceNotFoundException e) {
            Assert.assertEquals("User not found", e.getMessage());
        }
    }

    @Test
    public void testAddProductSuccess() throws DataIntegrityViolationException, ResourceNotFoundException {
        ProductCreateDTO request = new ProductCreateDTO();
        request.setTitle("Title");
        request.setDescription("desc");
        request.setRooms(3);
        request.setBathrooms(3);
        request.setBeds(6);
        request.setGuests(6);
        request.setDailyPrice(100.23f);
        request.setAddress("address");
        request.setImage(Collections.EMPTY_SET);
        request.setPolicyItems_id(new ArrayList<>());
        request.setCategory_id(1L);
        request.setFeatures_id(new ArrayList<>());
        request.setCity_id(1L);
        request.setUser_id(1L);

        User user = new User();
        user.setId(1L);

        Category category = new Category();
        category.setId(1L);

        City city = new City();
        city.setId(1L);

        Product product = new Product();
        product.setUser(user);


        Mockito.when(this.userService.findById(eq(1L))).thenReturn(Optional.of(user));
        Mockito.when(this.categoryService.searchCategoryById(eq(1L))).thenReturn(Optional.of(category));
        Mockito.when(this.cityService.getCityById(eq(1L))).thenReturn(Optional.of(city));

        ArgumentCaptor<Product> productArgumentCaptor = ArgumentCaptor.forClass(Product.class);
        Mockito.when(this.productRepository.save(productArgumentCaptor.capture())).thenReturn(product);
        Mockito.when(this.mapperService.convert(eq(product), eq(ProductViewDTO.class))).thenReturn(new ProductViewDTO());

        this.productService.addProduct(request);

        Mockito.verify(this.productRepository, times(2)).save(productArgumentCaptor.capture());

        List<Product> savedProducts = productArgumentCaptor.getAllValues();
        Product firstSavedProduct = savedProducts.get(0);

        Assert.assertEquals("Title", firstSavedProduct.getTitle());
        Assert.assertEquals("desc", firstSavedProduct.getDescription());
        Assert.assertEquals("address", firstSavedProduct.getAddress());
        Assert.assertEquals(3, firstSavedProduct.getRooms(), 0);
        Assert.assertEquals(3, firstSavedProduct.getBathrooms(), 0);
        Assert.assertEquals(6, firstSavedProduct.getBeds(), 0);
        Assert.assertEquals(6, firstSavedProduct.getGuests(), 0);
        Assert.assertEquals(100.23f, firstSavedProduct.getDailyPrice(), 0);
    }

    @Test
    public void testListAllProductsWithNoEmptyList() throws ResourceNotFoundException {
        List<Product> list = Collections.singletonList(new Product());
        Mockito.when(this.productRepository.findAll()).thenReturn(list);
        Mockito.when(this.mapperService.convert(any(), eq(ProductViewDTO.class))).thenReturn(new ProductViewDTO());

        this.productService.listAllProducts();

        Mockito.verify(this.productRepository, times(1)).findAll();
        Mockito.verify(this.mapperService, times(1)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(1)).converPolicyItems(any());
    }

    @Test
    public void testListAllProductsWithEmptyList() {
        Mockito.when(this.productRepository.findAll()).thenReturn(Collections.emptyList());
        try {
            this.productService.listAllProducts();
        } catch (ResourceNotFoundException e) {
            Assert.assertEquals("No value present: ", e.getMessage());
        }

        Mockito.verify(this.productRepository, times(1)).findAll();
        Mockito.verify(this.mapperService, times(0)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(0)).converPolicyItems(any());
    }

    @Test
    public void testListRandomAllProductsWithNoEmptyList() throws ResourceNotFoundException {
        List<Product> productList = Collections.singletonList(new Product());

        Mockito.when(this.productRepository.findAll()).thenReturn(productList);
        Mockito.when(this.mapperService.convert(any(), eq(ProductViewDTO.class))).thenReturn(new ProductViewDTO());

        this.productService.listRandomAllProducts();

        Mockito.verify(this.productRepository, times(1)).findAll();
        Mockito.verify(this.mapperService, times(1)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(1)).converPolicyItems(any());
    }

    @Test
    public void testListRandomAllProductsWithEmptyList() {
        Mockito.when(this.productRepository.findAll()).thenReturn(Collections.emptyList());

        try {
            this.productService.listRandomAllProducts();
        } catch (ResourceNotFoundException e) {
            Assert.assertEquals("No value present: ", e.getMessage());
        }

        Mockito.verify(this.productRepository, times(1)).findAll();
        Mockito.verify(this.mapperService, times(0)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(0)).converPolicyItems(any());
    }

    @Test
    public void updateProduct() throws ResourceNotFoundException, UnauthorizedProductException {
        User user = new User();
        user.setId(1L);

        Product p = new Product();
        p.setId(1L);
        p.setBeds(1);
        p.setUser(user);

        CurrentUserDTO currentUserDTO = new CurrentUserDTO();
        currentUserDTO.setId(1L);

        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        Mockito.when(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).thenReturn("mail@mail.com");

        Mockito.when(this.productRepository.findById(eq(1L))).thenReturn(Optional.of(p));
        Mockito.when(this.mapperService.convert(any(), eq(ProductViewDTO.class))).thenReturn(new ProductViewDTO());
        Mockito.when(this.updateProductCompare.updateProductCompare(any(), any())).thenReturn(p);
        Mockito.when(this.userService.getCurrentUser(eq("mail@mail.com"))).thenReturn(currentUserDTO);

        ProductUpdateDTO productUpdate = new ProductUpdateDTO();
        productUpdate.setBeds(3);
        productUpdate.setUser_id(1L);

        this.productService.updateProduct(1L, productUpdate);

        ArgumentCaptor<Product> oldProduct = ArgumentCaptor.forClass(Product.class);
        ArgumentCaptor<ProductUpdateDTO> newProduct = ArgumentCaptor.forClass(ProductUpdateDTO.class);

        Mockito.verify(this.productRepository, times(1)).save(any());
        Mockito.verify(this.updateProductCompare, times(1)).updateProductCompare(oldProduct.capture(), newProduct.capture());
        Mockito.verify(this.mapperService, times(1)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(1)).converPolicyItems(any());

        Assert.assertEquals(1, oldProduct.getValue().getBeds(), 0);
        Assert.assertEquals(3, newProduct.getValue().getBeds(), 0);
    }

    @Test
    public void testDeleteProduct() throws UnauthorizedProductException, ResourceNotFoundException {
        User user = new User();
        user.setId(1L);

        Product p = new Product();
        p.setId(1L);
        p.setBeds(1);
        p.setUser(user);

        CurrentUserDTO currentUserDTO = new CurrentUserDTO();
        currentUserDTO.setId(1L);

        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        Mockito.when(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).thenReturn("mail@mail.com");

        Mockito.doNothing().when(this.productRepository).deleteById(eq(1L));
        Mockito.when(this.productRepository.findById(1L)).thenReturn(Optional.of(p));
        Mockito.when(this.userService.getCurrentUser(eq("mail@mail.com"))).thenReturn(currentUserDTO);

        this.productService.deleteProduct(1L);

        Mockito.verify(this.productRepository, times(1)).deleteById(eq(1L));
    }

    @Test
    public void testListProductByCityIdWhenNoEmptyList() throws ResourceNotFoundException {
        List<Product> productList = Collections.singletonList(new Product());

        Mockito.when(this.productRepository.findByCityId(1L)).thenReturn(productList);
        Mockito.when(this.mapperService.convert(any(), eq(ProductViewDTO.class))).thenReturn(new ProductViewDTO());

        this.productService.listProductByCityId(1L);

        Mockito.verify(this.productRepository, times(1)).findByCityId(eq(1L));
        Mockito.verify(this.mapperService, times(1)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(1)).converPolicyItems(any());
    }

    @Test
    public void testListProductByCityIdWithEmptyList() {
        Mockito.when(this.productRepository.findByCityId(1L)).thenReturn(Collections.emptyList());

        try {
            this.productService.listProductByCityId(1L);
        } catch (ResourceNotFoundException e) {
            Assert.assertEquals("No value present: ", e.getMessage());
        }

        Mockito.verify(this.productRepository, times(1)).findByCityId(eq(1L));
        Mockito.verify(this.mapperService, times(0)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(0)).converPolicyItems(any());
    }

    @Test
    public void testListProductByCategoryIdWhenNoEmptyList() throws ResourceNotFoundException {
        List<Product> productList = Collections.singletonList(new Product());

        Mockito.when(this.productRepository.findByCategoryId(1L)).thenReturn(productList);
        Mockito.when(this.mapperService.convert(any(), eq(ProductViewDTO.class))).thenReturn(new ProductViewDTO());

        this.productService.listProductByCategoryId(1L);

        Mockito.verify(this.productRepository, times(1)).findByCategoryId(eq(1L));
        Mockito.verify(this.mapperService, times(1)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(1)).converPolicyItems(any());
    }

    @Test
    public void testListProductByCategoryIdWithEmptyList() throws ResourceNotFoundException {
        Mockito.when(this.productRepository.findByCategoryId(1L)).thenReturn(Collections.emptyList());

        try {
            this.productService.listProductByCategoryId(1L);
        } catch (ResourceNotFoundException e) {
            Assert.assertEquals("No value present: ", e.getMessage());
        }

        Mockito.verify(this.productRepository, times(1)).findByCategoryId(eq(1L));
        Mockito.verify(this.mapperService, times(0)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(0)).converPolicyItems(any());
    }

    @Test
    public void testSearchProductsByCityIdCheckInDateCheckOutDateWithEmptyList() {
        Date dateFrom = new Date();
        Date dateTo = new Date();
        Mockito.when(this.productRepository.searchProductByCityCheckInDateCheckOutDate(eq(1L), eq(dateFrom), eq(dateTo))).thenReturn(Collections.emptyList());

        try {
            this.productService.searchProductsByCityCheckInDateCheckOutDate(1L, dateFrom, dateTo);
        } catch (ResourceNotFoundException e) {
            Assert.assertEquals("No value present: ", e.getMessage());
        }

        Mockito.verify(this.productRepository, times(1)).searchProductByCityCheckInDateCheckOutDate(eq(1L), eq(dateFrom), eq(dateTo));
        Mockito.verify(this.mapperService, times(0)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(0)).converPolicyItems(any());
    }

    @Test
    public void testSearchProductsByCityIdCheckInDateCheckOutDateWhenNoEmptyList() throws ResourceNotFoundException {
        Date datefrom = new Date();
        Date dateTo = new Date();
        List<Product> productList = Collections.singletonList(new Product());

        Mockito.when(this.productRepository.searchProductByCityCheckInDateCheckOutDate(eq(1L), eq(datefrom), eq(dateTo))).thenReturn(productList);
        Mockito.when(this.mapperService.convert(any(), eq(ProductViewDTO.class))).thenReturn(new ProductViewDTO());

        this.productService.searchProductsByCityCheckInDateCheckOutDate(1L, datefrom, dateTo);

        Mockito.verify(this.productRepository, times(1)).searchProductByCityCheckInDateCheckOutDate(eq(1L), eq(datefrom), eq(dateTo));
        Mockito.verify(this.mapperService, times(1)).convert(any(), eq(ProductViewDTO.class));
        Mockito.verify(this.policyService, times(1)).converPolicyItems(any());
    }


}
