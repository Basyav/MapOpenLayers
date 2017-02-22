package com.bas.map.mapper;

import com.bas.map.model.Coordinate;

import java.util.List;

/**
 * Mapper for Coordinate
 */
public interface CoordinateMapper {

    /**
     * Returns coordinate by id
     * @param id  id coordinate
     * @return  coordinate
     */
    Coordinate getCoordinateById(Long id);

    /**
     * Returns coordinates of certain shape
     * @param shapeId id shape
     * @return list of coordinates of shape
     */
    List<Coordinate> getCoordinateByShapeId(Long shapeId);

    void InsertListOfCoordinates(List<Coordinate> coordinates);
}
