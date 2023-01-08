package com.integrator.group2backend.security;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

//@Component
//@EnableWebSecurity
//public class RestAuthEntryPoint implements AuthenticationEntryPoint {
//    public void commence(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            org.springframework.security.core.AuthenticationException authException)
//            throws IOException {
//        response.setHeader("WWW-Authenticate", "");
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        PrintWriter writer = response.getWriter();
//        writer.println(authException.getMessage());
//    }
//}