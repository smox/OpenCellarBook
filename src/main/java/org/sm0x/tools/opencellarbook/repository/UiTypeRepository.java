package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.UiType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UiType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UiTypeRepository extends JpaRepository<UiType, Long> {
}
