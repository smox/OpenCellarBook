package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.MeasureType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MeasureType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasureTypeRepository extends JpaRepository<MeasureType, Long> {
}
