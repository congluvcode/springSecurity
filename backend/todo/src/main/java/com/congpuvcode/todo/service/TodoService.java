package com.congpuvcode.todo.service;

import com.congpuvcode.todo.dto.TodoDto;
import java.util.List;

public interface TodoService {
    List<TodoDto> getAll1();
    TodoDto getTodoById(Long id);
    TodoDto createTodo(TodoDto todoDto);
    TodoDto updateTodo(Long id,TodoDto todoDto);
    TodoDto completedTodo(Long id);
    TodoDto inCompletedTodo(Long id);
    void deleteTodo(Long id);
}
