var clock = null;

function initialize() {
    clock = createClock();
    // TBD: move this to common.js
    $('#footer')
        .append(createDiv('clickDisplay')
                .append(createDiv('clickTitle').html('Clicks:'))
                .append(createDiv('clickBox'))
                .hide());
    $('#content')
        .append(createDiv('instructions')
                .append(instructions()))
        .append(createDiv('section'));
}

function startGame(karma) {
    clock.reset();
    $('#timerBar').show();
    $('#clickDisplay').show();
    $('#section').empty();
    $('#clickBox').html('00');

    var click_count = 0;
    clock.start();

    var turned_pieces = [];

    var pieceClicked = function (piece) {
        if (piece.hasClass('matched') ||
            turned_pieces.length == 2 ||
            (
                turned_pieces.length == 1 &&
				face(turned_pieces[0]).attr('id') == face(piece).attr('id')
            )) {
            return;
        }

        ++click_count;
        $('#clickBox').html(padLeft(click_count, '0', 2));
        turned_pieces.push(piece);
        face(piece).show();
        if (turned_pieces.length == 2) {
            setTimeout(processPossibleMatch, 1000);
        }
    };


    var key = function (x) {
        var result = x.data('key');
        return result;
    };

    var piecesMatch = function (piece1, piece2) {
        return key(face(piece1)) == key(face(piece2));
    };

    var hidePiece = function (piece) {
        face(piece).hide();
    };

    var disablePiece = function (piece) {
        piece.unclickable();
        hidePiece(piece);
        piece.addClass('matched');
    };

    var processPossibleMatch = function () {
        if (piecesMatch(turned_pieces[0], turned_pieces[1])) {
            turned_pieces.map(disablePiece);
            if ($('.matched').length == $('.default').length) {
                gameOver();
            }
        } else {
            turned_pieces.map(hidePiece);
        }
        turned_pieces = [];
    };

    var gameOver = function () {
        clock.stop();
        var hms = clock.hoursMinutesSeconds();
        var info = 'You have completed the game in <span class="specialText">' +
            click_count +
	    '</span> clicks within <span class="specialText">' +
            hms.hours +
            '</span> hours <span class="specialText">' +
            hms.minutes +
	    '</span> minutes and <span class="specialText">' +
            hms.seconds +
            '</span> seconds.';
        $('#section')
            .empty()
            .append(createDiv('gameOver')
                    .html('GAME OVER<br/>Congratulations!!!'))
            .append(createDiv('gameOverInfo').html(info));
    };

    var face = function (piece) {
        return $('.pieceFace', piece);
    };

    var createPiece = function (face) {
        return createDiv()
            .addClass('default')
            .clickable(function () { pieceClicked($(this)); })
            .append(face.hide());
    };

    var createPieces = function () {
        $(Karma.shuffle(createFaces(karma)).map(createPiece))
            .appendTo($('#section'));
    };

    createPieces();
}

var tileCount = 0;

function createImage(karma, word, key) {
	var divId = 'image' + (tileCount++);
    return createDiv(divId)
        .data({'key': key})
        .addClass('pieceFace')
        .append(karma.createImg(word));
}

function createText(word, key) {
	var divId = 'text' + (tileCount++);
    return createDiv(divId)
        .data({'key': key})
        .addClass('textColor')
        .addClass('pieceFace')
        .html(word);
}

function createImageAndTextFromNames(karma, names) {
    return Array.prototype.concat(
        names.map(function (x) { return createImage(karma, x, x); }),
        names.map(function (x) { return createText(x, x); }));
}

setUpLesson(initialize, startGame);
