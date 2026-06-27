package com.codecast.codecast_api.service;

import com.codecast.codecast_api.dto.BookingRequestDTO;
import com.codecast.codecast_api.dto.BookingResponseDTO;
import com.codecast.codecast_api.exception.BookingConflictException;
import com.codecast.codecast_api.exception.ResourceNotFoundException;
import com.codecast.codecast_api.model.Booking;
import com.codecast.codecast_api.model.Host;
import com.codecast.codecast_api.model.Studio;
import com.codecast.codecast_api.repository.BookingRepository;
import com.codecast.codecast_api.repository.HostRepository;
import com.codecast.codecast_api.repository.StudioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final StudioRepository studioRepository;
    private final HostRepository hostRepository;

    public BookingService(BookingRepository bookingRepository, StudioRepository studioRepository, HostRepository hostRepository) {
        this.bookingRepository = bookingRepository;
        this.studioRepository = studioRepository;
        this.hostRepository = hostRepository;
    }

    @Transactional
    public BookingResponseDTO create(BookingRequestDTO dto) {
        Studio studio = studioRepository.findById(dto.getStudioId())
                .orElseThrow(() -> new ResourceNotFoundException("Estudio nao encontrado: " + dto.getStudioId()));

        Host host = hostRepository.findById(dto.getHostId())
                .orElseThrow(() -> new ResourceNotFoundException("Host nao encontrado: " + dto.getHostId()));

        boolean hasConflict = bookingRepository.existsConflict(
                studio.getId(), dto.getStartTime(), dto.getEndTime());

        if (hasConflict) {
            throw new BookingConflictException(
                    "Horario indisponivel para o estudio " + studio.getName()
                    + " entre " + dto.getStartTime() + " e " + dto.getEndTime());
        }

        Booking booking = new Booking();
        booking.setStudio(studio);
        booking.setHost(host);
        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());

        Booking saved = bookingRepository.save(booking);

        return toResponseDTO(saved);
    }

    private BookingResponseDTO toResponseDTO(Booking booking) {
        BookingResponseDTO response = new BookingResponseDTO();
        response.setId(booking.getId());
        response.setStudioId(booking.getStudio().getId());
        response.setStudioName(booking.getStudio().getName());
        response.setHostId(booking.getHost().getId());
        response.setHostName(booking.getHost().getName());
        response.setStartTime(booking.getStartTime());
        response.setEndTime(booking.getEndtime());
        return response;
    }
}