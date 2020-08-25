package org.sm0x.tools.opencellarbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Container.
 */
@Entity
@Table(name = "container")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Container implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_always_full")
    private Boolean isAlwaysFull;

    @Column(name = "current_amount_of_content")
    private Integer currentAmountOfContent;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "color")
    private String color;

    @Column(name = "order_number")
    private Integer orderNumber;

    @Lob
    @Column(name = "icon")
    private byte[] icon;

    @Column(name = "icon_content_type")
    private String iconContentType;

    @Column(name = "deleted_at")
    private LocalDate deletedAt;

    @OneToMany(mappedBy = "container")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<MeasureEntry> measureEntries = new HashSet<>();

    @OneToMany(mappedBy = "currentContainer")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<MeasureEntry> currentMeasures = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "containers", allowSetters = true)
    private Location location;

    @ManyToOne
    @JsonIgnoreProperties(value = "containers", allowSetters = true)
    private ContainerType containerType;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Container name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isIsAlwaysFull() {
        return isAlwaysFull;
    }

    public Container isAlwaysFull(Boolean isAlwaysFull) {
        this.isAlwaysFull = isAlwaysFull;
        return this;
    }

    public void setIsAlwaysFull(Boolean isAlwaysFull) {
        this.isAlwaysFull = isAlwaysFull;
    }

    public Integer getCurrentAmountOfContent() {
        return currentAmountOfContent;
    }

    public Container currentAmountOfContent(Integer currentAmountOfContent) {
        this.currentAmountOfContent = currentAmountOfContent;
        return this;
    }

    public void setCurrentAmountOfContent(Integer currentAmountOfContent) {
        this.currentAmountOfContent = currentAmountOfContent;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Container capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getColor() {
        return color;
    }

    public Container color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public Container orderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public byte[] getIcon() {
        return icon;
    }

    public Container icon(byte[] icon) {
        this.icon = icon;
        return this;
    }

    public void setIcon(byte[] icon) {
        this.icon = icon;
    }

    public String getIconContentType() {
        return iconContentType;
    }

    public Container iconContentType(String iconContentType) {
        this.iconContentType = iconContentType;
        return this;
    }

    public void setIconContentType(String iconContentType) {
        this.iconContentType = iconContentType;
    }

    public LocalDate getDeletedAt() {
        return deletedAt;
    }

    public Container deletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
        return this;
    }

    public void setDeletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Set<MeasureEntry> getMeasureEntries() {
        return measureEntries;
    }

    public Container measureEntries(Set<MeasureEntry> measureEntries) {
        this.measureEntries = measureEntries;
        return this;
    }

    public Container addMeasureEntry(MeasureEntry measureEntry) {
        this.measureEntries.add(measureEntry);
        measureEntry.setContainer(this);
        return this;
    }

    public Container removeMeasureEntry(MeasureEntry measureEntry) {
        this.measureEntries.remove(measureEntry);
        measureEntry.setContainer(null);
        return this;
    }

    public void setMeasureEntries(Set<MeasureEntry> measureEntries) {
        this.measureEntries = measureEntries;
    }

    public Set<MeasureEntry> getCurrentMeasures() {
        return currentMeasures;
    }

    public Container currentMeasures(Set<MeasureEntry> measureEntries) {
        this.currentMeasures = measureEntries;
        return this;
    }

    public Container addCurrentMeasures(MeasureEntry measureEntry) {
        this.currentMeasures.add(measureEntry);
        measureEntry.setCurrentContainer(this);
        return this;
    }

    public Container removeCurrentMeasures(MeasureEntry measureEntry) {
        this.currentMeasures.remove(measureEntry);
        measureEntry.setCurrentContainer(null);
        return this;
    }

    public void setCurrentMeasures(Set<MeasureEntry> measureEntries) {
        this.currentMeasures = measureEntries;
    }

    public Location getLocation() {
        return location;
    }

    public Container location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public ContainerType getContainerType() {
        return containerType;
    }

    public Container containerType(ContainerType containerType) {
        this.containerType = containerType;
        return this;
    }

    public void setContainerType(ContainerType containerType) {
        this.containerType = containerType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Container)) {
            return false;
        }
        return id != null && id.equals(((Container) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Container{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isAlwaysFull='" + isIsAlwaysFull() + "'" +
            ", currentAmountOfContent=" + getCurrentAmountOfContent() +
            ", capacity=" + getCapacity() +
            ", color='" + getColor() + "'" +
            ", orderNumber=" + getOrderNumber() +
            ", icon='" + getIcon() + "'" +
            ", iconContentType='" + getIconContentType() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            "}";
    }
}
