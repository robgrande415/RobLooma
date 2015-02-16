var tasks = [
    {
        question: 'Where is the house?',
        options: ['near', 'behind', 'inside', 'outside'],
        answer_template: 'It\'s _ the mountain.'
    },
    {
	question: 'Where is the tree?',
        options: ['in front of', 'in', 'under', 'above'],
        answer_template: 'It\'s _ the house.'
    },
    {
	question: 'Where is the mat?',
        options: ['on', 'behind', 'near', 'beside'],
        answer_template: 'It\'s _ the veranda.'
    },
    {
        question: 'Where is the mountain?',
        options: ['behind', 'in front of', 'on', 'under'],
        answer_template: 'It\'s _ the house.'
    },
    {
        question: 'Where is the sky?',
        options: ['above', 'below', 'on', 'under'],
        answer_template: 'It\'s _ the mountain.'
    },
    {
        question: 'Where are the flowers?',
        options: ['in', 'behind', 'below', 'beside'],
        answer_template: 'They are _ the garden.'
    },
    {
        question: 'Where is the table?',
        options: ['under', 'on', 'above', 'in'],
        answer_template: 'It\'s _ the tree.'
    },
    {
        question: 'Where is the gate?',
        options: ['beside', 'in front of', 'below', 'under'],
        answer_template: 'It\'s _ the tap.'
    }
].map(function (x) {
          x.correct_option = x.options[0];
          return x;
      }
     );

var positions = [
    {
        name: 'mountain',
        position: {
            left: 165,
            top: 60,
            width: 250,
            height: 70
        }
    },
    {
        name: 'house',
        position: {
            left: 50,
            top: 135,
            width: 305,
            height: 165
        }
    },
    {
        name: 'veranda',
        position: {
            left: 190,
            top: 330,
            width: 170,
            height: 80
        }
    },
    {
        name: 'tree',
        position: {
            left: 380,
            top: 140,
            width: 200,
            height: 200
        }
    },
    {
        name: 'bench',
        position: {
            left: 415,
            top: 360,
            width: 95,
            height: 30
        }
    },
    {
        name: 'garden',
        position: {
            left: 0,
            top: 390,
            width: 170,
            height: 160
        }
    },
    {
        name: 'gate',
        position: {
            left: 210,
            top: 430,
            width: 280,
            height: 125
        }
    },
    {
        name: 'tap',
        position: {
            left: 500,
            top: 455,
            width: 75,
            height: 95
        }
    }
];

function startLesson(karma) {
    var extensions = {
        start: function () {
            $('#content')
                .empty()
                .removeClass('backOpaque');
            createDiv('section')
                .append(createDiv('topText')
                        .html('Click on the answer you think is correct.'))
                .append(createDiv('imgStory'))
                .append(createDiv('rightBar')
                        .append(createDiv('question'))
                        .append(createDiv('answer'))
                        .append(createDiv('optionSection')))
            .append()
                .appendTo('#content');
            positions.forEach(
                function (position) {
                    var label = createDiv()
                        .addClass('objectLabel')
                        .html(position.name);
                    createDiv()
                        .addClass('objectBox')
                        .css(position.position)
                        .append(label)
                        .hover(function () {
                                   $(this).addClass('objectBoxHover');
                                   label.show();
                               },
                              function () {
                                  $(this).removeClass('objectBoxHover');
                                  label.hide();
                              })
                        .appendTo('#imgStory');
                }
            );
            MCQuiz.start.apply(this, []);
        },
        presentQuestion: function (what) {
            var task = this.currentTask();
            $('#question')
                .empty()
                .append((scoreboardTotal() + 1) + '. ' + what);
            $('#answer')
                .empty()
                .append(task.answer_template.replace('_', '...........'));
            $('#check')
                .empty();
            $('#linkNextLesson').hide();
        },
        currentMessage: function () {
            var task = this.currentTask();
            return task.answer_template.replace('_', task.correct_option);
        },
        displayGameOverMessage: function () {
            $('#linkNextLesson').hide();
            $('#question').empty();
            $('#answer').empty();
            $('#optionSection')
                .empty()
                .append(createDiv('gameOver').html('Game Over !!!'))
                .append(createDiv('gameOverInfo'))
                .show();
            scoreboardAppendGameOverMessage($('#gameOverInfo'));
        }
    };
    var q = Karma
        .create(OneShotMCQuiz, extensions)
        .initialize(karma, {}, tasks);
    q.start();
}

setUpLesson(function () {}, startLesson);
