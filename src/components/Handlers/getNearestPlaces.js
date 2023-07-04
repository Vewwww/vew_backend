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

  const havOfTheta = hav(dLat) + Math.cos(lat1) * Math.cos(lat2) * hav(dLon);

  const centralAngle = Math.acos(1 - 2 * havOfTheta);

  distance = R * centralAngle;
  return distance;
}

function merge(left, right) {
  const mergedArray = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i]._doc.distance <= right[j]._doc.distance) {
      mergedArray.push(left[i]);
      i++;
    } else {
      mergedArray.push(right[j]);
      j++;
    }
  }

  mergedArray.push(...left.slice(i));
  mergedArray.push(...right.slice(j));

  return mergedArray;
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  let middle = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, middle));
  let right = mergeSort(array.slice(middle));

  return merge(left, right);
}

exports.getNearestPlaces = (places, userLat, userLon) => {
  for (let i = 0; i < places.length; i++) {
    places[i]._doc.distance = calculateDistence(
      userLat,
      userLon,
      places[i]['location']['latitude'],
      places[i]['location']['longitude']
    );
  }

  places = mergeSort(places);

  if (places.length > 30) {
    places = places.slice(0, 30);
  }

  return places;
};
