package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.MeasurePropertyType;
import org.sm0x.tools.opencellarbook.repository.MeasurePropertyTypeRepository;
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
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.MeasurePropertyType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MeasurePropertyTypeResource {

    private final Logger log = LoggerFactory.getLogger(MeasurePropertyTypeResource.class);

    private static final String ENTITY_NAME = "measurePropertyType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeasurePropertyTypeRepository measurePropertyTypeRepository;

    public MeasurePropertyTypeResource(MeasurePropertyTypeRepository measurePropertyTypeRepository) {
        this.measurePropertyTypeRepository = measurePropertyTypeRepository;
    }

    /**
     * {@code POST  /measure-property-types} : Create a new measurePropertyType.
     *
     * @param measurePropertyType the measurePropertyType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new measurePropertyType, or with status {@code 400 (Bad Request)} if the measurePropertyType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/measure-property-types")
    public ResponseEntity<MeasurePropertyType> createMeasurePropertyType(@RequestBody MeasurePropertyType measurePropertyType) throws URISyntaxException {
        log.debug("REST request to save MeasurePropertyType : {}", measurePropertyType);
        if (measurePropertyType.getId() != null) {
            throw new BadRequestAlertException("A new measurePropertyType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeasurePropertyType result = measurePropertyTypeRepository.save(measurePropertyType);
        return ResponseEntity.created(new URI("/api/measure-property-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /measure-property-types} : Updates an existing measurePropertyType.
     *
     * @param measurePropertyType the measurePropertyType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated measurePropertyType,
     * or with status {@code 400 (Bad Request)} if the measurePropertyType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the measurePropertyType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/measure-property-types")
    public ResponseEntity<MeasurePropertyType> updateMeasurePropertyType(@RequestBody MeasurePropertyType measurePropertyType) throws URISyntaxException {
        log.debug("REST request to update MeasurePropertyType : {}", measurePropertyType);
        if (measurePropertyType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeasurePropertyType result = measurePropertyTypeRepository.save(measurePropertyType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, measurePropertyType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /measure-property-types} : get all the measurePropertyTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measurePropertyTypes in body.
     */
    @GetMapping("/measure-property-types")
    public List<MeasurePropertyType> getAllMeasurePropertyTypes() {
        log.debug("REST request to get all MeasurePropertyTypes");
        return measurePropertyTypeRepository.findAll();
    }

    /**
     * {@code GET  /measure-property-types/:id} : get the "id" measurePropertyType.
     *
     * @param id the id of the measurePropertyType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the measurePropertyType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/measure-property-types/{id}")
    public ResponseEntity<MeasurePropertyType> getMeasurePropertyType(@PathVariable Long id) {
        log.debug("REST request to get MeasurePropertyType : {}", id);
        Optional<MeasurePropertyType> measurePropertyType = measurePropertyTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(measurePropertyType);
    }

    /**
     * {@code DELETE  /measure-property-types/:id} : delete the "id" measurePropertyType.
     *
     * @param id the id of the measurePropertyType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/measure-property-types/{id}")
    public ResponseEntity<Void> deleteMeasurePropertyType(@PathVariable Long id) {
        log.debug("REST request to delete MeasurePropertyType : {}", id);
        measurePropertyTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
