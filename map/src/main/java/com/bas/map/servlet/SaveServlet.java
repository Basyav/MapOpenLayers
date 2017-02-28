package com.bas.map.servlet;

import com.bas.map.service.FeatureService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.geojson.geometry.Geometry;
import org.geojson.object.FeatureCollection;
import org.geojson.util.GeometryMixin;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet from button "Сохранить"
 */
@WebServlet("/map/SaveServlet")
public class SaveServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        StringBuilder json = new StringBuilder();
        String requestString;
        FeatureCollection featureCollection = new FeatureCollection();
        try {
            while ((requestString = request.getReader().readLine()) != null) {
                json.append(requestString);
            }
            ObjectMapper deserializer = new ObjectMapper();
            deserializer.addMixInAnnotations( Geometry.class, GeometryMixin.class);
            featureCollection = deserializer.readValue(json.toString(), FeatureCollection.class);
        }
        catch (IOException ex) {
            ex.printStackTrace();
        }
        FeatureService featureService = new FeatureService();
        featureService.createAllFeaturesToDB(featureCollection.getFeatures());
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        try {
            response.getWriter().write("SUCCESS");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
