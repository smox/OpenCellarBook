package org.sm0x.tools.opencellarbook.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import org.sm0x.tools.opencellarbook.domain.enumeration.UiElement;

/**
 * A UiType.
 */
@Entity
@Table(name = "ui_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UiType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "element")
    private UiElement element;

    @Column(name = "expression")
    private String expression;

    @OneToMany(mappedBy = "uiType")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
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

    public UiType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UiElement getElement() {
        return element;
    }

    public UiType element(UiElement element) {
        this.element = element;
        return this;
    }

    public void setElement(UiElement element) {
        this.element = element;
    }

    public String getExpression() {
        return expression;
    }

    public UiType expression(String expression) {
        this.expression = expression;
        return this;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public Set<MeasurePropertyType> getMeasurePropertyTypes() {
        return measurePropertyTypes;
    }

    public UiType measurePropertyTypes(Set<MeasurePropertyType> measurePropertyTypes) {
        this.measurePropertyTypes = measurePropertyTypes;
        return this;
    }

    public UiType addMeasurePropertyType(MeasurePropertyType measurePropertyType) {
        this.measurePropertyTypes.add(measurePropertyType);
        measurePropertyType.setUiType(this);
        return this;
    }

    public UiType removeMeasurePropertyType(MeasurePropertyType measurePropertyType) {
        this.measurePropertyTypes.remove(measurePropertyType);
        measurePropertyType.setUiType(null);
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
        if (!(o instanceof UiType)) {
            return false;
        }
        return id != null && id.equals(((UiType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UiType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", element='" + getElement() + "'" +
            ", expression='" + getExpression() + "'" +
            "}";
    }
}
