var answers = {
    boy: ['sleeping', 'running', 'crying', 'laughing'],
    monkey: ['climbing', 'eating', 'running', 'walking'],
    duck: ['swimming', 'flying', 'jumping', 'walking'],
    teacher: ['teaching', 'singing', 'dancing', 'playing'],
    man: ['He is riding a bicycle',
          'He is talking',
          'He is singing',
          'He is barking'],
    dog: ['barking', 'growling', 'laughing', 'jumping'],
    mother: ['cooking', 'eating', 'sleeping', 'drinking'],
               father: ['digging', 'running', 'cooking', 'sleeping'],
    baby: ['crying', 'clapping', 'running', 'jumping'],
    driver: ['driving', 'riding', 'carrying', 'reading']
};

function startLesson (karma) {
    var extensions = {
        displayGameOverMessage: function () {
            $('#linkNextLesson').hide();
            $('#content')
                .empty()
                .append(createDiv('gameOver').html('Game Over !!!'))
                .append(createDiv('gameOverInfo'))
                .show();
            scoreboardAppendGameOverMessage($('#gameOverInfo'));
        }
    };
    var tasks = objects.map(
        function (o) {
            return {
                question: o,
                options: answers[o],
                correct_option: answers[o][0]
            };
        }
    );
    var q = Karma
        .create(OneShotMCQuiz, extensions)
        .initialize(karma, {}, tasks);
    q.start();
}

setUpLesson(function () {}, startLesson);

