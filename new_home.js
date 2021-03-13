var item1 = document.getElementById("item1");
var item2 = document.getElementById("item2");
var item3 = document.getElementById("item3");
var item = document.getElementsByClassName("item");
var my_assessment = document.getElementById("my_assessment");
var newest = document.getElementById("newest");

var video_screen = document.getElementsByTagName("video");
var play_btn = document.getElementsByClassName("play_btn");
var video_screen_number = [];

console.log(video_screen);

for (let i = 0; i < video_screen.length; i++) {
  video_screen_number[i] = 0;
}

for (let i = 0; i < video_screen.length; i++) {
  play_btn[i].addEventListener("click", function () {
      if (video_screen_number[i] == 0) {
      video_screen[i].play();
      video_screen_number[i] = 1;
      } else {
      video_screen[i].pause();
      video_screen_number[i] = 0;
    }
  });
}

item1.addEventListener("click", function () {
  for (let i = 0; i < item.length; i++) {
    item[i].style.color = "grey";
    item[i].style.backgroundColor = "#F2F6FF";
  }
  newest.style.display = "none";
  my_assessment.style.display = "block";
  item1.style.color = "white";
  item1.style.backgroundColor = "#4A164B";
});

item2.addEventListener("click", function () {
  for (let i = 0; i < item.length; i++) {
    item[i].style.color = "grey";
    item[i].style.backgroundColor = "#F2F6FF";
  }
  newest.style.display = "block";
  my_assessment.style.display = "none";

  item2.style.color = "white";
  item2.style.backgroundColor = "#4A164B";
});
