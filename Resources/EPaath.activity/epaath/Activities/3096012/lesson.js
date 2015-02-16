var questions = [
    [
        {
            question:'कतिओटा रेखाहरु छन् ?',
            options: [4,2,0,6],
            answer: 4

        },
        {
            question:'कतिओटा त्रिभुजहरु छन् ?',
            options: [0,4,2,6],
            answer: 0
        }
    ],
    [
        {
            question:'कतिओटा रेखाहरु छन् ?',
            options: [8,12,16,20],
            answer: 8
        },
        {
            question:'कतिओटा त्रिभुजहरु छन् ?',
            options: [4,2,6,8],
            answer: 4
        }
    ],
    [
        {
            question:'कतिओटा रेखाहरु छन् ?',
            options: [12,20,28,32],
            answer: 12
        },
        {
            question:'कतिओटा त्रिभुजहरु छन् ?',
            options: [8,4,12,16],
            answer: 8
        }
    ],
    [
        {
            question:'कतिओटा रेखाहरु छन् ?',
            options: [16,10,30,40],
            answer: 16
        },
        {
            question:'कतिओटा त्रिभुजहरु छन् ?',
            options: [12,10,8,4],
            answer: 12
        }
    ]//*/
];

function initialize(karma){
    scoreboardInitialize();
}

