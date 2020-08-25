package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.MeasurePropertyType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MeasurePropertyType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasurePropertyTypeRepository extends JpaRepository<MeasurePropertyType, Long> {
}
