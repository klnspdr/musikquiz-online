window.setInterval(function () {

        updateScoreboard();

},1000);


function updateScoreboard(){
    $.get("/api/scoreboard", function (data) {

        let scoreboardHtml = ""
        data.map((team, index) => {
            let rank = index +1;
            scoreboardHtml += '<tr>' +
                '<td style="border-bottom-width: 1px; font-weight: bolder">' + rank.toString() + '</td>' +
                '<td>' + team.score + '</td>' +
                '<td style="border-right: 1px none rgb(128,128,128) ;border-bottom-width: 2px;border-bottom-color: rgb(128,128,128);">' + team.name + '</td>' +
                '</tr>'
        })

        $("#scoreboard-body").html(scoreboardHtml);

    })
}
