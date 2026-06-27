package com.codecast.codecast_api.controller;

import com.codecast.codecast_api.dto.BookingRequestDTO;
import com.codecast.codecast_api.dto.BookingResponseDTO;
import com.codecast.codecast_api.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final com.codecast.codecast_api.service.BookingService bookingService;

    public BookingController(BookingService bookingService){
        this.bookingService = bookingService;
    }
    @PostMapping
    public ResponseEntity<BookingResponseDTO> create(@Valid @RequestBody BookingRequestDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.create(dto));
    }
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(bookingService.findById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> update(@PathVariable Long id, @Valid @RequestBody BookingRequestDTO dto){
        return ResponseEntity.ok(bookingService.update(id, dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        bookingService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
