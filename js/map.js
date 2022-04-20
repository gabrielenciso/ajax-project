var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 33.65016435282003, lng: -117.83921394615153 },
    zoom: 18,
    mapId: '2d5a995064aaf095',
    disableDefaultUI: true
  });

  // add event listener whenever map is clicked
  // when clicked we want to log a new marker and appear a pop up
  // ^^ separate functions

  google.maps.event.addListener(map, 'click', function (event) {
    if (data.marking === false) {
      return;
    }
    addMarker(event.latLng, map);
    openEntry();
  });
}

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  mapData.markersLocation.unshift(marker);
  mapData.markerId++;
}

window.initMap = initMap;
