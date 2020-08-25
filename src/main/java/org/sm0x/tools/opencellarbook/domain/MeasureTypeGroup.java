package org.sm0x.tools.opencellarbook.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MeasureTypeGroup.
 */
@Entity
@Table(name = "measure_type_group")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MeasureTypeGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "measure_type_group_measure_type",
               joinColumns = @JoinColumn(name = "measure_type_group_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "measure_type_id", referencedColumnName = "id"))
    private Set<MeasureType> measureTypes = new HashSet<>();

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

    public MeasureTypeGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<MeasureType> getMeasureTypes() {
        return measureTypes;
    }

    public MeasureTypeGroup measureTypes(Set<MeasureType> measureTypes) {
        this.measureTypes = measureTypes;
        return this;
    }

    public MeasureTypeGroup addMeasureType(MeasureType measureType) {
        this.measureTypes.add(measureType);
        measureType.getMeasureTypeGroups().add(this);
        return this;
    }

    public MeasureTypeGroup removeMeasureType(MeasureType measureType) {
        this.measureTypes.remove(measureType);
        measureType.getMeasureTypeGroups().remove(this);
        return this;
    }

    public void setMeasureTypes(Set<MeasureType> measureTypes) {
        this.measureTypes = measureTypes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeasureTypeGroup)) {
            return false;
        }
        return id != null && id.equals(((MeasureTypeGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MeasureTypeGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
