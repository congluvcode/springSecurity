package com.congpuvcode.todo.controller;

import com.congpuvcode.todo.dto.JwtAuthResponse;
import com.congpuvcode.todo.dto.LoginDto;
import com.congpuvcode.todo.dto.RegisterDto;
import com.congpuvcode.todo.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String mes = authService.register(registerDto);
        return new ResponseEntity<>(mes, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        JwtAuthResponse jwtAuthResponse = authService.login(loginDto);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.CREATED);
    }
}
