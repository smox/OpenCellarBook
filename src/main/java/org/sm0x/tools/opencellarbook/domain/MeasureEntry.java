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
 * A MeasureEntry.
 */
@Entity
@Table(name = "measure_entry")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MeasureEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "realized_at")
    private LocalDate realizedAt;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "additional_information")
    private String additionalInformation;

    @Column(name = "deleted_at")
    private LocalDate deletedAt;

    @OneToMany(mappedBy = "measureEntry")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<MeasurePropertyValue> measurePropertyValues = new HashSet<>();

    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<MeasureEntry> children = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "measureEntries", allowSetters = true)
    private Container container;

    @ManyToOne
    @JsonIgnoreProperties(value = "currentMeasures", allowSetters = true)
    private Container currentContainer;

    @ManyToOne
    @JsonIgnoreProperties(value = "measureEntries", allowSetters = true)
    private MeasureType measureType;

    @ManyToOne
    @JsonIgnoreProperties(value = "children", allowSetters = true)
    private MeasureEntry parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getRealizedAt() {
        return realizedAt;
    }

    public MeasureEntry realizedAt(LocalDate realizedAt) {
        this.realizedAt = realizedAt;
        return this;
    }

    public void setRealizedAt(LocalDate realizedAt) {
        this.realizedAt = realizedAt;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public MeasureEntry createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getAdditionalInformation() {
        return additionalInformation;
    }

    public MeasureEntry additionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
        return this;
    }

    public void setAdditionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    public LocalDate getDeletedAt() {
        return deletedAt;
    }

    public MeasureEntry deletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
        return this;
    }

    public void setDeletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Set<MeasurePropertyValue> getMeasurePropertyValues() {
        return measurePropertyValues;
    }

    public MeasureEntry measurePropertyValues(Set<MeasurePropertyValue> measurePropertyValues) {
        this.measurePropertyValues = measurePropertyValues;
        return this;
    }

    public MeasureEntry addMeasurePropertyValue(MeasurePropertyValue measurePropertyValue) {
        this.measurePropertyValues.add(measurePropertyValue);
        measurePropertyValue.setMeasureEntry(this);
        return this;
    }

    public MeasureEntry removeMeasurePropertyValue(MeasurePropertyValue measurePropertyValue) {
        this.measurePropertyValues.remove(measurePropertyValue);
        measurePropertyValue.setMeasureEntry(null);
        return this;
    }

    public void setMeasurePropertyValues(Set<MeasurePropertyValue> measurePropertyValues) {
        this.measurePropertyValues = measurePropertyValues;
    }

    public Set<MeasureEntry> getChildren() {
        return children;
    }

    public MeasureEntry children(Set<MeasureEntry> measureEntries) {
        this.children = measureEntries;
        return this;
    }

    public MeasureEntry addChildren(MeasureEntry measureEntry) {
        this.children.add(measureEntry);
        measureEntry.setParent(this);
        return this;
    }

    public MeasureEntry removeChildren(MeasureEntry measureEntry) {
        this.children.remove(measureEntry);
        measureEntry.setParent(null);
        return this;
    }

    public void setChildren(Set<MeasureEntry> measureEntries) {
        this.children = measureEntries;
    }

    public Container getContainer() {
        return container;
    }

    public MeasureEntry container(Container container) {
        this.container = container;
        return this;
    }

    public void setContainer(Container container) {
        this.container = container;
    }

    public Container getCurrentContainer() {
        return currentContainer;
    }

    public MeasureEntry currentContainer(Container container) {
        this.currentContainer = container;
        return this;
    }

    public void setCurrentContainer(Container container) {
        this.currentContainer = container;
    }

    public MeasureType getMeasureType() {
        return measureType;
    }

    public MeasureEntry measureType(MeasureType measureType) {
        this.measureType = measureType;
        return this;
    }

    public void setMeasureType(MeasureType measureType) {
        this.measureType = measureType;
    }

    public MeasureEntry getParent() {
        return parent;
    }

    public MeasureEntry parent(MeasureEntry measureEntry) {
        this.parent = measureEntry;
        return this;
    }

    public void setParent(MeasureEntry measureEntry) {
        this.parent = measureEntry;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeasureEntry)) {
            return false;
        }
        return id != null && id.equals(((MeasureEntry) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MeasureEntry{" +
            "id=" + getId() +
            ", realizedAt='" + getRealizedAt() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", additionalInformation='" + getAdditionalInformation() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            "}";
    }
}
