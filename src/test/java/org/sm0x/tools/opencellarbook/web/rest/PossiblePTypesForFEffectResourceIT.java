package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.PossiblePTypesForFEffect;
import org.sm0x.tools.opencellarbook.repository.PossiblePTypesForFEffectRepository;
import org.sm0x.tools.opencellarbook.service.PossiblePTypesForFEffectService;

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

import org.sm0x.tools.opencellarbook.domain.enumeration.FillingEffect;
/**
 * Integration tests for the {@link PossiblePTypesForFEffectResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PossiblePTypesForFEffectResourceIT {

    private static final FillingEffect DEFAULT_FILLING_EFFECT = FillingEffect.NO_EFFECT;
    private static final FillingEffect UPDATED_FILLING_EFFECT = FillingEffect.REFILL;

    @Autowired
    private PossiblePTypesForFEffectRepository possiblePTypesForFEffectRepository;

    @Autowired
    private PossiblePTypesForFEffectService possiblePTypesForFEffectService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPossiblePTypesForFEffectMockMvc;

    private PossiblePTypesForFEffect possiblePTypesForFEffect;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PossiblePTypesForFEffect createEntity(EntityManager em) {
        PossiblePTypesForFEffect possiblePTypesForFEffect = new PossiblePTypesForFEffect()
            .fillingEffect(DEFAULT_FILLING_EFFECT);
        return possiblePTypesForFEffect;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PossiblePTypesForFEffect createUpdatedEntity(EntityManager em) {
        PossiblePTypesForFEffect possiblePTypesForFEffect = new PossiblePTypesForFEffect()
            .fillingEffect(UPDATED_FILLING_EFFECT);
        return possiblePTypesForFEffect;
    }

    @BeforeEach
    public void initTest() {
        possiblePTypesForFEffect = createEntity(em);
    }

    @Test
    @Transactional
    public void createPossiblePTypesForFEffect() throws Exception {
        int databaseSizeBeforeCreate = possiblePTypesForFEffectRepository.findAll().size();
        // Create the PossiblePTypesForFEffect
        restPossiblePTypesForFEffectMockMvc.perform(post("/api/possible-p-types-for-f-effects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(possiblePTypesForFEffect)))
            .andExpect(status().isCreated());

        // Validate the PossiblePTypesForFEffect in the database
        List<PossiblePTypesForFEffect> possiblePTypesForFEffectList = possiblePTypesForFEffectRepository.findAll();
        assertThat(possiblePTypesForFEffectList).hasSize(databaseSizeBeforeCreate + 1);
        PossiblePTypesForFEffect testPossiblePTypesForFEffect = possiblePTypesForFEffectList.get(possiblePTypesForFEffectList.size() - 1);
        assertThat(testPossiblePTypesForFEffect.getFillingEffect()).isEqualTo(DEFAULT_FILLING_EFFECT);
    }

    @Test
    @Transactional
    public void createPossiblePTypesForFEffectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = possiblePTypesForFEffectRepository.findAll().size();

        // Create the PossiblePTypesForFEffect with an existing ID
        possiblePTypesForFEffect.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPossiblePTypesForFEffectMockMvc.perform(post("/api/possible-p-types-for-f-effects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(possiblePTypesForFEffect)))
            .andExpect(status().isBadRequest());

        // Validate the PossiblePTypesForFEffect in the database
        List<PossiblePTypesForFEffect> possiblePTypesForFEffectList = possiblePTypesForFEffectRepository.findAll();
        assertThat(possiblePTypesForFEffectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPossiblePTypesForFEffects() throws Exception {
        // Initialize the database
        possiblePTypesForFEffectRepository.saveAndFlush(possiblePTypesForFEffect);

        // Get all the possiblePTypesForFEffectList
        restPossiblePTypesForFEffectMockMvc.perform(get("/api/possible-p-types-for-f-effects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(possiblePTypesForFEffect.getId().intValue())))
            .andExpect(jsonPath("$.[*].fillingEffect").value(hasItem(DEFAULT_FILLING_EFFECT.toString())));
    }
    
    @Test
    @Transactional
    public void getPossiblePTypesForFEffect() throws Exception {
        // Initialize the database
        possiblePTypesForFEffectRepository.saveAndFlush(possiblePTypesForFEffect);

        // Get the possiblePTypesForFEffect
        restPossiblePTypesForFEffectMockMvc.perform(get("/api/possible-p-types-for-f-effects/{id}", possiblePTypesForFEffect.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(possiblePTypesForFEffect.getId().intValue()))
            .andExpect(jsonPath("$.fillingEffect").value(DEFAULT_FILLING_EFFECT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPossiblePTypesForFEffect() throws Exception {
        // Get the possiblePTypesForFEffect
        restPossiblePTypesForFEffectMockMvc.perform(get("/api/possible-p-types-for-f-effects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePossiblePTypesForFEffect() throws Exception {
        // Initialize the database
        possiblePTypesForFEffectService.save(possiblePTypesForFEffect);

        int databaseSizeBeforeUpdate = possiblePTypesForFEffectRepository.findAll().size();

        // Update the possiblePTypesForFEffect
        PossiblePTypesForFEffect updatedPossiblePTypesForFEffect = possiblePTypesForFEffectRepository.findById(possiblePTypesForFEffect.getId()).get();
        // Disconnect from session so that the updates on updatedPossiblePTypesForFEffect are not directly saved in db
        em.detach(updatedPossiblePTypesForFEffect);
        updatedPossiblePTypesForFEffect
            .fillingEffect(UPDATED_FILLING_EFFECT);

        restPossiblePTypesForFEffectMockMvc.perform(put("/api/possible-p-types-for-f-effects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPossiblePTypesForFEffect)))
            .andExpect(status().isOk());

        // Validate the PossiblePTypesForFEffect in the database
        List<PossiblePTypesForFEffect> possiblePTypesForFEffectList = possiblePTypesForFEffectRepository.findAll();
        assertThat(possiblePTypesForFEffectList).hasSize(databaseSizeBeforeUpdate);
        PossiblePTypesForFEffect testPossiblePTypesForFEffect = possiblePTypesForFEffectList.get(possiblePTypesForFEffectList.size() - 1);
        assertThat(testPossiblePTypesForFEffect.getFillingEffect()).isEqualTo(UPDATED_FILLING_EFFECT);
    }

    @Test
    @Transactional
    public void updateNonExistingPossiblePTypesForFEffect() throws Exception {
        int databaseSizeBeforeUpdate = possiblePTypesForFEffectRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPossiblePTypesForFEffectMockMvc.perform(put("/api/possible-p-types-for-f-effects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(possiblePTypesForFEffect)))
            .andExpect(status().isBadRequest());

        // Validate the PossiblePTypesForFEffect in the database
        List<PossiblePTypesForFEffect> possiblePTypesForFEffectList = possiblePTypesForFEffectRepository.findAll();
        assertThat(possiblePTypesForFEffectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePossiblePTypesForFEffect() throws Exception {
        // Initialize the database
        possiblePTypesForFEffectService.save(possiblePTypesForFEffect);

        int databaseSizeBeforeDelete = possiblePTypesForFEffectRepository.findAll().size();

        // Delete the possiblePTypesForFEffect
        restPossiblePTypesForFEffectMockMvc.perform(delete("/api/possible-p-types-for-f-effects/{id}", possiblePTypesForFEffect.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PossiblePTypesForFEffect> possiblePTypesForFEffectList = possiblePTypesForFEffectRepository.findAll();
        assertThat(possiblePTypesForFEffectList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
