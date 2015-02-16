var busy = false;
var answers = [
    'Preeti is cleaning the house.',
    'Preeti is making tea.',
    'Preeti is teaching her children.',
    'Preeti is cooking food.',
    'Preeti is eating.',
    'Preeti is working.',
    'Preeti is collecting grass.',
    'Preeti is feeding cows.',
    'Preeti is playing with her children.',
    'Preeti is helping her children do school work.',
    'Preeti is preparing dinner.',
    'Preeti is eating.',
    'Preeti is reading a book.',
    'Preeti is telling a story to her children.',
    'Preeti is sleeping.'
];

var words = [
    'drinking',
    'studying',
    'swimming',
    'singing',
    'chasing',
    'riding',
    'crying',
    'looking',
    'flying',
    'pouring',
    'talking',
    'sweeping',
    'teaching',
    'fighting',
    'dancing'
];

var tasks = [
    {
        question: 'What is the cow doing?',
        answer_template: 'The cow is _ water.',
        answer: 'drinking'
    },
    {
        question: 'What are the children doing?',
        answer_template: 'The children are _.',
        answer: 'studying'
    },
    {
        question: 'What is the boy doing?',
        answer_template: 'The boy is _ in a pool.',
        answer: 'swimming'
    },
    {
        question: 'What is the lady doing?',
        answer_template: 'The lady is _.',
        answer: 'singing'
    },
    {
        question: 'What is the cat doing?',
        answer_template: 'The cat is _ the mouse.',
        answer: 'chasing'
    },
    {
        question: 'What is the girl doing?',
        answer_template: 'The girl is _ a bicycle.',
        answer: 'riding'
    },
    {
        question: 'What is the child doing?',
        answer_template: 'The child is _.',
        answer: 'crying'
    },
    {
        question: 'What is the man doing?',
        answer_template: 'The man is _ out of the window.',
        answer: 'looking'
    },
    {
        question: 'What is the bird doing?',
        answer_template: 'The bird is _ in the sky.',
        answer: 'flying'
    }
];

var player = {
    is_playing: false,
    initialize: function (karma) {
        this.karma = karma;
    },
    play: function (name, ended_callback) {
        var that = this;
        if (!this.is_playing) {
            this.is_playing = true;
            var audio = this.karma.audio[name].media;
            var callback = function () {
                that.is_playing = false;
                audio.removeEventListener('ended', callback, true);
                if (ended_callback) {
                    ended_callback();
                }
            };
            audio.addEventListener('ended', callback, true);
            this.karma.play(name);
        }
    },
    playSequence: function (specs) {
        var that = this;
        if (specs.length) {
            var spec = specs[0];
            var rest = function () { that.playSequence(specs.slice(1)); };
            if (spec.kind == 'audio') {
                that.play(spec.name, rest);
            } else if (spec.kind == 'delay') {
                setTimeout(rest, spec.milliseconds);
            } else if (spec.kind == 'callback') {
                spec.fun();
                rest();
            }
        }
    }
};


