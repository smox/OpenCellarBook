package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.Location;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Location entity.
 */
@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    @Query("SELECT l FROM Location l WHERE l.deletedAt is null")
    List<Location> findAll();

    @Query("SELECT l FROM Location l WHERE l.deletedAt is null AND l.id = :id")
    Optional<Location> findById(@Param("id") Long id);
}
