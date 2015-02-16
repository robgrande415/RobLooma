var tasks = [
    {
        question: 'The teacher and the students are _ at the bus stop.',
        options: ['standing', 'sleeping', 'running', 'eating']
    },
    {
        question: 'They are _ for the bus.',
        options: ['waiting', 'walking', 'crying', 'under']
    },
    {
        question: 'One bus is _ the school.',
        options: ['leaving', 'running', 'going', 'coming']
    },
    {
        question: 'Another bus is _ towards the children.',
        options: ['coming', 'parked', 'carrying', 'waiting']
    },
    {
        question: 'A car is _ on the other side of the road.',
        options: ['parked', 'walking', 'crying', 'under']
    },
    {
        question: 'The school building is _ the tree.',
        options: ['behind', 'below', 'beside', 'in']
    },
    {
        question: 'It is a _ day.',
        options: ['sunny', 'rainy', 'windy', 'shadow']
    },
    {
        question: 'The sun is _ in the sky.',
        options: ['shining', 'crying', 'hiding', 'lightening']
    },
    {
        question: 'The teacher is _ an umbrella.',
        options: ['carrying', 'playing', 'throwing', 'hiding']
    },
    {
        question: 'The teacher says "Let the bus _ to a stand still."',
        options: ['come', 'go', 'run', 'coming']
    }
].map(function (x) {
          x.correct_option = x.options[0];
          return x;
      });

function startLesson(karma) {
    var extensions = {
        start: function () {
            $('#content')
                .empty()
                .removeClass('backOpaque');
            createDiv('section')
                .append(createDiv('topText')
                        .html('Choose the right word to fill in the blank' +
                              ' space.'))
                .append(createDiv('question'))
                .append(createDiv('optionSection'))
                .append(createDiv('imgSentence')
                        .append(karma.createImg('main')))
                .appendTo('#content');
            MCQuiz.start.apply(this, []);
        },
        presentQuestion: function (what) {
            var task = this.currentTask();
            $('#question')
                .empty()
                .append(task.question.replace('_', '...........'));
            $('#check')
                .empty();
            $('#linkNextLesson').hide();
        },
        displayMessage: function () {
            var task = this.currentTask();
            $('#question')
                .empty()
                .append(task.question.replace('_', task.correct_option));
        },
        displayGameOverMessage: function () {
            $('#linkNextLesson').hide();
            $('#question').hide();
            $('#topText').hide();
            $('#imgSentence').hide();
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
        .initialize(karma, { tasks_in_order: true }, tasks);
    q.start();
}

setUpLesson(function () {}, startLesson);
