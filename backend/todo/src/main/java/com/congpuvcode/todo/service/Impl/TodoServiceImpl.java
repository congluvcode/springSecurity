package com.congpuvcode.todo.service.Impl;

import com.congpuvcode.todo.dto.TodoDto;
import com.congpuvcode.todo.entity.Todo;
import com.congpuvcode.todo.exception.ResourceNotFoundException;
import com.congpuvcode.todo.repository.TodoRepository;
import com.congpuvcode.todo.service.TodoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoServiceImpl implements TodoService {
    private TodoRepository todoRepository;
    private ModelMapper modelMapper;


    public TodoServiceImpl(TodoRepository todoRepository, ModelMapper modelMapper) {
        this.todoRepository = todoRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<TodoDto> getAll1() {
        List<Todo> todos = todoRepository.findAll();
        return todos.stream().map(todo -> modelMapper.map(todo,TodoDto.class)).collect(Collectors.toList());
    }

    @Override
    public TodoDto getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() ->  new ResourceNotFoundException("Todo","id",id));
        return modelMapper.map(todo,TodoDto.class);
    }

    @Override
    public TodoDto createTodo(TodoDto todoDto) {
        Todo todo = modelMapper.map(todoDto,Todo.class);
        Todo todoRespon = todoRepository.save(todo);
        return modelMapper.map(todoRespon,TodoDto.class);
    }

    @Override
    public TodoDto updateTodo(Long id, TodoDto todoDto) {
        Todo todo = modelMapper.map(todoDto,Todo.class);
        todo.setId(id);
        Todo todoRespon = todoRepository.save(todo);
        return modelMapper.map(todoRespon,TodoDto.class);
    }

    @Override
    public TodoDto completedTodo(Long id) {
        Todo todo = todoRepository.findById(id).get();
        todo.setCompleted(Boolean.TRUE);
        Todo todoRespon = todoRepository.save(todo);
        return modelMapper.map(todoRespon,TodoDto.class);
    }

    @Override
    public TodoDto inCompletedTodo(Long id) {
        Todo todo = todoRepository.findById(id).get();
        todo.setCompleted(Boolean.FALSE);
        Todo todoRespon = todoRepository.save(todo);
        return modelMapper.map(todoRespon,TodoDto.class);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).get();
        todoRepository.delete(todo);
    }
}
