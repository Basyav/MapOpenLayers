package com.bas.map.model;

/**
 * Shapes for map objects
 */
public class Shape {

    private Long id;
    private ShapeType type;
    private String name;
    private String description;

    public Shape() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ShapeType getType() {
        return type;
    }

    public void setType(ShapeType type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Shape shape = (Shape) o;
        return getId().equals(shape.getId());
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
