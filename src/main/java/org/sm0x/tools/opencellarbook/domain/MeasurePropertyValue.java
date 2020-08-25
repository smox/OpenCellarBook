package org.sm0x.tools.opencellarbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A MeasurePropertyValue.
 */
@Entity
@Table(name = "measure_property_value")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MeasurePropertyValue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "value")
    private String value;

    @ManyToOne
    @JsonIgnoreProperties(value = "measurePropertyValues", allowSetters = true)
    private MeasurePropertyType measurePropertyType;

    @ManyToOne
    @JsonIgnoreProperties(value = "measurePropertyValues", allowSetters = true)
    private MeasureEntry measureEntry;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public MeasurePropertyValue value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public MeasurePropertyType getMeasurePropertyType() {
        return measurePropertyType;
    }

    public MeasurePropertyValue measurePropertyType(MeasurePropertyType measurePropertyType) {
        this.measurePropertyType = measurePropertyType;
        return this;
    }

    public void setMeasurePropertyType(MeasurePropertyType measurePropertyType) {
        this.measurePropertyType = measurePropertyType;
    }

    public MeasureEntry getMeasureEntry() {
        return measureEntry;
    }

    public MeasurePropertyValue measureEntry(MeasureEntry measureEntry) {
        this.measureEntry = measureEntry;
        return this;
    }

    public void setMeasureEntry(MeasureEntry measureEntry) {
        this.measureEntry = measureEntry;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeasurePropertyValue)) {
            return false;
        }
        return id != null && id.equals(((MeasurePropertyValue) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MeasurePropertyValue{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
