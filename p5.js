// $(document).ready(function () {
var body_per = document.getElementById("body-per");
var facial = document.getElementById("facial-per");
var lang = document.getElementById("lang-per");
var voice = document.getElementById("voice-per");
var presence = document.getElementById("persence-per");

anychart.licenseKey("princetonhive.com-357acb83-f03ddbb2");
var queryParam = getQueryParams();
var showvalue1 = document.getElementById("valueShow");
var novideo = document.getElementById("novideo");

if (!queryParam) {
  showvalue1.style.display = "none";
  novideo.style.display = "block";
  // return;
}
var api =
  `https://kong.princetonhive.com/pythonm/index` +
  `?email=${queryParam.email}&courseid=${queryParam.courseid}&chapterid=${queryParam.chapterid}&eventid=${queryParam.eventid}`;
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", api, false);
xmlHttp.send();

// Parsing resonse from the api`
var response = JSON.parse(xmlHttp.response);
console.log(response);
var showvalue = document.getElementById("valueShow");

if (response == "Please refresh the page!") {
  showvalue.style.display = "none";
  novideo.style.display = "block";
  document.getElementById("display_text_for_empty_page").innerHTML =
    "You haven't uploaded the video yet!";
} else if (response == "There is a technical error!") {
  showvalue.style.display = "none";
  novideo.style.display = "block";
  document.getElementById("display_text_for_empty_page").innerHTML =
    "Please check after few minutes!";
} else if (response == "Wrong value passed") {
  showvalue.style.display = "none";
  novideo.style.display = "block";
  document.getElementById("display_text_for_empty_page").innerHTML =
    "Set your parameters properly!";
} else {
  showvalue.style.display = "block";
  novideo.style.display = "none";
}

///////////////////////////////////////////////////////////////////////////////////

// summary text fill
document.getElementById("headingofSummary").innerHTML =
  response.recommend_latest.heading;

