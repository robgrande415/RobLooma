var timer;
var tabs = [
    {
        name: 'animals',
        img: 'wild',
        items: [{ name: 'tiger', count: 2 },
                { name: 'elephant', count: 3 },
                { name: 'jackal', count: 2 },
                { name: 'bear', count: 1 },
                { name: 'rhino', count: 1 },
                { name: 'monkey', count: 3 },
                { name: 'turtle', count: 5 },
                { name: 'snake', count: 4 }]
    },
    {
        name: 'transportation',
        img: 'transportation',
        items: [{ name: 'aeroplane', count: 1 },
                { name: 'ship', count: 1 },
                { name: 'cart', count: 3 },
                { name: 'bus', count: 2 },
                { name: 'cycle', count: 5 },
                { name: 'boat', count: 5 },
                { name: 'tempo', count: 3 },
                { name: 'truck', count: 2 }]
    },
    {
        name: 'objects',
        img: 'objects',
        items: [{ name: 'desk', count: 1 },
                { name: 'bench', count: 1 },
                { name: 'brush', count: 5 },
                { name: 'soap', count: 3 },
                { name: 'kite', count: 4 },
                { name: 'bag', count: 1 },
                { name: 'book', count: 3 },
                { name: 'ladder', count: 2 }]
    }
];

function plural(word) {
    // Not general
    var last_char = word[word.length - 1];
    if (last_char == 's' || last_char == 'h') {
        return word + 'es';
    } else {
        return word + 's';
    }
}

function digitToWord(i) {
    var numbers = ['zero', 'one', 'two', 'three', 'four', 'five',
                   'six', 'seven', 'eight', 'nine', 'ten'];
    return numbers[i];
}

function correctAnswer(item) {
    var name = item.name;
    var count = item.count;
    return count == 1 ?
        'There is one ' + name :
        'There are ' + digitToWord(count) + ' ' + plural(name);
}

function currentAnswer() {
    var result = 'There';
    $('.dropObjects').map(
        function (i, object) {
            var draggable = $(object).data('draggable');
            if (draggable) {
                result += ' ' + $(draggable).html();
            }
        });
    return result;
}

function initialize(karma, content) {
    scoreboardInitialize({});
}

function startLesson(karma, content) {
    clearTimeout(timer);
    var selected_tab;

    var remaining_items;
    var current_item;

    var tries = 0;

    var createTab = function (spec) {
        return createDiv(spec.name)
            .addClass('tabBox')
            .append(karma.createImg(spec.img))
            .click(function () {
                       if (spec != selected_tab) {
                           selectTab(spec);
                       }
                   });
    };

    var selectTab = function (spec) {
        $('#questionSection').show();
        $('#gameOver').remove();
        clearTimeout(timer);
        scoreboardReset();
        $('.tabBox').removeClass('tabSelected');
        $('#' + spec.name).addClass('tabSelected');
        selected_tab = spec;
        remaining_items = Karma.shuffle(selected_tab.items);
        current_item = null;
        nextItem();
    };

    var nextItem = function () {
        tries = 0;
        if (remaining_items.length) {
            $('.dragObjects').remove();
            $('.dropObjects').remove();
            current_item = remaining_items.shift();
            var name = current_item.name;
            $('#imgItems')
                .empty()
                .append(karma.createImg(name)
                        .addClass('imgItem'));
            $('.questions')
                .empty()
                .append('How many ' + plural(name) + ' are there?');
            var words = ['is',
                         'are',
                         name,
                         plural(name)]
                .concat(randomElementsIncluding(range(0, 8).map(digitToWord),
                                                digitToWord(current_item.count),
                                                2));
            $(Karma.shuffle(words).map(
                  function (word) {
                      return createDiv()
                          .addClass('dragObjects')
                          .append(word);
                  }))
                .appendTo($('#dragAnswers'));

            $('#answerSection')
                .empty()
                .append(createDiv('dropThere')
                        .append(createDiv('dropThereText')
                                .append('There')));

            $(range(0, 3).map(
                  function () {
                      return createDiv()
                          .addClass('dropObjects');
                  }))
                .appendTo('#answerSection');

            enableSimpleDragAndDrop($('.dragObjects'),
                                    { containment: '#content' },
                                    $('.dropObjects'),
                                    { tolerance: 'intersect',
                                      hoverClass: 'drophover'});

            $('#answerSection')
                .append(createDiv('dot'));
            $('#linkCheck')
                .clickable(
                    function () {
                        ++tries;
                        $('#checkAnswer').empty();
                        if (currentAnswer() == correctAnswer(current_item)) {
                            if (tries == 1) {
                                scoreboardHit();
                            } else {
                                scoreboardMiss();
                            }
                            $('#linkCheck').unclickable();
                            karma.play('correct');
                            $('#checkAnswer')
                                .append(karma.createImg('correct'));
                            timer = setTimeout(function () {
                                                   $('#checkAnswer').empty();
                                                   nextItem();
                                               },
                                               1000);
                        } else {
                            karma.play('incorrect');
                            $('#checkAnswer')
                                .append(karma.createImg('incorrect'));
                            timer = setTimeout(function () {
                                                   $('#checkAnswer').empty();
                                               },
                                               1000);
                        }
                    });
        } else {
            gameOver();
        }
    };

    var gameOver = function () {
        $('#questionSection').hide();
        $('#content')
            .append(createDiv('gameOver')
                    .append('Game Over !!!')
                    .append(createDiv('gameOverInfo')));
        scoreboardAppendGameOverMessage($('#gameOverInfo'));
    };

    content
        .empty()
        .append(createDiv('instructions')
               .append('Click the following to select questions. Drag and drop the words for the correct answer.'))
        .append(createDiv('tabs'))
        .append(createDiv('section')
               .append(createDiv('imgItems'))
               .append(createDiv('questionSection')
                       .append(createDiv()
                               .addClass('questions'))
                       .append(createDiv('answerSection'))
                       .append(createDiv('dragAnswers'))))
        .append(createDiv('checkAnswer'))
        .append(createDiv('displayImgArea'));

    $('#linkCheck')
        .show()
        .unbind('click');

    $(tabs.map(createTab)).appendTo('#tabs');
    selectTab(tabs[0]);
}

setUpLesson(initialize, startLesson);
