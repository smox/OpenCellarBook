package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.Location;
import org.sm0x.tools.opencellarbook.domain.MeasureType;
import org.sm0x.tools.opencellarbook.repository.MeasureTypeRepository;
import org.sm0x.tools.opencellarbook.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sm0x.tools.opencellarbook.web.rest.errors.ErrorConstants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.MeasureType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MeasureTypeResource {

    private final Logger log = LoggerFactory.getLogger(MeasureTypeResource.class);

    private static final String ENTITY_NAME = "measureType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeasureTypeRepository measureTypeRepository;

    public MeasureTypeResource(MeasureTypeRepository measureTypeRepository) {
        this.measureTypeRepository = measureTypeRepository;
    }

    /**
     * {@code POST  /measure-types} : Create a new measureType.
     *
     * @param measureType the measureType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new measureType, or with status {@code 400 (Bad Request)} if the measureType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/measure-types")
    public ResponseEntity<MeasureType> createMeasureType(@RequestBody MeasureType measureType) throws URISyntaxException {
        log.debug("REST request to save MeasureType : {}", measureType);
        if (measureType.getId() != null) {
            throw new BadRequestAlertException("A new measureType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeasureType result = measureTypeRepository.save(measureType);
        return ResponseEntity.created(new URI("/api/measure-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, getHeaderParam(result)))
            .body(result);
    }

    /**
     * {@code PUT  /measure-types} : Updates an existing measureType.
     *
     * @param measureType the measureType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated measureType,
     * or with status {@code 400 (Bad Request)} if the measureType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the measureType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/measure-types")
    public ResponseEntity<MeasureType> updateMeasureType(@RequestBody MeasureType measureType) throws URISyntaxException {
        log.debug("REST request to update MeasureType : {}", measureType);
        if (measureType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        Optional<MeasureType> found = measureTypeRepository.findById(measureType.getId());
        if(!found.isPresent()) {
            throw new BadRequestAlertException("Cannot update deleted entity", ENTITY_NAME, "entityAlreadyDeleted");
        }

        MeasureType result = measureTypeRepository.save(measureType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, getHeaderParam(result)))
            .body(result);
    }

    /**
     * {@code GET  /measure-types} : get all the measureTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measureTypes in body.
     */
    @GetMapping("/measure-types")
    public List<MeasureType> getAllMeasureTypes() {
        log.debug("REST request to get all MeasureTypes");
        return measureTypeRepository.findAll();
    }

    public String getHeaderParam(MeasureType measureType) {
        return "".equals(measureType.getName().trim()) ? measureType.getId().toString() : measureType.getName();
    }

    /**
     * {@code GET  /measure-types/:id} : get the "id" measureType.
     *
     * @param id the id of the measureType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the measureType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/measure-types/{id}")
    public ResponseEntity<MeasureType> getMeasureType(@PathVariable Long id) {
        log.debug("REST request to get MeasureType : {}", id);
        Optional<MeasureType> measureType = measureTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(measureType);
    }

    /**
     * {@code DELETE  /measure-types/:id} : delete the "id" measureType.
     *
     * @param id the id of the measureType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/measure-types/{id}")
    public ResponseEntity<Void> deleteMeasureType(@PathVariable Long id) {
        log.debug("REST request to delete MeasureType : {}", id);

        Optional<MeasureType> toDelete = measureTypeRepository.findById(id);
        if(toDelete.isPresent()) {
            toDelete.get().setDeletedAt(LocalDate.now());
            measureTypeRepository.save(toDelete.get());
            log.debug("REST request: Location {} deleted", id);
            return ResponseEntity.noContent().headers(
                HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, getHeaderParam(toDelete.get()))).build();
        }

        return ResponseEntity.notFound().headers(
            HeaderUtil.createFailureAlert(applicationName, true, ENTITY_NAME, ErrorConstants.ERR_VALIDATION, "Entity not found")
        ).build();
    }
}
