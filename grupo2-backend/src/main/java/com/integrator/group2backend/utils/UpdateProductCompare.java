package com.integrator.group2backend.utils;

import com.integrator.group2backend.dto.ProductCreateDTO;
import com.integrator.group2backend.dto.ProductUpdateDTO;
import com.integrator.group2backend.entities.*;
import com.integrator.group2backend.exception.ResourceNotFoundException;
import com.integrator.group2backend.service.*;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Component
public class UpdateProductCompare {
    private final CityService cityService;
    private final CategoryService categoryService;
    private final FeatureService featureService;
    private final PolicyItemService policyItemService;
    private final ImageService imageService;
    private final UserService userService;
    public static final Logger logger = Logger.getLogger(UpdateProductCompare.class);


    public UpdateProductCompare(CityService cityService, CategoryService categoryService, PolicyItemService policyItemService, FeatureService featureService, ImageService imageService, UserService userService) {
        this.cityService = cityService;
        this.categoryService = categoryService;
        this.policyItemService = policyItemService;
        this.featureService = featureService;
        this.imageService = imageService;
        this.userService = userService;
    }

    public Product updateProductCompare (Product oldProduct, ProductUpdateDTO newProduct){


        Product auxProduct = new Product();
        Set<Feature> features = new HashSet<>();
        Set<PolicyItem> policyItems = new HashSet<>();
        List<MultipartFile> newMultipartFiles = new ArrayList<>();
        List<Image> modifiedImagesList = new ArrayList<>();
        Set<Image> modifiedImagesSet = new HashSet<>();

        auxProduct.setId(oldProduct.getId());

        if (newProduct.getTitle() == null){
            auxProduct.setTitle(oldProduct.getTitle());
        }else {
            auxProduct.setTitle(newProduct.getTitle());
        }

        if (newProduct.getDescription() == null){
            auxProduct.setDescription(oldProduct.getDescription());
        }else {
            auxProduct.setDescription(newProduct.getDescription());
        }

        if (newProduct.getRooms() == null){
            auxProduct.setRooms(oldProduct.getRooms());
        }else {
            auxProduct.setRooms(newProduct.getRooms());
        }

        if (newProduct.getBeds() == null){
            auxProduct.setBeds(oldProduct.getBeds());
        }else {
            auxProduct.setBeds(newProduct.getBeds());
        }

        if (newProduct.getBathrooms() == null){
            auxProduct.setBathrooms(oldProduct.getBathrooms());
        }else {
            auxProduct.setBathrooms(newProduct.getBathrooms());
        }

        if (newProduct.getGuests() == null){
            auxProduct.setGuests(oldProduct.getGuests());
        }else {
            auxProduct.setGuests(newProduct.getGuests());
        }

        if (newProduct.getDailyPrice() == null){
            auxProduct.setDailyPrice(oldProduct.getDailyPrice());
        }else {
            auxProduct.setDailyPrice(newProduct.getDailyPrice());
        }

        if (newProduct.getAddress() == null){
            auxProduct.setAddress(oldProduct.getAddress());
        }else{
            auxProduct.setAddress(newProduct.getAddress());
        }

        if (newProduct.getNumber() == null){
            auxProduct.setNumber(oldProduct.getNumber());
        }else {
            auxProduct.setNumber(newProduct.getNumber());
        }

        if (newProduct.getFloor() == null){
            auxProduct.setFloor(oldProduct.getFloor());
        }else {
            auxProduct.setFloor(newProduct.getFloor());
        }

        if (newProduct.getApartment() == null){
            auxProduct.setApartment(oldProduct.getApartment());
        }else {
            auxProduct.setApartment(newProduct.getApartment());
        }

        if (newProduct.getLatitude() == null){
            auxProduct.setLatitude(oldProduct.getLatitude());
        }else {
            auxProduct.setLatitude(newProduct.getLatitude());
        }

        if (newProduct.getLongitude() == null){
            auxProduct.setLongitude(oldProduct.getLongitude());
        }else {
            auxProduct.setLongitude(newProduct.getLongitude());
        }

        if (oldProduct.getUser() != null){
            System.out.println("No actualizo User");
            auxProduct.setUser(oldProduct.getUser());
        }

        if (newProduct.getCity_id() == null){
            System.out.println("No actualizo City");
            auxProduct.setCity(oldProduct.getCity());
        }else {
            System.out.println("Actualizo City");
            Optional<City> searchedCity = cityService.getCityById(newProduct.getCity_id());
            auxProduct.setCity(searchedCity.get());
        }

        if (newProduct.getCategory_id() == null){
            System.out.println("No actualizo Category");
            auxProduct.setCategory(oldProduct.getCategory());
        }else {
            System.out.println("Actualizo category");
            Optional<Category> searchedCategory = categoryService.searchCategoryById(newProduct.getCategory_id());
            auxProduct.setCategory(searchedCategory.get());
        }

        if (newProduct.getFeatures_id() == null){
            System.out.println("No actualizo features");
            auxProduct.setFeatures(oldProduct.getFeatures());
        }else {
            for (Long featureId: newProduct.getFeatures_id()){
                features.add(featureService.searchFeatureById(featureId).get());
            }
            System.out.println("Actualizo features");
            auxProduct.setFeatures(features);
        }

        if (newProduct.getPolicyItems_id() == null){
            System.out.println("No actualizo PolicyItems");
            auxProduct.setPolicyItems(oldProduct.getPolicyItems());
        }else{
            for (Long policyItemId: newProduct.getPolicyItems_id()){
                policyItems.add(policyItemService.getPolicyItemById(policyItemId).get());
            }
            System.out.println("Actualizo PolicyItems");
            auxProduct.setPolicyItems(policyItems);
        }

        // Adding new images
        if (newProduct.getAddImages() == null){
            System.out.println("No agrego imagenes");
        }else{
            //Add new images to list
            modifiedImagesList = imageService.addMultipleImages(newProduct.getAddImages());
            for (Image newImage: modifiedImagesList) {
                newImage.setProduct(oldProduct);
            }
            modifiedImagesSet.addAll(modifiedImagesList);
        }

        Integer imagesToAdd = 0;
        Integer imagesToRemove = 0;
        if (newProduct.getAddImages() != null){
            imagesToAdd = newProduct.getAddImages().size();
        }
        if (newProduct.getRemoveImages() != null){
            imagesToRemove = newProduct.getRemoveImages().size();
        }

        // Adding and/or removing old images
        if (newProduct.getRemoveImages() == null){
            logger.info("No elimino imagenes");
            modifiedImagesSet.addAll(oldProduct.getImages());
        }else{
            //Search old selected images and delete them
            if (oldProduct.getImages().size() + imagesToAdd - imagesToRemove >= 3) {
                for (Long imagesToRemoveId : newProduct.getRemoveImages()) {
                    Optional<Image> searchedImage = imageService.getImageById(imagesToRemoveId);
                    if (searchedImage.isPresent() && searchedImage.get().getProduct().getId().equals(oldProduct.getId())) {
                        try {
                            oldProduct.getImages().remove(searchedImage.get());
                            imageService.deleteImage(imagesToRemoveId);
                        } catch (ResourceNotFoundException e) {
                            logger.error(e.getMessage());
                        }
                    } else {
                        logger.info("The image to remove with ID " + imagesToRemoveId + " doesn't belong to this product");
                    }
                }
            }
            modifiedImagesSet.addAll(oldProduct.getImages());
        }

        // Setting aux product with all the new modified images
        auxProduct.setImages(modifiedImagesSet);

        return auxProduct;
    }
}
