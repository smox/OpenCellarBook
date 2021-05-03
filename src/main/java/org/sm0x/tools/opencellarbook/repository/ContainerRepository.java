package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.Container;

import org.sm0x.tools.opencellarbook.domain.Location;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Container entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContainerRepository extends JpaRepository<Container, Long> {

    @Query("SELECT c FROM Container c WHERE c.deletedAt is null")
    List<Container> findAll();

    @Query("SELECT c FROM Container c WHERE c.deletedAt is null AND c.id = :id")
    Optional<Container> findById(@Param("id") Long id);

}
