package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.ContainerType;
import org.sm0x.tools.opencellarbook.repository.ContainerTypeRepository;
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
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.ContainerType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContainerTypeResource {

    private final Logger log = LoggerFactory.getLogger(ContainerTypeResource.class);

    private static final String ENTITY_NAME = "containerType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContainerTypeRepository containerTypeRepository;

    public ContainerTypeResource(ContainerTypeRepository containerTypeRepository) {
        this.containerTypeRepository = containerTypeRepository;
    }

    /**
     * {@code POST  /container-types} : Create a new containerType.
     *
     * @param containerType the containerType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new containerType, or with status {@code 400 (Bad Request)} if the containerType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/container-types")
    public ResponseEntity<ContainerType> createContainerType(@RequestBody ContainerType containerType) throws URISyntaxException {
        log.debug("REST request to save ContainerType : {}", containerType);
        if (containerType.getId() != null) {
            throw new BadRequestAlertException("A new containerType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContainerType result = containerTypeRepository.save(containerType);
        return ResponseEntity.created(new URI("/api/container-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /container-types} : Updates an existing containerType.
     *
     * @param containerType the containerType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated containerType,
     * or with status {@code 400 (Bad Request)} if the containerType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the containerType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/container-types")
    public ResponseEntity<ContainerType> updateContainerType(@RequestBody ContainerType containerType) throws URISyntaxException {
        log.debug("REST request to update ContainerType : {}", containerType);
        if (containerType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContainerType result = containerTypeRepository.save(containerType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, containerType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /container-types} : get all the containerTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of containerTypes in body.
     */
    @GetMapping("/container-types")
    public List<ContainerType> getAllContainerTypes() {
        log.debug("REST request to get all ContainerTypes");
        return containerTypeRepository.findAll();
    }

    /**
     * {@code GET  /container-types/:id} : get the "id" containerType.
     *
     * @param id the id of the containerType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the containerType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/container-types/{id}")
    public ResponseEntity<ContainerType> getContainerType(@PathVariable Long id) {
        log.debug("REST request to get ContainerType : {}", id);
        Optional<ContainerType> containerType = containerTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(containerType);
    }

    /**
     * {@code DELETE  /container-types/:id} : delete the "id" containerType.
     *
     * @param id the id of the containerType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/container-types/{id}")
    public ResponseEntity<Void> deleteContainerType(@PathVariable Long id) {
        log.debug("REST request to delete ContainerType : {}", id);
        containerTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
