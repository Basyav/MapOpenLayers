package com.bas.map.mapper;

import com.bas.map.model.ShapeType;

/**
 * Mapper for ShapeType
 */
public interface ShapeTypeMapper {

    /**
     * Return type of shape by id
     * @param id - id shapetype
     * @return - shapetype
     */
    ShapeType getShapeTypeById(Integer id);
}
