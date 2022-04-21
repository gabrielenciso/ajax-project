var map;

function initMap() {

  var mapOptions = {
    center: { lat: 37.759960311146166, lng: -122.42706470323323 },
    zoom: 18,
    mapId: '2d5a995064aaf095',
    disableDefaultUI: true
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  google.maps.event.addListener(map, 'click', handleClickMap);
}

function handleClickMap(event) {
  if (data.marking === false) {
    return;
  }

  openEntry(event, map);
}

function makeMarker(location, map, iconUrl) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: iconUrl + '#custom-marker',
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
    }
  });

  // mapData.markersLocation.unshift(marker);
  // mapData.markerId++;
}

window.initMap = initMap;
