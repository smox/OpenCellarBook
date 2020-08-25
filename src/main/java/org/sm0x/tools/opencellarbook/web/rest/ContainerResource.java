package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.Container;
import org.sm0x.tools.opencellarbook.repository.ContainerRepository;
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
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.Container}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContainerResource {

    private final Logger log = LoggerFactory.getLogger(ContainerResource.class);

    private static final String ENTITY_NAME = "container";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContainerRepository containerRepository;

    public ContainerResource(ContainerRepository containerRepository) {
        this.containerRepository = containerRepository;
    }

    /**
     * {@code POST  /containers} : Create a new container.
     *
     * @param container the container to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new container, or with status {@code 400 (Bad Request)} if the container has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/containers")
    public ResponseEntity<Container> createContainer(@RequestBody Container container) throws URISyntaxException {
        log.debug("REST request to save Container : {}", container);
        if (container.getId() != null) {
            throw new BadRequestAlertException("A new container cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Container result = containerRepository.save(container);
        return ResponseEntity.created(new URI("/api/containers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /containers} : Updates an existing container.
     *
     * @param container the container to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated container,
     * or with status {@code 400 (Bad Request)} if the container is not valid,
     * or with status {@code 500 (Internal Server Error)} if the container couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/containers")
    public ResponseEntity<Container> updateContainer(@RequestBody Container container) throws URISyntaxException {
        log.debug("REST request to update Container : {}", container);
        if (container.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Container result = containerRepository.save(container);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, container.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /containers} : get all the containers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of containers in body.
     */
    @GetMapping("/containers")
    public List<Container> getAllContainers() {
        log.debug("REST request to get all Containers");
        return containerRepository.findAll();
    }

    /**
     * {@code GET  /containers/:id} : get the "id" container.
     *
     * @param id the id of the container to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the container, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/containers/{id}")
    public ResponseEntity<Container> getContainer(@PathVariable Long id) {
        log.debug("REST request to get Container : {}", id);
        Optional<Container> container = containerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(container);
    }

    /**
     * {@code DELETE  /containers/:id} : delete the "id" container.
     *
     * @param id the id of the container to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/containers/{id}")
    public ResponseEntity<Void> deleteContainer(@PathVariable Long id) {
        log.debug("REST request to delete Container : {}", id);
        containerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
