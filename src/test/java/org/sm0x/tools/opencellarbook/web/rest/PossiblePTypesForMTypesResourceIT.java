package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.PossiblePTypesForMTypes;
import org.sm0x.tools.opencellarbook.repository.PossiblePTypesForMTypesRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PossiblePTypesForMTypesResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PossiblePTypesForMTypesResourceIT {

    @Autowired
    private PossiblePTypesForMTypesRepository possiblePTypesForMTypesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPossiblePTypesForMTypesMockMvc;

    private PossiblePTypesForMTypes possiblePTypesForMTypes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PossiblePTypesForMTypes createEntity(EntityManager em) {
        PossiblePTypesForMTypes possiblePTypesForMTypes = new PossiblePTypesForMTypes();
        return possiblePTypesForMTypes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PossiblePTypesForMTypes createUpdatedEntity(EntityManager em) {
        PossiblePTypesForMTypes possiblePTypesForMTypes = new PossiblePTypesForMTypes();
        return possiblePTypesForMTypes;
    }

    @BeforeEach
    public void initTest() {
        possiblePTypesForMTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createPossiblePTypesForMTypes() throws Exception {
        int databaseSizeBeforeCreate = possiblePTypesForMTypesRepository.findAll().size();
        // Create the PossiblePTypesForMTypes
        restPossiblePTypesForMTypesMockMvc.perform(post("/api/possible-p-types-for-m-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(possiblePTypesForMTypes)))
            .andExpect(status().isCreated());

        // Validate the PossiblePTypesForMTypes in the database
        List<PossiblePTypesForMTypes> possiblePTypesForMTypesList = possiblePTypesForMTypesRepository.findAll();
        assertThat(possiblePTypesForMTypesList).hasSize(databaseSizeBeforeCreate + 1);
        PossiblePTypesForMTypes testPossiblePTypesForMTypes = possiblePTypesForMTypesList.get(possiblePTypesForMTypesList.size() - 1);
    }

    @Test
    @Transactional
    public void createPossiblePTypesForMTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = possiblePTypesForMTypesRepository.findAll().size();

        // Create the PossiblePTypesForMTypes with an existing ID
        possiblePTypesForMTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPossiblePTypesForMTypesMockMvc.perform(post("/api/possible-p-types-for-m-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(possiblePTypesForMTypes)))
            .andExpect(status().isBadRequest());

        // Validate the PossiblePTypesForMTypes in the database
        List<PossiblePTypesForMTypes> possiblePTypesForMTypesList = possiblePTypesForMTypesRepository.findAll();
        assertThat(possiblePTypesForMTypesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPossiblePTypesForMTypes() throws Exception {
        // Initialize the database
        possiblePTypesForMTypesRepository.saveAndFlush(possiblePTypesForMTypes);

        // Get all the possiblePTypesForMTypesList
        restPossiblePTypesForMTypesMockMvc.perform(get("/api/possible-p-types-for-m-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(possiblePTypesForMTypes.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getPossiblePTypesForMTypes() throws Exception {
        // Initialize the database
        possiblePTypesForMTypesRepository.saveAndFlush(possiblePTypesForMTypes);

        // Get the possiblePTypesForMTypes
        restPossiblePTypesForMTypesMockMvc.perform(get("/api/possible-p-types-for-m-types/{id}", possiblePTypesForMTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(possiblePTypesForMTypes.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPossiblePTypesForMTypes() throws Exception {
        // Get the possiblePTypesForMTypes
        restPossiblePTypesForMTypesMockMvc.perform(get("/api/possible-p-types-for-m-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePossiblePTypesForMTypes() throws Exception {
        // Initialize the database
        possiblePTypesForMTypesRepository.saveAndFlush(possiblePTypesForMTypes);

        int databaseSizeBeforeUpdate = possiblePTypesForMTypesRepository.findAll().size();

        // Update the possiblePTypesForMTypes
        PossiblePTypesForMTypes updatedPossiblePTypesForMTypes = possiblePTypesForMTypesRepository.findById(possiblePTypesForMTypes.getId()).get();
        // Disconnect from session so that the updates on updatedPossiblePTypesForMTypes are not directly saved in db
        em.detach(updatedPossiblePTypesForMTypes);

        restPossiblePTypesForMTypesMockMvc.perform(put("/api/possible-p-types-for-m-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPossiblePTypesForMTypes)))
            .andExpect(status().isOk());

        // Validate the PossiblePTypesForMTypes in the database
        List<PossiblePTypesForMTypes> possiblePTypesForMTypesList = possiblePTypesForMTypesRepository.findAll();
        assertThat(possiblePTypesForMTypesList).hasSize(databaseSizeBeforeUpdate);
        PossiblePTypesForMTypes testPossiblePTypesForMTypes = possiblePTypesForMTypesList.get(possiblePTypesForMTypesList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPossiblePTypesForMTypes() throws Exception {
        int databaseSizeBeforeUpdate = possiblePTypesForMTypesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPossiblePTypesForMTypesMockMvc.perform(put("/api/possible-p-types-for-m-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(possiblePTypesForMTypes)))
            .andExpect(status().isBadRequest());

        // Validate the PossiblePTypesForMTypes in the database
        List<PossiblePTypesForMTypes> possiblePTypesForMTypesList = possiblePTypesForMTypesRepository.findAll();
        assertThat(possiblePTypesForMTypesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePossiblePTypesForMTypes() throws Exception {
        // Initialize the database
        possiblePTypesForMTypesRepository.saveAndFlush(possiblePTypesForMTypes);

        int databaseSizeBeforeDelete = possiblePTypesForMTypesRepository.findAll().size();

        // Delete the possiblePTypesForMTypes
        restPossiblePTypesForMTypesMockMvc.perform(delete("/api/possible-p-types-for-m-types/{id}", possiblePTypesForMTypes.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PossiblePTypesForMTypes> possiblePTypesForMTypesList = possiblePTypesForMTypesRepository.findAll();
        assertThat(possiblePTypesForMTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
