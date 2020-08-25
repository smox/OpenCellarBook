package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.MeasurePropertyValue;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MeasurePropertyValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasurePropertyValueRepository extends JpaRepository<MeasurePropertyValue, Long> {
}
