package org.sm0x.tools.opencellarbook.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MeasurePropertyTypeGroup.
 */
@Entity
@Table(name = "measure_property_type_group")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MeasurePropertyTypeGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "measure_property_type_group_measure_property_type",
               joinColumns = @JoinColumn(name = "measure_property_type_group_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "measure_property_type_id", referencedColumnName = "id"))
    private Set<MeasurePropertyType> measurePropertyTypes = new HashSet<>();

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

    public MeasurePropertyTypeGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<MeasurePropertyType> getMeasurePropertyTypes() {
        return measurePropertyTypes;
    }

    public MeasurePropertyTypeGroup measurePropertyTypes(Set<MeasurePropertyType> measurePropertyTypes) {
        this.measurePropertyTypes = measurePropertyTypes;
        return this;
    }

    public MeasurePropertyTypeGroup addMeasurePropertyType(MeasurePropertyType measurePropertyType) {
        this.measurePropertyTypes.add(measurePropertyType);
        measurePropertyType.getMeasurePropertyTypeGroups().add(this);
        return this;
    }

    public MeasurePropertyTypeGroup removeMeasurePropertyType(MeasurePropertyType measurePropertyType) {
        this.measurePropertyTypes.remove(measurePropertyType);
        measurePropertyType.getMeasurePropertyTypeGroups().remove(this);
        return this;
    }

    public void setMeasurePropertyTypes(Set<MeasurePropertyType> measurePropertyTypes) {
        this.measurePropertyTypes = measurePropertyTypes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeasurePropertyTypeGroup)) {
            return false;
        }
        return id != null && id.equals(((MeasurePropertyTypeGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MeasurePropertyTypeGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
