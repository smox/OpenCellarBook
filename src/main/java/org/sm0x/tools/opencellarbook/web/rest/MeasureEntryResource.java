package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.domain.MeasureEntry;
import org.sm0x.tools.opencellarbook.repository.MeasureEntryRepository;
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
 * REST controller for managing {@link org.sm0x.tools.opencellarbook.domain.MeasureEntry}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MeasureEntryResource {

    private final Logger log = LoggerFactory.getLogger(MeasureEntryResource.class);

    private static final String ENTITY_NAME = "measureEntry";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeasureEntryRepository measureEntryRepository;

    public MeasureEntryResource(MeasureEntryRepository measureEntryRepository) {
        this.measureEntryRepository = measureEntryRepository;
    }

    /**
     * {@code POST  /measure-entries} : Create a new measureEntry.
     *
     * @param measureEntry the measureEntry to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new measureEntry, or with status {@code 400 (Bad Request)} if the measureEntry has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/measure-entries")
    public ResponseEntity<MeasureEntry> createMeasureEntry(@RequestBody MeasureEntry measureEntry) throws URISyntaxException {
        log.debug("REST request to save MeasureEntry : {}", measureEntry);
        if (measureEntry.getId() != null) {
            throw new BadRequestAlertException("A new measureEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeasureEntry result = measureEntryRepository.save(measureEntry);
        return ResponseEntity.created(new URI("/api/measure-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /measure-entries} : Updates an existing measureEntry.
     *
     * @param measureEntry the measureEntry to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated measureEntry,
     * or with status {@code 400 (Bad Request)} if the measureEntry is not valid,
     * or with status {@code 500 (Internal Server Error)} if the measureEntry couldn't be updated.
     */
    @PutMapping("/measure-entries")
    public ResponseEntity<MeasureEntry> updateMeasureEntry(@RequestBody MeasureEntry measureEntry) {
        log.debug("REST request to update MeasureEntry : {}", measureEntry);
        if (measureEntry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeasureEntry result = measureEntryRepository.save(measureEntry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, measureEntry.getId().toString()))
            .body(result);
    }

    @PutMapping("/measure-entries/list")
    public ResponseEntity<List<MeasureEntry>> updateMeasureEntries(@RequestBody List<MeasureEntry> measureEntries) {
        log.debug("REST request to update MeasureEntries : {}", measureEntries);
        for(MeasureEntry measureEntry : measureEntries) {
            if (measureEntry.getId() == null) {
                throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
            }
        }


        List<MeasureEntry> result = measureEntryRepository.saveAll(measureEntries);
        StringBuilder headerMessage = new StringBuilder();
        for (int i = 0; i < result.size(); i++) {
            MeasureEntry updatedMeasureEntry = result.get(i);
            boolean isLastIteration = i+1 == result.size();
            headerMessage.append(updatedMeasureEntry.getId());
            if(!isLastIteration) {
                headerMessage.append(",");
            }
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, headerMessage.toString()))
            .body(result);
    }

    /**
     * {@code GET  /measure-entries} : get all measureEntries.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measureEntries in body.
     */
    @GetMapping("/measure-entries")
    public List<MeasureEntry> getAllMeasureEntries() {
        log.debug("REST request to get all MeasureEntries");
        return measureEntryRepository.findAll();
    }

    /**
     * {@code GET  /measure-entries/bottled} : get all bottled measureEntries.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measureEntries in body.
     */
    @GetMapping("/measure-entries/bottled")
    public List<MeasureEntry> getAllBottledMeasureEntries() {
        log.debug("REST request to get all bottled MeasureEntries");
        return measureEntryRepository.findAllBottled();
    }

    /**
     * {@code GET  /measure-entries/bottled} : get all bottled measureEntries.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measureEntries in body.
     */
    @GetMapping("/measure-entries/bottled/{id}")
    public List<MeasureEntry> getAllMeasureEntriesByBottledMeasureEntry(@PathVariable Long id) {
        log.debug("REST request to get all MeasureEntries by bottled MeasureEntry: {}", id);
        return measureEntryRepository.findAllByBottledId(id);
    }

    /**
     * {@code GET  /measure-entries} : get all the measureEntries.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measureEntries in body.
     */
    @GetMapping("/measure-entries/with-current-container")
    public List<MeasureEntry> getMeasureEntriesWithCurrentContainer() {
        log.debug("REST request to get all MeasureEntries which are currently in a container");
        return measureEntryRepository.findByCurrentContainerIsNotNull();
    }


    /**
     * {@code GET  /measure-entries/:id} : get the "id" measureEntry.
     *
     * @param id the id of the measureEntry to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the measureEntry, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/measure-entries/{id}")
    public ResponseEntity<MeasureEntry> getMeasureEntry(@PathVariable Long id) {
        log.debug("REST request to get MeasureEntry : {}", id);
        Optional<MeasureEntry> measureEntry = measureEntryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(measureEntry);
    }

    /**
     * {@code DELETE  /measure-entries/:id} : delete the "id" measureEntry.
     *
     * @param id the id of the measureEntry to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/measure-entries/{id}")
    public ResponseEntity<Void> deleteMeasureEntry(@PathVariable Long id) {
        log.debug("REST request to delete MeasureEntry : {}", id);
        measureEntryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
