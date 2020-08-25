package org.sm0x.tools.opencellarbook.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A ContainerType.
 */
@Entity
@Table(name = "container_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ContainerType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "deleted_at")
    private LocalDate deletedAt;

    @Column(name = "color")
    private String color;

    @Column(name = "order_number")
    private Integer orderNumber;

    @Lob
    @Column(name = "icon")
    private byte[] icon;

    @Column(name = "icon_content_type")
    private String iconContentType;

    @OneToMany(mappedBy = "containerType")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Container> containers = new HashSet<>();

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

    public ContainerType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDeletedAt() {
        return deletedAt;
    }

    public ContainerType deletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
        return this;
    }

    public void setDeletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
    }

    public String getColor() {
        return color;
    }

    public ContainerType color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public ContainerType orderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public byte[] getIcon() {
        return icon;
    }

    public ContainerType icon(byte[] icon) {
        this.icon = icon;
        return this;
    }

    public void setIcon(byte[] icon) {
        this.icon = icon;
    }

    public String getIconContentType() {
        return iconContentType;
    }

    public ContainerType iconContentType(String iconContentType) {
        this.iconContentType = iconContentType;
        return this;
    }

    public void setIconContentType(String iconContentType) {
        this.iconContentType = iconContentType;
    }

    public Set<Container> getContainers() {
        return containers;
    }

    public ContainerType containers(Set<Container> containers) {
        this.containers = containers;
        return this;
    }

    public ContainerType addContainer(Container container) {
        this.containers.add(container);
        container.setContainerType(this);
        return this;
    }

    public ContainerType removeContainer(Container container) {
        this.containers.remove(container);
        container.setContainerType(null);
        return this;
    }

    public void setContainers(Set<Container> containers) {
        this.containers = containers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContainerType)) {
            return false;
        }
        return id != null && id.equals(((ContainerType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContainerType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            ", color='" + getColor() + "'" +
            ", orderNumber=" + getOrderNumber() +
            ", icon='" + getIcon() + "'" +
            ", iconContentType='" + getIconContentType() + "'" +
            "}";
    }
}
