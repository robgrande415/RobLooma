var pieces_cache = {};

function clipRectangle(left, top, width, height) {
    var right = left + width;
    var bottom = top + height;
    return 'rect(' + top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px)';
}

function makePiece(img, id, column, row, width, height, label) {
    var left = column * width;
    var top = row * height;

    var result = $(document.createElement('div'))
        .attr({id: id})
        .addClass('piece')
        .addClass('dragme')
        .css({position: 'relative',
              'float': 'left',
              width: width,
              height: height,
              zIndex: 1});

    (img.clone())
        .show()
        .css({position: 'absolute',
              clip: clipRectangle(left, top, width, height),
              left: -left,
              top: -top,
              zIndex: -1})
        .appendTo(result);

    var label_div = $(document.createElement('div'))
        .css({position: 'absolute',
              width: width})
        .appendTo(result);

    $(document.createElement('div'))
        .addClass('pieceLabel')
        .css({textAlign: 'center'})
        .html(label)
        .appendTo(label_div);

    result.appendTo($('body')); // Ensure that label_div has a computed height.
    label_div.css({top: height / 2 - label_div.height() / 2});

    enableDragAndDrop(img, result);

    return result[0];
}

function swap(node1, node2) {
    var tmp = $(document.createElement('div'));
    tmp.insertBefore(node1);
    node1.insertBefore(node2);
    node2.insertBefore(tmp);
    tmp.remove();
}

function scrubPosition(piece) {
    piece.css({top: '', left: ''});
}

function enableDragAndDrop(image, piece) {
    /*
     revert doesn't work well with relative positioning. It adds top
     and left which cause the piece to drift after multiple reverts.
     Instead call scrubPosition() to remove the top and left
     properties.
     */
    piece
        .draggable(
            {stack: '.piece', // Ensure dragged piece is at front.
             stop: function() { scrubPosition(piece); }
            }).
        droppable(
            {over: function() { piece.addClass('dropTarget'); },
             out: function() { piece.removeClass('dropTarget'); },
             drop: function(event, ui) {
                 piece.removeClass('dropTarget');
                 swap(ui.draggable, piece);
                 scrubPosition(ui.draggable);
                 scrubPosition(piece);
                 checkGameOver(image);
             }
            });
}

function makePieces(img, row_count, column_count) {
    var row, column;
    var width = img.width() / column_count;
    var height = img.height() / row_count;
    var result = [];
    for (row = 0; row < row_count; ++row) {
        for (column = 0; column < column_count; ++column) {
            var i = result.length;
            result.push(makePiece(img, 'piece' + i,
                                  column, row, width, height,
                                  labelGenerator(i)));
        }
    }
    return result;
}

function wrongCount(pieces) {
    var result = 0;
    for (var i = 0; i < pieces.length; ++i) {
        if ($(pieces[i]).attr('id') != 'piece' + i) {
            ++result;
        }
    }
    return result;
}

function shufflePieces(pieces) {
    var result = pieces;
    // Keep shuffling until the result looks 'sufficiently random' for a human,
    // i.e. no piece on its place.
    do {
        result = Karma.shuffle(result);
    } while (wrongCount(result) < result.length);
    return result;
}

function showReward(image) {
    $('.piece').hide();
    image.fadeIn(3000);
}


function checkGameOver(image) {
    if (wrongCount($('.piece:visible')) == 0) {
        showReward(image);
    }
}

var puzzles = ['puzzle1','puzzle2','puzzle3'];

function createThumbnail(karma, puzzle) {
    return $(document.createElement('div'))
        .clickable(function() { startGame(karma, puzzle); })
        .append(karma.createImg(puzzle)
                .addClass('imageThumb'));
}

function initialize(karma) {
    var $imageBar = createDiv('imageBar');
    var $content = $('#content')
        .append($imageBar)
        .append(createDiv('imgMain'))
        .append(createDiv('instructions')
                .append(instructions()));
    $(puzzles.map(function (puzzle) { return createThumbnail(karma, puzzle); }))
        .appendTo($imageBar);

    var $imgMain = $('#imgMain');
    puzzles.forEach(function (puzzle) {
                        var img = karma.createImg(puzzle)
                            .hide()
                            .appendTo($imgMain);
                        var pieces = makePieces(img, 4, 4);
                        img.addClass('reward');
                        $(pieces).hide();
                        pieces_cache[puzzle] = pieces;
                    });
}

function startGame(karma, puzzle) {
    var $imgMain = $('#imgMain');
    $('.piece').hide();
    $('.reward').hide();
    var pieces = pieces_cache[puzzle];
    $(shufflePieces(pieces)).appendTo($imgMain).show();
}

setUpLesson(initialize, function(karma) { startGame(karma, puzzles[0]); });
