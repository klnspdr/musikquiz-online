$("#askForSolution").click(function(){
    socket.emit('ask-for-solution', {});
})

//process click of Reset button
$("#resetGame").click(function(){
    socket.emit('reset-seats', {});
})

socket.on('update-solutions', (data) => {
    $(".seat#l-solution").text(data.l);
    $(".seat#m-solution").text(data.m);
    $(".seat#r-solution").text(data.r);
})
