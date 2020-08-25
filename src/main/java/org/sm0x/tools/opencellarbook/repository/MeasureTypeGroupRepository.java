package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.MeasureTypeGroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the MeasureTypeGroup entity.
 */
@Repository
public interface MeasureTypeGroupRepository extends JpaRepository<MeasureTypeGroup, Long> {

    @Query(value = "select distinct measureTypeGroup from MeasureTypeGroup measureTypeGroup left join fetch measureTypeGroup.measureTypes",
        countQuery = "select count(distinct measureTypeGroup) from MeasureTypeGroup measureTypeGroup")
    Page<MeasureTypeGroup> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct measureTypeGroup from MeasureTypeGroup measureTypeGroup left join fetch measureTypeGroup.measureTypes")
    List<MeasureTypeGroup> findAllWithEagerRelationships();

    @Query("select measureTypeGroup from MeasureTypeGroup measureTypeGroup left join fetch measureTypeGroup.measureTypes where measureTypeGroup.id =:id")
    Optional<MeasureTypeGroup> findOneWithEagerRelationships(@Param("id") Long id);
}
