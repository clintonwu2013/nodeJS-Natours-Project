/* eslint-disable*/

const locations = JSON.parse(document.getElementById("map").dataset.locations);
console.log(locations);
mapboxgl.accessToken =
  "pk.eyJ1IjoidGltb3d1IiwiYSI6ImNreGowbG9rNjBnMTYyeG81NGx0Zmh6dmQifQ.4qRV4KQxZ3z8yxvChotV-A";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/timowu/ckxj0v0vakaij14pgjddbpbc1"
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  const el = document.createElement("div");
  el.className = "marker";
  new mapboxgl.Marker({
    element: el,
    anchor: "bottom"
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  new mapboxgl.Popup({
    offSet: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<P>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds);
