package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.MeasureTypeGroup;
import org.sm0x.tools.opencellarbook.repository.MeasureTypeGroupRepository;

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
 * Integration tests for the {@link MeasureTypeGroupResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeasureTypeGroupResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private MeasureTypeGroupRepository measureTypeGroupRepository;

    @Mock
    private MeasureTypeGroupRepository measureTypeGroupRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMeasureTypeGroupMockMvc;

    private MeasureTypeGroup measureTypeGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasureTypeGroup createEntity(EntityManager em) {
        MeasureTypeGroup measureTypeGroup = new MeasureTypeGroup()
            .name(DEFAULT_NAME);
        return measureTypeGroup;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasureTypeGroup createUpdatedEntity(EntityManager em) {
        MeasureTypeGroup measureTypeGroup = new MeasureTypeGroup()
            .name(UPDATED_NAME);
        return measureTypeGroup;
    }

    @BeforeEach
    public void initTest() {
        measureTypeGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasureTypeGroup() throws Exception {
        int databaseSizeBeforeCreate = measureTypeGroupRepository.findAll().size();
        // Create the MeasureTypeGroup
        restMeasureTypeGroupMockMvc.perform(post("/api/measure-type-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measureTypeGroup)))
            .andExpect(status().isCreated());

        // Validate the MeasureTypeGroup in the database
        List<MeasureTypeGroup> measureTypeGroupList = measureTypeGroupRepository.findAll();
        assertThat(measureTypeGroupList).hasSize(databaseSizeBeforeCreate + 1);
        MeasureTypeGroup testMeasureTypeGroup = measureTypeGroupList.get(measureTypeGroupList.size() - 1);
        assertThat(testMeasureTypeGroup.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createMeasureTypeGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measureTypeGroupRepository.findAll().size();

        // Create the MeasureTypeGroup with an existing ID
        measureTypeGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasureTypeGroupMockMvc.perform(post("/api/measure-type-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measureTypeGroup)))
            .andExpect(status().isBadRequest());

        // Validate the MeasureTypeGroup in the database
        List<MeasureTypeGroup> measureTypeGroupList = measureTypeGroupRepository.findAll();
        assertThat(measureTypeGroupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMeasureTypeGroups() throws Exception {
        // Initialize the database
        measureTypeGroupRepository.saveAndFlush(measureTypeGroup);

        // Get all the measureTypeGroupList
        restMeasureTypeGroupMockMvc.perform(get("/api/measure-type-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measureTypeGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllMeasureTypeGroupsWithEagerRelationshipsIsEnabled() throws Exception {
        when(measureTypeGroupRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMeasureTypeGroupMockMvc.perform(get("/api/measure-type-groups?eagerload=true"))
            .andExpect(status().isOk());

        verify(measureTypeGroupRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllMeasureTypeGroupsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(measureTypeGroupRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMeasureTypeGroupMockMvc.perform(get("/api/measure-type-groups?eagerload=true"))
            .andExpect(status().isOk());

        verify(measureTypeGroupRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getMeasureTypeGroup() throws Exception {
        // Initialize the database
        measureTypeGroupRepository.saveAndFlush(measureTypeGroup);

        // Get the measureTypeGroup
        restMeasureTypeGroupMockMvc.perform(get("/api/measure-type-groups/{id}", measureTypeGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(measureTypeGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingMeasureTypeGroup() throws Exception {
        // Get the measureTypeGroup
        restMeasureTypeGroupMockMvc.perform(get("/api/measure-type-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasureTypeGroup() throws Exception {
        // Initialize the database
        measureTypeGroupRepository.saveAndFlush(measureTypeGroup);

        int databaseSizeBeforeUpdate = measureTypeGroupRepository.findAll().size();

        // Update the measureTypeGroup
        MeasureTypeGroup updatedMeasureTypeGroup = measureTypeGroupRepository.findById(measureTypeGroup.getId()).get();
        // Disconnect from session so that the updates on updatedMeasureTypeGroup are not directly saved in db
        em.detach(updatedMeasureTypeGroup);
        updatedMeasureTypeGroup
            .name(UPDATED_NAME);

        restMeasureTypeGroupMockMvc.perform(put("/api/measure-type-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasureTypeGroup)))
            .andExpect(status().isOk());

        // Validate the MeasureTypeGroup in the database
        List<MeasureTypeGroup> measureTypeGroupList = measureTypeGroupRepository.findAll();
        assertThat(measureTypeGroupList).hasSize(databaseSizeBeforeUpdate);
        MeasureTypeGroup testMeasureTypeGroup = measureTypeGroupList.get(measureTypeGroupList.size() - 1);
        assertThat(testMeasureTypeGroup.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasureTypeGroup() throws Exception {
        int databaseSizeBeforeUpdate = measureTypeGroupRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasureTypeGroupMockMvc.perform(put("/api/measure-type-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measureTypeGroup)))
            .andExpect(status().isBadRequest());

        // Validate the MeasureTypeGroup in the database
        List<MeasureTypeGroup> measureTypeGroupList = measureTypeGroupRepository.findAll();
        assertThat(measureTypeGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasureTypeGroup() throws Exception {
        // Initialize the database
        measureTypeGroupRepository.saveAndFlush(measureTypeGroup);

        int databaseSizeBeforeDelete = measureTypeGroupRepository.findAll().size();

        // Delete the measureTypeGroup
        restMeasureTypeGroupMockMvc.perform(delete("/api/measure-type-groups/{id}", measureTypeGroup.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MeasureTypeGroup> measureTypeGroupList = measureTypeGroupRepository.findAll();
        assertThat(measureTypeGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
