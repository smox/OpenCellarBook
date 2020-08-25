package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.PossiblePTypesForMTypes;
import org.sm0x.tools.opencellarbook.repository.PossiblePTypesForMTypesRepository;
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
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.PossiblePTypesForMTypes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PossiblePTypesForMTypesResource {

    private final Logger log = LoggerFactory.getLogger(PossiblePTypesForMTypesResource.class);

    private static final String ENTITY_NAME = "possiblePTypesForMTypes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PossiblePTypesForMTypesRepository possiblePTypesForMTypesRepository;

    public PossiblePTypesForMTypesResource(PossiblePTypesForMTypesRepository possiblePTypesForMTypesRepository) {
        this.possiblePTypesForMTypesRepository = possiblePTypesForMTypesRepository;
    }

    /**
     * {@code POST  /possible-p-types-for-m-types} : Create a new possiblePTypesForMTypes.
     *
     * @param possiblePTypesForMTypes the possiblePTypesForMTypes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new possiblePTypesForMTypes, or with status {@code 400 (Bad Request)} if the possiblePTypesForMTypes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/possible-p-types-for-m-types")
    public ResponseEntity<PossiblePTypesForMTypes> createPossiblePTypesForMTypes(@RequestBody PossiblePTypesForMTypes possiblePTypesForMTypes) throws URISyntaxException {
        log.debug("REST request to save PossiblePTypesForMTypes : {}", possiblePTypesForMTypes);
        if (possiblePTypesForMTypes.getId() != null) {
            throw new BadRequestAlertException("A new possiblePTypesForMTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PossiblePTypesForMTypes result = possiblePTypesForMTypesRepository.save(possiblePTypesForMTypes);
        return ResponseEntity.created(new URI("/api/possible-p-types-for-m-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /possible-p-types-for-m-types} : Updates an existing possiblePTypesForMTypes.
     *
     * @param possiblePTypesForMTypes the possiblePTypesForMTypes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated possiblePTypesForMTypes,
     * or with status {@code 400 (Bad Request)} if the possiblePTypesForMTypes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the possiblePTypesForMTypes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/possible-p-types-for-m-types")
    public ResponseEntity<PossiblePTypesForMTypes> updatePossiblePTypesForMTypes(@RequestBody PossiblePTypesForMTypes possiblePTypesForMTypes) throws URISyntaxException {
        log.debug("REST request to update PossiblePTypesForMTypes : {}", possiblePTypesForMTypes);
        if (possiblePTypesForMTypes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PossiblePTypesForMTypes result = possiblePTypesForMTypesRepository.save(possiblePTypesForMTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, possiblePTypesForMTypes.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /possible-p-types-for-m-types} : get all the possiblePTypesForMTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of possiblePTypesForMTypes in body.
     */
    @GetMapping("/possible-p-types-for-m-types")
    public List<PossiblePTypesForMTypes> getAllPossiblePTypesForMTypes() {
        log.debug("REST request to get all PossiblePTypesForMTypes");
        return possiblePTypesForMTypesRepository.findAll();
    }

    /**
     * {@code GET  /possible-p-types-for-m-types/:id} : get the "id" possiblePTypesForMTypes.
     *
     * @param id the id of the possiblePTypesForMTypes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the possiblePTypesForMTypes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/possible-p-types-for-m-types/{id}")
    public ResponseEntity<PossiblePTypesForMTypes> getPossiblePTypesForMTypes(@PathVariable Long id) {
        log.debug("REST request to get PossiblePTypesForMTypes : {}", id);
        Optional<PossiblePTypesForMTypes> possiblePTypesForMTypes = possiblePTypesForMTypesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(possiblePTypesForMTypes);
    }

    /**
     * {@code DELETE  /possible-p-types-for-m-types/:id} : delete the "id" possiblePTypesForMTypes.
     *
     * @param id the id of the possiblePTypesForMTypes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/possible-p-types-for-m-types/{id}")
    public ResponseEntity<Void> deletePossiblePTypesForMTypes(@PathVariable Long id) {
        log.debug("REST request to delete PossiblePTypesForMTypes : {}", id);
        possiblePTypesForMTypesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
