package org.sm0x.tools.opencellarbook.web.rest;

import org.sm0x.tools.opencellarbook.OpenCellarBookApp;
import org.sm0x.tools.opencellarbook.domain.Container;
import org.sm0x.tools.opencellarbook.repository.ContainerRepository;

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
 * Integration tests for the {@link ContainerResource} REST controller.
 */
@SpringBootTest(classes = OpenCellarBookApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContainerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ALWAYS_FULL = false;
    private static final Boolean UPDATED_IS_ALWAYS_FULL = true;

    private static final Integer DEFAULT_CURRENT_AMOUNT_OF_CONTENT = 1;
    private static final Integer UPDATED_CURRENT_AMOUNT_OF_CONTENT = 2;

    private static final Integer DEFAULT_CAPACITY = 1;
    private static final Integer UPDATED_CAPACITY = 2;

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDER_NUMBER = 1;
    private static final Integer UPDATED_ORDER_NUMBER = 2;

    private static final byte[] DEFAULT_ICON = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ICON = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ICON_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ICON_CONTENT_TYPE = "image/png";

    private static final LocalDate DEFAULT_DELETED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DELETED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ContainerRepository containerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContainerMockMvc;

    private Container container;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Container createEntity(EntityManager em) {
        Container container = new Container()
            .name(DEFAULT_NAME)
            .isAlwaysFull(DEFAULT_IS_ALWAYS_FULL)
            .currentAmountOfContent(DEFAULT_CURRENT_AMOUNT_OF_CONTENT)
            .capacity(DEFAULT_CAPACITY)
            .color(DEFAULT_COLOR)
            .orderNumber(DEFAULT_ORDER_NUMBER)
            .icon(DEFAULT_ICON)
            .iconContentType(DEFAULT_ICON_CONTENT_TYPE)
            .deletedAt(DEFAULT_DELETED_AT);
        return container;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Container createUpdatedEntity(EntityManager em) {
        Container container = new Container()
            .name(UPDATED_NAME)
            .isAlwaysFull(UPDATED_IS_ALWAYS_FULL)
            .currentAmountOfContent(UPDATED_CURRENT_AMOUNT_OF_CONTENT)
            .capacity(UPDATED_CAPACITY)
            .color(UPDATED_COLOR)
            .orderNumber(UPDATED_ORDER_NUMBER)
            .icon(UPDATED_ICON)
            .iconContentType(UPDATED_ICON_CONTENT_TYPE)
            .deletedAt(UPDATED_DELETED_AT);
        return container;
    }

    @BeforeEach
    public void initTest() {
        container = createEntity(em);
    }

    @Test
    @Transactional
    public void createContainer() throws Exception {
        int databaseSizeBeforeCreate = containerRepository.findAll().size();
        // Create the Container
        restContainerMockMvc.perform(post("/api/containers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(container)))
            .andExpect(status().isCreated());

        // Validate the Container in the database
        List<Container> containerList = containerRepository.findAll();
        assertThat(containerList).hasSize(databaseSizeBeforeCreate + 1);
        Container testContainer = containerList.get(containerList.size() - 1);
        assertThat(testContainer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testContainer.isIsAlwaysFull()).isEqualTo(DEFAULT_IS_ALWAYS_FULL);
        assertThat(testContainer.getCurrentAmountOfContent()).isEqualTo(DEFAULT_CURRENT_AMOUNT_OF_CONTENT);
        assertThat(testContainer.getCapacity()).isEqualTo(DEFAULT_CAPACITY);
        assertThat(testContainer.getColor()).isEqualTo(DEFAULT_COLOR);
        assertThat(testContainer.getOrderNumber()).isEqualTo(DEFAULT_ORDER_NUMBER);
        assertThat(testContainer.getIcon()).isEqualTo(DEFAULT_ICON);
        assertThat(testContainer.getIconContentType()).isEqualTo(DEFAULT_ICON_CONTENT_TYPE);
        assertThat(testContainer.getDeletedAt()).isEqualTo(DEFAULT_DELETED_AT);
    }

    @Test
    @Transactional
    public void createContainerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = containerRepository.findAll().size();

        // Create the Container with an existing ID
        container.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContainerMockMvc.perform(post("/api/containers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(container)))
            .andExpect(status().isBadRequest());

        // Validate the Container in the database
        List<Container> containerList = containerRepository.findAll();
        assertThat(containerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContainers() throws Exception {
        // Initialize the database
        containerRepository.saveAndFlush(container);

        // Get all the containerList
        restContainerMockMvc.perform(get("/api/containers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(container.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].isAlwaysFull").value(hasItem(DEFAULT_IS_ALWAYS_FULL.booleanValue())))
            .andExpect(jsonPath("$.[*].currentAmountOfContent").value(hasItem(DEFAULT_CURRENT_AMOUNT_OF_CONTENT)))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY)))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR)))
            .andExpect(jsonPath("$.[*].orderNumber").value(hasItem(DEFAULT_ORDER_NUMBER)))
            .andExpect(jsonPath("$.[*].iconContentType").value(hasItem(DEFAULT_ICON_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].icon").value(hasItem(Base64Utils.encodeToString(DEFAULT_ICON))))
            .andExpect(jsonPath("$.[*].deletedAt").value(hasItem(DEFAULT_DELETED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getContainer() throws Exception {
        // Initialize the database
        containerRepository.saveAndFlush(container);

        // Get the container
        restContainerMockMvc.perform(get("/api/containers/{id}", container.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(container.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.isAlwaysFull").value(DEFAULT_IS_ALWAYS_FULL.booleanValue()))
            .andExpect(jsonPath("$.currentAmountOfContent").value(DEFAULT_CURRENT_AMOUNT_OF_CONTENT))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR))
            .andExpect(jsonPath("$.orderNumber").value(DEFAULT_ORDER_NUMBER))
            .andExpect(jsonPath("$.iconContentType").value(DEFAULT_ICON_CONTENT_TYPE))
            .andExpect(jsonPath("$.icon").value(Base64Utils.encodeToString(DEFAULT_ICON)))
            .andExpect(jsonPath("$.deletedAt").value(DEFAULT_DELETED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingContainer() throws Exception {
        // Get the container
        restContainerMockMvc.perform(get("/api/containers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContainer() throws Exception {
        // Initialize the database
        containerRepository.saveAndFlush(container);

        int databaseSizeBeforeUpdate = containerRepository.findAll().size();

        // Update the container
        Container updatedContainer = containerRepository.findById(container.getId()).get();
        // Disconnect from session so that the updates on updatedContainer are not directly saved in db
        em.detach(updatedContainer);
        updatedContainer
            .name(UPDATED_NAME)
            .isAlwaysFull(UPDATED_IS_ALWAYS_FULL)
            .currentAmountOfContent(UPDATED_CURRENT_AMOUNT_OF_CONTENT)
            .capacity(UPDATED_CAPACITY)
            .color(UPDATED_COLOR)
            .orderNumber(UPDATED_ORDER_NUMBER)
            .icon(UPDATED_ICON)
            .iconContentType(UPDATED_ICON_CONTENT_TYPE)
            .deletedAt(UPDATED_DELETED_AT);

        restContainerMockMvc.perform(put("/api/containers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContainer)))
            .andExpect(status().isOk());

        // Validate the Container in the database
        List<Container> containerList = containerRepository.findAll();
        assertThat(containerList).hasSize(databaseSizeBeforeUpdate);
        Container testContainer = containerList.get(containerList.size() - 1);
        assertThat(testContainer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testContainer.isIsAlwaysFull()).isEqualTo(UPDATED_IS_ALWAYS_FULL);
        assertThat(testContainer.getCurrentAmountOfContent()).isEqualTo(UPDATED_CURRENT_AMOUNT_OF_CONTENT);
        assertThat(testContainer.getCapacity()).isEqualTo(UPDATED_CAPACITY);
        assertThat(testContainer.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testContainer.getOrderNumber()).isEqualTo(UPDATED_ORDER_NUMBER);
        assertThat(testContainer.getIcon()).isEqualTo(UPDATED_ICON);
        assertThat(testContainer.getIconContentType()).isEqualTo(UPDATED_ICON_CONTENT_TYPE);
        assertThat(testContainer.getDeletedAt()).isEqualTo(UPDATED_DELETED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingContainer() throws Exception {
        int databaseSizeBeforeUpdate = containerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContainerMockMvc.perform(put("/api/containers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(container)))
            .andExpect(status().isBadRequest());

        // Validate the Container in the database
        List<Container> containerList = containerRepository.findAll();
        assertThat(containerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContainer() throws Exception {
        // Initialize the database
        containerRepository.saveAndFlush(container);

        int databaseSizeBeforeDelete = containerRepository.findAll().size();

        // Delete the container
        restContainerMockMvc.perform(delete("/api/containers/{id}", container.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Container> containerList = containerRepository.findAll();
        assertThat(containerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
