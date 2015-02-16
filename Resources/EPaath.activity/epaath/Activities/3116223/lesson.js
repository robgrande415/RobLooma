var currentDroppedPositions = {};

var word_lists = Karma.shuffle([
    ['aeroplane','apple','ant','arrow','audio','axe'],
    ['eagle','ear','east','egg','elephant','engine'],
    ['fall','fan','fat','first','fog','fun'],
    ['egg','goat','ladder','leaf','net','tiger'],
    ['crocodile','deer','elephant','lion','rhinosorous','tiger'],
    ['bus','flag','glass','nose','pencil','table'],
    ['bag','ball','banana','bat','bed','bone'],
    ['cat','camera','class','color','country','cream'],
    ['cat','cow','dog','donkey','hen','rabbit'],
    ['dam','dark','den','dog','drink','duck'],
    ['glass','nail','picture','radio','star','watch'],
    ['bus','flag','glass','nose','pencil','table'],
    ['magic','man','many','master','miracle','mouse'],
    ['pan','pencil','pig','pot','practice','pumpkin'],
    ['salt','school','short','smile','snake','stick'],
    ['axe','mountain','plate','umbrella','volley-ball','x-ray'],
    ['television','temple','toggle','trap','trust','turn'],
    ['bottle','fish','house','pan','tree','window']
]);
var current_list_index = -1;
var attempted_answer = false;
var correct_answer = false;

function askQuestion() {
    current_list_index ++;

    var createDropBox = function (word, index) {
        return createDiv('drop' + index).addClass('dropBox')
            .data('word', word);
    };
    var createWordDragBox = function (word, target_index) {
        return createDiv('wordDrag' + target_index)
            .addClass('dragObject')
            .data('word', word)
            .text(word);
    };

    // reset screen
    attempted_answer = false;
    correct_answer = false;
    currentDroppedPositions = {};
    $("#answerCheck").empty().show();
    $('#dropArea').empty();
    $('#dragWords').empty();
    $("#gameOver").empty().hide();
    if ( current_list_index % 6 == 0 ){
        $('.animalImage').empty();
    }

    if ( current_list_index >= word_lists.length ){
        showGameOver();
        return;
    }
    var word_list = word_lists[current_list_index];
    // sort now, as accuracy of above lists may not be 100%
    word_list.sort()

    $(word_list.map(createDropBox)).appendTo($('#dropArea'));
    $(Karma.shuffle(word_list).map(createWordDragBox))
        .appendTo('#dragWords');

    $('.dragObject').draggable({
        containment: '#content',
        start: function(event, ui){
            for (var target in currentDroppedPositions){
                if (currentDroppedPositions[target] == ui.helper){
                    currentDroppedPositions[target] = null;
                    $('#' + target).droppable('option' , 'hoverClass' , 'drophover');
                    return;
                }
            }
        },
        stop: function(event, ui) {
            for (var target in currentDroppedPositions){
                if (currentDroppedPositions[target] == ui.helper){
                    return;
                }
            }
            // not on a valid target, so animate back home
            ui.helper.animate({left: 0, top: 0});
        }
    });
    $('.dropBox').droppable({
        tolerance: 'intersect',
        hoverClass: 'drophover',
        drop: function(event, ui) {
            if (currentDroppedPositions[ $(this).attr('id') ] == null){
                currentDroppedPositions[ $(this).attr('id') ] = ui.draggable;
                // snap draggable to this drop point
                ui.draggable.position({ my: 'center', at: 'center', of: $(this) });
                $(this).droppable('option' , 'hoverClass' , '');
            }
        }
    });
}

function initialize(){
    scoreboardInitialize({layout: 'horizontal',
                          winningScore: 10});
}

function startLesson(karma, contentDiv) {
    current_list_index = -1;
    scoreboardReset();

    contentDiv = $("#content");
    contentDiv.empty();
    contentDiv
        .append(createDiv('main')
                .append(createDiv('heading')
                        .text('Rearrange the above words in alphabetical order.')
                        .addClass('topText')
                       )
                .append(createDiv('dropArea'))
                .append(createDiv('dragWords'))
                .append(createDiv('animalImages')
                    .append(createDiv('img0').addClass('animalImage'))
                    .append(createDiv('img1').addClass('animalImage'))
                    .append(createDiv('img2').addClass('animalImage'))
                    .append(createDiv('img3').addClass('animalImage'))
                    .append(createDiv('img4').addClass('animalImage'))
                    .append(createDiv('img5').addClass('animalImage'))
                )
                .append(createDiv('answerCheck'))
                .append(createDiv('gameOver'))
               );

    $("#linkCheck").clickable(
        function(){
            if ( correct_answer ){
                return;
            }
            all_correct = true;
            $('.dropBox').each(
                function (index, value) {
                    var dragChild = currentDroppedPositions[$(this).attr('id')];
                    if (dragChild == null || $(this).data('word') != dragChild.data('word')){
                        all_correct = false;
                    }
                }
            );

            $("#answerCheck").empty().show();
            if ( all_correct ){
                correct_answer = true;
                Karma.play('correct');
                $("#answerCheck").append(karma.createImg('correct'));
                // show the next question, after a delay
                $("#answerCheck").delay(1000).show(50, askQuestion);
                addAnimalPiece();
                if (!attempted_answer) {
                    scoreboardHit();
                }

            } else {
                Karma.play('incorrect');
                $("#answerCheck").append(karma.createImg('incorrect'));
                // hide after a second
                $("#answerCheck").delay(1000).fadeOut(500);
                if (!attempted_answer) scoreboardMiss();
            }
            attempted_answer = true;

        }).show();

    $("#answerCheck").hide();
    $("#gameOver").hide();

    askQuestion();
}


function addAnimalPiece(){
    var prefixes = ['ele', 'house', 'ship'];
    var piece_index = current_list_index % 6;
    var prefix = prefixes[Math.floor(current_list_index / 6)];
    $("#img" + piece_index).empty().append(Karma.createImg(prefix + piece_index));
}

function showGameOver(){
    $("#gameOver").empty();
    scoreboardAppendGameOverMessage($("#gameOver"));
    $("#gameOver").show();
}

setUpLesson(initialize, startLesson);
