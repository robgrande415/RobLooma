var clock;

function initialize() {
    clock = createClock();
}

function startGame(karma) {
    clock.reset();
    $('#timerBar').show();
    $('#instructions')
        .empty()
        .append(instructions());

    $('#imgDisplay').empty();

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
            .css({
                     position: 'absolute',
                     left: left,
                     top: top,
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

    var all_pieces = [];
    range(0, 4).forEach(
        function (row) {
            range(0, 4).forEach(
                function (col) {
                    var piece = createPiece('reward', col, row, 73, 52)
                        .appendTo('#imgDisplay')
                        .hide();
                    all_pieces.push(piece);
                }
            );
        }
    );

    var pieces = Karma.shuffle(all_pieces);

    clock.start();

    $('#tvLayer').empty();
    $('#calcSection').empty();
    $('#tvLayer').toggleClass('tvOff tvOn').empty();

    var nextQuestion = function () {
        var task = generateTask();

        $('#calcSection')
            .empty()
            .append(task.question);
        $(document.createElement('input'))
            .addClass('textBox')
            .attr({id: 'answerBox',
                   type: 'text',
                   maxlength: 3})
	    .focus(function() {
		       $(this)
                           .removeClass('incorrect')
                           .addClass('focus');
	           })
	    .blur(function() {
		      $(this).removeClass('focus');
	          })
	    .keypress(
                function(event) {
                    if (event.which === 13) {
                        if ($('#answerBox').val() == task.answer) {
                            $('#answerBox').unbind('keypress');
	                    Karma.audio.correct.play();
                            pieces.pop().show();
                            setTimeout(pieces.length ? nextQuestion : gameOver,
                                       1000);
                        } else {
	                    Karma.audio.incorrect.play();
                        }
                    }
	        })
            .appendTo($('#calcSection'));
        $('.textBox').focus();
    };

    var gameOver = function(){
        clock.stop();
        $('#instructions').empty();
        $('#calcSection').empty();
        $('.correct').toggleClass('correct default');
        $('#tvLayer').toggleClass('tvOff tvOn').html('खेल खत्तम।');
    };

    nextQuestion();
}

setUpLesson(initialize, startGame);
