// Copyright (c) YoLabs 2022. www.yolabs.in
// Author - Rahul Sharma - 18th Feb 2022
// This software is released under the MIT License
// https://opensource.org/licenses/MIT

// Create same filter as zoom  and use them

let video;
let poseNet;
let poses = [];

let leftShoulder,rightShoulder;



function preload() {
  filterimg = loadImage("glasses2.png"); // preload the filter img
  //filterimg1 = loadImage("glasses1.png");
  tedha = loadImage("tedha.jpeg")
  pushup = loadImage("pushup.gif")
}

function setup() {
  createCanvas(windowWidth*0.5, windowHeight*0.5);
  video = createCapture(VIDEO);
  video.size(width,height); // matching the canvas width and height
  
  // create the comparing Image 
  imageMode(CENTER);
  puspha = createImg("tedha.jpeg")
  
  puspha.position(width,height/2-120)
  puspha.size(width,height)
 
  frameRate(16)
  
  


  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
 // myimg.hide();
  rectMode(CENTER);
  divCreation()
 
}

function modelReady() {
  select("#status").html("Model Loaded");
}

function mousePressed() {
  console.log(JSON.stringify(poses));
}

function draw() {
  push();
  
  translate(width,0)
   scale(-1,1)
  image(video, width / 2, height / 2, width, height);
  
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    let pose = poses[0].pose;

    // Create a pink ellipse for the nose
    fill(213, 0, 143);
    let nose = pose["nose"];
    //ellipse(nose.x, nose.y, 20, 20);

    // Create a yellow ellipse for the right eye
    fill(255, 215, 0);
    let rightEye = pose["rightEye"];
    ellipse(rightEye.x, rightEye.y, 5, 5);

    // Create a red ellipse for the left eye
    fill(255, 0, 0);
    let leftEye = pose["leftEye"];
    ellipse(leftEye.x, leftEye.y, 5, 5);
    
    
    // left shoulder
    fill(213, 255, 143);
    let leftShoulder = pose["leftShoulder"];
    rect(leftShoulder.x, leftShoulder.y, 6, 6);
    
     
    // right shoulder
    fill(213, 255, 143);
    let rightShoulder = pose["rightShoulder"];
    rect(rightShoulder.x, rightShoulder.y, 6, 6);

    //  lets put the puspha with Glasses
    
     eyesWidth = rightEye.x - leftEye.x; //distance b/w two eyes
     eyeTilt = leftEye.y - rightEye.y; // used  to check face rotation
    filterWidth = sqrt((eyesWidth**2) + (eyeTilt**2))
    angle = atan(-eyeTilt / eyesWidth); // rotation angle
    push(); // allow to fix the new state

    translate(nose.x, rightEye.y); // ensure the glass filter is the right place
    rotate(angle); // rotate the glass

    // showcase the image and make size responsive
    image(
      filterimg,
      0,
      0,
      filterWidth * 2.2,
      filterimg.height * (filterWidth / filterimg.width)
    );
    pop();
    


    // set up the filter postition and responsive
    shoulderWidth = rightShoulder.x - leftShoulder.x; //distance b/w two eyes
    shoulderTilt = leftShoulder.y - rightShoulder.y; // used  to check face rotation
    angle = atan(-shoulderTilt / shoulderWidth); // rotation angle
    //console.log(abs(angle))
    pop();
     console.log(abs(angle))
    textSize(50)
    if (abs(angle)>0.33)
      {
      stroke(255)
    
   
      text("That a Pushpa",width/2,50)
      image(tedha,width/2+300,height/2,300,200)
      }
    else{
       text("lift a bit more",width/2,50)
      
      
    }
      
  }
}


function divCreation(){
  howto = createDiv("AI Trainer - Lift either left or right shoulder, till you won't achieve a perfect pose.\n Place your laptop armlength away to start training");
howto.style('font-size', '24px');
  howto.style("color","white")
howto.position(10, 0.8*windowHeight);
}


