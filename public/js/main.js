window.onload = function() {


    var gDiv = document.getElementById('google-map');
    var gmap = new google.maps.Map(gDiv,{
        disableDefaultUI: true,
        keyboardShortcuts: false,
        draggable: false,
        disableDoubleClickZoom: true,
        scrollwheel: false,
        streetViewControl: false
    });

    var shapeStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: './resources/icon.png'
        }))
    });

    var features = new ol.Collection();
    var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector({features: features}),
        style: shapeStyle
    });

    var layerOSM = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var view = new ol.View({
        // center: ol.proj.fromLonLat([33.53, 44.62]),
        // zoom: 2,
        maxZoom: 21
    });

    var olDiv = document.getElementById('ol-map');

    var map = new ol.Map({
        target: olDiv,
        view: view
    });

    layerOSM.setMap(map);
    featureOverlay.setMap(map);

    view.on('change:center', function() {
        var center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
        gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
    });
    view.on('change:resolution', function() {
        gmap.setZoom(view.getZoom());
    });

    var drawType;
    var draw;
    var btnCursor = document.createElement('button');
    btnCursor.innerHTML = 'C';
    btnCursor.id = 'btn-cursor';
    btnCursor.addEventListener('click', handleModifyShape, false);
    var btnDelete = document.createElement('button');
    btnDelete.innerHTML = 'D';
    btnDelete. id = 'btn-delete';
    $(btnDelete).prop('disabled', true);
    btnDelete.addEventListener('click', handleDeleteShape, false);
    var btnAddMarker = document.createElement('button');
    btnAddMarker.innerHTML = 'M';
    btnAddMarker.id = 'Point';
    btnAddMarker.addEventListener('click', handleCreateShape, false);
    var btnAddPolyline = document.createElement('button');
    btnAddPolyline.id = 'LineString';
    btnAddPolyline.innerHTML = 'L';
    btnAddPolyline.addEventListener('click', handleCreateShape, false);
    var btnAddPolygon = document.createElement('button');
    btnAddPolygon.id = 'Polygon';
    btnAddPolygon.innerHTML = 'P';
    btnAddPolygon.addEventListener('click', handleCreateShape, false);
    var managerShapes = document.createElement('div');
    managerShapes.className = 'manage-custom ol-unselectable ol-control';
    managerShapes.appendChild(btnCursor);
    managerShapes.appendChild(btnDelete);
    managerShapes.appendChild(btnAddMarker);
    managerShapes.appendChild(btnAddPolyline);
    managerShapes.appendChild(btnAddPolygon);
    var managerShapesControl = new ol.control.Control({element: managerShapes});
    map.addControl(managerShapesControl);
    view.setCenter([33.53, 44.62]);
    view.setZoom(2);
    layerOSM.setVisible(false);
    olDiv.parentNode.removeChild(olDiv);
    gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olDiv);

    var layerSelect = document.getElementById('layer-select');
    layerSelect.addEventListener('change', changeLayer);

    function changeLayer() {
        if (layerSelect.value === 'google') {
            olDiv.parentNode.appendChild(gDiv);
            olDiv.parentNode.removeChild(olDiv);
            gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olDiv);
            layerOSM.setVisible(false);
            map.render();
        }
        else {
            gmap.controls[google.maps.ControlPosition.TOP_LEFT].clear();
            gDiv.parentNode.appendChild(olDiv);
            $('#ol-map').css({
              'position':'relative'
            });
            gDiv.parentNode.removeChild(gDiv);
            layerOSM.setVisible(true);
            map.render();
        }
    }

    function addInter() {
        draw = new ol.interaction.Draw({
            features: features,
            type: drawType
        });
        map.addInteraction(draw);
        draw.on('drawend', function(event) {
            var feature = event.feature;
            feature.name = '';
            feature.desc = '';
            createModalBox(feature, function(state) {
                if (state === false) {
                    featureOverlay.getSource().removeFeature(feature);
                }
            });
        });
    }

    var selectInteraction;
    var modify;

    function handleCreateShape() {
        drawType = this.id;
        map.removeInteraction(draw);
        map.removeInteraction(selectInteraction);
        map.removeInteraction(modify);
        addInter();
    }

    function handleModifyShape() {
        map.removeInteraction(draw);
        selectInteraction = new ol.interaction.Select();
        modify = new ol.interaction.Modify({
            features: selectInteraction.getFeatures()
        });
        map.addInteraction(selectInteraction);
        map.addInteraction(modify);
        selectInteraction.on('select', function(event) {
            $(btnDelete).prop('disabled', false);
            console.log(event.selected);
        });
    }

    function handleDeleteShape() {
        featureOverlay.getSource().removeFeature(selectInteraction.getFeatures().item(0));
        map.removeInteraction(selectInteraction);
        $(btnDelete).prop('disabled', true);
    }
}


