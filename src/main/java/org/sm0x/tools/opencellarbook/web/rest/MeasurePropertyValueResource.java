package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.MeasurePropertyValue;
import org.sm0x.tools.opencellarbook.repository.MeasurePropertyValueRepository;
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
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.MeasurePropertyValue}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MeasurePropertyValueResource {

    private final Logger log = LoggerFactory.getLogger(MeasurePropertyValueResource.class);

    private static final String ENTITY_NAME = "measurePropertyValue";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeasurePropertyValueRepository measurePropertyValueRepository;

    public MeasurePropertyValueResource(MeasurePropertyValueRepository measurePropertyValueRepository) {
        this.measurePropertyValueRepository = measurePropertyValueRepository;
    }

    /**
     * {@code POST  /measure-property-values} : Create a new measurePropertyValue.
     *
     * @param measurePropertyValue the measurePropertyValue to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new measurePropertyValue, or with status {@code 400 (Bad Request)} if the measurePropertyValue has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/measure-property-values")
    public ResponseEntity<MeasurePropertyValue> createMeasurePropertyValue(@RequestBody MeasurePropertyValue measurePropertyValue) throws URISyntaxException {
        log.debug("REST request to save MeasurePropertyValue : {}", measurePropertyValue);
        if (measurePropertyValue.getId() != null) {
            throw new BadRequestAlertException("A new measurePropertyValue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeasurePropertyValue result = measurePropertyValueRepository.save(measurePropertyValue);
        return ResponseEntity.created(new URI("/api/measure-property-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /measure-property-values} : Updates an existing measurePropertyValue.
     *
     * @param measurePropertyValue the measurePropertyValue to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated measurePropertyValue,
     * or with status {@code 400 (Bad Request)} if the measurePropertyValue is not valid,
     * or with status {@code 500 (Internal Server Error)} if the measurePropertyValue couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/measure-property-values")
    public ResponseEntity<MeasurePropertyValue> updateMeasurePropertyValue(@RequestBody MeasurePropertyValue measurePropertyValue) throws URISyntaxException {
        log.debug("REST request to update MeasurePropertyValue : {}", measurePropertyValue);
        if (measurePropertyValue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeasurePropertyValue result = measurePropertyValueRepository.save(measurePropertyValue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, measurePropertyValue.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /measure-property-values} : get all the measurePropertyValues.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measurePropertyValues in body.
     */
    @GetMapping("/measure-property-values")
    public List<MeasurePropertyValue> getAllMeasurePropertyValues() {
        log.debug("REST request to get all MeasurePropertyValues");
        return measurePropertyValueRepository.findAll();
    }

    /**
     * {@code GET  /measure-property-values/:id} : get the "id" measurePropertyValue.
     *
     * @param id the id of the measurePropertyValue to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the measurePropertyValue, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/measure-property-values/{id}")
    public ResponseEntity<MeasurePropertyValue> getMeasurePropertyValue(@PathVariable Long id) {
        log.debug("REST request to get MeasurePropertyValue : {}", id);
        Optional<MeasurePropertyValue> measurePropertyValue = measurePropertyValueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(measurePropertyValue);
    }

    /**
     * {@code DELETE  /measure-property-values/:id} : delete the "id" measurePropertyValue.
     *
     * @param id the id of the measurePropertyValue to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/measure-property-values/{id}")
    public ResponseEntity<Void> deleteMeasurePropertyValue(@PathVariable Long id) {
        log.debug("REST request to delete MeasurePropertyValue : {}", id);
        measurePropertyValueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
