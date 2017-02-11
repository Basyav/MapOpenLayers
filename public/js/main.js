window.onload = function() {
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([33.53, 44.62]),
            zoom: 10
        })
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
            src: './resources/point-map.png'
        }))
    });
    var features = new ol.Collection();
    var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector({features: features}),
        style: shapeStyle
    });
    featureOverlay.setMap(map);
    var drawType;
    var draw;
    var btnCursor = document.createElement('button');
    btnCursor.id = 'btn-cursor';
    btnCursor.addEventListener('click', handleModifyShape, false);
    var imgBtnCursor = document.createElement('img');
    $(imgBtnCursor).attr({
        src: './resources/cursor.png',
        alt: 'C'
    });
    btnCursor.appendChild(imgBtnCursor);
    var btnDelete = document.createElement('button');
    btnDelete. id = 'btn-delete';
    $(btnDelete).prop('disabled', true);
    btnDelete.addEventListener('click', handleDeleteShape, false);
    var imgBtnDelete = document.createElement('img');
    $(imgBtnDelete).attr({
        src: './resources/delete.png',
        alt: 'R'
    });
    btnDelete.appendChild(imgBtnDelete);
    var btnAddMarker = document.createElement('button');
    btnAddMarker.id = 'Point';
    btnAddMarker.addEventListener('click', handleCreateShape, false);
    var imgBtnAddMarker = document.createElement('img');
    $(imgBtnAddMarker).attr({
        src: './resources/point.png',
        alt: 'M'
    });
    btnAddMarker.appendChild(imgBtnAddMarker);
    var btnAddPolyline = document.createElement('button');
    btnAddPolyline.id = 'LineString';
    btnAddPolyline.addEventListener('click', handleCreateShape, false);
    var imgBtnAddPolyline = document.createElement('img');
    $(imgBtnAddPolyline).attr({
        src: './resources/polyline.png',
        alt: 'L'
    });
    btnAddPolyline.appendChild(imgBtnAddPolyline)
    var btnAddPolygon = document.createElement('button');
    btnAddPolygon.id = 'Polygon';
    btnAddPolygon.addEventListener('click', handleCreateShape, false);
    var imgBtnAddPolygon = document.createElement('img');
    $(imgBtnAddPolygon).attr({
        src: './resources/polygon.png',
        alt: 'P'
    });
    btnAddPolygon.appendChild(imgBtnAddPolygon);
    var managerShapes = document.createElement('div');
    managerShapes.className = 'manage-custom ol-unselectable ol-control';
    managerShapes.appendChild(btnCursor);
    managerShapes.appendChild(btnDelete);
    managerShapes.appendChild(btnAddMarker);
    managerShapes.appendChild(btnAddPolyline);
    managerShapes.appendChild(btnAddPolygon);
    var managerShapesControl = new ol.control.Control({element: managerShapes});
    map.addControl(managerShapesControl);

    $('#btn-save').click(function() {
        var geojson  = new ol.format.GeoJSON();
        // console.log(geojson.writeFeaturesObject(features));
        for (var i = 0; i < features.getLength(); i++) {
            // console.log(features.item(i).name, features.item(i).getGeometry().getCoordinates());
            console.log(geojson.writeFeature(features.item(i)));
        }


    });

    $('#btn-load').click(function() {

    })

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
            // console.log(feature);
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


