package com.bas.map.servlet;


import com.bas.map.service.FeatureService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.geojson.object.FeatureCollection;

/**
 * Servlet from button "Загрузить"
 */
@WebServlet("/map/LoadServlet")
public class LoadServlet extends HttpServlet {

    final static Logger logger = Logger.getLogger(LoadServlet.class);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        FeatureService featureService = new FeatureService();
        FeatureCollection featureCollection = new FeatureCollection(featureService.getAllFeaturesFromDB());
        ObjectMapper serializer = new ObjectMapper();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        try {
            String json = serializer.writeValueAsString(featureCollection);
            response.getWriter().write(json);
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
