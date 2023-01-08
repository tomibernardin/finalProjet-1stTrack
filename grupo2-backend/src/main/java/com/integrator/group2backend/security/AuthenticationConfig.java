package com.integrator.group2backend.security;

import com.integrator.group2backend.entities.User;
import com.integrator.group2backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationConfig implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public AuthenticationConfig(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        User user = this.userRepository.findByEmail(mail);
        if (user == null) {
            throw new UsernameNotFoundException("El usuario con email " + mail + " no existe");
        }
        return user;
    }
}
