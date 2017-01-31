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
    var features = new ol.Collection();
    var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector({features: features}),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });
    featureOverlay.setMap(map);
    var modify = new ol.interaction.Modify({
        features: features,
        // the SHIFT key must be pressed to delete vertices, so
        // that new vertices can be drawn at the same position
        // of existing vertices
        deleteCondition: function(event) {
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
        }
    });
    map.addInteraction(modify);
    var drawType;
    var draw;
    var btnCursor = document.createElement('button');
    btnCursor.innerHTML = 'C';
    // btnCursor.addEventListener('click', function() {
    //     draw = null;
    // }, false);
    var btnAddMarker = document.createElement('button');
    btnAddMarker.innerHTML = 'M';
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

    function addInter() {
        draw = new ol.interaction.Draw({
            features: features,
            type: drawType
        });
        map.addInteraction(draw);
    }

    function handleCreateShape() {
        drawType = this.id;
        if (draw !== undefined) {
            map.removeInteraction(draw);
        }
        addInter();
    }


}


