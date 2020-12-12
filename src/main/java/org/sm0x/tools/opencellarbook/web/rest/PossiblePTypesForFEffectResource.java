package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.PossiblePTypesForFEffect;
import org.sm0x.tools.opencellarbook.service.PossiblePTypesForFEffectService;
import org.sm0x.tools.opencellarbook.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.PossiblePTypesForFEffect}.
 */
@RestController
@RequestMapping("/api")
public class PossiblePTypesForFEffectResource {

    private final Logger log = LoggerFactory.getLogger(PossiblePTypesForFEffectResource.class);

    private static final String ENTITY_NAME = "possiblePTypesForFEffect";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PossiblePTypesForFEffectService possiblePTypesForFEffectService;

    public PossiblePTypesForFEffectResource(PossiblePTypesForFEffectService possiblePTypesForFEffectService) {
        this.possiblePTypesForFEffectService = possiblePTypesForFEffectService;
    }

    /**
     * {@code POST  /possible-p-types-for-f-effects} : Create a new possiblePTypesForFEffect.
     *
     * @param possiblePTypesForFEffect the possiblePTypesForFEffect to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new possiblePTypesForFEffect, or with status {@code 400 (Bad Request)} if the possiblePTypesForFEffect has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/possible-p-types-for-f-effects")
    public ResponseEntity<PossiblePTypesForFEffect> createPossiblePTypesForFEffect(@RequestBody PossiblePTypesForFEffect possiblePTypesForFEffect) throws URISyntaxException {
        log.debug("REST request to save PossiblePTypesForFEffect : {}", possiblePTypesForFEffect);
        if (possiblePTypesForFEffect.getId() != null) {
            throw new BadRequestAlertException("A new possiblePTypesForFEffect cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PossiblePTypesForFEffect result = possiblePTypesForFEffectService.save(possiblePTypesForFEffect);
        return ResponseEntity.created(new URI("/api/possible-p-types-for-f-effects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /possible-p-types-for-f-effects} : Updates an existing possiblePTypesForFEffect.
     *
     * @param possiblePTypesForFEffect the possiblePTypesForFEffect to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated possiblePTypesForFEffect,
     * or with status {@code 400 (Bad Request)} if the possiblePTypesForFEffect is not valid,
     * or with status {@code 500 (Internal Server Error)} if the possiblePTypesForFEffect couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/possible-p-types-for-f-effects")
    public ResponseEntity<PossiblePTypesForFEffect> updatePossiblePTypesForFEffect(@RequestBody PossiblePTypesForFEffect possiblePTypesForFEffect) throws URISyntaxException {
        log.debug("REST request to update PossiblePTypesForFEffect : {}", possiblePTypesForFEffect);
        if (possiblePTypesForFEffect.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PossiblePTypesForFEffect result = possiblePTypesForFEffectService.save(possiblePTypesForFEffect);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, possiblePTypesForFEffect.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /possible-p-types-for-f-effects} : get all the possiblePTypesForFEffects.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of possiblePTypesForFEffects in body.
     */
    @GetMapping("/possible-p-types-for-f-effects")
    public List<PossiblePTypesForFEffect> getAllPossiblePTypesForFEffects() {
        log.debug("REST request to get all PossiblePTypesForFEffects");
        return possiblePTypesForFEffectService.findAll();
    }

    /**
     * {@code GET  /possible-p-types-for-f-effects/:id} : get the "id" possiblePTypesForFEffect.
     *
     * @param id the id of the possiblePTypesForFEffect to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the possiblePTypesForFEffect, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/possible-p-types-for-f-effects/{id}")
    public ResponseEntity<PossiblePTypesForFEffect> getPossiblePTypesForFEffect(@PathVariable Long id) {
        log.debug("REST request to get PossiblePTypesForFEffect : {}", id);
        Optional<PossiblePTypesForFEffect> possiblePTypesForFEffect = possiblePTypesForFEffectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(possiblePTypesForFEffect);
    }

    /**
     * {@code DELETE  /possible-p-types-for-f-effects/:id} : delete the "id" possiblePTypesForFEffect.
     *
     * @param id the id of the possiblePTypesForFEffect to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/possible-p-types-for-f-effects/{id}")
    public ResponseEntity<Void> deletePossiblePTypesForFEffect(@PathVariable Long id) {
        log.debug("REST request to delete PossiblePTypesForFEffect : {}", id);
        possiblePTypesForFEffectService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
