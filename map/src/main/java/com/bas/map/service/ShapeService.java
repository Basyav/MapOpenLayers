package com.bas.map.service;

import com.bas.map.mapper.CoordinateMapper;
import com.bas.map.mapper.ShapeMapper;
import com.bas.map.model.Coordinate;
import com.bas.map.model.Shape;
import com.bas.map.util.MyBatisUtil;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

public class ShapeService {

    public Shape getShapeById(Long id) {
        SqlSession session = MyBatisUtil.getSessionFactory().openSession();
        try {
            ShapeMapper shapeMapper = session.getMapper(ShapeMapper.class);
            return shapeMapper.getShapeById(id);
        }
        finally {
            session.close();
        }
    }

    /**
     * Return all shapes of map
     * @return list of shapes
     */
    public List<Shape> getAllShapes() {
        SqlSession session = MyBatisUtil.getSessionFactory().openSession();
        try {
            ShapeMapper shapeMapper = session.getMapper(ShapeMapper.class);
            return shapeMapper.getAllShapes();
        }
        finally {
            session.close();
        }
    }

    public void createShape(Shape shape) {
        SqlSession session = MyBatisUtil.getSessionFactory().openSession();
        try {
            ShapeMapper shapeMapper = session.getMapper(ShapeMapper.class);
            shapeMapper.insertShape(shape);
            session.commit();
        }
        finally {
            session.close();
        }
    }

    public void createShapeWithCoordinates(Shape shape) {
        SqlSession session = MyBatisUtil.getSessionFactory().openSession(true);
        try {
            ShapeMapper shapeMapper = session.getMapper(ShapeMapper.class);
            shapeMapper.insertShape(shape);
            CoordinateMapper coordinateMapper = session.getMapper(CoordinateMapper.class);
            coordinateMapper.InsertListOfCoordinates(shape.getCoordinates());
        }
        finally {
            session.close();
        }
    }
}
