var timer;
var tasks = [
    {
        variable: 'x',
        x: 16,
        y: 4,
        z: 8,
        sign: '-',
        answer: 56,
        id: 0
    },
    {
        variable: 'p',
        x: 80,
        y: 1,
        z: 30,
        sign: '-',
        answer: 50,
        id: 1
    },
    {
        variable: 'y',
        x: 25,
        y: 2,
        z: 16,
        sign: '-',
        answer: 34,
        id: 2
    },
    {
        variable: 'x',
        x: 30,
        y: 3,
        z: 7,
        sign: '+',
        answer: 97,
        id: 3
    },
    {
        variable: 'x',
        x: 15,
        y: 2,
        z: 7,
        sign: '+',
        answer: 37,
        id: 4
    },
    {
        variable: 'r',
        x: 70,
        y: 1,
        z: 22,
        sign: '-',
        answer: 48,
        id: 5
    }
];

function result(task) {
    var result = task.x * task.y;
    if (task.sign == '-') {
        result -= task.z;
    } else {
        result += task.z;
    }
    if (result != task.answer) {
        alert('error: ' + result + ' != ' + task.answer);
    }
    return result;
}

function initialize(karma, content) {
    scoreboardInitialize();
}

function startLesson(karma, content) {
    content
        .empty()
        .append(createDiv('instructions')
	        .html('हिसाब गरेर सही उत्तर टाइप गर र Enter गर :'))
        .append(createDiv('section')
                .append(createDiv('left-side'))
                .append(createDiv('right-side')
                        .append(createDiv('rightBack'))
                        .append(createDiv('bgCalculation'))))
	.append(createDiv('answerCheck'));
    scoreboardReset();
    clearTimeout(timer);
    $('#answerCheck').hide();

    var remaining_tasks = Karma.shuffle(tasks);
    var current_task;

    var createCalculation = function (div, generateLeftVar, generateRightVar) {
        var sign = current_task.sign;
        var y = current_task.y;
        var z = current_task.z;
        div.append(generateLeftVar());
        range(0, y - 1).forEach(
            function () {
                div
                    .append('+')
                    .append(generateLeftVar());
            }
        );
        div
            .append(sign + z)
            .append(' = ')
            .append((y == 1 ? '' : '' + y + ' * '))
            .append(generateRightVar())
            .append(sign + z);
    };

    var createTextBox = function (id, maxLength) {
        return $(document.createElement('input'))
            .attr({ id: id,
                    type: 'text',
                    maxLength: maxLength })
            .addClass('textBox')
            .focus(function() {
                       $(this)
                           .removeClass('incorrect')
                                                    .addClass('focus');
                   })
            .blur(function () {
                      $(this).removeClass('focus');
                  })
            .keypress(function (event) {
                          if (event.which == 13) {
                              checkAnswer();
                          }
                      })
            .keyfilter(/[\d]/);
    };

    var next = function () {
       if (remaining_tasks.length) {
           current_task = remaining_tasks.shift();
           var id = current_task.id;
           var variable = current_task.variable;
	   $('#answerCheck').empty().hide();
           $('#left-side')
               .empty()
               .append(karma.createImg('img' + id));
           $('#rightBack')
               .empty()
               .append(karma.createImg('ques' + id));
           $('#bgCalculation')
               .empty()
               .append(createDiv('textQues1'))
               .append(createDiv('textQues2'));
           createCalculation($('#textQues1'),
                             constantly(variable),
                             constantly(variable));
           createCalculation($('#textQues2'),
                             function () {
                                 return $(document.createElement('span'))
                                     .addClass('blankBoxes');
                             },
                             function () {
                                 return createTextBox('x', 2);
                             });
           checkAnswer = checkX;
           adjustScoreboard = scoreboardHit;
           $('input#x').focus();
       } else {
           timer = setTimeout(gameOver, 1000);
       }
    };

    var checkX = function () {
        if ($('#x').val() == current_task.x) {
            karma.play('correct');
	    $('#answerCheck').empty().append(Karma.createImg('correct')).show();
	    $('#answerCheck').delay(1000).fadeOut(500);
            $('#x').attr('disabled', true);
            $('.blankBoxes')
                .css({ padding: 0 })
                .html(current_task.x);
            $('#bgCalculation')
                .append(createDiv('textQues3')
                       .append(' = ' + $.repeat('&nbsp;', 8))
                        .append(createTextBox('result', 3)));
            checkAnswer = checkResult;
            $('input#result').focus();
        } else {
            karma.play('incorrect');
	    $('#answerCheck').empty().append(Karma.createImg('incorrect')).show();
	    $('#answerCheck').delay(1000).fadeOut(500);
            adjustScoreboard = scoreboardMiss;
            $('input#x').focus();
        }
    };

    var checkResult = function () {
        if ($('#result').val() == result(current_task)) {
            checkAnswer = function () {};
            karma.play('correct');
	    $('#answerCheck').empty().append(Karma.createImg('correct')).show();
            $('#result').attr('disabled', true);
            adjustScoreboard();
            timer = setTimeout(next, 1000);
        } else {
            karma.play('incorrect');
	    $('#answerCheck').empty().append(Karma.createImg('incorrect')).show();
	    $('#answerCheck').delay(1000).fadeOut(500);
            adjustScoreboard = scoreboardMiss;
            $('input#result').focus();
        }
    };

    var checkAnswer;
    var adjustScoreboard;

    var gameOver = function () {
        $('#section').addClass('backOpaque');
        $('#linkCheck').hide();
        $('#content')
            .append(createDiv('gameOver')
                    .show());
    };

    $('#linkCheck')
        .unclickable()
        .clickable(function () { checkAnswer(); })
        .show();

    next();
}

setUpLesson(initialize, startLesson);
