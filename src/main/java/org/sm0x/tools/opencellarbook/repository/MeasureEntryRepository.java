package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.MeasureEntry;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the MeasureEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasureEntryRepository extends JpaRepository<MeasureEntry, Long> {

    List<MeasureEntry> findByCurrentContainerIsNotNull();

    @Query("SELECT entry " +
        "from MeasureEntry entry " +
        "join MeasureType type on entry.measureType.id = type.id " +
        "where type.fillingEffect = 'BOTTLED'")
    List<MeasureEntry> findAllBottled();


    @Query("SELECT entry " +
        "FROM MeasureEntry entry " +
        "WHERE entry.id = :id " +
        "   OR entry.parent.id = (SELECT entry2.parent.id FROM MeasureEntry entry2 WHERE entry2.id = :id)" +
        "   OR entry.id = (SELECT entry3.parent.id FROM MeasureEntry entry3 WHERE entry3.id = :id)")
    List<MeasureEntry> findAllByBottledId(@Param("id") Long id);
}
