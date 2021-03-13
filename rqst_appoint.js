var end_photo = document.getElementById("end_photo");


var newURL = location.href.split("?")[1];

if (newURL == "men1") {
  end_photo.style.backgroundImage = `url('./assets/image/maxresdefault.jpg')`;
} else if (newURL == "men2") {
  end_photo.style.backgroundImage = `url('./assets/image/82cc87f2ed862ee45d928c19046ee042d5eec0c9_2400x1800.jpg')`;
} else if (newURL == "men3") {
  end_photo.style.backgroundImage = `url('./assets/image/edward.jpg')`;
} else if (newURL == "men4") {
  end_photo.style.backgroundImage = `url('./assets/image/david.jpg')`;
}