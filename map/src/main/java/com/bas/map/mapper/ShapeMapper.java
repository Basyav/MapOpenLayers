package com.bas.map.mapper;

import com.bas.map.model.Shape;
import com.bas.map.model.ShapeType;

import java.util.List;

/**
 * Mapper for Shape
 */
public interface ShapeMapper {

    Shape getShapeById(Long id);

    /**
     * Return all shapes
     * @return list of shapes
     */
    List<Shape> getAllShapes();

    void insertShape(Shape shape);

}
