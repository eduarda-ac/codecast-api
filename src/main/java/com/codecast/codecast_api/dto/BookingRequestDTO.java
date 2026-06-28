package com.codecast.codecast_api.dto;

import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;

public class BookingRequestDTO {

    @NotNull(message = "O ID do estudio e obrigatorio")
    private Long studioId;

    @NotNull(message = "O ID do host e obrigatorio")
    private Long hostId;

    @NotNull(message = "O horario de inicio e obrigatorio")
    private OffsetDateTime startTime;

    @NotNull(message = "O horario de termino e obrigatorio")
    private OffsetDateTime endTime;

    public Long getStudioId() { return studioId; }
    public void setStudioId(Long studioId) { this.studioId = studioId; }
    public Long getHostId() { return hostId; }
    public void setHostId(Long hostId) { this.hostId = hostId; }
    public OffsetDateTime getStartTime() { return startTime; }
    public void setStartTime(OffsetDateTime startTime) { this.startTime = startTime; }
    public OffsetDateTime getEndTime() { return endTime; }
    public void setEndTime(OffsetDateTime endTime) { this.endTime = endTime; }
}