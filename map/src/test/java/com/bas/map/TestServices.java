package com.bas.map;


import com.bas.map.model.Shape;
import com.bas.map.service.ShapeService;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.List;

public class TestServices {

    private static ShapeService shapeService;

    @BeforeClass
    public static void setup() {
        shapeService = new ShapeService();
    }

    @AfterClass
    public static void tearDown() {
        shapeService = null;
    }

    @Test
    public void testGetAllShapes() {
        List<Shape> shapes = shapeService.getAllShapes();
        Assert.assertNotNull(shapes);
        for (Shape shape : shapes) {
            System.out.println(shape);
        }
    }
}
