package org.sm0x.tools.opencellarbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.sm0x.tools.opencellarbook.domain.enumeration.FillingEffect;

/**
 * A MeasureType.
 */
@Entity
@Table(name = "measure_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MeasureType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "filling_effect")
    private FillingEffect fillingEffect;

    @Column(name = "order_number")
    private Integer orderNumber;

    @Column(name = "color")
    private String color;

    @Lob
    @Column(name = "icon")
    private byte[] icon;

    @Column(name = "icon_content_type")
    private String iconContentType;

    @Column(name = "deleted_at")
    private LocalDate deletedAt;

    @OneToMany(mappedBy = "measureType")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<MeasureEntry> measureEntries = new HashSet<>();

    @OneToMany(mappedBy = "measureType")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<PossiblePTypesForMTypes> possiblePTypesForMTypes = new HashSet<>();

    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<MeasureType> children = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "children", allowSetters = true)
    private MeasureType parent;

    @ManyToMany(mappedBy = "measureTypes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<MeasureTypeGroup> measureTypeGroups = new HashSet<>();

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

    public MeasureType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FillingEffect getFillingEffect() {
        return fillingEffect;
    }

    public MeasureType fillingEffect(FillingEffect fillingEffect) {
        this.fillingEffect = fillingEffect;
        return this;
    }

    public void setFillingEffect(FillingEffect fillingEffect) {
        this.fillingEffect = fillingEffect;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public MeasureType orderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getColor() {
        return color;
    }

    public MeasureType color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public byte[] getIcon() {
        return icon;
    }

    public MeasureType icon(byte[] icon) {
        this.icon = icon;
        return this;
    }

    public void setIcon(byte[] icon) {
        this.icon = icon;
    }

    public String getIconContentType() {
        return iconContentType;
    }

    public MeasureType iconContentType(String iconContentType) {
        this.iconContentType = iconContentType;
        return this;
    }

    public void setIconContentType(String iconContentType) {
        this.iconContentType = iconContentType;
    }

    public LocalDate getDeletedAt() {
        return deletedAt;
    }

    public MeasureType deletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
        return this;
    }

    public void setDeletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Set<MeasureEntry> getMeasureEntries() {
        return measureEntries;
    }

    public MeasureType measureEntries(Set<MeasureEntry> measureEntries) {
        this.measureEntries = measureEntries;
        return this;
    }

    public MeasureType addMeasureEntry(MeasureEntry measureEntry) {
        this.measureEntries.add(measureEntry);
        measureEntry.setMeasureType(this);
        return this;
    }

    public MeasureType removeMeasureEntry(MeasureEntry measureEntry) {
        this.measureEntries.remove(measureEntry);
        measureEntry.setMeasureType(null);
        return this;
    }

    public void setMeasureEntries(Set<MeasureEntry> measureEntries) {
        this.measureEntries = measureEntries;
    }

    public Set<PossiblePTypesForMTypes> getPossiblePTypesForMTypes() {
        return possiblePTypesForMTypes;
    }

    public MeasureType possiblePTypesForMTypes(Set<PossiblePTypesForMTypes> possiblePTypesForMTypes) {
        this.possiblePTypesForMTypes = possiblePTypesForMTypes;
        return this;
    }

    public MeasureType addPossiblePTypesForMTypes(PossiblePTypesForMTypes possiblePTypesForMTypes) {
        this.possiblePTypesForMTypes.add(possiblePTypesForMTypes);
        possiblePTypesForMTypes.setMeasureType(this);
        return this;
    }

    public MeasureType removePossiblePTypesForMTypes(PossiblePTypesForMTypes possiblePTypesForMTypes) {
        this.possiblePTypesForMTypes.remove(possiblePTypesForMTypes);
        possiblePTypesForMTypes.setMeasureType(null);
        return this;
    }

    public void setPossiblePTypesForMTypes(Set<PossiblePTypesForMTypes> possiblePTypesForMTypes) {
        this.possiblePTypesForMTypes = possiblePTypesForMTypes;
    }

    public Set<MeasureType> getChildren() {
        return children;
    }

    public MeasureType children(Set<MeasureType> measureTypes) {
        this.children = measureTypes;
        return this;
    }

    public MeasureType addChildren(MeasureType measureType) {
        this.children.add(measureType);
        measureType.setParent(this);
        return this;
    }

    public MeasureType removeChildren(MeasureType measureType) {
        this.children.remove(measureType);
        measureType.setParent(null);
        return this;
    }

    public void setChildren(Set<MeasureType> measureTypes) {
        this.children = measureTypes;
    }

    public MeasureType getParent() {
        return parent;
    }

    public MeasureType parent(MeasureType measureType) {
        this.parent = measureType;
        return this;
    }

    public void setParent(MeasureType measureType) {
        this.parent = measureType;
    }

    public Set<MeasureTypeGroup> getMeasureTypeGroups() {
        return measureTypeGroups;
    }

    public MeasureType measureTypeGroups(Set<MeasureTypeGroup> measureTypeGroups) {
        this.measureTypeGroups = measureTypeGroups;
        return this;
    }

    public MeasureType addMeasureTypeGroup(MeasureTypeGroup measureTypeGroup) {
        this.measureTypeGroups.add(measureTypeGroup);
        measureTypeGroup.getMeasureTypes().add(this);
        return this;
    }

    public MeasureType removeMeasureTypeGroup(MeasureTypeGroup measureTypeGroup) {
        this.measureTypeGroups.remove(measureTypeGroup);
        measureTypeGroup.getMeasureTypes().remove(this);
        return this;
    }

    public void setMeasureTypeGroups(Set<MeasureTypeGroup> measureTypeGroups) {
        this.measureTypeGroups = measureTypeGroups;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeasureType)) {
            return false;
        }
        return id != null && id.equals(((MeasureType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MeasureType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fillingEffect='" + getFillingEffect() + "'" +
            ", orderNumber=" + getOrderNumber() +
            ", color='" + getColor() + "'" +
            ", icon='" + getIcon() + "'" +
            ", iconContentType='" + getIconContentType() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            "}";
    }
}
