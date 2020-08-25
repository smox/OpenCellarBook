package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.MeasurePropertyType;
import org.sm0x.tools.opencellarbook.repository.MeasurePropertyTypeRepository;

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
 * Integration tests for the {@link MeasurePropertyTypeResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeasurePropertyTypeResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDER_NUMBER = 1;
    private static final Integer UPDATED_ORDER_NUMBER = 2;

    @Autowired
    private MeasurePropertyTypeRepository measurePropertyTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMeasurePropertyTypeMockMvc;

    private MeasurePropertyType measurePropertyType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasurePropertyType createEntity(EntityManager em) {
        MeasurePropertyType measurePropertyType = new MeasurePropertyType()
            .type(DEFAULT_TYPE)
            .orderNumber(DEFAULT_ORDER_NUMBER);
        return measurePropertyType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasurePropertyType createUpdatedEntity(EntityManager em) {
        MeasurePropertyType measurePropertyType = new MeasurePropertyType()
            .type(UPDATED_TYPE)
            .orderNumber(UPDATED_ORDER_NUMBER);
        return measurePropertyType;
    }

    @BeforeEach
    public void initTest() {
        measurePropertyType = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasurePropertyType() throws Exception {
        int databaseSizeBeforeCreate = measurePropertyTypeRepository.findAll().size();
        // Create the MeasurePropertyType
        restMeasurePropertyTypeMockMvc.perform(post("/api/measure-property-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurePropertyType)))
            .andExpect(status().isCreated());

        // Validate the MeasurePropertyType in the database
        List<MeasurePropertyType> measurePropertyTypeList = measurePropertyTypeRepository.findAll();
        assertThat(measurePropertyTypeList).hasSize(databaseSizeBeforeCreate + 1);
        MeasurePropertyType testMeasurePropertyType = measurePropertyTypeList.get(measurePropertyTypeList.size() - 1);
        assertThat(testMeasurePropertyType.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testMeasurePropertyType.getOrderNumber()).isEqualTo(DEFAULT_ORDER_NUMBER);
    }

    @Test
    @Transactional
    public void createMeasurePropertyTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measurePropertyTypeRepository.findAll().size();

        // Create the MeasurePropertyType with an existing ID
        measurePropertyType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasurePropertyTypeMockMvc.perform(post("/api/measure-property-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurePropertyType)))
            .andExpect(status().isBadRequest());

        // Validate the MeasurePropertyType in the database
        List<MeasurePropertyType> measurePropertyTypeList = measurePropertyTypeRepository.findAll();
        assertThat(measurePropertyTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMeasurePropertyTypes() throws Exception {
        // Initialize the database
        measurePropertyTypeRepository.saveAndFlush(measurePropertyType);

        // Get all the measurePropertyTypeList
        restMeasurePropertyTypeMockMvc.perform(get("/api/measure-property-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measurePropertyType.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].orderNumber").value(hasItem(DEFAULT_ORDER_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getMeasurePropertyType() throws Exception {
        // Initialize the database
        measurePropertyTypeRepository.saveAndFlush(measurePropertyType);

        // Get the measurePropertyType
        restMeasurePropertyTypeMockMvc.perform(get("/api/measure-property-types/{id}", measurePropertyType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(measurePropertyType.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.orderNumber").value(DEFAULT_ORDER_NUMBER));
    }
    @Test
    @Transactional
    public void getNonExistingMeasurePropertyType() throws Exception {
        // Get the measurePropertyType
        restMeasurePropertyTypeMockMvc.perform(get("/api/measure-property-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasurePropertyType() throws Exception {
        // Initialize the database
        measurePropertyTypeRepository.saveAndFlush(measurePropertyType);

        int databaseSizeBeforeUpdate = measurePropertyTypeRepository.findAll().size();

        // Update the measurePropertyType
        MeasurePropertyType updatedMeasurePropertyType = measurePropertyTypeRepository.findById(measurePropertyType.getId()).get();
        // Disconnect from session so that the updates on updatedMeasurePropertyType are not directly saved in db
        em.detach(updatedMeasurePropertyType);
        updatedMeasurePropertyType
            .type(UPDATED_TYPE)
            .orderNumber(UPDATED_ORDER_NUMBER);

        restMeasurePropertyTypeMockMvc.perform(put("/api/measure-property-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasurePropertyType)))
            .andExpect(status().isOk());

        // Validate the MeasurePropertyType in the database
        List<MeasurePropertyType> measurePropertyTypeList = measurePropertyTypeRepository.findAll();
        assertThat(measurePropertyTypeList).hasSize(databaseSizeBeforeUpdate);
        MeasurePropertyType testMeasurePropertyType = measurePropertyTypeList.get(measurePropertyTypeList.size() - 1);
        assertThat(testMeasurePropertyType.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testMeasurePropertyType.getOrderNumber()).isEqualTo(UPDATED_ORDER_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasurePropertyType() throws Exception {
        int databaseSizeBeforeUpdate = measurePropertyTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasurePropertyTypeMockMvc.perform(put("/api/measure-property-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurePropertyType)))
            .andExpect(status().isBadRequest());

        // Validate the MeasurePropertyType in the database
        List<MeasurePropertyType> measurePropertyTypeList = measurePropertyTypeRepository.findAll();
        assertThat(measurePropertyTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasurePropertyType() throws Exception {
        // Initialize the database
        measurePropertyTypeRepository.saveAndFlush(measurePropertyType);

        int databaseSizeBeforeDelete = measurePropertyTypeRepository.findAll().size();

        // Delete the measurePropertyType
        restMeasurePropertyTypeMockMvc.perform(delete("/api/measure-property-types/{id}", measurePropertyType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MeasurePropertyType> measurePropertyTypeList = measurePropertyTypeRepository.findAll();
        assertThat(measurePropertyTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
