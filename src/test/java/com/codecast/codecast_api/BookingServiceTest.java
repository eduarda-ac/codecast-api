package com.codecast.codecast_api;

import com.codecast.codecast_api.dto.BookingRequestDTO;
import com.codecast.codecast_api.service.BookingService;
import com.codecast.codecast_api.exception.BookingConflictException;
import com.codecast.codecast_api.model.Host;
import com.codecast.codecast_api.model.Studio;
import com.codecast.codecast_api.repository.HostRepository;
import com.codecast.codecast_api.repository.StudioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.OffsetDateTime;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
class BookingServiceTest {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private StudioRepository studioRepository;

    @Autowired
    private HostRepository hostRepository;

    private Long studioId;
    private Long hostId;

    @BeforeEach
    void setUp() {
        Studio studio = new Studio();
        studio.setName("Estudio Prosa");
        studio.setMaxCapacity(4);
        studio = studioRepository.save(studio);
        studioId = studio.getId();

        Host host = new Host();
        host.setName("Apresentadora Marcela");
        host.setEmail("marcela@codecast.com");
        host = hostRepository.save(host);
        hostId = host.getId();
    }

    @Test
    void deveCriarAgendamentoQuandoNaoHaConflito() {
        BookingRequestDTO dto = new BookingRequestDTO();
        dto.setStudioId(studioId);
        dto.setHostId(hostId);
        dto.setStartTime(OffsetDateTime.parse("2026-07-10T14:00:00-03:00"));
        dto.setEndTime(OffsetDateTime.parse("2026-07-10T15:00:00-03:00"));

        assertDoesNotThrow(() -> bookingService.create(dto));
    }

    @Test
    void deveLancarExcecaoQuandoHorarioConflitante() {
        BookingRequestDTO existente = new BookingRequestDTO();
        existente.setStudioId(studioId);
        existente.setHostId(hostId);
        existente.setStartTime(OffsetDateTime.parse("2026-07-10T14:00:00-03:00"));
        existente.setEndTime(OffsetDateTime.parse("2026-07-10T15:00:00-03:00"));
        bookingService.create(existente);

        BookingRequestDTO conflitante = new BookingRequestDTO();
        conflitante.setStudioId(studioId);
        conflitante.setHostId(hostId);
        conflitante.setStartTime(OffsetDateTime.parse("2026-07-10T14:30:00-03:00"));
        conflitante.setEndTime(OffsetDateTime.parse("2026-07-10T15:30:00-03:00"));

        assertThrows(BookingConflictException.class, () -> bookingService.create(conflitante));
    }
}