anychart.onDocumentReady(function () {
  anychart.licenseKey("princetonhive.com-357acb83-f03ddbb2");

  // create data
  var data = [
    ["Laugh", 50],
    ["Neutral", 60],
    ["Emotion", 35],
    ["Expressiveness", 50],
    ["Grammar", 50],
    ["Filler words", 90],
    ["Foul Words", 80],
    ["Sentiment", 95],
    ["Pause", 80],
    ["Energy", 80],
  ];
  ///////////////////////////////////////WPA/////////////////////////////////////////////////

  loadfrequentwordchart(response.words.most_frequent_words);
  loadwordperminchart(Math.ceil(response.word_per_minute.word_per_minute));
  ALlScore(response.allscorechart);
  loadfillerwordchart(response.words.filler_words_list);
  sentimentOverTimeChart(response.sentimentovertime);
  if (response.level == "beginner") {
    document.getElementById("performance_top1").style.fontSize = "20px";
    document.getElementById("performance_top1").style.color = "#401f47";
    document.getElementById("performance_top1").style.position = "relative";
    document.getElementById("performance_top1").style.top = "-5px";
  } else if (response.level == "intermediate") {
    document.getElementById("performance_top2").style.fontSize = "20px";
    document.getElementById("performance_top2").style.color = "#401f47";
    document.getElementById("performance_top2").style.position = "relative";
    document.getElementById("performance_top2").style.top = "-5px";
  } else {
    document.getElementById("performance_top3").style.fontSize = "20px";
    document.getElementById("performance_top3").style.color = "#401f47";
    document.getElementById("performance_top3").style.position = "relative";
    document.getElementById("performance_top3").style.top = "-5px";
  }

  if (response.words.sentiment_check == "negative") {
    document.getElementById("sentimenttxt1").innerHTML = "negative";
  } else if (response.words.sentiment_check == "somewhat negative") {
    document.getElementById("sentimenttxt1").innerHTML = "less negative";
  } else if (response.words.sentiment_check == "neutral") {
    document.getElementById("sentimenttxt1").innerHTML = "neutral";
  } else if (response.words.sentiment_check == "somewhat positive") {
    document.getElementById("sentimenttxt1").innerHTML = "less positive";
  } else if (response.words.sentiment_check == "positive") {
    document.getElementById("sentimenttxt1").innerHTML = "positive";
  }

  document.getElementById("userscore").innerHTML =
    Math.ceil(response.user_earned_score) + "%";
  document.getElementById("useremail").innerHTML = response.userinfo.email;
  document.getElementById("userversion").innerHTML = response.userinfo.version;

  document.getElementById("summary_img").style.backgroundImage =
    response.hero_img.hero_img == null
      ? `url('./p5report/images/unnamed.jpg')`
      : `url(${response.hero_img.hero_img})`;

  document.getElementById("faceimg").src =
    response.personalityTransform.face_image[1] == null
      ? (document.getElementById(
          "faceA"
        ).innerHTML = `<div style="color:white; margin-left: -44px; margin-top: -28px;"> N/A</div>`)
      : response.personalityTransform.face_image[1];
  document.getElementById("presenceimg").src =
    response.personalityTransform.presence_image[1] == null
      ? (document.getElementById(
          "presenceA"
        ).innerHTML = `<div style="color:white; margin-left: -44px; margin-top: -28px;"> N/A</div>`)
      : response.personalityTransform.presence_image[1];
  document.getElementById("voiceimg").src =
    response.personalityTransform.voice_image[1] == null
      ? (document.getElementById(
          "voiceA"
        ).innerHTML = `<div style="color:white; margin-left: -44px; margin-top: -28px;"> N/A</div>`)
      : response.personalityTransform.voice_image[1];
  document.getElementById("bodyimg").src =
    response.personalityTransform.body_image[1] == null
      ? (document.getElementById(
          "bodyA"
        ).innerHTML = `<div style="color:white; margin-left: -44px; margin-top: -28px;"> N/A</div>`)
      : response.personalityTransform.body_image[1];

  document.getElementById("celeb_content1").innerHTML =
    response.personalityTransform.body_image[2];
  document.getElementById("celeb_content2").innerHTML =
    response.personalityTransform.face_image[2];
  document.getElementById("celeb_content3").innerHTML =
    response.personalityTransform.presence_image[2];
  document.getElementById("celeb_content4").innerHTML =
    response.personalityTransform.voice_image[2];

  if (response.voice.emotion_voice == "happy") {
    document.getElementById("voiceemotiontext1").innerHTML = "positive";
  } else {
    document.getElementById("voiceemotiontext1").innerHTML =
      response.voice.emotion_voice;
  }

  document.getElementById("wiki_link1").href =
    response.personalityTransform.body_image[3];
  document.getElementById("wiki_link2").href =
    response.personalityTransform.face_image[3];
  document.getElementById("wiki_link3").href =
    response.personalityTransform.presence_image[3];
  document.getElementById("wiki_link4").href =
    response.personalityTransform.voice_image[3];

  document.getElementById("celeb_name1").innerHTML =
    response.personalityTransform.body_image[0];
  document.getElementById("celeb_name2").innerHTML =
    response.personalityTransform.face_image[0];
  document.getElementById("celeb_name3").innerHTML =
    response.personalityTransform.presence_image[0];
  document.getElementById("celeb_name4").innerHTML =
    response.personalityTransform.voice_image[0];


////////////////////////////////////





//dynamicModule(response.comparative_chart);

function colorrange(input) {
  if (input > 80 && input <= 100) {
    inner = "#7ab733";
    outer = "#4a701e";
    imgUrl = "./p5report/images/100.png";
  } else if (input > 60 && input <= 80) {
    inner = "#d7ec21";
    outer = "#97a32c";
    imgUrl = "./p5report/images/60-removebg-preview.png";
  } else if (input > 40 && input <= 60) {
    inner = "#ffbf00";
    outer = "#b09030";
    imgUrl = "./p5report/images/40-removebg-preview.png";
  } else if (input > 20 && input <= 40) {
    inner = "#ff7f27";
    outer = "#ad4d00";
    imgUrl = "./p5report/images/20-removebg-preview.png";
  } else {
    inner = "#d13e19";
    outer = "#633a1a";
    imgUrl = "./p5report/images/0-removebg-preview.png";
  }
  return { inner, outer, imgUrl };
}

function ReportSummary() {
  bp = Math.round(
    (response.totalscore.bodylanguage * 100) / response.weightage.bodylanguage
  );
  vp = Math.round(
    (response.totalscore.Voicetotal * 100) / response.weightage.voice
  );
  wp = Math.round(
    (response.totalscore.Wordstotal * 100) / response.weightage.words
  );
  fp = Math.round(
    (response.totalscore.facetotal * 100) / response.weightage.facialexpression
  );
  cpercent = response.confidence.confidence_percentage;

  document.getElementById("body-per").innerHTML = bp + "%";
  document.getElementById("facial-per").innerHTML = fp + "%";
  document.getElementById("lang-per").innerHTML = wp + "%";
  document.getElementById("voice-per").innerHTML = vp + "%";
  document.getElementById("presence-per").innerHTML = cpercent + "%";

  // code for description----------------->
  var body_description,
    face_description,
    presence_description,
    voice_description,
    total_closing;
  if (bp < 60) {
    body_description =
      "Confident body language is also important for a good presenter. Pay careful attention to ensure that you convey messages about your credibility, confidence and power. ";
  } else if (bp < 70) {
    body_description =
      "Your body language is beginning to seem comfortable. Ensure it conveys the message you want to send and you are radiating confidence and power. ";
  } else if (bp < 80) {
    body_description =
      "Your body language seems somewhat comfortable, you are demonstrating confident body postures. ";
  } else {
    body_description =
      "You are very comfortable in your body language, you are beginning to radiate confidence and power. ";
  }

  if (fp < 60) {
    face_description =
      "It is important that you hold eye contact with the audience. As you engage them, use more appropriate facial expressions. ";
  } else if (fp < 70) {
    face_description =
      "As a communicator it is important that you always engage your audience with eye contact. Your facial expressions need to match your voice. ";
  } else if (fp < 80) {
    face_description =
      "Most of the time you were able to engage in appropriate eye contact, and your facial expressions had some connection to your message. ";
  } else {
    face_description =
      "Your engaging eye contact combined with your expressive facial expression is consistent with the message of your words. ";
  }

  if (vp < 60) {
    voice_description =
      "Be open to the feedback in this report - it is intended to help you make positive changes. View this as an opportunity to work on becoming a powerful communicator! <br/> Pay attention to the expression of your voice. It should communicate meaning through volume, and natural pauses. ";
  } else if (vp < 70) {
    voice_description =
      "Be open to the feedback in this report - it is intended to help you make positive changes. View this an opportunity to work on becoming a powerful communicator! <br/>Pay attention to the expression and volume of your voice. It should communicate meaning through the volume, and natural pauses. ";
  } else if (vp < 80) {
    voice_description =
      "Be open to the feedback in this report - it is intended to help you make positive changes. View this an opportunity to work on becoming a powerful communicator! <br/>Your voice conveys some of the meaning and expressions when communicating. ";
  } else {
    voice_description =
      "Be open to the feedback in this report - it is intended to help you make positive changes. View this an opportunity to work on becoming a powerful communicator! <br/>Your voice conveys a lot of meaning and expressions when communicating. ";
  }

  if (cpercent < 60) {
    presence_description =
      "You still have some work to do. Your presentation demonstrated some elements of presence and charisma. Keep practising all of the lessons to allow your true authenic self to shine. ";
  } else if (cpercent < 70) {
    presence_description =
      "Some elements of charisma and presence are evident in your presentation. Focus on all of the lessons you have learned to reveal your true authenic self. ";
  } else if (cpercent < 80) {
    presence_description =
      "You are beginning to exhibit charisma and presence during your presentation. Keep practising all that you have learned and your true authenic self will begin to shine. ";
  } else {
    presence_description =
      "Your charisma and presence shows throughout your presentation. Your true authentic self is beginning to shine. ";
  }

  total_closing =
    voice_description +
    face_description +
    body_description +
    presence_description +
    "<br/>When reading your report it is important to remember that no one domain is more important than another. This is not a judgement of who you are; it is simply an aid to guide you towards a better understanding of your strengths and possible areas for development in your communication skills.";
  document.getElementById("closing").innerHTML = total_closing;
  // <---------------

  //  if (bp >= 0 && bp <= 25) {
  //    document.getElementById("body_recom").innerHTML =
  //      "Your use of body language in this presentation needs significant improvement with respect to your posture, use of gestures, and practice moving around the stage with purpose.";
  //  } else if (bp >= 26 && bp <= 50) {
  //    document.getElementById("body_recom").innerHTML =
  //      "Your use of body language in this presentation needs some focused improvements with respect to your posture, use of gestures, and movement around the stage.";
  //  } else if (bp >= 51 && bp <= 69) {
  //    document.getElementById("body_recom").innerHTML =
  //      "Your use of body language in this presentation was okay; however, with respect to your posture, use of gestures, and movement around the stage, there are some areas that can be improved.";
  //  } else if (bp >= 70 && bp <= 89) {
  //    document.getElementById("body_recom").innerHTML =
  //      "Your use of body language in this presentation was quite effective, specifically your posture, use of gestures, and movement around the stage.";
  //  } else {
  //    document.getElementById("body_recom").innerHTML =
  //      "You effectively used your body language in this presentation. Continue to move around the stage with purpose, while using appropriate gestures and posture.";
  //  }

  var recommend_body = response.recommendation_data.bodylanguage;
  var text = "<ul>";
  for (item in recommend_body) {
    text += "<li>" + recommend_body[item] + "</li>";
  }
  text += "</ul>";

  document.getElementById("body_recom").innerHTML = text;

  //  if (fp >= 0 && fp <= 25) {
  //    document.getElementById("face_recom").innerHTML =
  //      "Your use of facial expressions in this presentation requires significant improvement. Practice eye contact with the audiences and your display of appropriate emotions. ";
  //  } else if (fp >= 26 && fp <= 50) {
  //    document.getElementById("face_recom").innerHTML =
  //      "Your facial expression in this presentation needs some focused improvements with respect to your eye contact with the audience and the way you display emotions.";
  //  } else if (fp >= 51 && fp <= 69) {
  //    document.getElementById("face_recom").innerHTML =
  //      "Your facial expression in this presentation was satisfactory; however, there are some areas that can use some improvement, pay attention to your eye contact with the audience and the way you display emotions.";
  //  } else if (fp >= 70 && fp <= 89) {
  //    document.getElementById("face_recom").innerHTML =
  //      "Your facial expression in this presentation was effective, specifically with respect to your eye contact with the audience and the way you display emotions.";
  //  } else {
  //    document.getElementById("face_recom").innerHTML =
  //      "Your facial expression really conveyed your intended message during this presentation. Continue to focus on your eye contact with the audience and the way you display emotions.";
  //  }

  var recommend_face = response.recommendation_data.facialexpression;
  var face = "<ul>";
  for (item in recommend_face) {
    face += "<li>" + recommend_face[item] + "</li>";
  }
  face += "</ul>";

  document.getElementById("face_recom").innerHTML = face;

  //
  //  if (wp >= 0 && wp <= 25) {
  //    document.getElementById("word_recom").innerHTML =
  //      "Your use of language in this presentation needs significant improvement. The grammar you have used needs to be more descriptive and avoid using filler words while speaking.";
  //  } else if (wp >= 26 && wp <= 50) {
  //    document.getElementById("word_recom").innerHTML =
  //      "Your use of language in this presentation needs some focused improvements with respect to your grammar and filler words. Practice using appropriate and descriptive words that create mental images. ";
  //  } else if (wp >= 51 && wp <= 69) {
  //    document.getElementById("word_recom").innerHTML =
  //      "Your use of language in this presentation was okay; however, there are some areas that can use some improvement. Your grammar can be somewhat more descriptive, and you must pay careful attention to your use of filler words.";
  //  } else if (wp >= 70 && wp <= 89) {
  //    document.getElementById("word_recom").innerHTML =
  //      "Your use of language in this presentation was quite effective; specifically, with respect to your use of descriptive grammar and your attention to the use of filler words.";
  //  } else {
  //    document.getElementById("word_recom").innerHTML =
  //      "Your dynamic use of language in this presentation was quite effective. Continue to communicate your ideas using correct grammar and your minimal use of filler words.";
  //  }

  var recommend_language = response.recommendation_data.language;
  var language = "<ul>";
  for (item in recommend_language) {
    language += "<li>" + recommend_language[item] + "</li>";
  }
  language += "</ul>";

  document.getElementById("word_recom").innerHTML = language;

  //
  //  if (vp >= 0 && vp <= 25) {
  //    document.getElementById("voice_recom").innerHTML =
  //      "Your use of voice in this presentation needs significant improvement. Pay attention to your pace, appropriate energy level and using pauses effectively. ";
  //  } else if (vp >= 26 && vp <= 50) {
  //    document.getElementById("voice_recom").innerHTML =
  //      "Your use of voice in this presentation needs some focused improvements. Repeated practice of your pacing, energy level and appropriate pausing will be beneficial.";
  //  } else if (vp >= 51 && vp <= 69) {
  //    document.getElementById("voice_recom").innerHTML =
  //      "Your use of voice in this presentation was satisfactory; however, with respect to your pace, energy level and effective use of pauses, there are some areas that can be improved.";
  //  } else if (vp >= 70 && vp <= 89) {
  //    document.getElementById("voice_recom").innerHTML =
  //      "Your use of voice in this presentation was quite effective; particularly, with respect to your pace, energy level and use of pauses.";
  //  } else {
  //    document.getElementById("voice_recom").innerHTML =
  //      "Your vocal variety is very smooth and natural. Your pauses enhance your message, and you maintain an appropriate energy level.";
  //  }

  var recommend_voice = response.recommendation_data.voice;
  var voice = "<ul>";
  for (item in recommend_voice) {
    voice += "<li>" + recommend_voice[item] + "</li>";
  }
  voice += "</ul>";

  document.getElementById("voice_recom").innerHTML = voice;
  //
  //
  //  if (cpercent >= 0 && cpercent <= 25) {
  //    document.getElementById("presence_recom").innerHTML =
  //      "You are encouraged to work on your overall presence. With dedicated practice of the other four domains, you can eventually become an exceptional communicator. ";
  //  } else if (cpercent >= 26 && cpercent <= 50) {
  //    document.getElementById("presence_recom").innerHTML =
  //      "Your overall presence in this presentation needs some focused improvements. Carefully assess your strengths and areas for improvement and continue to practice the skills in the other four domains. ";
  //  } else if (cpercent >= 51 && cpercent <= 69) {
  //    document.getElementById("presence_recom").innerHTML =
  //      "Your overall presence in this presentation was satisfactory. Carefully assess your strengths and areas for improvement by reviewing your scores in the other four domains. You are on your way to becoming an exceptional communicator!";
  //  } else if (cpercent >= 70 && cpercent <= 89) {
  //    document.getElementById("presence_recom").innerHTML =
  //      "You are becoming an effective presenter! Continue to practice the skills in the four domains and the Power of Communication is within your grasp!";
  //  } else {
  //    document.getElementById("presence_recom").innerHTML =
  //      "You are an effective communicator!  Your practice in the other four domains has paid off and you have learned the Power of Communication! ";
  //  }

  var recommend_confidence = response.recommendation_data.presence;
  var confidence = "<ul>";
  for (item in recommend_confidence) {
    confidence += "<li>" + recommend_confidence[item] + "</li>";
  }
  confidence += "</ul>";

  document.getElementById("presence_recom").innerHTML = confidence;

  // five images
  // write color range code--->

  ans = colorrange(bp);
  document.getElementById("inner-1").style.backgroundColor = ans.inner;
  document.getElementById("inner-1").style.width = bp + "%";
  document.getElementById("outer-1").style.backgroundColor = ans.outer;
  document.getElementById("img2").src = ans.imgUrl;

  ans = colorrange(fp);
  document.getElementById("inner-2").style.width = fp + "%";
  document.getElementById("inner-2").style.backgroundColor = ans.inner;
  document.getElementById("outer-2").style.backgroundColor = ans.outer;
  document.getElementById("img3").src = ans.imgUrl;

  ans = colorrange(wp);
  document.getElementById("inner-3").style.width = wp + "%";
  document.getElementById("inner-3").style.backgroundColor = ans.inner;
  document.getElementById("outer-3").style.backgroundColor = ans.outer;
  document.getElementById("img4").src = ans.imgUrl;
  // console.log("print imgUrl", ans.imgUrl);

  ans = colorrange(vp);
  document.getElementById("inner-4").style.width = vp + "%";
  document.getElementById("inner-4").style.backgroundColor = ans.inner;
  document.getElementById("outer-4").style.backgroundColor = ans.outer;
  document.getElementById("img5").src = ans.imgUrl;
  // console.log("print imgUrl", ans.imgUrl);

  ans = colorrange(cpercent);
  document.getElementById("inner-5").style.width = cpercent + "%";
  document.getElementById("inner-5").style.backgroundColor = ans.inner;
  document.getElementById("outer-5").style.backgroundColor = ans.outer;
  document.getElementById("img1").src = ans.imgUrl;
}
ReportSummary();

