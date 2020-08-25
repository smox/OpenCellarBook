package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.MeasurePropertyTypeGroup;
import org.sm0x.tools.opencellarbook.repository.MeasurePropertyTypeGroupRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MeasurePropertyTypeGroupResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeasurePropertyTypeGroupResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private MeasurePropertyTypeGroupRepository measurePropertyTypeGroupRepository;

    @Mock
    private MeasurePropertyTypeGroupRepository measurePropertyTypeGroupRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMeasurePropertyTypeGroupMockMvc;

    private MeasurePropertyTypeGroup measurePropertyTypeGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasurePropertyTypeGroup createEntity(EntityManager em) {
        MeasurePropertyTypeGroup measurePropertyTypeGroup = new MeasurePropertyTypeGroup()
            .name(DEFAULT_NAME);
        return measurePropertyTypeGroup;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasurePropertyTypeGroup createUpdatedEntity(EntityManager em) {
        MeasurePropertyTypeGroup measurePropertyTypeGroup = new MeasurePropertyTypeGroup()
            .name(UPDATED_NAME);
        return measurePropertyTypeGroup;
    }

    @BeforeEach
    public void initTest() {
        measurePropertyTypeGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasurePropertyTypeGroup() throws Exception {
        int databaseSizeBeforeCreate = measurePropertyTypeGroupRepository.findAll().size();
        // Create the MeasurePropertyTypeGroup
        restMeasurePropertyTypeGroupMockMvc.perform(post("/api/measure-property-type-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurePropertyTypeGroup)))
            .andExpect(status().isCreated());

        // Validate the MeasurePropertyTypeGroup in the database
        List<MeasurePropertyTypeGroup> measurePropertyTypeGroupList = measurePropertyTypeGroupRepository.findAll();
        assertThat(measurePropertyTypeGroupList).hasSize(databaseSizeBeforeCreate + 1);
        MeasurePropertyTypeGroup testMeasurePropertyTypeGroup = measurePropertyTypeGroupList.get(measurePropertyTypeGroupList.size() - 1);
        assertThat(testMeasurePropertyTypeGroup.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createMeasurePropertyTypeGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measurePropertyTypeGroupRepository.findAll().size();

        // Create the MeasurePropertyTypeGroup with an existing ID
        measurePropertyTypeGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasurePropertyTypeGroupMockMvc.perform(post("/api/measure-property-type-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurePropertyTypeGroup)))
            .andExpect(status().isBadRequest());

        // Validate the MeasurePropertyTypeGroup in the database
        List<MeasurePropertyTypeGroup> measurePropertyTypeGroupList = measurePropertyTypeGroupRepository.findAll();
        assertThat(measurePropertyTypeGroupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMeasurePropertyTypeGroups() throws Exception {
        // Initialize the database
        measurePropertyTypeGroupRepository.saveAndFlush(measurePropertyTypeGroup);

        // Get all the measurePropertyTypeGroupList
        restMeasurePropertyTypeGroupMockMvc.perform(get("/api/measure-property-type-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measurePropertyTypeGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllMeasurePropertyTypeGroupsWithEagerRelationshipsIsEnabled() throws Exception {
        when(measurePropertyTypeGroupRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMeasurePropertyTypeGroupMockMvc.perform(get("/api/measure-property-type-groups?eagerload=true"))
            .andExpect(status().isOk());

        verify(measurePropertyTypeGroupRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllMeasurePropertyTypeGroupsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(measurePropertyTypeGroupRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMeasurePropertyTypeGroupMockMvc.perform(get("/api/measure-property-type-groups?eagerload=true"))
            .andExpect(status().isOk());

        verify(measurePropertyTypeGroupRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getMeasurePropertyTypeGroup() throws Exception {
        // Initialize the database
        measurePropertyTypeGroupRepository.saveAndFlush(measurePropertyTypeGroup);

        // Get the measurePropertyTypeGroup
        restMeasurePropertyTypeGroupMockMvc.perform(get("/api/measure-property-type-groups/{id}", measurePropertyTypeGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(measurePropertyTypeGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingMeasurePropertyTypeGroup() throws Exception {
        // Get the measurePropertyTypeGroup
        restMeasurePropertyTypeGroupMockMvc.perform(get("/api/measure-property-type-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasurePropertyTypeGroup() throws Exception {
        // Initialize the database
        measurePropertyTypeGroupRepository.saveAndFlush(measurePropertyTypeGroup);

        int databaseSizeBeforeUpdate = measurePropertyTypeGroupRepository.findAll().size();

        // Update the measurePropertyTypeGroup
        MeasurePropertyTypeGroup updatedMeasurePropertyTypeGroup = measurePropertyTypeGroupRepository.findById(measurePropertyTypeGroup.getId()).get();
        // Disconnect from session so that the updates on updatedMeasurePropertyTypeGroup are not directly saved in db
        em.detach(updatedMeasurePropertyTypeGroup);
        updatedMeasurePropertyTypeGroup
            .name(UPDATED_NAME);

        restMeasurePropertyTypeGroupMockMvc.perform(put("/api/measure-property-type-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasurePropertyTypeGroup)))
            .andExpect(status().isOk());

        // Validate the MeasurePropertyTypeGroup in the database
        List<MeasurePropertyTypeGroup> measurePropertyTypeGroupList = measurePropertyTypeGroupRepository.findAll();
        assertThat(measurePropertyTypeGroupList).hasSize(databaseSizeBeforeUpdate);
        MeasurePropertyTypeGroup testMeasurePropertyTypeGroup = measurePropertyTypeGroupList.get(measurePropertyTypeGroupList.size() - 1);
        assertThat(testMeasurePropertyTypeGroup.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasurePropertyTypeGroup() throws Exception {
        int databaseSizeBeforeUpdate = measurePropertyTypeGroupRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasurePropertyTypeGroupMockMvc.perform(put("/api/measure-property-type-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurePropertyTypeGroup)))
            .andExpect(status().isBadRequest());

        // Validate the MeasurePropertyTypeGroup in the database
        List<MeasurePropertyTypeGroup> measurePropertyTypeGroupList = measurePropertyTypeGroupRepository.findAll();
        assertThat(measurePropertyTypeGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasurePropertyTypeGroup() throws Exception {
        // Initialize the database
        measurePropertyTypeGroupRepository.saveAndFlush(measurePropertyTypeGroup);

        int databaseSizeBeforeDelete = measurePropertyTypeGroupRepository.findAll().size();

        // Delete the measurePropertyTypeGroup
        restMeasurePropertyTypeGroupMockMvc.perform(delete("/api/measure-property-type-groups/{id}", measurePropertyTypeGroup.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MeasurePropertyTypeGroup> measurePropertyTypeGroupList = measurePropertyTypeGroupRepository.findAll();
        assertThat(measurePropertyTypeGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
