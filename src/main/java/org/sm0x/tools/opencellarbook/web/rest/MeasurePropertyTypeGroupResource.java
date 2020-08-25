package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.MeasurePropertyTypeGroup;
import org.sm0x.tools.opencellarbook.repository.MeasurePropertyTypeGroupRepository;
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
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.MeasurePropertyTypeGroup}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MeasurePropertyTypeGroupResource {

    private final Logger log = LoggerFactory.getLogger(MeasurePropertyTypeGroupResource.class);

    private static final String ENTITY_NAME = "measurePropertyTypeGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeasurePropertyTypeGroupRepository measurePropertyTypeGroupRepository;

    public MeasurePropertyTypeGroupResource(MeasurePropertyTypeGroupRepository measurePropertyTypeGroupRepository) {
        this.measurePropertyTypeGroupRepository = measurePropertyTypeGroupRepository;
    }

    /**
     * {@code POST  /measure-property-type-groups} : Create a new measurePropertyTypeGroup.
     *
     * @param measurePropertyTypeGroup the measurePropertyTypeGroup to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new measurePropertyTypeGroup, or with status {@code 400 (Bad Request)} if the measurePropertyTypeGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/measure-property-type-groups")
    public ResponseEntity<MeasurePropertyTypeGroup> createMeasurePropertyTypeGroup(@RequestBody MeasurePropertyTypeGroup measurePropertyTypeGroup) throws URISyntaxException {
        log.debug("REST request to save MeasurePropertyTypeGroup : {}", measurePropertyTypeGroup);
        if (measurePropertyTypeGroup.getId() != null) {
            throw new BadRequestAlertException("A new measurePropertyTypeGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeasurePropertyTypeGroup result = measurePropertyTypeGroupRepository.save(measurePropertyTypeGroup);
        return ResponseEntity.created(new URI("/api/measure-property-type-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /measure-property-type-groups} : Updates an existing measurePropertyTypeGroup.
     *
     * @param measurePropertyTypeGroup the measurePropertyTypeGroup to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated measurePropertyTypeGroup,
     * or with status {@code 400 (Bad Request)} if the measurePropertyTypeGroup is not valid,
     * or with status {@code 500 (Internal Server Error)} if the measurePropertyTypeGroup couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/measure-property-type-groups")
    public ResponseEntity<MeasurePropertyTypeGroup> updateMeasurePropertyTypeGroup(@RequestBody MeasurePropertyTypeGroup measurePropertyTypeGroup) throws URISyntaxException {
        log.debug("REST request to update MeasurePropertyTypeGroup : {}", measurePropertyTypeGroup);
        if (measurePropertyTypeGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeasurePropertyTypeGroup result = measurePropertyTypeGroupRepository.save(measurePropertyTypeGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, measurePropertyTypeGroup.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /measure-property-type-groups} : get all the measurePropertyTypeGroups.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measurePropertyTypeGroups in body.
     */
    @GetMapping("/measure-property-type-groups")
    public List<MeasurePropertyTypeGroup> getAllMeasurePropertyTypeGroups(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all MeasurePropertyTypeGroups");
        return measurePropertyTypeGroupRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /measure-property-type-groups/:id} : get the "id" measurePropertyTypeGroup.
     *
     * @param id the id of the measurePropertyTypeGroup to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the measurePropertyTypeGroup, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/measure-property-type-groups/{id}")
    public ResponseEntity<MeasurePropertyTypeGroup> getMeasurePropertyTypeGroup(@PathVariable Long id) {
        log.debug("REST request to get MeasurePropertyTypeGroup : {}", id);
        Optional<MeasurePropertyTypeGroup> measurePropertyTypeGroup = measurePropertyTypeGroupRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(measurePropertyTypeGroup);
    }

    /**
     * {@code DELETE  /measure-property-type-groups/:id} : delete the "id" measurePropertyTypeGroup.
     *
     * @param id the id of the measurePropertyTypeGroup to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/measure-property-type-groups/{id}")
    public ResponseEntity<Void> deleteMeasurePropertyTypeGroup(@PathVariable Long id) {
        log.debug("REST request to delete MeasurePropertyTypeGroup : {}", id);
        measurePropertyTypeGroupRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
