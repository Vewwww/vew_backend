function degrees_to_radians(degrees) {
  return degrees * (Math.PI / 180);
}

function hav(theta) {
  return (1 - Math.cos(theta)) / 2;
}

function calculateDistence(lat1, lon1, lat2, lon2) {
  lat1 = degrees_to_radians(lat1);
  lon1 = degrees_to_radians(lon1);
  lat2 = degrees_to_radians(lat2);
  lon2 = degrees_to_radians(lon2);

  dLat = lat1 - lat2;
  dLon = lon1 - lon2;

  const R = 6371;
  //hav(theta) = (1-cons(theta)) /2

  //Haversin angle
  const havAngle = hav(dLat) + Math.cos(lat1) * Math.cos(lat2) * hav(dLon);
  const centralAngle =
    2 * Math.atan2(Math.sqrt(havAngle), Math.sqrt(1 - havAngle));
  distance = R * centralAngle;
  return distance;
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let temp = arr[i];
    while (j >= 0 && arr[j].distance > temp.distance) {

      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr;
}

exports.getNearestPlaces = (places, userLat, userLon) => {
  for (let i = 0; i < places.length; i++) {
    places[i].distance = calculateDistence(

      userLat,
      userLon,
      places[i]["location"]["latitude"],
      places[i]["location"]["longitude"]
    );
  }

  places = insertionSort(places);

  if (places.length > 50) {
    places = places.slice(0, 50);
  }

  return places;
};
