//process clicks of seat buttons
$("#button1").click(function() {
    socket.emit('sitdown', {
        seat: 1,
        name: $("#name-input").val()
    });
})

$("#button2").click(function() {
    socket.emit('sitdown', {
        seat: 2,
        name: $("#name-input").val()
    });
})

socket.on("update-seats", (data) => {
        $(".seat#l").text(data.l);
        $(".seat#m").text(data.m);
        $(".seat#r").text(data.r);
})

socket.on("enter-solution", () => {
    $("#enterSolution").modal({show: true})
})

const form = document.getElementById('submitSolution');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if ($("#solutionInput").val()) {

        $("#enterSolution").modal('toggle')

        socket.emit('submit-solution',{
            sessionId: 1234,
            name: $("#name-input").val(),
            solution: $("#solutionInput").val()
        });
        $("#solutionInput").val('');
    }
});
