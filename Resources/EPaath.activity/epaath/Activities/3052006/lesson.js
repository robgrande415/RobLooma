var pos = [
    { top: 1, left: 1 },
    { top: 150, left: 20 },
    { top: 1, left: 270 },
    { top: 10, left: 650 },
    { top: 30, left: 920 },
    { top: 220, left: 250 },
    { top: 220, left: 550 },
    { top: 220, left: 850 }
];

var timer;

function startLesson(karma) {
    clearTimeout(timer);
    var correctCounter = 0;

    $('#content')
        .empty()
        .append(createDiv('fishArea'))
        .append(createDiv('dropFish')
                .droppable(
                    {
                        tolerance: 'intersect',
                        drop: function(event, ui) {
                            $('.fish').draggable('disable');
                            if (ui.draggable.data('correct')) {
                                correctCounter++;
                                $('#scoreBox').html(Karma.convertNumToLocale(correctCounter, 'ne'));
                                karma.play('eat');
                            } else {
                                karma.play('complain');
                            }
                            timer = setTimeout(nextQuestion, 1000);
                        }
                    }
                ))
        .append(createDiv('instructionTxt')
               .append('माछालाई कर्सरले तानेर गोहीको मुखमा राख'))
        .append(createDiv('scoreBox')
                .html(Karma.convertNumToLocale(correctCounter, 'ne')));

    var nextQuestion = function(){
        if(correctCounter == 10){
            karma.play('byebye');
            $('#content')
                .empty()
                .append(createDiv('gameOver'));
        } else {
            $('.fish').remove();
            var positions = Karma.shuffle(pos).slice(0, 4).map(
                function (p) {
                    return createDiv()
                        .addClass('fishPos')
                        .css(p)
                        .appendTo($('#fishArea'));
                }
            );
            var numbers = Karma.shuffle(range(0, 100)).slice(0, positions.length);
            var max = Math.max.apply([], numbers);
            positions
                .forEach(function (position, i) {
                             var number = numbers[i];
                             createDiv()
                                 .addClass('fish')
                                 .addClass('fish' + randomElement(['Left', 'Right']))
                                 .data('correct', number == max)
                                 .html(Karma.convertNumToLocale(number, 'ne'))
                                 .draggable({ containment: '#content' })
                                 .appendTo(position);
                         });
        }
    };

    karma.play('instruction');

    timer = setTimeout(nextQuestion, 4000);
}

setUpLesson(function () {}, startLesson);
