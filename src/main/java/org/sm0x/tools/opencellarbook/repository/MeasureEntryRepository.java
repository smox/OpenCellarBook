package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.MeasureEntry;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MeasureEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasureEntryRepository extends JpaRepository<MeasureEntry, Long> {
}
