package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.Container;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Container entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContainerRepository extends JpaRepository<Container, Long> {
}
