// var map;
// var autocomplete;
// function initMap() {

//   var mapOptions = {
//     center: { lat: 37.759960311146166, lng: -122.42706470323323 },
//     zoom: 18,
//     mapId: '2d5a995064aaf095',
//     disableDefaultUI: true
//   };

//   map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

//   if (map) {
//     setTimeout(function () {
//       var loading = document.querySelector('.lds-default');
//       loading.className = 'lds-default hidden';
//     }, 1000);
//   }

//   window.google.maps.event.addListener(map, 'click', handleClickMap);

//   autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),
//     {
//       types: ['establishment'],
//       componentRestrictions: { country: ['US'] },
//       fields: ['place_id', 'geometry', 'name']
//     });

// }

// function handleClickMap(event) {
//   if (data.marking === false) {
//     return;
//   }

//   openEntry(event, map);
// }

// var markers = [];
// function makeMarker(location, map, iconUrl, entryId) {
//   var marker = new window.google.maps.Marker({
//     position: location,
//     map: map,
//     icon: {
//       url: iconUrl + '#custom-marker',
//       scaledSize: new google.maps.Size(60, 60),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(0, 0)
//     }
//   });
//   window.google.maps.event.addListener(marker, 'click', clickMarker);
//   marker.setMap(map);

//   var markerWithId = {
//     marker: marker,
//     entryId: entryId
//   };
//   markers.push(markerWithId);
// }

// function deleteMarker(dataId) {
//   for (var i = 0; i < markers.length; i++) {
//     if (dataId === markers[i].entryId.toString()) {
//       markers[i].marker.setMap(null);
//     }
//   }
// }

// function clickMarker(event) {
//   for (var i = 0; i < markers.length; i++) {
//     if (event.latLng === markers[i].marker.position) {
//       focusEntry(markers[i].entryId);
//       map.setCenter(markers[i].marker.position);
//     }
//   }
// }

// function focusMarker(dataId) {
//   for (var i = 0; i < markers.length; i++) {
//     if (dataId === markers[i].entryId.toString()) {
//       map.setCenter(markers[i].marker.position);
//       map.setZoom(18);
//     }
//   }
// }

// window.initMap = initMap;
