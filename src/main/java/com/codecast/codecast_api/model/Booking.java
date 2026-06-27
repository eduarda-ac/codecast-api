package com.codecast.codecast_api.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "studio_id")
    private Studio studio;

    @ManyToOne(optional = false)
    @JoinColumn(name = "host_id")
    private Host host;

    @Column(nullable = false)
    private OffsetDateTime startTime;

    @Column(nullable = false)
    private OffsetDateTime endTime;

    public Booking() {}

    public Long getId() { 
        return id; }
    public void setId(Long id) { 
        this.id = id; }
    public Studio getStudio() { 
        return studio; }
    public void setStudio(Studio studio) { 
        this.studio = studio; }
    public Host getHost() { 
        return host; }
    public void setHost(Host host) { 
        this.host = host; }
    public OffsetDateTime getStartTime() { 
        return startTime; }
    public void setStartTime(OffsetDateTime startTime) { 
        this.startTime = startTime; }
    public OffsetDateTime getEndTime() { 
        return endTime; }
    public void setEndTime(OffsetDateTime endTime) { 
        this.endTime = endTime; }
}