function startLesson(karma){
    var updateScoreFlag;

    var incorrect = function () {
        karma.play('incorrect');
        if (updateScoreFlag) {
            scoreboardMiss();
            updateScoreFlag = false;
        }
    };

    var correct = function () {
        karma.play('correct');
        if (updateScoreFlag) {
            scoreboardHit();
        }
    };

    scoreboardReset();

    var question_set_index = -1;
    var current_question_index = 0;

    var question_counter = 1;
    updateScoreFlag = true; //boolen flag act as memory for the same question, either it has been clicked once or not. true for every question loads

    var drawLine = function(point1, point2) {
        var drawBox = $('#canvasDrawBox').get()[0];
        var context = drawBox.getContext('2d');
        context.beginPath();
        context.moveTo(point1.left, point1.top);
        context.lineTo(point2.left, point2.top);
        context.stroke();
    };

    var drawLabeledDot = function (position, label_offset, label) {
        $('#canvasBorder')
            .append(createDiv()
                    .addClass('dot')
                    .css({ left: position.left - 7,
                           top: position.top - 3.5 })
                    .append(karma.createImg('dot')
                            .css({ position: 'absolute' })))
            .append(createDiv()
                    .addClass('number')
                    .css({ left: position.left + label_offset.left,
                           top: position.top + label_offset.top })
                    .html(label));
    };

    var tiltedSquareDots = function (dots) {
        var average = function (point1, point2) {
            return {
                top: (point1.top + point2.top) / 2,
                left: (point1.left + point2.left) / 2
            };
        };
        var result = range(0, 4).map(
            function (i) {
                return average(dots[i], dots[(i + 1) % 4]);
            }
        );
        return result;
    };


    var dots = [{ top: 0, left: 0 },
                { top: 0, left: 360 },
                { top: 360, left: 360 },
                { top: 360, left: 0 }];

    var straight_square_label_offsets = [{ top: -20, left: -20 },
                                         { top: -20, left: 20 },
                                         { top: 20, left: 20 },
                                         { top: 20, left: -20 }];
    var tilted_square_label_offsets = [{ top: -20, left: 0 },
                                       { top: 0, left: 20 },
                                       { top: 20, left: 0 },
                                       { top: 0, left: -20 }];

    var straightSquareDots = function (dots) {
        var dots2 = tiltedSquareDots(dots);
        return [dots2[3]].concat(dots2.slice(0, 3));
    };

    var label = 1;
    var drawDots = function (offsets) {
        dots.forEach(function (position, i) {
                         drawLabeledDot(position, offsets[i], label++);
                     });

    };

    var actionsForSquare = function (label_offsets, nextDots) {
        return [function () { drawDots(label_offsets); },
                function () { drawLine(dots[0], dots[1]); },
                function () { drawLine(dots[1], dots[2]); },
                function () { drawLine(dots[2], dots[3]); },
                function () {
                    drawLine(dots[3], dots[0]);
                    dots = nextDots(dots);
                    nextQuestionSet();
                }];
    };

    var actions = [].concat(actionsForSquare(straight_square_label_offsets,
                                            tiltedSquareDots),
                            actionsForSquare(tilted_square_label_offsets,
                                            straightSquareDots),
                            actionsForSquare(straight_square_label_offsets,
                                            tiltedSquareDots),
                            actionsForSquare(tilted_square_label_offsets,
                                            straightSquareDots));

    var nextAction = function () {
        if (question_set_index >= questions.length - 1) {
            loadTable();
        } else {
            var action = actions.shift();
            action();
        }
    };

    var current_question_set;

    var nextQuestionSet = function () {
        current_question_index = 0;
        question_set_index++;
        current_question_set = questions[question_set_index];
        selectQuestion();
    };

    var selectQuestion = function () {
        $('#lineNextBtn').hide();
        $('#questionSection').show();
        updateScoreFlag=true;

        if (current_question_index < current_question_set.length) {
            var current_question = current_question_set[current_question_index];

            loadQuestionElement(question_counter, current_question);
            question_counter++;
        } else {
            $('#questionSection').hide();
            $('#lineNextBtn').show();
            nextAction();
        }
        current_question_index++;
    };

    var loadQuestionElement = function (questionNo, question) {
        $('#question').empty();
        $('#optionSection').empty();
        $('#linkNextLesson').hide();
        $('#question')
            .html(questionNo+ " . "+ question.question);

        Karma.shuffle(question.options).forEach(
            function (option, i) {
                var check = createDiv()
                    .addClass('check');
                $('#optionSection')
                    .append(check)
                    .append(createDiv()
                            .addClass('options')
                            .clickable(
                                function () {
                                    $('.check').empty();
                                    if (option == question.answer){
                                        check.append(karma.createImg('correct'));
                                        $('.options').unclickable();
                                        $('#linkNextLesson').show();
                                        correct();
                                    } else {
                                        check.append(karma.createImg('wrong'));
                                        incorrect();
                                    }
                                })
                            .append(karma.createImg('abcd'[i])))
                    .append(createDiv()
                            .addClass('optionText')
                            .html(option));
            }
        );
    };

    var loadTable = function () {
        $('#lineNextBtn').hide();
        $('#questionSection').show();

        updateScoreFlag = true;

        var createInputBox = function () {
            return $(document.createElement('input'))
                .addClass('inputBox')
                .attr({
                          id: 'inputBox',
                          type: 'text'
                      });
        };

        var input_box1 = createInputBox();
        var input_box2 = createInputBox();

        var table_def = [
            ['Line Segments','Triangles'],
            ['4', '0'],
            ['8', '4'],
            ['12', '8'],
            ['16', '12'],
            ['20', input_box1],
            ['24', input_box2]
        ];

        var checkInputBox1 = function () {
            if (parseInt(input_box1.val()) == 16) {
                correct();
                input_box1.replaceWith('16');
                $('tr').show();
                updateScoreFlag = true;
                $('#linkCheck')
                    .unclickable()
                    .clickable(checkInputBox2);
            } else {
                incorrect();
            }
        };

        var checkInputBox2 = function () {
            if (parseInt(input_box2.val()) == 20) {
                correct();
                lessonOver();
            } else {
                incorrect();
            }
        };

        $('#questionSection')
            .empty()
            .append(makeTable(table_def))
            .append(createDiv('linkCheck')
                    .clickable(checkInputBox1));

        $('table tr:last-child').hide();
    };

    var lessonOver = function () {
        $('#questionSection')
            .empty()
            .append(createDiv('gameOver'));

        if (scoreboardScore() == scoreboardTotal()) {
            $('#gameOver').append(karma.createImg('gameOverSuccess'));

        } else {
            $('#gameOver').append(karma.createImg('gameOverTry'));
        }
    };

    $('#content')
        .empty()
	.append(createDiv('instructions')
		.html('Arrow मा क्लिक गर्दै बनेको आकारमा रेखा र त्रिभुज गन :'))
        .append(createDiv('lineNextBtn')
                .addClass('linkNext')
                .css({
                         position:'absolute',
                         left: 500,
                         top: 600
                     })
                .clickable(nextAction))
        .append(createDiv('outlineBackground')
                .append(createDiv('canvasBorder'))
                .append($(document.createElement('canvas'))
                        .attr({
                                  id: 'canvasDrawBox',
                                  height: 360,
                                  width: 360
                              })))
        .append(createDiv('questionSection')
                .css('display','block')
                .append(createDiv('question'))
                .append(createDiv('optionSection'))
                .append(createDiv('linkNextLesson')
                        .addClass('linkNext')
                        .clickable(selectQuestion))
                .hide());

    nextAction();
}

function makeTable(from_def) {
    var table = $(document.createElement('table'))
        .attr({ id: 'finalTable', cellpadding: '10' });
    var tbody=$(document.createElement('tbody'))
        .appendTo(table);

    $(from_def.map(
          function (row_def) {
              var tr = $(document.createElement('tr'));
              $(row_def.map(function (data) {
                                return $(document.createElement('td'))
                                    .html(data);
                            }
                           ))
                  .appendTo(tr);
              return tr;
          }
      )).appendTo(tbody);

    return table;
}

setUpLesson(initialize, startLesson);
