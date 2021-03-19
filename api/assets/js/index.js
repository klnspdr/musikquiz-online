
//process clicks of seat buttons 
$("#button1").click(function() {
    $.post("https://api.kill-soc.de/storeSeat?sessionId=1234&name="+$("#name-input").val()+"&seat=1")
})

$("#button2").click(function() {
    console.log($("#name-input").val());
    $.post("https://api.kill-soc.de/storeSeat?sessionId=1234&name="+$("#name-input").val()+"&seat=2")
})

//process click of Reset button
$("#resetGame").click(function(){
    $.post("https://api.kill-soc.de/resetSeats");
})

window.setInterval(function () {

        updateSeats();

},500);

function updateSeats(){
    //console.log("update");
    $.get("https://api.kill-soc.de/getSeats?sessionId=1234", function (data) {
        $(".seat#l").text(data.l);
        $(".seat#m").text(data.m);
        $(".seat#r").text(data.r);
        //console.log(data);
    });
}