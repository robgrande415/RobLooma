var qwerty_keys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

function showHangMan(karma, i) {
    $('#hangManSection')
        .empty()
        .append(karma.createImg('hang' + i).addClass('imgHang'));
}

function createKeyboard() {
    var drawRow = function (row, i) {
        var $keys = createDiv('keys' + i);
        $(Array.prototype.map.apply(row,
                                    [function (letter) {
                                         return createDiv()
                                             .html(letter)
                                             .addClass(letter)
                                             .addClass('alphaKeys');
                                    }]))
            .appendTo($keys);
        return $keys;
    };
    var $keyboard = createDiv('keyboard');
    $(qwerty_keys.map(drawRow)).appendTo($keyboard);
    return $keyboard;
}

function initialize(karma) {
    scoreboardInitialize({layout: 'horizontal',
                          winningScore: 10});
}

function createAnswerBoxes(string, $answerSection) {
    Array.prototype.forEach.apply(string,
                                  [function (letter) {
                                       $(document.createElement('span'))
                                           .addClass('answerBox text')
                                           .addClass(letter.toUpperCase())
                                           .html('#')
                                           .appendTo($answerSection);
                                   }]);
}

function startGame(karma) {
    createContentDivs(karma);
    scoreboardReset();

    $('#missedText').hide();
    $('#linkNextLesson').hide();

    var mistakeCount = 0;

    var remaining_tasks = Karma.shuffle(tasks);
    var current_answer = null;

    var keyClicked = function () {
        $(this).unclickable();
        var letter = $(this).html();
        $(this).css('background-color', 'white');
        var index = current_answer.toUpperCase().indexOf(letter);
        if (index != -1) {
            $('.' + letter, $('#answerSection'))
                .html(current_answer[index])
                .addClass('guessed');
            if ($('.guessed').length == current_answer.length) {
                scoreboardHit();
                setTimeout(nextQuestion, 1000);
            }
        } else {
            ++mistakeCount;
            showHangMan(karma, mistakeCount);
            if (mistakeCount == number_of_tries) {
                $('#keyboard').hide();
                $('#missedText').show();
                $('#linkNextLesson').show();
                showAnswer();
                scoreboardMiss();
            }
        }
    };

    var showAnswer = function () {
        $('.answerBox').map(function (i, x) {
                                $(x).html(current_answer[i]);
                            });
    };

    var nextQuestion = function () {
        $('.alphaKeys')
            .unclickable()
            .clickable(keyClicked)
            .css('background-color', '');

        if (remaining_tasks.length) {
            $('#missedText').hide();
            $('#linkNextLesson').hide();
            $('#keyboard').show();
            mistakeCount = 0;
            showHangMan(karma, mistakeCount);
            current_answer = setUpAnswer(remaining_tasks.pop());
        } else {
            $('#content')
                .empty()
                .append(karma.createImg('kitchen').addClass('oneOrMoreUtensils'));
            $('#linkNextLesson').hide();
        }
    };

    var gameOver = function () {
        $('#content')
            .empty()
            .append(karma.createImg('oneOrMoreUtensils'));
        $('#linkNextLesson').hide();
    };

    $('#linkNextLesson').clickable(nextQuestion);

    nextQuestion();
}

setUpLesson(initialize, startGame);
