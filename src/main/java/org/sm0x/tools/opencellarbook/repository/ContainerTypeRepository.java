package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.ContainerType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ContainerType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContainerTypeRepository extends JpaRepository<ContainerType, Long> {
}
