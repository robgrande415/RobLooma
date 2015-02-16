function generateScreen0(karma, $container) {
    createDiv('instructions')
        .append(instructions0)
        .appendTo($container);
    var $vocab_img = createDiv('vocabImg')
        .appendTo($container);

    var objectCss = function(object) {
        var result = object.position;
        result.position = 'absolute';
        result.height = 50;
        return result;
    };

    $(objects.map(function (object) {
                      return createDiv()
                          .css(objectCss(object))
                          .clickable(function () {
                                         karma.play(object.name);
                                     });
                  })).appendTo($vocab_img);
}

function generateScreen1(karma, $container) {
    var createImage = function (object) {
        return createDiv()
            .addClass('imgArea')
                        .append(createDiv()
                                .addClass('imgObject')
                                .append(karma.createImg(object.name))
                        )
                        .append(createDiv()
                                .addClass('dropObjects')
                                .data('word', object.name)
                        );
    };

    var createWord = function (object) {
        return createDiv()
            .addClass('dragObjects')
            .html(object.name)
                        .data('word', object.name);
    };

    var images = Karma.shuffle(objects.map(createImage));
    var words = Karma.shuffle(objects.map(createWord));

    var dropAllow = function(event, ui){
        if ($(event.target).data('word') == $(ui.draggable).data('word')){
            karma.play('correct');
            return true;
        } else {
            karma.play('incorrect');
            return false;
        }
    };

    var dropSuccess = function(event, ui){
        // if they've all been placed, game over
        var all_placed = true;
        $('.dropObjects').each(function(){
                                   if (!$(this).data('draggable')) {
                                       all_placed = false;
                                   }
                               });
        if (all_placed) {
            gameOver();
        }
    };

    $container
        .append(createDiv('instructions')
                .append('Drag and drop the correct word in each box'))
        .append(createDiv('quesSection'))
        .append(createDiv('optionSection'));

    $(images).appendTo('#quesSection');
    $(words).appendTo('#optionSection');

    enableSimpleDragAndDrop($('.dragObjects'),
                            { containment: '#content' },
                            $('.dropObjects'),
                            { tolerance: 'intersect',
                              hoverClass: 'drophover',
                              dropTest: dropAllow,
                              dropSuccess: dropSuccess });
}

function gameOver(){
    $('#optionSection')
        .append(createDiv()
                .addClass('gameOver')
                .text('GAME OVER'));
    $('.dragObjects').draggable('disable');
}

setUpMultiScreenLesson([generateScreen0, generateScreen1]);
