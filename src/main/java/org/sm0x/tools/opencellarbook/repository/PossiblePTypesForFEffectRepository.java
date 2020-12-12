package org.sm0x.tools.opencellarbook.repository;

import org.sm0x.tools.opencellarbook.domain.PossiblePTypesForFEffect;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PossiblePTypesForFEffect entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PossiblePTypesForFEffectRepository extends JpaRepository<PossiblePTypesForFEffect, Long> {
}
