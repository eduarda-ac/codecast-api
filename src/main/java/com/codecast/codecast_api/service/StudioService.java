package com.codecast.codecast_api.service;

import com.codecast.codecast_api.dto.StudioRequestDTO;
import com.codecast.codecast_api.dto.StudioResponseDTO;
import com.codecast.codecast_api.exception.ResourceNotFoundException;
import com.codecast.codecast_api.model.Studio;
import com.codecast.codecast_api.repository.StudioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudioService {
    private final StudioRepository studioRepository;

    public StudioService(StudioRepository studioRepository) {
        this.studioRepository = studioRepository;
    }

    public StudioResponseDTO create(StudioRequestDTO dto) {
        Studio studio = new Studio();
        studio.setName(dto.getName());
        studio.setMaxCapacity(dto.getMaxCapacity());
        studio.setEquipmentList(dto.getEquipmentList());
        return toResponseDTO(studioRepository.save(studio));
    }

    public List<StudioResponseDTO> findAll() {
        return studioRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public StudioResponseDTO findById(Long id) {
        Studio studio = studioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudio nao encontrado: " + id));
        return toResponseDTO(studio);
    }

    public StudioResponseDTO update(Long id, StudioRequestDTO dto) {
        Studio studio = studioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudio nao encontrado: " + id));
        studio.setName(dto.getName());
        studio.setMaxCapacity(dto.getMaxCapacity());
        studio.setEquipmentList(dto.getEquipmentList());
        return toResponseDTO(studioRepository.save(studio));
    }

    public void delete(Long id) {
        if (!studioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Estudio nao encontrado: " + id);
        }
        studioRepository.deleteById(id);
    }

    private StudioResponseDTO toResponseDTO(Studio studio) {
        StudioResponseDTO dto = new StudioResponseDTO();
        dto.setId(studio.getId());
        dto.setName(studio.getName());
        dto.setMaxCapacity(studio.getMaxCapacity());
        dto.setEquipmentList(studio.getEquipmentList());
        return dto;
    }
}