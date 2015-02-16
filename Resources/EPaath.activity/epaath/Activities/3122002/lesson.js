function startLesson(karma) {
    var createSheep = function (count) {
        var img_name = 'sheep' + count;
        return karma.createImg(img_name)
            .attr('id', img_name)
            .addClass('sheep')
            .draggable(
                {
                    helper: function () {
                        return $(this).clone().removeAttr('id');
                    },
                    containment: '#gameArea',
                    appendTo: '#gameArea',
                    distance: 10,
                    start: function () {
                        bringToFront(this);
                    },
                    stop: function (ev, ui) {
                        // Make a persistent clone of the helper unless we
                        // dropped on the rubbish bin.
                        if (ui.helper.is(':visible')) {
                            ui.helper.clone()
                                .removeClass('ui-draggable-dragging')
                                .addClass('clone')
                                .data('count', count)
                                .draggable({
                                               start: function() {
                                                   bringToFront(this);
                                               }
                                           })
                                .appendTo('#gameArea');
                            updateScore();
                        }
                    }
                }
            );
    };

    $('#content')
        .empty()
        .append(createDiv('gameArea')
                .append(createDiv()
                        .addClass('titles')
                        .append($(document.createElement('h2'))
                                .html('भेडालाई कर्सरले तानेर गोठमा राख र गन'))
                        .append($(document.createElement('h1'))
                                .attr('id', 'total'))
						.append($(document.createElement('h2'))
                                .attr('id', 'information'))
						)
                .append(createDiv('sourceObjects')
                        .append(createSheep(1))
                        .append(createSheep(2))
                        .append(createSheep(3)))
                .append(createDiv('discardTarget')
                        .append(karma.createImg('rubbish')))
                .append(createDiv('dropTarget')));

    $('#gameArea').droppable(
        {
            drop: function (event, ui) {
                updateScore();
            }
        }
    );

    var showRubbishCan = function (img_name) {
        $('#discardTarget')
            .empty()
            .append(karma.createImg(img_name));
    };

    $('#discardTarget').droppable(
        {
            tolerance: 'intersect',
            over: function (event, ui) {
                $('#gameArea').droppable('disable');
                ui.helper.hide();
                showRubbishCan('rubbish_open');
            },
            out: function (event, ui) {
                $('#gameArea').droppable('enable');
                ui.helper.show();
                showRubbishCan('rubbish');
            },
            drop: function (event, ui) {
                $('#gameArea').droppable('enable');
                ui.helper.remove();
                updateScore();
                showRubbishCan('rubbish');
            }
        }
    );

    var updateScore = function () {
        var total = 0;
        $('.clone')
            .each(function (i, sheep) {
                      if (boundsWithin($(sheep), $('#dropTarget'))) {
                          total += $(sheep).data('count');
 		      }
 	          });
        $('#information').html(total > 99 ? 'भेडा को संख्या ९९ भन्दा बढी भयो !!! अब गोठ खाली गर ' : '');
        $('#total').html(Karma.convertNumToLocale(total, 'ne'));
    };

    var zmax = 0;

    var bringToFront = function (el) {
        $(el).css('zIndex', ++zmax);
    };

    var boundsWithin = function (el1, el2) {
        var offset1 = el1.offset();
        var offset2 = el2.offset();
        return offset1.left > offset2.left &&
	    offset1.top > offset2.top &&
	    (offset1.left + el1.width()) < (offset2.left + el2.width()) &&
	    (offset1.top + el1.height()) < (offset2.top + el2.height());
    };

    updateScore();
}

setUpLesson(function () {}, startLesson);
