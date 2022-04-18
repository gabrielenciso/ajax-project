var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 33.65016435282003, lng: -117.83921394615153 },
    zoom: 18,
    mapId: '2d5a995064aaf095',
    disableDefaultUI: true
  });
}

window.initMap = initMap;
