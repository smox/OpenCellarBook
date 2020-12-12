package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.MeasureEntry;
import org.sm0x.tools.opencellarbook.domain.MeasurePropertyValue;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static org.hibernate.loader.Loader.SELECT;

/**
 * Spring Data  repository for the MeasurePropertyValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasurePropertyValueRepository extends JpaRepository<MeasurePropertyValue, Long> {

    @Query(
        "SELECT value " +
        "FROM MeasurePropertyValue value JOIN MeasureEntry entry ON value.measureEntry.id = entry.id " +
        "WHERE entry.id IN :ids"
    )
    List<MeasurePropertyValue> findAllByMeasureEntry_Ids(@Param("ids") List<Long> id);


    @Query("SELECT value " +
        "FROM MeasurePropertyValue value " +
        "WHERE value.measureEntry.id IN " +
            "(SELECT entry.id " +
                "FROM MeasureEntry entry " +
                "WHERE entry.id = :id " +
                "   OR entry.parent.id = (SELECT entry2.parent.id FROM MeasureEntry entry2 WHERE entry2.id = :id)" +
                "   OR entry.id = (SELECT entry3.parent.id FROM MeasureEntry entry3 WHERE entry3.id = :id) " +
            ")")
    List<MeasurePropertyValue> findByBottledId(@Param("id") Long id);
}
