package com.congpuvcode.todo.service;

import com.congpuvcode.todo.dto.JwtAuthResponse;
import com.congpuvcode.todo.dto.LoginDto;
import com.congpuvcode.todo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
}
