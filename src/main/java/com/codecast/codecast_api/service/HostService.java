package com.codecast.codecast_api.service;

import com.codecast.codecast_api.dto.HostRequestDTO;
import com.codecast.codecast_api.dto.HostResponseDTO;
import com.codecast.codecast_api.dto.StudioRequestDTO;
import com.codecast.codecast_api.dto.StudioResponseDTO;
import com.codecast.codecast_api.ResourceNotFoundException;
import com.codecast.codecast_api.model.Host;
import com.codecast.codecast_api.model.Studio;
import com.codecast.codecast_api.repository.HostRepository;
import com.codecast.codecast_api.repository.StudioRepository;
import org.springframework.stereotype.Service;

@Service
public class HostService {
    private final HostRepository hostRepository;
    
    public HostService(HostRepository hostRepository){
        this.hostRepository = hostRepository;
    }
    public HostResponseDTO create(HostRequestDTO dto){
        Host host = new Host();
        host.setName(dto.getName());
        host.setMaxCapacity(dto.getMaxCapacity());
        host.setEquipmentList(dto.getEquipmentList());
        return toResponseDTO(hostRepository.save(host));
    }
    public HostResponseDTO findById(Long id){
    Host host = hostRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Locutor(a) não encontrado(a): " + id));
    return toResponseDTO(host);
    }
    public HostResponseDTO update(Long id, HostRequestDTO dto){
        Host host = hostRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Locutor(a) não encontrado(a): " + id));
        host.setName(dto.getName());
        host.setEmail(dto.getEmail());
        return toResponseDTO(hostRepository.save(host));
    }
    public void delete(Long id){
        if(!hostRepository.existsById(id)){
            throw new ResourceNotFoundException("Locutor não encontrado: " + id);
            hostRepository.deleteById(id);
        }
    }
    private HostResponseDTO toResponseDTO(Host host){
        HostResponseDTO dto = new StudioResponseDTO();
        dto.setId(host.getId());
        dto.setName(host.getName());
        dto.setEmail(host.getEmail());
        return dto;
    }
}
