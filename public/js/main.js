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
            src: 'https://openlayers.org/en/v3.20.1/examples/data/icon.png'
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
    btnCursor.innerHTML = 'C';
    btnCursor.id = 'cursor';
    btnCursor.addEventListener('click', handleCursor, false);
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
    var shapes = document.createElement('div');
    shapes.className = 'manage-custom ol-unselectable ol-control';
    shapes.appendChild(btnCursor);
    shapes.appendChild(btnAddMarker);
    shapes.appendChild(btnAddPolyline);
    shapes.appendChild(btnAddPolygon);
    var shapesControl = new ol.control.Control({element: shapes});
    map.addControl(shapesControl);

    function createPopupEditForm() {
        var editPopup = document.getElementById('edit-popup');
        var labelShapeName = document.createElement('label');
        labelShapeName.innerHTML = 'Название';
        editPopup.appendChild(labelShapeName);
        var inputShapeName = document.createElement('input');
        inputShapeName.setAttribute('type', 'text');
        inputShapeName.setAttribute('id', 'shape-name');
        editPopup.appendChild(inputShapeName);
        var labelShapeDesc = document.createEventObject('label');
        labelShapeDesc.innerHTML = 'Описание';
        editPopup.appendChild(labelShapeDesc)
        var inputShapeDesc = document.createElement('input');
        inputShapeDesc.setAttribute('type', 'text');
        inputShapeDesc.setAttribute('id', 'shape-desc');
        editPopup.appendChild(inputShapeDesc);
    }

    function addInter() {
        draw = new ol.interaction.Draw({
            features: features,
            type: drawType
        });
        map.addInteraction(draw);
    }

    function handleCreateShape() {
        drawType = this.id;
        map.removeInteraction(draw);
        addInter();
    }

    function handleCursor() {
        map.removeInteraction(draw);

    }

    var popup = document.getElementById('edit-popup');
    map.on('click', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature) {
                return feature;
            });
        if (feature) {
            $('#map').modalBox();

        }
    });
}


