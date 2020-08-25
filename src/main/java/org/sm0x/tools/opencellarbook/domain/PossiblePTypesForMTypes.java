package org.sm0x.tools.opencellarbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PossiblePTypesForMTypes.
 */
@Entity
@Table(name = "possible_p_types_for_m_types")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PossiblePTypesForMTypes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "possiblePTypesForMTypes", allowSetters = true)
    private MeasureType measureType;

    @ManyToOne
    @JsonIgnoreProperties(value = "possiblePTypesForMTypes", allowSetters = true)
    private MeasurePropertyType measurePropertyType;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MeasureType getMeasureType() {
        return measureType;
    }

    public PossiblePTypesForMTypes measureType(MeasureType measureType) {
        this.measureType = measureType;
        return this;
    }

    public void setMeasureType(MeasureType measureType) {
        this.measureType = measureType;
    }

    public MeasurePropertyType getMeasurePropertyType() {
        return measurePropertyType;
    }

    public PossiblePTypesForMTypes measurePropertyType(MeasurePropertyType measurePropertyType) {
        this.measurePropertyType = measurePropertyType;
        return this;
    }

    public void setMeasurePropertyType(MeasurePropertyType measurePropertyType) {
        this.measurePropertyType = measurePropertyType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PossiblePTypesForMTypes)) {
            return false;
        }
        return id != null && id.equals(((PossiblePTypesForMTypes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PossiblePTypesForMTypes{" +
            "id=" + getId() +
            "}";
    }
}
