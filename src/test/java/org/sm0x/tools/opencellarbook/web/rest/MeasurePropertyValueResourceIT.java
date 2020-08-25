package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.MeasurePropertyValue;
import org.sm0x.tools.opencellarbook.repository.MeasurePropertyValueRepository;

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
 * Integration tests for the {@link MeasurePropertyValueResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeasurePropertyValueResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private MeasurePropertyValueRepository measurePropertyValueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMeasurePropertyValueMockMvc;

    private MeasurePropertyValue measurePropertyValue;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasurePropertyValue createEntity(EntityManager em) {
        MeasurePropertyValue measurePropertyValue = new MeasurePropertyValue()
            .value(DEFAULT_VALUE);
        return measurePropertyValue;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasurePropertyValue createUpdatedEntity(EntityManager em) {
        MeasurePropertyValue measurePropertyValue = new MeasurePropertyValue()
            .value(UPDATED_VALUE);
        return measurePropertyValue;
    }

    @BeforeEach
    public void initTest() {
        measurePropertyValue = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasurePropertyValue() throws Exception {
        int databaseSizeBeforeCreate = measurePropertyValueRepository.findAll().size();
        // Create the MeasurePropertyValue
        restMeasurePropertyValueMockMvc.perform(post("/api/measure-property-values")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurePropertyValue)))
            .andExpect(status().isCreated());

        // Validate the MeasurePropertyValue in the database
        List<MeasurePropertyValue> measurePropertyValueList = measurePropertyValueRepository.findAll();
        assertThat(measurePropertyValueList).hasSize(databaseSizeBeforeCreate + 1);
        MeasurePropertyValue testMeasurePropertyValue = measurePropertyValueList.get(measurePropertyValueList.size() - 1);
        assertThat(testMeasurePropertyValue.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createMeasurePropertyValueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measurePropertyValueRepository.findAll().size();

        // Create the MeasurePropertyValue with an existing ID
        measurePropertyValue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasurePropertyValueMockMvc.perform(post("/api/measure-property-values")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurePropertyValue)))
            .andExpect(status().isBadRequest());

        // Validate the MeasurePropertyValue in the database
        List<MeasurePropertyValue> measurePropertyValueList = measurePropertyValueRepository.findAll();
        assertThat(measurePropertyValueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMeasurePropertyValues() throws Exception {
        // Initialize the database
        measurePropertyValueRepository.saveAndFlush(measurePropertyValue);

        // Get all the measurePropertyValueList
        restMeasurePropertyValueMockMvc.perform(get("/api/measure-property-values?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measurePropertyValue.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }
    
    @Test
    @Transactional
    public void getMeasurePropertyValue() throws Exception {
        // Initialize the database
        measurePropertyValueRepository.saveAndFlush(measurePropertyValue);

        // Get the measurePropertyValue
        restMeasurePropertyValueMockMvc.perform(get("/api/measure-property-values/{id}", measurePropertyValue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(measurePropertyValue.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }
    @Test
    @Transactional
    public void getNonExistingMeasurePropertyValue() throws Exception {
        // Get the measurePropertyValue
        restMeasurePropertyValueMockMvc.perform(get("/api/measure-property-values/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasurePropertyValue() throws Exception {
        // Initialize the database
        measurePropertyValueRepository.saveAndFlush(measurePropertyValue);

        int databaseSizeBeforeUpdate = measurePropertyValueRepository.findAll().size();

        // Update the measurePropertyValue
        MeasurePropertyValue updatedMeasurePropertyValue = measurePropertyValueRepository.findById(measurePropertyValue.getId()).get();
        // Disconnect from session so that the updates on updatedMeasurePropertyValue are not directly saved in db
        em.detach(updatedMeasurePropertyValue);
        updatedMeasurePropertyValue
            .value(UPDATED_VALUE);

        restMeasurePropertyValueMockMvc.perform(put("/api/measure-property-values")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasurePropertyValue)))
            .andExpect(status().isOk());

        // Validate the MeasurePropertyValue in the database
        List<MeasurePropertyValue> measurePropertyValueList = measurePropertyValueRepository.findAll();
        assertThat(measurePropertyValueList).hasSize(databaseSizeBeforeUpdate);
        MeasurePropertyValue testMeasurePropertyValue = measurePropertyValueList.get(measurePropertyValueList.size() - 1);
        assertThat(testMeasurePropertyValue.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasurePropertyValue() throws Exception {
        int databaseSizeBeforeUpdate = measurePropertyValueRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasurePropertyValueMockMvc.perform(put("/api/measure-property-values")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurePropertyValue)))
            .andExpect(status().isBadRequest());

        // Validate the MeasurePropertyValue in the database
        List<MeasurePropertyValue> measurePropertyValueList = measurePropertyValueRepository.findAll();
        assertThat(measurePropertyValueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasurePropertyValue() throws Exception {
        // Initialize the database
        measurePropertyValueRepository.saveAndFlush(measurePropertyValue);

        int databaseSizeBeforeDelete = measurePropertyValueRepository.findAll().size();

        // Delete the measurePropertyValue
        restMeasurePropertyValueMockMvc.perform(delete("/api/measure-property-values/{id}", measurePropertyValue.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MeasurePropertyValue> measurePropertyValueList = measurePropertyValueRepository.findAll();
        assertThat(measurePropertyValueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
