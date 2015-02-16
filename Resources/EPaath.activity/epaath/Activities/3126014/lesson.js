var tasks = [
    {
        question: 'AB र CB समानान्तर रेखा',
        answer: false,
        img: 'ques0'
    },
    {
        question: 'MN र PQ समानान्तर रेखा',
        answer: true,
        img: 'ques1'
    },
    {
        question: 'XY र RS समानान्तर रेखा',
        answer: true,
        img: 'ques2'
    },
    {
        question: 'AB र CD समानान्तर रेखा',
        answer: true,
        img: 'ques3'
    },
    {
        question: 'AB र CD समानान्तर रेखा',
        answer: false,
        img: 'ques4'
    },
    {
        question: 'AB र BC समानान्तर रेखा',
        answer: false,
        img: 'ques5'
    },
    {
        question: 'AB र CD समानान्तर रेखा',
        answer: true,
        img: 'ques6'
    },
    {
        question: 'XAY र BC समानान्तर रेखा',
        answer: true,
        img: 'ques7'
    },
    {
        question: 'AB र BC समानान्तर रेखा',
        answer: false,
        img: 'ques8'
    },
    {
        question: 'ABC र DE एक आपसमा  समानान्तर रेखा',
        answer: false,
        img: 'ques9'
    }
];

var initialized = false;

function initialize() {
    if (!initialized) {
        scoreboardInitialize({});
        // Kludge
        $('#linkPlayAgain')
            .click(function () {
                       scoreboardReset();
                       $('#content').removeClass('backOpaque');
                       $('#gameOver').remove();
                       initializeGlobalState();
                   });
        initialized = true;
    }
}

function explanationScreen(what) {
    return function (karma, content) {
        initialize();
        content
            .append(createDiv('lesson')
                    .append(karma.createImg('def' + what)
                            .attr('id', 'lessonHeader'))
                    .append(karma.createImg('img' + what)
                            .attr('id', 'lessonImage'))
                    .append(karma.createImg('info' + what)
                            .attr('id', 'lessonInfo')));
    };
}

// There variables are global so that we can switch between the
// three screens without obliterating where we are in the tasks.
var remaining_tasks;
var current_task;
var tries;

function initializeGlobalState() {
    remaining_tasks = tasks.slice();
    current_task = remaining_tasks.shift();
    tries = 0;
}

initializeGlobalState();

function quiz(karma, content) {
    var next = function () {
        if (!remaining_tasks.length) {
            gameOver();
            return;
        }
        current_task = remaining_tasks.shift();
        tries = 0;
        displayTask();
    };
    var displayTask = function () {
        var createOption = function (parent, img, is_correct) {
            var checkmark = createDiv()
                .addClass('checkDisplay');
            var clicked = function () {
                ++tries;
                $('.checkDisplay').empty();
                var result = is_correct ? 'correct' : 'incorrect';
                checkmark.append(karma.createImg(result));
                karma.play(result);
                if (is_correct) {
                    $('.imgOption').unbind('click');
                    if (tries == 1) {
                        scoreboardHit();
                    } else {
                                           scoreboardMiss();
                    }
                    setTimeout(next, 1000);
                } else {
                    $('#defSection')
                        .empty()
                        .append(karma.createImg(current_task.answer ?
                                                'defParallelYes' :
                                                'defParallelNo'));
                    setTimeout(function () {
                                   $('.checkDisplay').empty();
                               },
                               1000);
                }
            };
            parent
                .append(checkmark)
                .append(karma.createImg(img)
                        .addClass('imgOption')
                        .click(clicked));
        };
        content
            .empty()
            .append(karma.createImg('topText'))
            .append(createDiv('quesDisplay')
                    .append(karma.createImg(current_task.img)))
            .append(createDiv('questionSection')
                    .append(createDiv('question')
                            .append(current_task.question))
                    .append(createDiv('optionSection')))
            .append(createDiv('defSection'));
        createOption($('#optionSection'), 'imgYes', current_task.answer);
        createOption($('#optionSection'), 'imgNo', !current_task.answer);
    };

    var gameOver = function () {
        content
            .addClass('backOpaque')
            .after(createDiv('gameOver'));
        if (scoreboardScore() == tasks.length) {
	    $('#gameOver').append('बधाई छ !!!  सबै उत्तर सहि भए !!! ');
        } else {
	    $('#gameOver')
                .append(createDiv('gameOverInfo')
                        .append('किन गलत भयो पत्ता लगाउ र अर्को पटक सहि '
                                + 'बनाउने कोशिश गर । <br /> '));
            scoreboardAppendGameOverMessage($('#gameOverInfo'));
        }
        $('#gameOver').show();
        $('#linkPrevLesson').hide();
    };

    displayTask();
}

setUpMultiScreenLesson([explanationScreen('ParallelLines'),
                        explanationScreen('IntersectLines'),
                        quiz]);
