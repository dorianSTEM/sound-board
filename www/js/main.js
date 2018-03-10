var count = 0;

$(function(){ //onready
    function loopSound(){
        
        $(".logo svg").css();
        count += 1
        setTimeout(loopSound, 200);
    }
    
    loopSound();
});

var mouseProperties = {
    down: false,
    lastPos: []
}

var screen1Properties = {
    visible : true
}

var $screen1 = $("#screen1");

$screen1[0].addEventListener("touchstart", function(){
    //alert("touchSTART");
    mouseProperties.down = true;
});

addEventListener("touchend", function(){
    //alert("touchend");
    mouseProperties.down = false;
    mouseProperties.lastPos = [];
    
    if (screen1Properties.visible) {
        $screen1.animate({
            top: $screen1.position().top+$screen1.height() > $(window).height()*0.75 ? "0px" : -$(window).height()
          }, 300, function() {
            // Animation complete.
            if ($screen1.position().top) { $screen1.remove(); }; //remove the title screen to free up resources
        });
    }
});

$screen1[0].addEventListener("touchmove", function(event){ //detect drags
    event.pageX = event.touches[0].pageX;
    event.pageY = event.touches[0].pageY;

    if (mouseProperties.lastPos.length && mouseProperties.down){
        var diff = [event.pageX-mouseProperties.lastPos[0], event.pageY-mouseProperties.lastPos[1]];

        if ($screen1.position().top <= 0 || diff[1] < 0){
            $screen1.css("top", $screen1.position().top+diff[1] > 0 ? "0px" : $screen1.position().top+diff[1]);
            navigator.vibrate(500);
        }
    }
        
    mouseProperties.lastPos = mouseProperties.down ? [event.pageX, event.pageY] : [];
});

var isPlaying = false;

$("#notplaying").show();
$("#playing").hide();

$(".sound").on("mousedown", function(){
    var audioEl = document.getElementsByTagName("audio");
    for (var i=0; i<audioEl.length; i++){
        audioEl[i].pause();
    }
    
    if (isPlaying) {
        $(this).find("audio")[0].pause();
        
        $("#notplaying").show();
        $("#playing").hide();
        
        isPlaying = false;
    } else {
        $(this).find("audio")[0].play();
        
        $("#notplaying").hide();
        $("#playing").show();
        
        isPlaying = true;
    }
});