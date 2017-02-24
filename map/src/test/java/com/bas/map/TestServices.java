package com.bas.map;


import com.bas.map.model.Coordinate;
import com.bas.map.model.Shape;
import com.bas.map.model.ShapeType;
import com.bas.map.service.ShapeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.geojson.geometry.Geometry;
import org.geojson.geometry.Point;
import org.geojson.object.Feature;
import org.geojson.object.FeatureCollection;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        coordinate1.setLongitude(11.11);
        coordinate1.setLatitude(-11.11);
        coordinate1.setMarkerNumber(1);
        coordinate1.setShape(shape);
        coordinate2.setLongitude(12.12);
        coordinate2.setLatitude(-12.12);
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

    @Test
    public void testParseShapesToGeoJSON() {
        List<Shape> shapes = shapeService.getAllShapes();
        Assert.assertNotNull(shapes);
        FeatureCollection featureCollection = new FeatureCollection();
        ObjectMapper objectMapper = new ObjectMapper();
        for (Shape shape : shapes) {
            Feature feature = new Feature();
            Map<String, Serializable> map = new HashMap<>();
            if (shape.getType().getName().equals("Point")) {
                Coordinate coordinate = shape.getCoordinates().get(0);
                Point point = new Point(coordinate.getLongitude(),coordinate.getLatitude());
                feature.setGeometry(point);
                map.put("name", shape.getName());
                map.put("desc", shape.getDescription());
                feature.setProperties(map);
                List<Feature> features = new ArrayList<>();
                features.add(feature);
                featureCollection.setFeatures(features);
                try {
                    String json = objectMapper.writeValueAsString(featureCollection);

                    System.out.println(json);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }

            }
//            System.out.println(shape);
        }
    }
}
