package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.ContainerType;
import org.sm0x.tools.opencellarbook.repository.ContainerTypeRepository;

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

/**
 * Integration tests for the {@link ContainerTypeResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContainerTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DELETED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DELETED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDER_NUMBER = 1;
    private static final Integer UPDATED_ORDER_NUMBER = 2;

    private static final byte[] DEFAULT_ICON = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ICON = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ICON_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ICON_CONTENT_TYPE = "image/png";

    @Autowired
    private ContainerTypeRepository containerTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContainerTypeMockMvc;

    private ContainerType containerType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContainerType createEntity(EntityManager em) {
        ContainerType containerType = new ContainerType()
            .name(DEFAULT_NAME)
            .deletedAt(DEFAULT_DELETED_AT)
            .color(DEFAULT_COLOR)
            .orderNumber(DEFAULT_ORDER_NUMBER)
            .icon(DEFAULT_ICON)
            .iconContentType(DEFAULT_ICON_CONTENT_TYPE);
        return containerType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContainerType createUpdatedEntity(EntityManager em) {
        ContainerType containerType = new ContainerType()
            .name(UPDATED_NAME)
            .deletedAt(UPDATED_DELETED_AT)
            .color(UPDATED_COLOR)
            .orderNumber(UPDATED_ORDER_NUMBER)
            .icon(UPDATED_ICON)
            .iconContentType(UPDATED_ICON_CONTENT_TYPE);
        return containerType;
    }

    @BeforeEach
    public void initTest() {
        containerType = createEntity(em);
    }

    @Test
    @Transactional
    public void createContainerType() throws Exception {
        int databaseSizeBeforeCreate = containerTypeRepository.findAll().size();
        // Create the ContainerType
        restContainerTypeMockMvc.perform(post("/api/container-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(containerType)))
            .andExpect(status().isCreated());

        // Validate the ContainerType in the database
        List<ContainerType> containerTypeList = containerTypeRepository.findAll();
        assertThat(containerTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ContainerType testContainerType = containerTypeList.get(containerTypeList.size() - 1);
        assertThat(testContainerType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testContainerType.getDeletedAt()).isEqualTo(DEFAULT_DELETED_AT);
        assertThat(testContainerType.getColor()).isEqualTo(DEFAULT_COLOR);
        assertThat(testContainerType.getOrderNumber()).isEqualTo(DEFAULT_ORDER_NUMBER);
        assertThat(testContainerType.getIcon()).isEqualTo(DEFAULT_ICON);
        assertThat(testContainerType.getIconContentType()).isEqualTo(DEFAULT_ICON_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createContainerTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = containerTypeRepository.findAll().size();

        // Create the ContainerType with an existing ID
        containerType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContainerTypeMockMvc.perform(post("/api/container-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(containerType)))
            .andExpect(status().isBadRequest());

        // Validate the ContainerType in the database
        List<ContainerType> containerTypeList = containerTypeRepository.findAll();
        assertThat(containerTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContainerTypes() throws Exception {
        // Initialize the database
        containerTypeRepository.saveAndFlush(containerType);

        // Get all the containerTypeList
        restContainerTypeMockMvc.perform(get("/api/container-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(containerType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].deletedAt").value(hasItem(DEFAULT_DELETED_AT.toString())))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR)))
            .andExpect(jsonPath("$.[*].orderNumber").value(hasItem(DEFAULT_ORDER_NUMBER)))
            .andExpect(jsonPath("$.[*].iconContentType").value(hasItem(DEFAULT_ICON_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].icon").value(hasItem(Base64Utils.encodeToString(DEFAULT_ICON))));
    }
    
    @Test
    @Transactional
    public void getContainerType() throws Exception {
        // Initialize the database
        containerTypeRepository.saveAndFlush(containerType);

        // Get the containerType
        restContainerTypeMockMvc.perform(get("/api/container-types/{id}", containerType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(containerType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.deletedAt").value(DEFAULT_DELETED_AT.toString()))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR))
            .andExpect(jsonPath("$.orderNumber").value(DEFAULT_ORDER_NUMBER))
            .andExpect(jsonPath("$.iconContentType").value(DEFAULT_ICON_CONTENT_TYPE))
            .andExpect(jsonPath("$.icon").value(Base64Utils.encodeToString(DEFAULT_ICON)));
    }
    @Test
    @Transactional
    public void getNonExistingContainerType() throws Exception {
        // Get the containerType
        restContainerTypeMockMvc.perform(get("/api/container-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContainerType() throws Exception {
        // Initialize the database
        containerTypeRepository.saveAndFlush(containerType);

        int databaseSizeBeforeUpdate = containerTypeRepository.findAll().size();

        // Update the containerType
        ContainerType updatedContainerType = containerTypeRepository.findById(containerType.getId()).get();
        // Disconnect from session so that the updates on updatedContainerType are not directly saved in db
        em.detach(updatedContainerType);
        updatedContainerType
            .name(UPDATED_NAME)
            .deletedAt(UPDATED_DELETED_AT)
            .color(UPDATED_COLOR)
            .orderNumber(UPDATED_ORDER_NUMBER)
            .icon(UPDATED_ICON)
            .iconContentType(UPDATED_ICON_CONTENT_TYPE);

        restContainerTypeMockMvc.perform(put("/api/container-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContainerType)))
            .andExpect(status().isOk());

        // Validate the ContainerType in the database
        List<ContainerType> containerTypeList = containerTypeRepository.findAll();
        assertThat(containerTypeList).hasSize(databaseSizeBeforeUpdate);
        ContainerType testContainerType = containerTypeList.get(containerTypeList.size() - 1);
        assertThat(testContainerType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testContainerType.getDeletedAt()).isEqualTo(UPDATED_DELETED_AT);
        assertThat(testContainerType.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testContainerType.getOrderNumber()).isEqualTo(UPDATED_ORDER_NUMBER);
        assertThat(testContainerType.getIcon()).isEqualTo(UPDATED_ICON);
        assertThat(testContainerType.getIconContentType()).isEqualTo(UPDATED_ICON_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingContainerType() throws Exception {
        int databaseSizeBeforeUpdate = containerTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContainerTypeMockMvc.perform(put("/api/container-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(containerType)))
            .andExpect(status().isBadRequest());

        // Validate the ContainerType in the database
        List<ContainerType> containerTypeList = containerTypeRepository.findAll();
        assertThat(containerTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContainerType() throws Exception {
        // Initialize the database
        containerTypeRepository.saveAndFlush(containerType);

        int databaseSizeBeforeDelete = containerTypeRepository.findAll().size();

        // Delete the containerType
        restContainerTypeMockMvc.perform(delete("/api/container-types/{id}", containerType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ContainerType> containerTypeList = containerTypeRepository.findAll();
        assertThat(containerTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
