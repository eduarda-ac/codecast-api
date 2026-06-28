package com.codecast.codecast_api.controller;

import com.codecast.codecast_api.dto.StudioRequestDTO;
import com.codecast.codecast_api.dto.StudioResponseDTO;
import com.codecast.codecast_api.service.StudioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/studios")
public class StudioController {
    private final com.codecast.codecast_api.service.StudioService studioService;

    public StudioController(StudioService studioService){
        this.studioService = studioService;
    }
    @PostMapping
    public ResponseEntity<StudioResponseDTO> create(@Valid @RequestBody com.codecast.codecast_api.dto.StudioRequestDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(studioService.create(dto));
    }
    @GetMapping("/{id}")
    public ResponseEntity<StudioResponseDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(studioService.findById(id));
    }
    @GetMapping
    public ResponseEntity<List<StudioResponseDTO>> findAll() {
        return ResponseEntity.ok(studioService.findAll());
    }
    @PutMapping("/{id}")
    public ResponseEntity<StudioResponseDTO> update(@PathVariable Long id, @Valid @RequestBody StudioRequestDTO dto){
        return ResponseEntity.ok(studioService.update(id, dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        studioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
