var questions = [
    {
        q1: 'एउटा बट्टामा {variable} ओटा लडडुहरु छन ',
        q2: 'यदि एउटा बट्टामा {per} ओटा लडडुहरु छन भने {qty} ओटा  बट्टामा',
        q3: 'ओटा लडडुहरु छन',
        variable: 'y',
        per: 20,
        qty: 5,
        img: 0
    },
    {
        q1: 'एउटा सीसाकलमको बट्टामा {variable} ओटा सीसाकलमहरु छन',
        q2: 'यदि एउटा बट्टामा {per} ओटा सीसाकलमहरु छन भने {qty} ओटा  बट्टामा',
        q3: 'सीसाकलमहरु छन',
        variable: 'p',
        per: 10,
        qty: 4,
        img: 1
    },
    {
        q1: 'एउटा बोरामा {variable} केजी  चामल  छ ',
        q2: 'यदि एउटा बोरामा {per} केजी  चामल छ भने {qty} ओटा बोरामा जम्मा ',
        q3: 'केजी  चामल  छ',
        variable: 'r',
        per: 50,
        qty: 4,
        img: 2
    },
    {
        q1: 'एउटा सिसीमा {variable} लिटर तेल छ ',
        q2: 'यदि एउटा सिसीमा {per} लिटर तेल छ भने {qty} ओटा सिसीमा जम्मा ',
        q3: 'लिटर तेल छ',
        variable: 'z',
        per: 2,
        qty: 4,
        img: 3
    },
    {
        q1: 'एउटा कार्टुनमा {variable} प्याकेट चाउचाउ छन ',
        q2: 'यदि एउटा कार्टुनमा {per} प्याकेट चाउचाउ  छन भने {qty} ओटा कार्टुनमा जम्मा ',
        q3: 'प्याकेट चाउचाउ छन',
        variable: 'x',
        per: 30,
        qty: 3,
        img: 4
    },
    {
        q1: 'एउटा डालोमा {variable} ओटा नरिवलहरु छन ',
        q2: 'यदि एउटा डालोमा {per} ओटा नरिवलहरु छन भने {qty} ओटा डालोमा जम्मा ',
        q3: 'ओटा नरिवलहरु छन',
        variable: 'n',
        per: 25,
        qty: 3,
        img: 5
    },
    {
        q1: 'एउटा झोलामा {variable} केजी  आपहरु छन',
        q2: 'यदि एउटा झोलामा {per} केजी आपहरु छन भने {qty} ओटा झोलामा जम्मा ',
        q3: 'केजी  आपहरु छन',
        variable: 'm',
        per: 7,
        qty: 2,
        img: 6
    },
    {
        q1: 'यो एउटा  बिस्कुटको प्याकेटमा {variable} ओटा बिस्कुटहरु छन ',
        q2: 'यदि एउटा प्याकेटमा {per} बिस्कुट ओटा बिस्कुट छन भने {qty} ओटा प्याकेटमा जम्मा '	,
        q3: 'बिस्कुटहरु छन'	,
        variable: 'x',
        per: 15,
        qty: 3,
        img: 7
    }
];

var current_question_index = -1;
var attempted_answer = false;
var correct_subtotal = false;
var correct_total = false;

