package com.integrator.group2backend.controller;

import com.integrator.group2backend.dto.FeatureDTO;
import com.integrator.group2backend.entities.Feature;
import com.integrator.group2backend.service.FeatureService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feature")
public class FeatureController {
    public static final Logger logger = Logger.getLogger(FeatureController.class);
    private final FeatureService featureService;
    @Autowired
    public FeatureController(FeatureService featureService){
        this.featureService = featureService;
    }
    @PostMapping
    public ResponseEntity<Feature> createFeature(@RequestBody FeatureDTO feature){
        return ResponseEntity.ok(featureService.addFeature(feature));
    }
    @PostMapping("/list")
    public ResponseEntity<List<Feature>> createFeatureList(@RequestBody List<Feature> featureList){
        List<Feature> addedFeatures = featureService.addFeatureList(featureList);
        logger.info("Se agrego una lista de features");

        return ResponseEntity.ok(addedFeatures);
    }
    @GetMapping
    public ResponseEntity<List<Feature>> listAllFeatures() {
        List<Feature> searchedFeatures = featureService.listAllFeatures();
        if (!(searchedFeatures.isEmpty())) {
            logger.info("Se listaron todas las caracteristicas");
            return ResponseEntity.ok(searchedFeatures);
        } else {
            logger.error("Error al listar todas las caracteristicas");
            return ResponseEntity.ok(searchedFeatures);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Feature> searchFeatureById(@PathVariable("id") Long featureId){
        Optional<Feature> featureFound = featureService.searchFeatureById(featureId);
        if(featureFound.isPresent()){
            logger.info("Se encontro correctamente la caracteristica con id " + featureId);
            return ResponseEntity.ok(featureFound.get());
        }else{
            logger.error("La caracteristica especificado no existe con id " + featureId);
            return ResponseEntity.badRequest().build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Feature> updateFeature(@PathVariable("id") Long featureId, @RequestBody Feature feature){
        boolean featureExists = featureService.searchFeatureById(featureId).isPresent();
        if(featureExists){
            feature.setId(featureId);
            Feature updatedFeature = featureService.updateFeature(feature);
            logger.info("Se actualizo correctamente el producto con id " + featureId);
            return ResponseEntity.ok(updatedFeature);
        }else{
            logger.error("El producto especificado no existe con id " + featureId);
            return ResponseEntity.badRequest().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeature(@PathVariable("id") Long featureId){
        boolean featureExist = featureService.searchFeatureById(featureId).isPresent();
        if(featureExist){
            featureService.deleteFeature(featureId);
            logger.info("El producto con id " + featureId + " ha sido borrado");
            return ResponseEntity.ok("El producto con id " + featureId + " ha sido borrado");
        }else{
            logger.error("El producto con id " + featureId + " no existe en la base de datos");
            return ResponseEntity.ok("El producto con id " + featureId + " no existe en la base de datos");
        }
    }
}
