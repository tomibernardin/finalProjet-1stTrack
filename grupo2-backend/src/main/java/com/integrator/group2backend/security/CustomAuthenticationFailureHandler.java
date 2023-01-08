package com.integrator.group2backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrator.group2backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    private final ObjectMapper objectMapper;
    @Autowired
    private UserRepository userRepository;

    public CustomAuthenticationFailureHandler() {
        this.objectMapper = new ObjectMapper();
    }
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        Map<String, Object> data = new HashMap<>();
        if(exception.getMessage().equals("User is disabled")){
            data.put(
                    "title",
                    "Please check your email");
            data.put(
                    "description",
                    "Your email address must be verified before you can sign in. Please check your mailbox to verify your account.");
        } else if (exception.getMessage().equals("Bad credentials")) {
            data.put(
                    "title",
                    "We couldn't log you in");
            data.put(
                    "description",
                    "The email or password entered is invalid. Please try again.");
        }
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getOutputStream()
                .println(objectMapper.writeValueAsString(data));
    }
}
