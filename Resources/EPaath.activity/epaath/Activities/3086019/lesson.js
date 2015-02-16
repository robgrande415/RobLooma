var question1 = [10, 2, 150, 50, 500, 1500, 12, 120, 250, 40];
var question2 = [3, 16, 62, 59, 127, 355, 400, 757, 935, 1205];
var count_correct;
var clock = null;

function showQuestions(karma, content, questions) {
    if(clock == null){
        clock = createClock();
    }
    clock.reset();
    clock.show();
    clock.start();
    content
        .append(createDiv('section')
                .append(createDiv('gameArea')
                        .append(createDiv('topText')
                                .append($(document.createElement('span'))
                                        .addClass('heading')
                                        .append('तिम्रो सम्झना शक्तिको जाँच :'))
                                .append($(document.createElement('br')))
                                .append($(document.createElement('span'))
                                        .addClass('instruction')
                                        .append('तलका बाकसमा भएका गुच्चाको सङ्ख्या हिन्दू अरेबिक सङ्ख्याले जनाइको छ। दिइएको हिन्दू अरेबिक सङ्ख्याहरू बराबर रोमन सङ्ख्याहरू टाइप गरेर पक्का हो बटनमा क्लिक गर ।')))))
        .append(createDiv('confirmBtn')
                .click(function () { checkAnswers(); }))
        .append(createDiv('imgStory'));

    var createTextBox = function () {
        return $(document.createElement('input'))
            .attr({
                      type: 'text',
                      maxlength: 10,
                      size: 10
                  })
            .addClass('textBox');
    };

    var createCheckBox = function (img_name) {
        return createDiv()
            .addClass('check')
            .append(karma.createImg(img_name));
    };

    var checkAnswer = function (answer_box) {
        if ($(answer_box).data('checked')) {
            return;
        }
        var correct_answer = $(answer_box).data('correctAnswer');
        var feedback;
        if (correct_answer == $(answer_box).val().toUpperCase()) {
            feedback = createCheckBox('correct');
            count_correct++;
        } else {
            feedback = $()
                .add(createCheckBox('incorrect'))
                .add(createTextBox().val(correct_answer))
                .add(createCheckBox('correct'));
        }
        feedback.appendTo($(answer_box).parent());
        $(answer_box).data('checked', true);
        setTimeout(function () {
                       feedback.remove();
                       $(answer_box).data('checked', false);
                   },
                   3000);
    };

    var checkAnswers = function () {
        count_correct = 0;
        $('.ansBox').map(function (i, answer_box)  { checkAnswer(answer_box); });
        if(count_correct == $('.ansBox').length) {
            gameOver();
        }
    };

    var gameOver = function () {
        clock.stop();
        var hms = clock.hoursMinutesSeconds();
        content
            .append(createDiv('gameOver')
                    .append(karma.createImg('gameOver'))
                    .append(createDiv()
                            .addClass('specialText')
                            .html('Total time taken '
                                  + hms.hours + ' hours '
                                  + hms.minutes + ' minutes '
                                  + hms.seconds + ' seconds.')
                            )
                    .append(createDiv()
                            .html('Click next/back button to play another set.')
                            )
                    .show());
        $("#confirmBtn").hide();
    };

    var createQuestion = function (x) {
        $('#gameArea')
            .append(createDiv()
                    .addClass('imgArea')
                    .append(createDiv()
                            .addClass('quesBox')
                            .html(x))
                    .append(createTextBox()
                            .addClass('ansBox')
                            .data('correctAnswer', toRoman(x))
                            .focus(function() {
                                       $(this).addClass("focus");
                                   })
                            .blur(function() {
                                      $(this).removeClass("focus");
                                  })));
    };

    Karma.shuffle(questions).forEach(createQuestion);
}

function initialScreen(karma, content) {
    if(clock != null) {
        clock.hide();
    }
    content
		.append(createDiv('pageHeading').html("रोमन सङ्ख्या"))
        .append(createDiv('frontDisplay')
                .append(karma.createImg('imgFront'))
                );
}

setUpMultiScreenLesson(
    [initialScreen,
     function (karma, content) { showQuestions(karma, content, question1); },
     function (karma, content) { showQuestions(karma, content, question2); }]);

