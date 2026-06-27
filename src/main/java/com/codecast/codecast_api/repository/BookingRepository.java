package com.codecast.codecast_api.repository;

import com.codecast.codecast_api.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("""
        SELECT COUNT(b) > 0 FROM Booking b
        WHERE b.studio.id = :studioId
        AND b.startTime < :endTime
        AND b.endTime > :startTime
        """)
    boolean existsConflict(@Param("studioId") Long studioId, @Param("startTime") OffsetDateTime startTime, @Param("endTime") OffsetDateTime endTime);

    @Query("""
        SELECT COUNT(b) > 0 FROM Booking b
        WHERE b.studio.id = :studioId
        AND b.id <> :excludeId
        AND b.startTime < :endTime
        AND b.endTime > :startTime
        """)
    boolean existsConflictExcludingId(@Param("studioId") Long studioId, @Param("startTime") OffsetDateTime startTime, @Param("endTime") OffsetDateTime endTime, @Param("excludeId") Long excludeId);
}