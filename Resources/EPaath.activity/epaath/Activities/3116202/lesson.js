var month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

var gameContentDiv;

function startLesson(karma, contentDiv) {
    var createMonthLessonBox = function (month_name) {
        return createDiv('monthLesson' + month_name)
            .addClass('imgArea')
            .append(createDiv('title')
                    .text(month_name)
                    .addClass('monthsName')
                    .clickable(function () { karma.play(month_name); }))
            .append(karma.createImg(month_name).addClass('imgBox'));
    };

    contentDiv
        .append(createDiv('main')
                .append(createDiv('heading')
                        .text('Learn the spelling and order of the months.')
                        .addClass('topText'))
                .append(createDiv('monthLessonBoxes')));

    $(month_names.map(createMonthLessonBox)).appendTo($('#monthLessonBoxes'));
}

function startGame(karma, contentDiv) {
    if (contentDiv != null) {
        gameContentDiv = contentDiv;
    }
    var ordinalSuffix = function (num) {
        num = num % 100;
        if (num >= 11 && num <= 13) {
            return 'th';
        }
        switch (num % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        }
        return 'th';
    };
    var createMonthDropBox = function (month_name, i) {
        var index = i + 1;
        return createDiv('monthDrop' + month_name).addClass('dropMonthArea')
            .append(Karma.createImg('small_' + month_name).addClass('imgSmall'))
            .append(createDiv()
                    .text(index + ordinalSuffix(index))
                    .addClass('orderTxt'))
            .append(createDiv('drop' + index)
                    .addClass('dropObjects')
                    .data('monthName', month_name))
            .append($(document.createElement('span')).addClass('check'));
    };
    var makeMonthDraggable = function (month) {
        month
            .addClass('dragObjects')
            .draggable({ containment: '#content', revert: 'invalid' });
    };

    var createSpan = function (text) {
       return $(document.createElement('span')).text(text);
    };

    var createMonthDragBox = function (month_name) {
        var i = Karma.random(0, month_name.length - 1);

        var prefix = month_name.substring(0, i);
        var missing_char = month_name[i];
        var suffix = month_name.substring(i + 1);

        var result = createDiv()
            .data('monthName', month_name)
            .addClass('month')
            .addClass('unfinished')
            .append(createSpan(prefix))
            .append($(document.createElement('input'))
                    .attr({ type: 'text',
                            maxlength: 1 })
                    .addClass('blankBox')
                    .Watermark('?')
                    .clickable(function () { $(this).select(); })
                    .keypress(function (event) {
                                  if (event.which == 8 || event.which == 0) {
                                      // Backspace or tab
                                      return;
                                  }
                                  var ch = String.fromCharCode(event.which);
                                  if (ch.toLowerCase() == missing_char.toLowerCase()) {
                                      karma.play('correct');
                                      result
                                          .empty()
                                          .append(month_name);
                                      makeMonthDraggable(result);
                                  } else {
                                      karma.play('incorrect');
                                      $(this)
                                          .addClass('incorrectLetter')
                                          .Watermark(ch, 'red')
                                          .select();
                                  }
                              }))
            .append(createSpan(suffix));
        return result;
    };

    gameContentDiv.empty()
        .append(createDiv('main')
                .append(createDiv('heading')
                        .text('Type in the missing letter then drag and drop'
                              + ' the months in the right order:')
                        .addClass('topText'))
                .append(createDiv('gameArea')
                        .append(createDiv('dragMonthArea'))));

    $(month_names.map(createMonthDropBox)).appendTo($('#gameArea'));

    var remaining_month_names = Karma.shuffle(month_names);

    $('.dropObjects').droppable(
        {
            tolerance: 'intersect',
            hoverClass: 'drophover',
            drop: function (event, ui) {
                var month = ui.draggable;
                if ($(this).data('monthName') == ui.draggable.data('monthName')) {
                    month
                        .draggable('disable')
                        .removeClass('dragObjects')
                        .removeClass('unfinished')
                        .position({ my: 'center', at: 'center', of: $(this) });
                    var correct_month;
                    createDiv()
                        .addClass('correctMonth')
                        .append($(this).data('monthName'))
                        .appendTo($(this))
                        .position({ my: 'center', at: 'center', of: $(this) })
                        .hide();
                    $(this)
                        .droppable('disable');
                    karma.play('correct');
                    if (!$('.unfinished').length) {
                        next();
                    }
                } else {
                    month.animate({ top: 0, left: 0 });
                    karma.play('incorrect');
                }
            }
        });

    var next = function () {
        $('.correctMonth').show();
        $('#dragMonthArea').empty();
        if (remaining_month_names.length) {
            range(0, 3).forEach(
                function () {
                    createMonthDragBox(remaining_month_names.shift())
                        .appendTo('#dragMonthArea');
                }
            );
        } else {
            setTimeout(gameOver, 1000);
        }
    };

    var gameOver = function () {
        $('#main')
            .addClass('backOpaque');
        gameContentDiv
            .append(createDiv()
                    .addClass('gameOver')
                    .text('GAME OVER'));
    };

    next();
}

setUpMultiScreenLesson([startLesson, startGame]);
