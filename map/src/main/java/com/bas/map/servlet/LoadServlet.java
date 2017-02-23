package com.bas.map.servlet;

import com.bas.map.model.Shape;
import com.bas.map.service.ShapeService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.apache.log4j.Logger;

/**
 *
 */
@WebServlet("/map/LoadServlet")
public class LoadServlet extends HttpServlet {

    private static ShapeService shapeService;
    final static Logger logger = Logger.getLogger(LoadServlet.class);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        shapeService = new ShapeService();
        Shape shape = shapeService.getShapeById(2L);
        logger.info(shape);
    }
}
