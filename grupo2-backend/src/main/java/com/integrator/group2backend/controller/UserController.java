package com.integrator.group2backend.controller;

import com.integrator.group2backend.dto.CurrentUserDTO;
import com.integrator.group2backend.dto.UserVerifyCodeDTO;
import com.integrator.group2backend.entities.User;
import com.integrator.group2backend.exception.BadRequestException;
import com.integrator.group2backend.exception.DataIntegrityViolationException;
import com.integrator.group2backend.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Value("${frontendUrl}")
    private String frontendUrl;

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestBody UserVerifyCodeDTO userVerifyCodeDTO) throws BadRequestException{
        if (userService.verify(userVerifyCodeDTO.getCode())) {
            return ResponseEntity.ok().build();
        } else {
            throw new BadRequestException("Error verificating user");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) throws UnsupportedEncodingException, MessagingException, DataIntegrityViolationException {
        return new ResponseEntity<>(userService.addUser(user, frontendUrl), HttpStatus.CREATED);
    }


    @GetMapping("/current")
    public ResponseEntity<CurrentUserDTO> getLoggedUser(Authentication authentication) { // Authentication Spring inyecta y tiene los datos del user correspondiente al token
        return new ResponseEntity<>(this.userService.getCurrentUser(authentication.getName()), HttpStatus.OK);
    }
}
