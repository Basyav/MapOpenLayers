package com.bas.map.model;

/**
 * Coordinates of shape
 */
public class Coordinate {

    private Long id;
    private Float longitude;
    private Float latitude;
    private Shape shape;
    private Integer markerNumber;

    public Coordinate() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Shape getShape() {
        return shape;
    }

    public void setShape(Shape shape) {
        this.shape = shape;
    }

    public Integer getMarkerNumber() {
        return markerNumber;
    }

    public void setMarkerNumber(Integer markerNumber) {
        this.markerNumber = markerNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Coordinate that = (Coordinate) o;
        return getId().equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
