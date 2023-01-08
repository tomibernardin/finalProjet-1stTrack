package com.integrator.group2backend.service;

import com.integrator.group2backend.controller.FeatureController;
import com.integrator.group2backend.dto.FeatureDTO;
import com.integrator.group2backend.entities.Feature;
import com.integrator.group2backend.repository.FeatureRepository;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {
    private final FeatureRepository featureRepository;
    private final ImageService imageService;

    public static final Logger logger = Logger.getLogger(FeatureService.class);

    public FeatureService(FeatureRepository featureRepository, ImageService imageService){
        this.featureRepository = featureRepository;
        this.imageService = imageService;
    }
    public Feature addFeature(FeatureDTO feature){
        Feature newFeature = new Feature();
        newFeature.setName(feature.getName());
        newFeature.setFeatureImage(imageService.getImageById(feature.getImage_id()).get());
        logger.info("Se agrego una feature");
        return featureRepository.save(newFeature);
    }
    public List<Feature> addFeatureList(List<Feature> featureList){
        return featureRepository.saveAll(featureList);
    }
    public Optional<Feature> searchFeatureById(Long featureId){
        return featureRepository.findById(featureId);
    }
    public List<Feature> listAllFeatures(){
        return featureRepository.findAll();
    }
    public Feature updateFeature(Feature feature){
        return featureRepository.save(feature);
    }
    public void deleteFeature(Long id){
        featureRepository.deleteById(id);
    }
}
