window.setInterval(function () {

        updateScoreboard();

},1000);


function updateScoreboard(){
    $.get("/api/scoreboard", function (data) {

        $("#scoreboard-body").html(generateTable(data));

    })
}

function generateTable(data){
    let scoreboardHtml = ""
        data.map((team, index) => {
            let rank = index +1;
            scoreboardHtml += '<tr>' +
        '<td style="border-bottom-width: 1px; font-weight: bolder">' + rank.toString() + '</td>' +
        '<td>' + team.score + '</td>' +
        '<td style="border-right: 1px none rgb(128,128,128) ;border-bottom-width: 2px;border-bottom-color: rgb(128,128,128);">' + team.name + '</td>' +
        '<td style="border-right: 1px none rgb(128,128,128) ;border-bottom-width: 2px;border-bottom-color: rgb(128,128,128);">' +
            `<button class="btn btn-danger" type="button" style="width: 40px; margin-right: 10px" onclick="deleteTeam('${team.id}')"><i class="fa fa-trash-o"></i></button><div role="group" class="btn-group" style="height: 40px;"><button class="btn btn-warning" type="button" style="width: 40px;" onclick="retractPoint('${team.id}')"><i class="fa fa-minus" style="color: rgb(255,255,255);"></i></button><button class="btn btn-success" type="button" style="width: 40px;" onclick="addPoint('${team.id}')"><i class="fa fa-plus"></i></button></div>` +
        '</td>'+
    '</tr>'
        })
    return scoreboardHtml;
}

function deleteTeam(id){
    if(confirm("Willst du dieses Team wirklich löschen?")){
        $.ajax({
            url: '/api/scoreboard/team/' + id,
            type: 'DELETE',
            success: function(result) {
                updateScoreboard();
            }
        });
    }
}


function addPoint(id){
    $.get('api/scoreboard/addPoint/' + id, function (data) {
        updateScoreboard();
    })
}

function retractPoint(id) {
    $.get('api/scoreboard/retractPoint/' + id, function (data) {
        updateScoreboard();
    })
}

//process click of add team button
$("#addTeam").click(function(){
    $.post("/api/scoreboard/team", {name: $("#team-name-input").val()});
    $("#team-name-input").val("");
})

function resetScoreboard(){
    if(confirm("Willst du das Scoreboard wirklich zurücksetzen?")){
        $.get("api/scoreboard/reset", data => {
            updateScoreboard();
        })
    }
}
