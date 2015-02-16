var tasks = [
    {
        sentence: 'The _ and the students are standing at the _.',
        answers: ['teacher', 'bus stop']
    },
    {
        sentence: 'They _ waiting _ the bus.',
        answers: ['are', 'for']
    },
    {
        sentence: ' _ bus is already _ the school.',
        answers: ['One', 'leaving']
    },
    {
        sentence: ' _ bus is _ towards the children.',
        answers: ['Another', 'coming']
    },
    {
        sentence: 'A _ is parked on the _ side of the road.',
        answers: ['car', 'other']
    },
    {
        sentence: 'The school _ is behind the _.',
        answers: ['building', 'tree']
    },
    {
        sentence: 'The sun is shining _ the _.',
        answers: ['in', 'sky']
    },
    {
        sentence: 'The _ carrying an _.',
        answers: ['teacher is', 'umbrella']
    },
    {
        sentence: 'They teacher says \'Let the _ come to a _\'.',
        answers: ['bus', 'standstill']
    },
    {
        sentence: 'There are two _ on the _.',
        answers: ['buses', 'road']
    }
];

function words() {
    return Array.prototype.concat.apply([],
                                        tasks.map(function (task) {
                                                      return task.answers;
                                                  }));
}

function initialize(karma, content) {
}

function startLesson(karma, content) {
    var remaining_tasks = tasks.slice();
    var current_task;

    content
        .empty()
        .append(createDiv('section')
                .append(createDiv('topText')
                        .append('Choose the right word from the "word bank" '
                                + 'to fill in the blank space.'))
                .append(createDiv('imgSentence')
                       .append(karma.createImg('main')))
                .append(createDiv('question')
                        .addClass('questionText'))
                .append(createDiv('wordBankText')
                        .append('Word Bank'))
		.append(createDiv('gameOverInfo')
                        .append('Great job! Click \'Play Again\' to restart.'))
                .append(createDiv('sideBar')));

    var createDraggable = function (word) {
        return createDiv()
            .addClass('wordBankTxt')
            .append(word)
            .draggable({ containment: '#content',
                         revert: 'invalid' });
    };

    var createDroppable = function (word) {
        return $(document.createElement('span'))
            .addClass('dropBox')
            .droppable({
                           tolerance: 'intersect',
                           hoverClass: 'drophover',
                           drop: function (event, ui) {
                               var draggable = ui.draggable;
                               if (word == draggable.html()) {
                                   karma.play('correct');
                                   draggable
                                       .hide();
                                   $(this)
                                       .text(word)
                                       .addClass('correct')
                                       .css({ padding: '0px 20px',
                                              width: 200 });
                               } else {
                                   karma.play('incorrect');
                                   draggable.animate({ left: 0, top: 0 });
                               }
                               if ($('.correct').length == 2) {
                                   if (remaining_tasks.length) {
                                       $('#linkNextLesson').show();
                                   } else {
                                       gameOver();
                                   }
                               }
                           }
                       });
    };

    var next = function () {
        current_task = remaining_tasks.shift();
        $('#sideBar')
            .empty();
        $(Karma.shuffle(words()).map(createDraggable))
            .appendTo($('#sideBar'));
        $('#question')
            .empty();
        var parts = current_task.sentence.split('_');
        $('#question')
            .append(parts[0])
            .append(createDroppable(current_task.answers[0]))
            .append(parts[1])
            .append(createDroppable(current_task.answers[1]))
            .append(parts[2]);
    };

    var gameOver = function () {
        $('#question')
            .empty();
        $('#linkNextLesson').hide();
        $('#gameOverInfo').fadeIn(1000);
    };

    $('#linkNextLesson')
        .hide()
        .clickable(function () {
                       $(this).hide();
                       next();
                   });

    next();
}

setUpLesson(initialize, startLesson);
