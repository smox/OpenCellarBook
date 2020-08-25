package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.MeasureEntry;
import org.sm0x.tools.opencellarbook.repository.MeasureEntryRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MeasureEntryResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeasureEntryResourceIT {

    private static final LocalDate DEFAULT_REALIZED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REALIZED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ADDITIONAL_INFORMATION = "AAAAAAAAAA";
    private static final String UPDATED_ADDITIONAL_INFORMATION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DELETED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DELETED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private MeasureEntryRepository measureEntryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMeasureEntryMockMvc;

    private MeasureEntry measureEntry;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasureEntry createEntity(EntityManager em) {
        MeasureEntry measureEntry = new MeasureEntry()
            .realizedAt(DEFAULT_REALIZED_AT)
            .createdAt(DEFAULT_CREATED_AT)
            .additionalInformation(DEFAULT_ADDITIONAL_INFORMATION)
            .deletedAt(DEFAULT_DELETED_AT);
        return measureEntry;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasureEntry createUpdatedEntity(EntityManager em) {
        MeasureEntry measureEntry = new MeasureEntry()
            .realizedAt(UPDATED_REALIZED_AT)
            .createdAt(UPDATED_CREATED_AT)
            .additionalInformation(UPDATED_ADDITIONAL_INFORMATION)
            .deletedAt(UPDATED_DELETED_AT);
        return measureEntry;
    }

    @BeforeEach
    public void initTest() {
        measureEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasureEntry() throws Exception {
        int databaseSizeBeforeCreate = measureEntryRepository.findAll().size();
        // Create the MeasureEntry
        restMeasureEntryMockMvc.perform(post("/api/measure-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measureEntry)))
            .andExpect(status().isCreated());

        // Validate the MeasureEntry in the database
        List<MeasureEntry> measureEntryList = measureEntryRepository.findAll();
        assertThat(measureEntryList).hasSize(databaseSizeBeforeCreate + 1);
        MeasureEntry testMeasureEntry = measureEntryList.get(measureEntryList.size() - 1);
        assertThat(testMeasureEntry.getRealizedAt()).isEqualTo(DEFAULT_REALIZED_AT);
        assertThat(testMeasureEntry.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testMeasureEntry.getAdditionalInformation()).isEqualTo(DEFAULT_ADDITIONAL_INFORMATION);
        assertThat(testMeasureEntry.getDeletedAt()).isEqualTo(DEFAULT_DELETED_AT);
    }

    @Test
    @Transactional
    public void createMeasureEntryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measureEntryRepository.findAll().size();

        // Create the MeasureEntry with an existing ID
        measureEntry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasureEntryMockMvc.perform(post("/api/measure-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measureEntry)))
            .andExpect(status().isBadRequest());

        // Validate the MeasureEntry in the database
        List<MeasureEntry> measureEntryList = measureEntryRepository.findAll();
        assertThat(measureEntryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMeasureEntries() throws Exception {
        // Initialize the database
        measureEntryRepository.saveAndFlush(measureEntry);

        // Get all the measureEntryList
        restMeasureEntryMockMvc.perform(get("/api/measure-entries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measureEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].realizedAt").value(hasItem(DEFAULT_REALIZED_AT.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].additionalInformation").value(hasItem(DEFAULT_ADDITIONAL_INFORMATION)))
            .andExpect(jsonPath("$.[*].deletedAt").value(hasItem(DEFAULT_DELETED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getMeasureEntry() throws Exception {
        // Initialize the database
        measureEntryRepository.saveAndFlush(measureEntry);

        // Get the measureEntry
        restMeasureEntryMockMvc.perform(get("/api/measure-entries/{id}", measureEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(measureEntry.getId().intValue()))
            .andExpect(jsonPath("$.realizedAt").value(DEFAULT_REALIZED_AT.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.additionalInformation").value(DEFAULT_ADDITIONAL_INFORMATION))
            .andExpect(jsonPath("$.deletedAt").value(DEFAULT_DELETED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMeasureEntry() throws Exception {
        // Get the measureEntry
        restMeasureEntryMockMvc.perform(get("/api/measure-entries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasureEntry() throws Exception {
        // Initialize the database
        measureEntryRepository.saveAndFlush(measureEntry);

        int databaseSizeBeforeUpdate = measureEntryRepository.findAll().size();

        // Update the measureEntry
        MeasureEntry updatedMeasureEntry = measureEntryRepository.findById(measureEntry.getId()).get();
        // Disconnect from session so that the updates on updatedMeasureEntry are not directly saved in db
        em.detach(updatedMeasureEntry);
        updatedMeasureEntry
            .realizedAt(UPDATED_REALIZED_AT)
            .createdAt(UPDATED_CREATED_AT)
            .additionalInformation(UPDATED_ADDITIONAL_INFORMATION)
            .deletedAt(UPDATED_DELETED_AT);

        restMeasureEntryMockMvc.perform(put("/api/measure-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasureEntry)))
            .andExpect(status().isOk());

        // Validate the MeasureEntry in the database
        List<MeasureEntry> measureEntryList = measureEntryRepository.findAll();
        assertThat(measureEntryList).hasSize(databaseSizeBeforeUpdate);
        MeasureEntry testMeasureEntry = measureEntryList.get(measureEntryList.size() - 1);
        assertThat(testMeasureEntry.getRealizedAt()).isEqualTo(UPDATED_REALIZED_AT);
        assertThat(testMeasureEntry.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testMeasureEntry.getAdditionalInformation()).isEqualTo(UPDATED_ADDITIONAL_INFORMATION);
        assertThat(testMeasureEntry.getDeletedAt()).isEqualTo(UPDATED_DELETED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasureEntry() throws Exception {
        int databaseSizeBeforeUpdate = measureEntryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasureEntryMockMvc.perform(put("/api/measure-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measureEntry)))
            .andExpect(status().isBadRequest());

        // Validate the MeasureEntry in the database
        List<MeasureEntry> measureEntryList = measureEntryRepository.findAll();
        assertThat(measureEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasureEntry() throws Exception {
        // Initialize the database
        measureEntryRepository.saveAndFlush(measureEntry);

        int databaseSizeBeforeDelete = measureEntryRepository.findAll().size();

        // Delete the measureEntry
        restMeasureEntryMockMvc.perform(delete("/api/measure-entries/{id}", measureEntry.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MeasureEntry> measureEntryList = measureEntryRepository.findAll();
        assertThat(measureEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
