package com.codecast.codecast_api.controller;

import com.codecast.codecast_api.dto.HostRequestDTO;
import com.codecast.codecast_api.dto.HostResponseDTO;
import com.codecast.codecast_api.service.HostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/hosts")
public class HostController {
    private final com.codecast.codecast_api.service.HostService hostService;

    public HostController(HostService hostService){
        this.hostService = hostService;
    }
    @PostMapping
    public ResponseEntity<HostResponseDTO> create(@Valid @RequestBody com.codecast.codecast_api.dto.HostRequestDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(hostService.create(dto));
    }
    @GetMapping("/{id}")
    public ResponseEntity<HostResponseDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(hostService.findById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<HostResponseDTO> update(@PathVariable Long id, @Valid @RequestBody HostRequestDTO dto){
        return ResponseEntity.ok(hostService.update(id, dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        hostService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public ResponseEntity<List<HostResponseDTO>> findAll() {
        return ResponseEntity.ok(hostService.findAll());
    }
}
