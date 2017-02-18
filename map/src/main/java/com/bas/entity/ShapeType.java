package com.bas.entity;

/**
 * Types of shape
 */
public class ShapeType {

    private Integer id;
    private String name;

    public ShapeType() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShapeType shapeType = (ShapeType) o;
        return getId().equals(shapeType.getId());
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
