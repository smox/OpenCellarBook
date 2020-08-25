package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.UiType;
import org.sm0x.tools.opencellarbook.repository.UiTypeRepository;
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
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.UiType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UiTypeResource {

    private final Logger log = LoggerFactory.getLogger(UiTypeResource.class);

    private static final String ENTITY_NAME = "uiType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UiTypeRepository uiTypeRepository;

    public UiTypeResource(UiTypeRepository uiTypeRepository) {
        this.uiTypeRepository = uiTypeRepository;
    }

    /**
     * {@code POST  /ui-types} : Create a new uiType.
     *
     * @param uiType the uiType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new uiType, or with status {@code 400 (Bad Request)} if the uiType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ui-types")
    public ResponseEntity<UiType> createUiType(@RequestBody UiType uiType) throws URISyntaxException {
        log.debug("REST request to save UiType : {}", uiType);
        if (uiType.getId() != null) {
            throw new BadRequestAlertException("A new uiType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UiType result = uiTypeRepository.save(uiType);
        return ResponseEntity.created(new URI("/api/ui-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ui-types} : Updates an existing uiType.
     *
     * @param uiType the uiType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated uiType,
     * or with status {@code 400 (Bad Request)} if the uiType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the uiType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ui-types")
    public ResponseEntity<UiType> updateUiType(@RequestBody UiType uiType) throws URISyntaxException {
        log.debug("REST request to update UiType : {}", uiType);
        if (uiType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UiType result = uiTypeRepository.save(uiType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, uiType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ui-types} : get all the uiTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of uiTypes in body.
     */
    @GetMapping("/ui-types")
    public List<UiType> getAllUiTypes() {
        log.debug("REST request to get all UiTypes");
        return uiTypeRepository.findAll();
    }

    /**
     * {@code GET  /ui-types/:id} : get the "id" uiType.
     *
     * @param id the id of the uiType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the uiType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ui-types/{id}")
    public ResponseEntity<UiType> getUiType(@PathVariable Long id) {
        log.debug("REST request to get UiType : {}", id);
        Optional<UiType> uiType = uiTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(uiType);
    }

    /**
     * {@code DELETE  /ui-types/:id} : delete the "id" uiType.
     *
     * @param id the id of the uiType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ui-types/{id}")
    public ResponseEntity<Void> deleteUiType(@PathVariable Long id) {
        log.debug("REST request to delete UiType : {}", id);
        uiTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
