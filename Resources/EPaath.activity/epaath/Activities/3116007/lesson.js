var banknotes = [5, 10, 25, 50, 100];
var products = [
    {id: 'roti', price: 15},
    {id: 'pomogranate', price: 5},
    {id: 'pen', price: 41},
    {id: 'pear', price: 3},
    {id: 'papaya', price: 7},
    {id: 'orange', price: 5},
    {id: 'mango', price: 9},
    {id: 'lays', price: 19},
    {id: 'ice', price: 13},
    {id: 'grapes', price: 11},
    {id: 'food', price: 45},
    {id: 'doll', price: 89},
    {id: 'cap', price: 65},
    {id: 'cake', price: 33},
    {id: 'bread', price: 23},
    {id: 'book', price: 65},
    {id: 'balloon', price: 25},
    {id: 'bag', price: 87},
    {id: 'apple', price: 15}
]

var question_index = -1;
var attempted_answer = false;
var completed_question = false;
var current_question_money_delta = 0;

function askQuestion() {
    question_index ++;

    // reset screen
    attempted_answer = false;
    completed_question = false;
    $('.moneyImage').empty();
    $('.itemImage').empty();
    $('#answerArea').empty();
    $("#answerCheck").empty().show();
    $("#gameOver").empty().hide();

    if ( question_index >= 10 ){
        showGameOver();
        return;
    }

    // pick 1-4 random banknotes, and 1-4 random items
    var i;
    var notes = Karma.shuffle(banknotes).slice(0, Karma.rand(1,4));
    var items = Karma.shuffle(products).slice(0, Karma.rand(1,4));

    var moneyTotal = 0;
    var itemTotal = 0;

    for (i=0; i<notes.length; i++){
        $('#money' + i).append(Karma.createImg('rs' + notes[i]));
        moneyTotal += notes[i];
    }
    for (i=0; i<items.length; i++){
        $('#item' + i).append(Karma.createImg(items[i].id));
        itemTotal += items[i].price;
    }

    current_question_money_delta = moneyTotal - itemTotal;
}

function initialize(){
    scoreboardInitialize({layout: 'horizontal',
                          winningScore: 10});
}

function startLesson(karma, contentDiv) {
    question_index = -1;
    scoreboardReset();

    contentDiv
        .empty()
        .append(createDiv('instructions')
               .append('हिसाब गर र पुग्यो वा पुगेन क्लिक गर'))
        .append(createDiv('main')
            .append(createDiv('moneySide')
                .append(createDiv('moneyHeading')
                    .text('तिमी सँग भएको पैसा')
                    .addClass('topText')
                )
                .append(createDiv('moneyArea')
                    .append(createDiv('money0').addClass('moneyImage'))
                    .append(createDiv('money1').addClass('moneyImage'))
                    .append(createDiv('money2').addClass('moneyImage'))
                    .append(createDiv('money3').addClass('moneyImage'))
                )
            )
            .append(createDiv('itemSide')
                .append(createDiv('itemHeading')
                    .text('सामानको मूल्य')
                    .addClass('topText')
                )
                .append(createDiv('itemArea')
                    .append(createDiv('item0').addClass('itemImage'))
                    .append(createDiv('item1').addClass('itemImage'))
                    .append(createDiv('item2').addClass('itemImage'))
                    .append(createDiv('item3').addClass('itemImage'))
                )
            )
            .append(createDiv('answerButtons')
                .append(createDiv('moneyOk')
                    .append(Karma.createImg('moneyOk'))
                    .clickable(answerButtonClick)
                )
                .append(createDiv('moneyNeeded')
                    .append(Karma.createImg('moneyNeeded'))
                    .clickable(answerButtonClick)
                )
            )
            .append(createDiv('answerArea'))
            .append(createDiv('answerCheck'))
        )
        .append(createDiv('gameOver'));

    $("#answerCheck").hide();
    $("#gameOver").hide();

    askQuestion();
}

function addAnswerInput(){
    return $(document.createElement('input'))
        .attr({
            type: 'text',
            maxlength: 3,
            id: 'answerInput'
        })
        .keypress(function(event) {
            if(event.which === 13){
                checkInputAnswer();
            }
        })
        .keyfilter(/[\d]/);
}

function answerButtonClick(){
    if (completed_question) return;
    if ($(this).attr('id') == 'moneyOk' && current_question_money_delta > 0){
        // they correctly chose that there will be change
        $('#answerArea').empty()
            .html('कति बाँकी ?')
            .append(addAnswerInput());

    } else if ($(this).attr('id') == 'moneyNeeded' && current_question_money_delta < 0){
        // correctly chose there is money needed
        $('#answerArea').empty()
            .html('कति ले ?')
            .append(addAnswerInput());

    } else {
        // incorrect button
        incorrect();
    }
}

function checkInputAnswer(){
    if (completed_question) return;

    if ($('#answerInput').val() == Math.abs(current_question_money_delta)){
        Karma.play('correct');
        $("#answerCheck").empty()
            .append(Karma.createImg('correct'))
            .show().delay(1000).fadeIn(50, askQuestion);

        completed_question = true;
        if (!attempted_answer) {
            scoreboardHit();
        }
    } else {
        incorrect();
    }
}

function incorrect(){
    Karma.play('incorrect');
    $("#answerCheck").empty()
        .append(Karma.createImg('incorrect'))
        .show().delay(1000).fadeOut(500);
    if (!attempted_answer) scoreboardMiss();
    attempted_answer = true;
}

function showGameOver(){
    completed_question = true;

    $('#main').addClass('backOpaque');

    $("#gameOver").empty();
    scoreboardAppendGameOverMessage($("#gameOver"));
    $("#gameOver").show();
}

setUpLesson(initialize, startLesson);
