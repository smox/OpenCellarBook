package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.MeasureType;
import org.sm0x.tools.opencellarbook.repository.MeasureTypeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.sm0x.tools.opencellarbook.domain.enumeration.FillingEffect;
/**
 * Integration tests for the {@link MeasureTypeResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeasureTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final FillingEffect DEFAULT_FILLING_EFFECT = FillingEffect.NO_EFFECT;
    private static final FillingEffect UPDATED_FILLING_EFFECT = FillingEffect.REFILL;

    private static final Integer DEFAULT_ORDER_NUMBER = 1;
    private static final Integer UPDATED_ORDER_NUMBER = 2;

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    private static final byte[] DEFAULT_ICON = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ICON = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ICON_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ICON_CONTENT_TYPE = "image/png";

    private static final LocalDate DEFAULT_DELETED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DELETED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private MeasureTypeRepository measureTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMeasureTypeMockMvc;

    private MeasureType measureType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasureType createEntity(EntityManager em) {
        MeasureType measureType = new MeasureType()
            .name(DEFAULT_NAME)
            .fillingEffect(DEFAULT_FILLING_EFFECT)
            .orderNumber(DEFAULT_ORDER_NUMBER)
            .color(DEFAULT_COLOR)
            .icon(DEFAULT_ICON)
            .iconContentType(DEFAULT_ICON_CONTENT_TYPE)
            .deletedAt(DEFAULT_DELETED_AT);
        return measureType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasureType createUpdatedEntity(EntityManager em) {
        MeasureType measureType = new MeasureType()
            .name(UPDATED_NAME)
            .fillingEffect(UPDATED_FILLING_EFFECT)
            .orderNumber(UPDATED_ORDER_NUMBER)
            .color(UPDATED_COLOR)
            .icon(UPDATED_ICON)
            .iconContentType(UPDATED_ICON_CONTENT_TYPE)
            .deletedAt(UPDATED_DELETED_AT);
        return measureType;
    }

    @BeforeEach
    public void initTest() {
        measureType = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasureType() throws Exception {
        int databaseSizeBeforeCreate = measureTypeRepository.findAll().size();
        // Create the MeasureType
        restMeasureTypeMockMvc.perform(post("/api/measure-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measureType)))
            .andExpect(status().isCreated());

        // Validate the MeasureType in the database
        List<MeasureType> measureTypeList = measureTypeRepository.findAll();
        assertThat(measureTypeList).hasSize(databaseSizeBeforeCreate + 1);
        MeasureType testMeasureType = measureTypeList.get(measureTypeList.size() - 1);
        assertThat(testMeasureType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMeasureType.getFillingEffect()).isEqualTo(DEFAULT_FILLING_EFFECT);
        assertThat(testMeasureType.getOrderNumber()).isEqualTo(DEFAULT_ORDER_NUMBER);
        assertThat(testMeasureType.getColor()).isEqualTo(DEFAULT_COLOR);
        assertThat(testMeasureType.getIcon()).isEqualTo(DEFAULT_ICON);
        assertThat(testMeasureType.getIconContentType()).isEqualTo(DEFAULT_ICON_CONTENT_TYPE);
        assertThat(testMeasureType.getDeletedAt()).isEqualTo(DEFAULT_DELETED_AT);
    }

    @Test
    @Transactional
    public void createMeasureTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measureTypeRepository.findAll().size();

        // Create the MeasureType with an existing ID
        measureType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasureTypeMockMvc.perform(post("/api/measure-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measureType)))
            .andExpect(status().isBadRequest());

        // Validate the MeasureType in the database
        List<MeasureType> measureTypeList = measureTypeRepository.findAll();
        assertThat(measureTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMeasureTypes() throws Exception {
        // Initialize the database
        measureTypeRepository.saveAndFlush(measureType);

        // Get all the measureTypeList
        restMeasureTypeMockMvc.perform(get("/api/measure-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measureType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].fillingEffect").value(hasItem(DEFAULT_FILLING_EFFECT.toString())))
            .andExpect(jsonPath("$.[*].orderNumber").value(hasItem(DEFAULT_ORDER_NUMBER)))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR)))
            .andExpect(jsonPath("$.[*].iconContentType").value(hasItem(DEFAULT_ICON_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].icon").value(hasItem(Base64Utils.encodeToString(DEFAULT_ICON))))
            .andExpect(jsonPath("$.[*].deletedAt").value(hasItem(DEFAULT_DELETED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getMeasureType() throws Exception {
        // Initialize the database
        measureTypeRepository.saveAndFlush(measureType);

        // Get the measureType
        restMeasureTypeMockMvc.perform(get("/api/measure-types/{id}", measureType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(measureType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.fillingEffect").value(DEFAULT_FILLING_EFFECT.toString()))
            .andExpect(jsonPath("$.orderNumber").value(DEFAULT_ORDER_NUMBER))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR))
            .andExpect(jsonPath("$.iconContentType").value(DEFAULT_ICON_CONTENT_TYPE))
            .andExpect(jsonPath("$.icon").value(Base64Utils.encodeToString(DEFAULT_ICON)))
            .andExpect(jsonPath("$.deletedAt").value(DEFAULT_DELETED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMeasureType() throws Exception {
        // Get the measureType
        restMeasureTypeMockMvc.perform(get("/api/measure-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasureType() throws Exception {
        // Initialize the database
        measureTypeRepository.saveAndFlush(measureType);

        int databaseSizeBeforeUpdate = measureTypeRepository.findAll().size();

        // Update the measureType
        MeasureType updatedMeasureType = measureTypeRepository.findById(measureType.getId()).get();
        // Disconnect from session so that the updates on updatedMeasureType are not directly saved in db
        em.detach(updatedMeasureType);
        updatedMeasureType
            .name(UPDATED_NAME)
            .fillingEffect(UPDATED_FILLING_EFFECT)
            .orderNumber(UPDATED_ORDER_NUMBER)
            .color(UPDATED_COLOR)
            .icon(UPDATED_ICON)
            .iconContentType(UPDATED_ICON_CONTENT_TYPE)
            .deletedAt(UPDATED_DELETED_AT);

        restMeasureTypeMockMvc.perform(put("/api/measure-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasureType)))
            .andExpect(status().isOk());

        // Validate the MeasureType in the database
        List<MeasureType> measureTypeList = measureTypeRepository.findAll();
        assertThat(measureTypeList).hasSize(databaseSizeBeforeUpdate);
        MeasureType testMeasureType = measureTypeList.get(measureTypeList.size() - 1);
        assertThat(testMeasureType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMeasureType.getFillingEffect()).isEqualTo(UPDATED_FILLING_EFFECT);
        assertThat(testMeasureType.getOrderNumber()).isEqualTo(UPDATED_ORDER_NUMBER);
        assertThat(testMeasureType.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testMeasureType.getIcon()).isEqualTo(UPDATED_ICON);
        assertThat(testMeasureType.getIconContentType()).isEqualTo(UPDATED_ICON_CONTENT_TYPE);
        assertThat(testMeasureType.getDeletedAt()).isEqualTo(UPDATED_DELETED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasureType() throws Exception {
        int databaseSizeBeforeUpdate = measureTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasureTypeMockMvc.perform(put("/api/measure-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measureType)))
            .andExpect(status().isBadRequest());

        // Validate the MeasureType in the database
        List<MeasureType> measureTypeList = measureTypeRepository.findAll();
        assertThat(measureTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasureType() throws Exception {
        // Initialize the database
        measureTypeRepository.saveAndFlush(measureType);

        int databaseSizeBeforeDelete = measureTypeRepository.findAll().size();

        // Delete the measureType
        restMeasureTypeMockMvc.perform(delete("/api/measure-types/{id}", measureType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MeasureType> measureTypeList = measureTypeRepository.findAll();
        assertThat(measureTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
