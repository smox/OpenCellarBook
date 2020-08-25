package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.MeasureTypeGroup;
import org.sm0x.tools.opencellarbook.repository.MeasureTypeGroupRepository;
import org.sm0x.tools.opencellarbook.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.MeasureTypeGroup}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MeasureTypeGroupResource {

    private final Logger log = LoggerFactory.getLogger(MeasureTypeGroupResource.class);

    private static final String ENTITY_NAME = "measureTypeGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeasureTypeGroupRepository measureTypeGroupRepository;

    public MeasureTypeGroupResource(MeasureTypeGroupRepository measureTypeGroupRepository) {
        this.measureTypeGroupRepository = measureTypeGroupRepository;
    }

    /**
     * {@code POST  /measure-type-groups} : Create a new measureTypeGroup.
     *
     * @param measureTypeGroup the measureTypeGroup to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new measureTypeGroup, or with status {@code 400 (Bad Request)} if the measureTypeGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/measure-type-groups")
    public ResponseEntity<MeasureTypeGroup> createMeasureTypeGroup(@RequestBody MeasureTypeGroup measureTypeGroup) throws URISyntaxException {
        log.debug("REST request to save MeasureTypeGroup : {}", measureTypeGroup);
        if (measureTypeGroup.getId() != null) {
            throw new BadRequestAlertException("A new measureTypeGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeasureTypeGroup result = measureTypeGroupRepository.save(measureTypeGroup);
        return ResponseEntity.created(new URI("/api/measure-type-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /measure-type-groups} : Updates an existing measureTypeGroup.
     *
     * @param measureTypeGroup the measureTypeGroup to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated measureTypeGroup,
     * or with status {@code 400 (Bad Request)} if the measureTypeGroup is not valid,
     * or with status {@code 500 (Internal Server Error)} if the measureTypeGroup couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/measure-type-groups")
    public ResponseEntity<MeasureTypeGroup> updateMeasureTypeGroup(@RequestBody MeasureTypeGroup measureTypeGroup) throws URISyntaxException {
        log.debug("REST request to update MeasureTypeGroup : {}", measureTypeGroup);
        if (measureTypeGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeasureTypeGroup result = measureTypeGroupRepository.save(measureTypeGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, measureTypeGroup.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /measure-type-groups} : get all the measureTypeGroups.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measureTypeGroups in body.
     */
    @GetMapping("/measure-type-groups")
    public List<MeasureTypeGroup> getAllMeasureTypeGroups(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all MeasureTypeGroups");
        return measureTypeGroupRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /measure-type-groups/:id} : get the "id" measureTypeGroup.
     *
     * @param id the id of the measureTypeGroup to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the measureTypeGroup, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/measure-type-groups/{id}")
    public ResponseEntity<MeasureTypeGroup> getMeasureTypeGroup(@PathVariable Long id) {
        log.debug("REST request to get MeasureTypeGroup : {}", id);
        Optional<MeasureTypeGroup> measureTypeGroup = measureTypeGroupRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(measureTypeGroup);
    }

    /**
     * {@code DELETE  /measure-type-groups/:id} : delete the "id" measureTypeGroup.
     *
     * @param id the id of the measureTypeGroup to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/measure-type-groups/{id}")
    public ResponseEntity<Void> deleteMeasureTypeGroup(@PathVariable Long id) {
        log.debug("REST request to delete MeasureTypeGroup : {}", id);
        measureTypeGroupRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
