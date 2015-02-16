var object_counts = {
    ball: 2,
    banana: 3,
    cup: 2,
    flower: 1,
    glass: 2
};

function makeList(n, object) {
    return range(0, n).map(function () { return object; });
}

function flatten(list_of_lists) {
    return Array.prototype.concat.apply([], list_of_lists);
}

function startLesson(karma) {
    $('#content')
        .empty()
        .append(createDiv('imageSection')
			.append(createDiv('questionText')
                                .text('माथिका वस्तुलाई पालै पालो कर्सरले तानेर ग्राफमा मिलाएर राख')))
        .append(createDiv('questionSection')
                .hide())
        .append(createDiv('barGraphSection')
                .append(createDiv('numbersSection'))
                .append(createDiv('barGraph'))
                .append(createDiv('objectsSection')));

    var displayDraggableImages = function () {
        var images = flatten(
            objects.map(function (object) {
                            return makeList(object_counts[object], object);
                        })
        );
        Karma.shuffle(images).forEach(
            function (img) {
                karma.createImg(img)
                    .data('key', img)
                    .addClass(img)
                    .addClass('dragObjects')
                    .draggable(
                        {
                            containment: '#barGraph',
                            scroll: false,
                            revert: 'invalid',
                            start: function () {
                                $(this).css({ backgroundColor: '#93D7F9' });
                            },
                            stop: function () {
                                $(this).css({ backgroundColor: '#CAFFCE' });
                            }
                        })
                    .appendTo($('#imageSection'));
            }
        );
    };

    var column_count = objects.length * 2 + 1;
    var row_count = 7;

    var cells;

    var createCell = function (column) {
        var accept = column % 2 == 1 ? objects[Math.floor(column / 2)] : null;
        return createDiv()
            .addClass('dropObjects')
            .droppable(
                {
                    tolerance: 'intersect',
                    hoverClass: 'drophover',
                    drop: function (event, ui) {
                        var dragged = ui.draggable;
                        if (accept == dragged.data('key')) {
                            karma.play('correct');
                            var r = row_count - 1
                                - $('.' + accept, $('#barGraph')).length;
                            dragged
                                .draggable('disable')
                                .css({ left: 0, top: 0, marginLeft: 0 })
                                .appendTo(cells[r][column]);
                            if ($('.dragObjects', $('#barGraph')).length == 10) {
                                startQuestions();
                            }
                        } else {
                            karma.play('incorrect');
                            dragged.css({ top: 5, left: 5 });
                        }
                    }
                }
            )
            .appendTo($('#barGraph'));
    };

    var createRow = function () {
        return range(0, column_count).map(createCell);
    };

    var displayBarGraph = function () {
        cells = range(0, row_count).map(createRow);
        range(1, row_count + 1).reverse()
            .forEach(function (i) {
                         createDiv()
                             .addClass('numbers answerButton')
                             .data('key', i)
                             .html(i)
                             .appendTo($('#numbersSection'));
                     });
       objects.forEach(
           function (object) {
               karma.createImg(object)
                   .addClass('objects answerButton')
                   .data('key', object)
                   .appendTo($('#objectsSection'));
           }
       );
    };

    var tasks;
    var currentTask;
    var startQuestions = function () {
        $('#questionSection').show();
        tasks = [{ question: 'बल कति वटा छन् ?', answer: 2 },
                 { question: 'केरा कति वटा छन् ?', answer: 3 },
                 { question: 'कप  कति वटा छन् ?', answer: 2 },
                 { question: 'फुल कति वटा छन् ?', answer: 1 },
                 { question: 'गिलास  कति वटा छन् ?', answer: 2 },
                 { question: 'केरा फुल भन्दा कति  बढी ?', answer: 2 },
                 { question: 'फुल भन्दा बल कति बढी ?', answer: 1 },
                 { question: 'गिलास केरा भन्दा कति कम ?', answer: 1 },
                 { question: 'कप र फुलमा कुन बढी ?', answer: 'cup' },
                 { question: 'केरा र बलमा कुन बढी ?', answer: 'banana' }];
        $('.answerButton')
            .clickable(function () {
                           if ($(this).data('key') == currentTask.answer) {
                               karma.play('correct');
                               nextTask();
                           } else {
                               karma.play('incorrect');
                           }
                       });
        nextTask();
    };
    var nextTask = function () {
        if (tasks.length) {
            currentTask = tasks.shift();
            $('#questionSection')
                .empty()
                .append(createDiv('questionText')
                        .append('ग्राफमा भएको सङ्ख्यामा क्लिक गरेर उत्तर देऊ'))
                .append(createDiv()
                        .addClass('questions')
                        .append(currentTask.question));
        } else {
            $('.answerButton').unclickable();
	    $('#questionSection')
                .empty()
                .append(createDiv()
                        .addClass('questions')
                        .append('बधाई छ तिमीले सबै प्रश्नको  जवाफ दियौ '));
        }
    };

    displayDraggableImages();
    displayBarGraph();
}

setUpLesson(function () {}, startLesson);
