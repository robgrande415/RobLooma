function north(pos) { return { row: pos.row - 1, column: pos.column }; }
function east(pos) { return { row: pos.row, column: pos.column + 1 }; }
function south(pos) { return { row: pos.row + 1, column: pos.column }; }
function north_east(pos) { return north(east(pos)); }

var words = [
    {
        number: 11,
        word: 'eleven',
        position: {
            row: 0,
            column: 3
        },
        direction: east
    },
    {
        number: 12,
        word: 'twelve',
        position: {
            row: 2,
            column: 3
        },
        direction: south
    },
    {
        number: 13,
        word: 'thirteen',
        position: {
            row: 2,
            column: 3
        },
        direction: east
    },
    {
        number: 14,
        word: 'fourteen',
        position: {
            row: 9,
            column: 3
        },
        direction: east
    },
    {
        number: 15,
        word: 'fifteen',
        position: {
            row: 8,
            column: 3
        },
        direction: east
    },
    {
        number: 16,
        word: 'sixteen',
        position: {
            row: 7,
            column: 4
        },
        direction: north_east
    },
    {
        number: 17,
        word: 'seventeen',
        position: {
            row: 10,
            column: 2
        },
        direction: north
    },
    {
        number: 18,
        word: 'eighteen',
        position: {
            row: 3,
            column: 0
        },
        direction: south
    },
    {
        number: 19,
        word: 'nineteen',
        position: {
            row: 0,
            column: 1
        },
        direction: south
    },
    {
        number: 20,
        word: 'twenty',
        position: {
            row: 3,
            column: 10
        },
        direction: south
    }
];

var colors = ['green', 'purple', 'orange', 'brown'];

var alphabet = range(0, 26).map(
    function (i) {
        return String.fromCharCode('A'.charCodeAt(0) + i);
    }
);

function startLesson(karma) {
    $('#content')
        .empty()
        .append(createDiv('instructions')
                .html('Count the number of footballs in the box and find the ' +
                      'corresponding number word in the crossword puzzle.'))
        .append(createDiv('question'))
        .append(createDiv('main')
                .append(createDiv('left'))
                .append(createDiv('right')));
    words.forEach(
        function (description) {
            createDiv(description.word)
                .html(capitalize(description.word) +
                      ' (' + description.number + ')')
                .hide()
                .appendTo('#right');
        }
    );
    var remaining_words = Karma.shuffle(words);
    var current_word;

    var table = $(document.createElement('table')).appendTo('#left');
    var createCell = function () {
        return $(document.createElement('td'))
            .addClass('cell')
            .html(randomElement(alphabet));
    };
    var createRow = function () {
        var tr = $(document.createElement('tr'))
            .appendTo(table);
        return $(range(0, 11)).map(createCell)
            .appendTo(tr);
    };
    var cells = range(0, 11).map(createRow);

    var cellAt = function (position) {
        return cells[position.row][position.column];
    };

    words.forEach(
        function (description) {
            var position = description.position;
            var word = description.word;
            var word_selector = '.' + word;
            Array.prototype.forEach.call(
                word,
                function (letter) {
                    cellAt(position)
                        .addClass(word)
                        .hover(function () {
                                   $(word_selector).addClass('highlight');
                               },
                               function () {
                                   $(word_selector).removeClass('highlight');
                               })
                        .click(function () {
                                   if (word == current_word.word) {
                                       $(this).unbind('click');
                                       karma.play('correct');
                                       // TBD: maybe remove hover?
                                       $(word_selector)
                                           .removeClass('highlight')
                                           .addClass('done');
                                       $('#' + word)
                                           .show()
                                           .css({color: randomElement(colors)});
                                       nextWord();
                                   } else {
                                       karma.play('incorrect');
                                   }
                               })
                        .html(letter.toUpperCase());
                    position = description.direction(position);
                }
            );
        }
    );

    var nextWord = function () {
        if (remaining_words.length) {
            current_word = remaining_words.pop();
            $('#question')
                .empty();
            range(0, current_word.number).forEach(
                function () {
                    $('#question').append(karma.createImg('football')
                                          .addClass('football'));
                }
            );
        } else {
            $('#content').append(createDiv('over')
                                 .append(karma.createImg('gameOver')));
        }
    };
    nextWord();
}

setUpLesson(function () {}, startLesson);
