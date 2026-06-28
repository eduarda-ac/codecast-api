package com.codecast.codecast_api.dto;

import java.time.OffsetDateTime;

public class BookingResponseDTO {

    private Long id;
    private Long studioId;
    private String studioName;
    private Long hostId;
    private String hostName;
    private OffsetDateTime startTime;
    private OffsetDateTime endTime;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getStudioId() { return studioId; }
    public void setStudioId(Long studioId) { this.studioId = studioId; }
    public String getStudioName() { return studioName; }
    public void setStudioName(String studioName) { this.studioName = studioName; }
    public Long getHostId() { return hostId; }
    public void setHostId(Long hostId) { this.hostId = hostId; }
    public String getHostName() { return hostName; }
    public void setHostName(String hostName) { this.hostName = hostName; }
    public OffsetDateTime getStartTime() { return startTime; }
    public void setStartTime(OffsetDateTime startTime) { this.startTime = startTime; }
    public OffsetDateTime getEndTime() { return endTime; }
    public void setEndTime(OffsetDateTime endTime) { this.endTime = endTime; }
}