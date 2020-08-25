package org.sm0x.tools.opencellarbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MeasurePropertyType.
 */
@Entity
@Table(name = "measure_property_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MeasurePropertyType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "order_number")
    private Integer orderNumber;

    @OneToMany(mappedBy = "measurePropertyType")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<MeasurePropertyValue> measurePropertyValues = new HashSet<>();

    @OneToMany(mappedBy = "measurePropertyType")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<PossiblePTypesForMTypes> possiblePTypesForMTypes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "measurePropertyTypes", allowSetters = true)
    private UiType uiType;

    @ManyToMany(mappedBy = "measurePropertyTypes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<MeasurePropertyTypeGroup> measurePropertyTypeGroups = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public MeasurePropertyType type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public MeasurePropertyType orderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Set<MeasurePropertyValue> getMeasurePropertyValues() {
        return measurePropertyValues;
    }

    public MeasurePropertyType measurePropertyValues(Set<MeasurePropertyValue> measurePropertyValues) {
        this.measurePropertyValues = measurePropertyValues;
        return this;
    }

    public MeasurePropertyType addMeasurePropertyValue(MeasurePropertyValue measurePropertyValue) {
        this.measurePropertyValues.add(measurePropertyValue);
        measurePropertyValue.setMeasurePropertyType(this);
        return this;
    }

    public MeasurePropertyType removeMeasurePropertyValue(MeasurePropertyValue measurePropertyValue) {
        this.measurePropertyValues.remove(measurePropertyValue);
        measurePropertyValue.setMeasurePropertyType(null);
        return this;
    }

    public void setMeasurePropertyValues(Set<MeasurePropertyValue> measurePropertyValues) {
        this.measurePropertyValues = measurePropertyValues;
    }

    public Set<PossiblePTypesForMTypes> getPossiblePTypesForMTypes() {
        return possiblePTypesForMTypes;
    }

    public MeasurePropertyType possiblePTypesForMTypes(Set<PossiblePTypesForMTypes> possiblePTypesForMTypes) {
        this.possiblePTypesForMTypes = possiblePTypesForMTypes;
        return this;
    }

    public MeasurePropertyType addPossiblePTypesForMTypes(PossiblePTypesForMTypes possiblePTypesForMTypes) {
        this.possiblePTypesForMTypes.add(possiblePTypesForMTypes);
        possiblePTypesForMTypes.setMeasurePropertyType(this);
        return this;
    }

    public MeasurePropertyType removePossiblePTypesForMTypes(PossiblePTypesForMTypes possiblePTypesForMTypes) {
        this.possiblePTypesForMTypes.remove(possiblePTypesForMTypes);
        possiblePTypesForMTypes.setMeasurePropertyType(null);
        return this;
    }

    public void setPossiblePTypesForMTypes(Set<PossiblePTypesForMTypes> possiblePTypesForMTypes) {
        this.possiblePTypesForMTypes = possiblePTypesForMTypes;
    }

    public UiType getUiType() {
        return uiType;
    }

    public MeasurePropertyType uiType(UiType uiType) {
        this.uiType = uiType;
        return this;
    }

    public void setUiType(UiType uiType) {
        this.uiType = uiType;
    }

    public Set<MeasurePropertyTypeGroup> getMeasurePropertyTypeGroups() {
        return measurePropertyTypeGroups;
    }

    public MeasurePropertyType measurePropertyTypeGroups(Set<MeasurePropertyTypeGroup> measurePropertyTypeGroups) {
        this.measurePropertyTypeGroups = measurePropertyTypeGroups;
        return this;
    }

    public MeasurePropertyType addMeasurePropertyTypeGroup(MeasurePropertyTypeGroup measurePropertyTypeGroup) {
        this.measurePropertyTypeGroups.add(measurePropertyTypeGroup);
        measurePropertyTypeGroup.getMeasurePropertyTypes().add(this);
        return this;
    }

    public MeasurePropertyType removeMeasurePropertyTypeGroup(MeasurePropertyTypeGroup measurePropertyTypeGroup) {
        this.measurePropertyTypeGroups.remove(measurePropertyTypeGroup);
        measurePropertyTypeGroup.getMeasurePropertyTypes().remove(this);
        return this;
    }

    public void setMeasurePropertyTypeGroups(Set<MeasurePropertyTypeGroup> measurePropertyTypeGroups) {
        this.measurePropertyTypeGroups = measurePropertyTypeGroups;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeasurePropertyType)) {
            return false;
        }
        return id != null && id.equals(((MeasurePropertyType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MeasurePropertyType{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", orderNumber=" + getOrderNumber() +
            "}";
    }
}
