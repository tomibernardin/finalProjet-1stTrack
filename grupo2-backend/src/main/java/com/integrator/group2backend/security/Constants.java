package com.integrator.group2backend.security;

public class Constants {

    // Spring Security


    public static final String HEADER_AUTHORIZACION_KEY = "Authorization";
    public static final String TOKEN_BEARER_PREFIX = "Bearer";

    // JWT

    public static final String SUPER_SECRET_KEY = "grupo2_secretKey";
    public static final long TOKEN_EXPIRATION_TIME = 864_000_000; // 10 days

}
