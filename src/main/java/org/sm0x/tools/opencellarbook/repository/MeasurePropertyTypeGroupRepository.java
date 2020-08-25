package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.MeasurePropertyTypeGroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the MeasurePropertyTypeGroup entity.
 */
@Repository
public interface MeasurePropertyTypeGroupRepository extends JpaRepository<MeasurePropertyTypeGroup, Long> {

    @Query(value = "select distinct measurePropertyTypeGroup from MeasurePropertyTypeGroup measurePropertyTypeGroup left join fetch measurePropertyTypeGroup.measurePropertyTypes",
        countQuery = "select count(distinct measurePropertyTypeGroup) from MeasurePropertyTypeGroup measurePropertyTypeGroup")
    Page<MeasurePropertyTypeGroup> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct measurePropertyTypeGroup from MeasurePropertyTypeGroup measurePropertyTypeGroup left join fetch measurePropertyTypeGroup.measurePropertyTypes")
    List<MeasurePropertyTypeGroup> findAllWithEagerRelationships();

    @Query("select measurePropertyTypeGroup from MeasurePropertyTypeGroup measurePropertyTypeGroup left join fetch measurePropertyTypeGroup.measurePropertyTypes where measurePropertyTypeGroup.id =:id")
    Optional<MeasurePropertyTypeGroup> findOneWithEagerRelationships(@Param("id") Long id);
}
