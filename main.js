status="";
/*objects=[];*/
Baby_found_audio="";
Baby_not_found_audio="";
function preload(){
    Baby_found_audio=loadSound("baby_laughing.mp3");
    Baby_not_found_audio=loadSound("baby_cry_ringtone.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status :Finding Baby";
}
function modelloaded(){
    console.log("Model Loaded");
    status= true;
    
} 
function getResult(error,results){
   if(error){
       console.log(error);
   }else{
       console.log(results);
      /* objects=results;
       console.log(objects);*/
    }
}
function draw(){
    image(video,0,0,380,380);

   

    if(status!=""){
        objectDetector.detect(video,getResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Object Detected";
            document.getElementById("No.of_objects_detected").innerHTML="No of Objects detected:"+objects.length;
        }
    }
    if(status==true){
        document.getElementById("status").innerHTML="Status:Baby Found";
        Baby_found_audio.play();
        Baby_not_found_audio.stop();
    }else if(status==false){
        document.getElementById("status").innerHTML="Status:Baby Not Found";
        Baby_not_found_audio.play();
        Baby_found_audio.stop();
    }
}