package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.UiType;
import org.sm0x.tools.opencellarbook.repository.UiTypeRepository;

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

import org.sm0x.tools.opencellarbook.domain.enumeration.UiElement;
/**
 * Integration tests for the {@link UiTypeResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UiTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final UiElement DEFAULT_ELEMENT = UiElement.TEXT_FIELD;
    private static final UiElement UPDATED_ELEMENT = UiElement.INTEGER_SPINNER;

    private static final String DEFAULT_EXPRESSION = "AAAAAAAAAA";
    private static final String UPDATED_EXPRESSION = "BBBBBBBBBB";

    @Autowired
    private UiTypeRepository uiTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUiTypeMockMvc;

    private UiType uiType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UiType createEntity(EntityManager em) {
        UiType uiType = new UiType()
            .name(DEFAULT_NAME)
            .element(DEFAULT_ELEMENT)
            .expression(DEFAULT_EXPRESSION);
        return uiType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UiType createUpdatedEntity(EntityManager em) {
        UiType uiType = new UiType()
            .name(UPDATED_NAME)
            .element(UPDATED_ELEMENT)
            .expression(UPDATED_EXPRESSION);
        return uiType;
    }

    @BeforeEach
    public void initTest() {
        uiType = createEntity(em);
    }

    @Test
    @Transactional
    public void createUiType() throws Exception {
        int databaseSizeBeforeCreate = uiTypeRepository.findAll().size();
        // Create the UiType
        restUiTypeMockMvc.perform(post("/api/ui-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(uiType)))
            .andExpect(status().isCreated());

        // Validate the UiType in the database
        List<UiType> uiTypeList = uiTypeRepository.findAll();
        assertThat(uiTypeList).hasSize(databaseSizeBeforeCreate + 1);
        UiType testUiType = uiTypeList.get(uiTypeList.size() - 1);
        assertThat(testUiType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUiType.getElement()).isEqualTo(DEFAULT_ELEMENT);
        assertThat(testUiType.getExpression()).isEqualTo(DEFAULT_EXPRESSION);
    }

    @Test
    @Transactional
    public void createUiTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = uiTypeRepository.findAll().size();

        // Create the UiType with an existing ID
        uiType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUiTypeMockMvc.perform(post("/api/ui-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(uiType)))
            .andExpect(status().isBadRequest());

        // Validate the UiType in the database
        List<UiType> uiTypeList = uiTypeRepository.findAll();
        assertThat(uiTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUiTypes() throws Exception {
        // Initialize the database
        uiTypeRepository.saveAndFlush(uiType);

        // Get all the uiTypeList
        restUiTypeMockMvc.perform(get("/api/ui-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(uiType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].element").value(hasItem(DEFAULT_ELEMENT.toString())))
            .andExpect(jsonPath("$.[*].expression").value(hasItem(DEFAULT_EXPRESSION)));
    }
    
    @Test
    @Transactional
    public void getUiType() throws Exception {
        // Initialize the database
        uiTypeRepository.saveAndFlush(uiType);

        // Get the uiType
        restUiTypeMockMvc.perform(get("/api/ui-types/{id}", uiType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(uiType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.element").value(DEFAULT_ELEMENT.toString()))
            .andExpect(jsonPath("$.expression").value(DEFAULT_EXPRESSION));
    }
    @Test
    @Transactional
    public void getNonExistingUiType() throws Exception {
        // Get the uiType
        restUiTypeMockMvc.perform(get("/api/ui-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUiType() throws Exception {
        // Initialize the database
        uiTypeRepository.saveAndFlush(uiType);

        int databaseSizeBeforeUpdate = uiTypeRepository.findAll().size();

        // Update the uiType
        UiType updatedUiType = uiTypeRepository.findById(uiType.getId()).get();
        // Disconnect from session so that the updates on updatedUiType are not directly saved in db
        em.detach(updatedUiType);
        updatedUiType
            .name(UPDATED_NAME)
            .element(UPDATED_ELEMENT)
            .expression(UPDATED_EXPRESSION);

        restUiTypeMockMvc.perform(put("/api/ui-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUiType)))
            .andExpect(status().isOk());

        // Validate the UiType in the database
        List<UiType> uiTypeList = uiTypeRepository.findAll();
        assertThat(uiTypeList).hasSize(databaseSizeBeforeUpdate);
        UiType testUiType = uiTypeList.get(uiTypeList.size() - 1);
        assertThat(testUiType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUiType.getElement()).isEqualTo(UPDATED_ELEMENT);
        assertThat(testUiType.getExpression()).isEqualTo(UPDATED_EXPRESSION);
    }

    @Test
    @Transactional
    public void updateNonExistingUiType() throws Exception {
        int databaseSizeBeforeUpdate = uiTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUiTypeMockMvc.perform(put("/api/ui-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(uiType)))
            .andExpect(status().isBadRequest());

        // Validate the UiType in the database
        List<UiType> uiTypeList = uiTypeRepository.findAll();
        assertThat(uiTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUiType() throws Exception {
        // Initialize the database
        uiTypeRepository.saveAndFlush(uiType);

        int databaseSizeBeforeDelete = uiTypeRepository.findAll().size();

        // Delete the uiType
        restUiTypeMockMvc.perform(delete("/api/ui-types/{id}", uiType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UiType> uiTypeList = uiTypeRepository.findAll();
        assertThat(uiTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
