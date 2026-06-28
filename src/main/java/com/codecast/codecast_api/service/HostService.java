package com.codecast.codecast_api.service;

import com.codecast.codecast_api.dto.HostRequestDTO;
import com.codecast.codecast_api.dto.HostResponseDTO;
import com.codecast.codecast_api.exception.ResourceNotFoundException;
import com.codecast.codecast_api.model.Host;
import com.codecast.codecast_api.repository.HostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HostService {
    private final HostRepository hostRepository;

    public HostService(HostRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    public HostResponseDTO create(HostRequestDTO dto) {
        Host host = new Host();
        host.setName(dto.getName());
        host.setEmail(dto.getEmail());
        return toResponseDTO(hostRepository.save(host));
    }

    public List<HostResponseDTO> findAll() {
        return hostRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public HostResponseDTO findById(Long id) {
        Host host = hostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Locutor(a) nao encontrado(a): " + id));
        return toResponseDTO(host);
    }

    public HostResponseDTO update(Long id, HostRequestDTO dto) {
        Host host = hostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Locutor(a) nao encontrado(a): " + id));
        host.setName(dto.getName());
        host.setEmail(dto.getEmail());
        return toResponseDTO(hostRepository.save(host));
    }

    public void delete(Long id) {
        if (!hostRepository.existsById(id)) {
            throw new ResourceNotFoundException("Locutor(a) nao encontrado(a): " + id);
        }
        hostRepository.deleteById(id);
    }

    private HostResponseDTO toResponseDTO(Host host) {
        HostResponseDTO dto = new HostResponseDTO();
        dto.setId(host.getId());
        dto.setName(host.getName());
        dto.setEmail(host.getEmail());
        return dto;
    }
}