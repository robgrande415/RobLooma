function showObject(karma, content, object) {
    content
        .append(createDiv('section')
               .append(createDiv('topText')
                       .html('Click on the speaker and listen to the name '
                             + 'of the '
                             + configuration.objects
                             + '.'))
               .append(createDiv('imgObjectsDisplay')
                       .append(karma.createImg(object)))
               .append(createDiv('objectText')
                       .append(createDiv()
                               .addClass('imgVol')
                               .click(function () {
                                          karma.play(object);
                                      }))
                       .append(object)));
}

function puzzleScreen(karma, content) {
    var remaining_objects = Karma.shuffle(objects);
    var next = function () {
        if (remaining_objects.length == 0) {
            $('#confirmSection').hide();
            content
                .append(createDiv('gameOver')
			.append('Game Over! Congratulations!')
			.append(createDiv('gameOverInfo')
                                .append('You have successfully completed the '
                                        + 'complete vocabulary section.')));
            return;
        }
        var current_object = remaining_objects.shift();
        content
            .empty()
            .append(createDiv('section')
                    .append(createDiv('infoText')
                            .append('Listen to the name of the '
                                    + configuration.object
                                    + ' and drag and drop the pieces to '
                                    + 'complete  the picture of the '
                                    + configuration.object
                                    + ' you just heard the name of.')
                            .append(createDiv()
                                    .addClass('imgVol')
                                    .click(function () { karma.play(current_object); })))
                    .append(createDiv('imgPuzzleArea'))
                    .append(createDiv('dragImgSection')));
        $(range(0, 9).map(
              function (i) {
                  return createDiv()
                      .addClass('dropObjects default')
                      .droppable(
                          {
                              tolerance: 'intersect',
                              hoverClass: 'drophover',
                              drop: function (event, ui) {
                                  var dragged = ui.draggable;
                                  dragged.css({ top: 0, left: 0 });
                                  if (i == dragged.data('key')) {
                                      karma.play('correct');
                                      $(this).append(dragged);
                                      dragged.draggable('disable');
                                      $(this).droppable('disable');
                                      var correct_pieces = $('.dragObjects',
                                                             $('#imgPuzzleArea'));
                                      if (correct_pieces.length == 9) {
                                          confirmAnswer();
                                      }
                                  } else {
                                      karma.play('incorrect');
                                  }
                              }
                          }
                      );
              }
          ))
            .appendTo('#imgPuzzleArea');
        var confirmAnswer = function () {
            var confirmClicked = function () {
                if (x == object) {
                    karma.play('correct');
                    $('#checkAnswer').append(karma.createImg('correct'));
                } else {
                    karma.play('incorrect');
                    $('#checkAnswer').append(karma.createImg('incorrect'));
                }
            };
	    $('#section').addClass('backOpaque');
            content
                .append(createDiv('confirmSection')
                        .append(createDiv('confirmInstruction')
                                .html('Click on the name of the '
                                      + configuration.object
                                      + ' you just made.'))
                        .append(createDiv('dragTxtSection')));
            $(Karma.shuffle(objects).map(
                  function (object) {
                      return createDiv()
                          .addClass('confirmOption')
                          .append(object)
                          .click(function () {
                                     if (current_object == object) {
                                         $('.confirmOption').unbind('click');
                                         karma.play('correct');
                                         setTimeout(next, 1000);
                                     } else {
                                         karma.play('incorrect');
                                     }
                                 });
                  }
              )).appendTo('#dragTxtSection');
        };

        var clipRectangle = function (left, top, width, height) {
            var right = left + width;
            var bottom = top + height;
            return 'rect(' + top + 'px ' + right + 'px '
                + bottom + 'px ' + left + 'px)';
        };

        var createPiece = function (img_name, column, row, width, height) {
            var left = column * width;
            var top = row * height;

            var result = $(document.createElement('div'))
                .addClass('dragObjects')
                .css({
                         position: 'relative',
                         'float': 'left',
                         width: width,
                         height: height
                     });

            karma.createImg(img_name)
                .css({
                         position: 'absolute',
                         clip: clipRectangle(left, top, width, height),
                         left: -left,
                         top: -top
                     })
                .appendTo(result);
            return result;
        };

        var pieces = [];

        range(0, 3).forEach(
            function (row) {
                range(0, 3).forEach(
                    function (col) {
                        pieces.push(createPiece(current_object, col, row,
                                                100, 100)
                                    .data('key', row * 3 + col)
                                    .draggable({ revert: true }));
                    }
                );
            }
        );
        var other_objects = Karma.shuffle(objects.filter(
                                              function (o) {
                                                  return current_object != o;
                                              }
                                          ));
        for (var i = 0; i < 6; ++i) {
            pieces.push(createPiece(other_objects[i],
                                    Karma.random(0, 2),
                                    Karma.random(0, 2),
                                    100,
                                    100)
                        .draggable({ revert: true }));
        }
        $(Karma.shuffle(pieces)).appendTo('#dragImgSection');
    };
    next();
}

function setUp(objects) {
    var lesson_screens = Karma.shuffle(objects)
        .map(function (object) {
                 return function (karma, content) {
                     showObject(karma, content, object);
                 };
             });
    setUpMultiScreenLesson(lesson_screens.concat([puzzleScreen]));
}
