package org.sm0x.tools.opencellarbook.service;

import org.sm0x.tools.opencellarbook.domain.PossiblePTypesForFEffect;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link PossiblePTypesForFEffect}.
 */
public interface PossiblePTypesForFEffectService {

    /**
     * Save a possiblePTypesForFEffect.
     *
     * @param possiblePTypesForFEffect the entity to save.
     * @return the persisted entity.
     */
    PossiblePTypesForFEffect save(PossiblePTypesForFEffect possiblePTypesForFEffect);

    /**
     * Get all the possiblePTypesForFEffects.
     *
     * @return the list of entities.
     */
    List<PossiblePTypesForFEffect> findAll();


    /**
     * Get the "id" possiblePTypesForFEffect.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PossiblePTypesForFEffect> findOne(Long id);

    /**
     * Delete the "id" possiblePTypesForFEffect.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
