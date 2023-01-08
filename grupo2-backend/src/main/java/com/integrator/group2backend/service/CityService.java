package com.integrator.group2backend.service;

import com.integrator.group2backend.entities.City;
import com.integrator.group2backend.exception.BadRequestException;
import com.integrator.group2backend.exception.ResourceNotFoundException;
import com.integrator.group2backend.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public City addCity(City city) throws BadRequestException {
        Optional<City> buscaCity = this.cityRepository.findByPostalCode(city.getPostalCode());
        if(buscaCity.isPresent()){
            throw new BadRequestException("El código postal " + city.getPostalCode() + " ya esta registrado");
        }
        return this.cityRepository.save(city);
    }

    public List<City> getAllCity(){
        return this.cityRepository.findAll();
    }

    public Optional<City> getCityById(Long id){
        return this.cityRepository.findById(id);
    }

    public Optional<City> findByPostalCode(String postalCode){
        return this.cityRepository.findByPostalCode(postalCode);
    }

    public City deleteCity(Long id) throws ResourceNotFoundException {
        Optional<City> city = this.getCityById(id);
        if(city.isPresent()){
            this.cityRepository.deleteById(id);
            return city.get();
        }
        throw new ResourceNotFoundException("No existe una ciudad con el id: " + id);
    }
    public City updateCity(City city){
        return this.cityRepository.save(city);
    }

}
