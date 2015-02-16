var LEVELS = 5;

var boxes = [
    {
        width: '3.7em',
        height: '2.6em',
        right: '11em',
        bottom: '.9em'
    },
    {
        width: '3.3em',
        height: '2.8em',
        right: '7.5em',
        bottom: '1.6em'
    },
    {
        width: '3.8em',
        height: '2.9em',
        right: '3.5em',
        bottom: '3.0em'
    },
    {
        width: '3.8em',
        height: '2.6em',
        right: '3.5em',
        bottom: '0.1em'
    },
    {
        width: '3.3em',
        height: '2.6em',
        right: '0.1em',
        bottom: '1.6em'
    }
];

function initialize() {
    scoreboardInitialize({});
}

function createSpan(id) {
    return $(document.createElement('span'))
        .attr('id', id);
}

function createOptionBox(css) {
    return createDiv()
        .addClass('optionBox')
        .css(css);
}

function combinations(list1, list2) {
    var result = [];
    list1.forEach(function (x1) {
                      list2.forEach(function (x2) {
                                        result.push([x1, x2]);
                                    });
                  });
    return result;
}

function all_tasks_for_level(level) {
    var r = range((level - 1) * 2, level * 2 + 1);
    var result = Karma.shuffle(combinations(r, r));
    return result.map(
        function (combination) {
            var x1 = combination[0];
            var x2 = combination[1];
            var sum = x1 + x2;
            return {
                x1: x1,
                x2: x2,
                correct_option: sum,
                options: randomElementsIncluding(range(level * 2,
                                                       (level + 1) * 3 + 1),
                                                 sum,
                                                 5)
            };
        }
    );
}

function task_generator_for_level(level) {
    var tasks = all_tasks_for_level(level);
    var i = 0;
    return function () {
        var result = tasks[i];
        i = (i + 1) % tasks.length;
        return result;
    };
}

var timer;

function startLesson(karma) {
    clearTimeout(timer);
    scoreboardReset();
    $('#content')
        .empty()
        .append(createDiv('instructions')
                .append('जोड र सही उत्तरमा क्लिक गर'))
        .append(createDiv('questArea')
                .append(createSpan('number1').html(' &nbsp;&nbsp; '))
                .append(createSpan('plussign').html(' + '))
                .append(createSpan('number2').html(' &nbsp;&nbsp; ')))
        .append(createDiv('optionArea'));

    var option_boxes = $(boxes).map(function (i, css) {
                                        return createOptionBox(css);
                                    })
        .appendTo('#optionArea');

    var level = 1;
    var correct_count = 0;

    var task_generator = task_generator_for_level(level);
    var current_task;

    var gameOver = function () {
        karma.play('byebye');
        $('#content')
            .empty()
            .append(createDiv('gameOver')
                    .html('GAME OVER'));
    };

    var nextTask = function() {
        if (correct_count == 5) {
            level++;
            correct_count = 0;
            if (level > LEVELS) {
                gameOver();
                return;
            }
            task_generator = task_generator_for_level(level);
        }
        current_task = task_generator();
        $('#number1').html(current_task.x1);
        $('#number2').html(current_task.x2);
        current_task.options.forEach(
            function (option, i) {
                option_boxes[i]
                    .html(option)
                    .clickable(function () {
                                   $('.optionBox').unclickable();
                                   if (option == current_task.correct_option) {
                                       correct_count++;
                                       scoreboardHit();
                                       karma.play('correct');
                                   } else {
                                       scoreboardMiss();
                                       karma.play('incorrect');
                                   }
                                   timer = setTimeout(nextTask, 1000);
                               });
            }
        );
    };

    nextTask();
}

setUpLesson(initialize, startLesson);
