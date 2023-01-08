package com.integrator.group2backend.controller;

import com.integrator.group2backend.entities.City;
import com.integrator.group2backend.exception.BadRequestException;
import com.integrator.group2backend.exception.ResourceNotFoundException;
import com.integrator.group2backend.service.CityService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/city")
public class CityController {
    public static final Logger logger = Logger.getLogger(CityController.class);
    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @PostMapping
    public ResponseEntity<City> addCity(@RequestBody City city) throws BadRequestException {
        logger.info("Se agrego una ciudad");
        return ResponseEntity.ok(this.cityService.addCity(city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCityById(@PathVariable Long id) {
        Optional<City> city = this.cityService.getCityById(id);
        if (city.isPresent()) {
            logger.info("Se obtuvo correctamente la ciudad con id " + id);
            return ResponseEntity.ok(city.get());
        }
        logger.error("Error al listar la ciudad con id " + id);
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/postal/{postalCode}")
    public ResponseEntity<City> getCityByPostalCode(@PathVariable String postalCode) {
        Optional<City> city = this.cityService.findByPostalCode(postalCode);
        if (city.isPresent()) {
            logger.info("Se encontro correctamente la ciudad por Codigo Postal");
            return ResponseEntity.ok(city.get());
        }
        logger.error("Error al encontrar la ciudad por Codigo Postal");
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<City>> getAllCity() {
        logger.info("Se listaron todos las ciudades");
        return ResponseEntity.ok(this.cityService.getAllCity());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable Long id) throws ResourceNotFoundException {
        logger.info("Se elimino correctamente la ciudad");
        return ResponseEntity.ok(this.cityService.deleteCity(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> updateCity(@PathVariable Long id, @RequestBody City city) {
        if (this.cityService.getCityById(id).isPresent()) {
            city.setId(id);
            logger.info("Se actualizo correctamente la ciudad con id " + city.getId());
            return ResponseEntity.ok(this.cityService.updateCity(city));
        }
        logger.error("La ciudad especificada no existe");
        return ResponseEntity.badRequest().build();
    }
}
