song1=""
song2=""
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
leftWristScore=0;
rightWristScore= 0;

function preload() {
  song1= loadSound("hehehe.mp3");
  song2= loadSound("Dog of Wisdom.mp3")
}

function setup() {
 canvas = createCanvas(600,500);
 canvas.center();
camera= createCapture(VIDEO);
camera.hide();
poseNet= ml5.poseNet(camera,modelLoaded);
poseNet.on("pose",gotPoses)

}

function gotPoses(results) {
  if (results.length>0) {
   console.log(results);
   leftWristX= results[0].pose.leftWrist.x;
   leftWristY= results[0].pose.leftWrist.y;
   rightWristX= results[0].pose.rightWrist.x;
   rightWristY= results[0].pose.rightWrist.y;
   console.log("X and Y value of your left wrist is"+leftWristX,leftWristY+"respectively");
   console.log("X and Y value of your right wrist is"+rightWristX,rightWristY+"respectively");
   leftWristScore= results[0].pose.keypoints[9].score;
   rightWristScore= results[0].pose.keypoints[10].score;
  }
}

function modelLoaded() {
  console.log("PoseNet online :)")
}

function draw() {
 image(camera,0,0,600,500);
 song1_status= song1.isPlaying();
song2_status= song2.isPlaying();
fill("#000000");
stroke("#000000")

 if (leftWristScore > 0.2) {
  circle(leftWristX,leftWristY,20); 
  song1.stop();
if (song2_status == false) {
  song2.play();
  document.getElementById("status").innerHTML= "Dog of Wisdom is now playing."
}
 }

 if (rightWristScore > 0.2) {
  circle(rightWristX,rightWristY,20);
  song2.stop();
if (song1_status == false) {
 song1.play();
 document.getElementById("status").innerHTML= "A good song is now playing ;)"
}
}

}

