
//process clicks of seat buttons
$("#button1").click(function() {
    $.post("/api/seats/store?sessionId=1234&name="+$("#name-input").val()+"&seat=1")
    updateSeats();
})

$("#button2").click(function() {
    $.post("/api/seats/store?sessionId=1234&name="+$("#name-input").val()+"&seat=2")
    updateSeats();
})

//process click of Reset button
$("#resetGame").click(function(){
    $.post("/api/seats/reset");
})

window.setInterval(function () {

        updateSeats();

},500);

function updateSeats(){
    //console.log("update");
    $.get("/api/seats?sessionId=1234", function (data) {
        $(".seat#l").text(data.l);
        $(".seat#m").text(data.m);
        $(".seat#r").text(data.r);
        //console.log(data);
    });
}
