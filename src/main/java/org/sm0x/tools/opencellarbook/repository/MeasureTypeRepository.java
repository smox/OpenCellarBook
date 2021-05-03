package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.Container;
import org.sm0x.tools.opencellarbook.domain.MeasureType;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the MeasureType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasureTypeRepository extends JpaRepository<MeasureType, Long> {

    @Query("SELECT mt FROM MeasureType mt WHERE mt.deletedAt is null")
    List<MeasureType> findAll();

    @Query("SELECT mt FROM MeasureType mt WHERE mt.deletedAt is null AND mt.id = :id")
    Optional<MeasureType> findById(@Param("id") Long id);

}
