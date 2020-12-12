package org.sm0x.tools.opencellarbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import org.sm0x.tools.opencellarbook.domain.enumeration.FillingEffect;

/**
 * A PossiblePTypesForFEffect.
 */
@Entity
@Table(name = "possibleptypes_forfeffect")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PossiblePTypesForFEffect implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "filling_effect")
    private FillingEffect fillingEffect;

    @ManyToOne
    @JsonIgnoreProperties(value = "possiblePTypesForFEffects", allowSetters = true)
    private MeasurePropertyType measurePropertyType;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FillingEffect getFillingEffect() {
        return fillingEffect;
    }

    public PossiblePTypesForFEffect fillingEffect(FillingEffect fillingEffect) {
        this.fillingEffect = fillingEffect;
        return this;
    }

    public void setFillingEffect(FillingEffect fillingEffect) {
        this.fillingEffect = fillingEffect;
    }

    public MeasurePropertyType getMeasurePropertyType() {
        return measurePropertyType;
    }

    public PossiblePTypesForFEffect measurePropertyType(MeasurePropertyType measurePropertyType) {
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
        if (!(o instanceof PossiblePTypesForFEffect)) {
            return false;
        }
        return id != null && id.equals(((PossiblePTypesForFEffect) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PossiblePTypesForFEffect{" +
            "id=" + getId() +
            ", fillingEffect='" + getFillingEffect() + "'" +
            "}";
    }
}
