package com.bas.map.mapper;

import com.bas.map.model.Shape;

import java.util.List;

/**
 * Mapper for Shape
 */
public interface ShapeMepper {

    /**
     *
     * @return list of shapes
     */
    List<Shape> getAllShapes();

}
