package com.bas.map;


import com.bas.map.model.Coordinate;
import com.bas.map.model.Shape;
import com.bas.map.model.ShapeType;
import com.bas.map.service.ShapeService;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;
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

    @Test
    public void testCreateShapeWithCoordinates() {
        ShapeType shapeType = new ShapeType();
        shapeType.setId(2);
        shapeType.setName("LineString");
        Shape shape = new Shape();
        shape.setType(shapeType);
        shape.setName("line1");
        shape.setDescription("desc line1");
        Coordinate coordinate1 = new Coordinate();
        Coordinate coordinate2 = new Coordinate();
        coordinate1.setLongitude(11.11f);
        coordinate1.setLatitude(-11.11f);
        coordinate1.setMarkerNumber(1);
        coordinate1.setShape(shape);
        coordinate2.setLongitude(12.12f);
        coordinate2.setLatitude(-12.12f);
        coordinate2.setMarkerNumber(2);
        coordinate2.setShape(shape);
        List<Coordinate> coordinates = new ArrayList<>();
        coordinates.add(coordinate1);
        coordinates.add(coordinate2);
        shape.setCoordinates(coordinates);
        shapeService.createShape(shape);
        Assert.assertTrue(shape.getId() != 0);
        Shape createdShape = shapeService.getShapeById(shape.getId());
        Assert.assertEquals(shape, createdShape);
    }

    @Test
    public void testDeleteAllRecords() {
        shapeService.deleteAllShapes();
        List<Shape> shapes = shapeService.getAllShapes();
        Assert.assertTrue(shapes.isEmpty());
    }
}
