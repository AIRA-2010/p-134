img = "";
status = "";
object = [];
function preload(){
img = loadImage("dog_cat.jpg");
song = loadSound("emergency_alert.mp3");
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video =createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function modelLoaded(){
    console.log("model is initialized");
    status = true;
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
        console.log(results);
        object = results;
}
function draw(){
    image(video,0,0,380,380);
    r=random(255);
    g=random(255);
    b=random(255);
        if(status != "person"){
            document.getElementById("status").innerHTML = "Status : Detected objects";
            document.getElementById("no_of_objects").innerHTML = "Baby Found"+object.length;
            objectDetector.detect(video,gotResult);
            for(i=0 ;i<object.length ;i++){
            fill(r,g,b);
            confidence = floor(object[i].confidence*100);
            text(object[i].label+"  "+confidence+"%",object[i].x+10,object[i].y+10);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height); 
        } 
    }
    else{
        document.getElementById("status").innerHTML = "Status : Detected objects";
        document.getElementById("no_of_objects").innerHTML = "Baby Not Found"+object.length;
        song.play();
    }
}