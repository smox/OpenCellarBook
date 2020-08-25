package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.PossiblePTypesForMTypes;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PossiblePTypesForMTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PossiblePTypesForMTypesRepository extends JpaRepository<PossiblePTypesForMTypes, Long> {
}
