package com.bas.map.service;

import com.bas.map.mapper.ShapeMapper;
import com.bas.map.model.Shape;
import com.bas.map.util.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

public class ShapeService {

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
}