function askQuestion() {
    current_question_index ++;

    var addInput = function( isTotal ){
        return $(document.createElement('input'))
            .attr({
                type: 'text',
                maxlength: isTotal ? 3 : 2,
                id: isTotal ? 'totalInput' : 'subtotalInput'
            })
            .Watermark('?')
            .keypress(function(event) {
                if(event.which === 13){
                    checkAnswer();
                }
            })
            .focus(function() {
                $(this).removeClass('incorrect').addClass("focus");
            })
            .blur(function() {
                $(this).removeClass("focus");
            })
            .keyfilter(/[\d]/);
    };

    if ( current_question_index >= questions.length ){
        showGameOver();
        return;
    }

    // reset screen
    attempted_answer = false;
    correct_subtotal = false;
    correct_total = false;
    $("#answerCheck").empty().hide();
    $("#questionTopImage").empty();
    $("#questionBottomImage").empty();
    $("#questionTopText").empty();
    $("#questionBottomText").empty();
    $("#gameOver").empty().hide();

    var question = questions[current_question_index];

    $("#questionTopImage").append(Karma.createImg('img' + question['img']));
    $("#questionBottomImage").append(Karma.createImg('img' + question['img'] + 'More'));

    $("#questionTopText").html($.format(question['q1'], question));

    $("#questionBottomText").html( $.format(question['q2'], question) )
        .append(createDiv('calcLine')
            .html(
                $.repeat(question['variable'] + ' + ', question['qty']).slice(0, -3)
                + ' &nbsp; = &nbsp; ' + question['qty'] + ' &nbsp; * &nbsp; ' + question['variable'] + '&nbsp;&nbsp;'
            )
        )
        .append(createDiv('subtotalLine')
            .html(
                $.repeat('<span class="blank">&nbsp; &nbsp;</span> + ', question['qty']).slice(0, -3)
                + ' &nbsp; = &nbsp; ' + question['qty'] + ' * '
            )
            .append(addInput(false))
        )
        .append(createDiv('totalLine').html(
                '= &nbsp; &nbsp; &nbsp; &nbsp;'
            )
            .append(addInput(true))
            .hide()
        )
        .append(createDiv('bottomLine')
            .html( $.format(question['q3'], question) )
            .hide()
        );

    $('#subtotalInput').focus();
}

function initialize(){
    scoreboardInitialize({layout: 'horizontal',
                          winningScore: 8});
}

function startLesson(karma, contentDiv) {
    current_question_index = -1;
    scoreboardReset();

    questions = karma.shuffle(questions);

    contentDiv = $("#content");
    contentDiv.empty();
    contentDiv
        .append(createDiv('instructions')
                .html('हिसाब गरेर सही उत्तर टाइप गर :'))
        .append(createDiv('main')
                .append(createDiv('imageArea')
                    .append(createDiv('questionTopImage'))
                    .append(createDiv('questionBottomImage'))
                )
                .append(createDiv('textArea')
                    .append(createDiv('questionTopText'))
                    .append(createDiv('questionBottomText'))
                )
                .append(createDiv('answerCheck'))
                .append(createDiv('gameOver'))
        );

    $("#linkCheck").clickable(checkAnswer).show();

    $("#answerCheck").hide();
    $("#gameOver").hide();

    askQuestion();
}

function checkAnswer(){
    if (correct_total || current_question_index >= questions.length){
        return;
    }
    var question = questions[current_question_index];

    if (correct_subtotal){
        if ($('#totalInput').val() == '' || $('#totalInput').val() == '?'){
            return;
        }
        // check the total
        if ( $('#totalInput').val() == (question['per'] * question['qty']) ){
            correct_total = true;
            Karma.play('correct');
            $("#answerCheck").empty().append(Karma.createImg('correct')).show();
            // show the next question, after a delay
            $("#answerCheck").delay(1000).show(50, askQuestion);
            if (!attempted_answer) {
                scoreboardHit();
            }

        } else {
            incorrect();
        }
    } else {
        if ($('#subtotalInput').val() == '' || $('#subtotalInput').val() == '?'){
            return;
        }
        // check the subtotal
        if ( $('#subtotalInput').val() == question['per'] ){
            correct_subtotal = true;
            Karma.play('correct');

            $('#subtotalLine').empty()
                .html(
                   $.repeat('<span class="blank">'+ question['per'] +'</span> + ', question['qty']).slice(0, -3)
                    + ' &nbsp; = &nbsp; ' + question['qty'] + ' * '
                )
                .append($(document.createElement('input'))
                    .attr({
                        type: 'text',
                        maxlength: 2,
                        id: 'subtotalInput',
                        disabled: 'disabled'
                    })
                    .val(question['per'])
                );
            $('#totalLine, #bottomLine').show();
            $('#totalInput').focus();
        } else {
            incorrect();
        }
    }
}

function incorrect() {
    Karma.play('incorrect');
    $("#answerCheck").empty().append(Karma.createImg('incorrect')).show();
    // hide after a second
    $("#answerCheck").delay(1000).fadeOut(500);
    if (!attempted_answer) scoreboardMiss();
    attempted_answer = true;
}

function showGameOver(){
    $("#gameOver").empty().show();
    scoreboardAppendGameOverMessage($("#gameOver"));
}

setUpLesson(initialize, startLesson);
