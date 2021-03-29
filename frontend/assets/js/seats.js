
//process clicks of seat buttons
$("#button1").click(function() {
    $.post("/api/seats/store?sessionId=1234&name="+$("#name-input").val()+"&seat=1")
})

$("#button2").click(function() {
    $.post("/api/seats/store?sessionId=1234&name="+$("#name-input").val()+"&seat=2")
})

//process click of Reset button
$("#resetGame").click(function(){
    $.post("/api/seats/reset");
})

socket.on("update-seats", (data) => {
        $(".seat#l").text(data.l);
        $(".seat#m").text(data.m);
        $(".seat#r").text(data.r);
})

