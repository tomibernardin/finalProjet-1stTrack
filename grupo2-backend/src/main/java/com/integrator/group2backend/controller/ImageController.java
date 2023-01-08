package com.integrator.group2backend.controller;

import com.integrator.group2backend.dto.ProductCreateDTO;
import com.integrator.group2backend.entities.Image;
import com.integrator.group2backend.entities.Product;
import com.integrator.group2backend.exception.DataIntegrityViolationException;
import com.integrator.group2backend.exception.ImageSizeTooLongException;
import com.integrator.group2backend.exception.ResourceNotFoundException;
import com.integrator.group2backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/image")
public class ImageController {
    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    /*@PostMapping
    private ResponseEntity<Image> addImage(@RequestBody Image image){
        return ResponseEntity.ok(this.imageService.addImage(image, file));
    }*/
    @PostMapping
    private ResponseEntity<Image> addImage(@RequestPart(value = "file") MultipartFile file){
        return ResponseEntity.ok(this.imageService.addImage(file));
    }
    @PostMapping("/uploadList")
    private ResponseEntity<List<Image>> addMultipleImages(@RequestBody List<MultipartFile> files){
        System.out.println(files);
        return ResponseEntity.ok(this.imageService.addMultipleImages(files));
    }
    @PostMapping("/list")
    private ResponseEntity<List<Image>> addImageList(@RequestBody List<Image> imageList){
        return ResponseEntity.ok(this.imageService.addImageList(imageList));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable("id") Long imageId, @RequestPart(value = "file") MultipartFile file) throws ResourceNotFoundException, DataIntegrityViolationException, ImageSizeTooLongException {
        return ResponseEntity.ok(imageService.updateImage(imageId, file));
    }
    @GetMapping("/{id}")
    private ResponseEntity<Image> getImageById(@PathVariable Long id){
        Optional<Image> image = this.imageService.getImageById(id);
        if(image.isPresent()){
            return ResponseEntity.ok(image.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    private ResponseEntity<List<Image>> getAllImage(){
        List<Image> list = this.imageService.getAllImage();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<String> deleteImageByid(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Image> image = this.imageService.getImageById(id);
        if(image.isPresent()){
            this.imageService.deleteImage(id);
            return ResponseEntity.ok("Image with id " + id + " deleted");
        }
        return ResponseEntity.notFound().build();
    }
}