function makeScreen(screen_i) {
    return function (karma, content) {
        player.initialize(karma);
        content
            .append(createDiv('instruction')
                    .append('Click on the button below each picture and listen'))
            .append(createDiv('topText').append('Preeti is busy all day.'))
            .append(createDiv('imgLesson'))
            .append(createDiv('lessonDisplay'));

        var createPicture = function (i) {
            var clicked = function () {
                // TBD: add visual feedback to show which picture is
                // selected.
                var answer = answers[i - 1];
                if (busy) {
                    return;
                }
                busy = true;
                var createReplayButton = function (name) {
                    return createDiv()
                        .addClass('volume')
                        .click(function () {
                                   if (!busy) {
                                       busy = true;
                                       player.play(name,
                                                   function () { busy = false; });
                                   }
                               });
                };
                var displayQuestion = function () {
                    $('#lessonDisplay')
                        .empty()
                        .append(createDiv()
                                .addClass('lessonQuestion')
                                .append(createReplayButton('what_is_preeti_doing'))
                                .append('What is Preeti doing?'));
                };
                var displayAnswer = function () {
                    $('#lessonDisplay')
                        .append(createDiv()
                                .addClass('lessonAnswer')
                                .append(createReplayButton(i))
                                .append(answer));
                };
                player.playSequence(
                    [{ kind: 'callback', fun: displayQuestion },
                     { kind: 'audio', name: 'what_is_preeti_doing' },
                     { kind: 'delay', milliseconds: '500' },
                     { kind: 'callback', fun: displayAnswer },
                     { kind: 'audio', name: i },
                     { kind: 'callback', fun: function () { busy = false; } }]
                );
            };
            return createDiv()
                .addClass('imgLessonObject')
                .append(karma.createImg(i))
                .append(createDiv()
                        .append(karma.createImg('clickToListen')
                                .addClass('imgClickToPlay')
                                .click(clicked)));
        };
        var begin = 5 * screen_i + 1;
        $(range(begin, begin + 5).map(createPicture))
            .appendTo('#imgLesson');
    };
}

function exerciseScreen(karma, content) {
    displayExerciseScreen(karma, content, 0);
}

function displayExerciseScreen(karma, content, screen_i) {
    content
        .empty()
        .append(createDiv('instruction')
                .append('Drag and drop the right words from the Word Bank '
                        + 'to fill in the blanks'))
        .append(createDiv('exercise')
                .append($(document.createElement('span'))
                        .attr('id', 'wordBankText')
                        .append('Word Bank'))
                .append(createDiv('sideBar')))
        .append(createDiv('imgExercise'));

    $(Karma.shuffle(words)
      .map(function (word) {
               return createDiv()
                   .addClass('wordBankTxt')
                   .draggable({
                                  containment: '#content',
                                  revert: 'invalid'
                              })
                   .html(word);
               ;
           })).appendTo($('#sideBar'));

    var begin = screen_i * 3;
    $(range(begin, begin + 3)
      .map(function (i) {
               return karma.createImg('exe' + (i + 1))
                   .addClass('imgObject');
           })).appendTo($('#imgExercise'));

    var createAnswer = function (i) {
        var answer_template = tasks[i].answer_template;
        var pos = answer_template.indexOf('_');
        var answer = tasks[i].answer;
        return createDiv()
            .append(answer_template.slice(0, pos))
            .append($(document.createElement('span'))
                    .addClass('dropBox')
                    .droppable({
                                   tolerance: 'touch',
                                   hoverClass: 'drophover',
                                   drop: function (event, ui) {
                                       var dropped = ui.draggable;
                                       if (dropped.html() == answer) {
                                           dropped.hide();
                                           $(this)
                                               .addClass('answer')
                                               .text(answer);
                                           karma.play('correct');
                                           if ($('.answer').length == 3) {
                                               setTimeout(nextScreen, 1000);
                                           }
                                       } else {
                                           karma.play('incorrect');
                                           dropped.css({ top: 0, left: 0 });
                                       }
                                   }
                               }))
            .append(answer_template.slice(pos + 1))
        ;
    };

    var nextScreen = function () {
        var specialText = function (x) {
            return $(document.createElement('span'))
                .addClass('specialText')
                .append(x);
        };
        if (screen_i == 2) {
            content
                .empty()
                .append(createDiv('gameOverInfo')
                        .append(specialText(' Great Job!!!'))
                        .append(' Click ')
                        .append(specialText(' "Play Again" '))
                        .append(' to restart.'));
        } else {
            displayExerciseScreen(karma,
                                  content,
                                  screen_i + 1);
        }
    };
    content.append(createDiv('exercises'));
    range(begin, begin + 3)
        .forEach(function (i) {
                     createDiv()
                         .addClass('question')
                         .append(i + 1)
                         .append('.  ')
                         .append(tasks[i].question)
                         .append(createAnswer(i))
                         .appendTo($('#exercises'));
                 });
}

setUpMultiScreenLesson(range(0, 3).map(makeScreen).concat([exerciseScreen]));
