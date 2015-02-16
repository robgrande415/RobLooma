var clock;
var timer;

var tasks = [['be', 'lieve'],
             ['en', 'gine'],
             ['ti', 'ger'],
             ['monk', 'ey'],
             ['stu', 'dent'],
             ['chil', 'ly'],
             ['eng', 'lish'],
             ['hap', 'py'],
             ['sun', 'day'],
             ['in', 'sect'],
             ['sen', 'tence'],
             ['com', 'plete'],
             ['pro', 'noun'],
             ['prac', 'tice'],
             ['talk', 'ing'],
             ['pic', 'nic'],
             ['num', 'ber'],
             ['tea', 'cher'],
             ['mar', 'ket'],
             ['comp', 'uter']];


function initialize(karma, content) {
    clock = createCountdownTimer(function () {}, 10);
}

function startLesson(karma) {
    clearTimeout(timer);
    clock.show();
    var createSign = function (x) {
        return createDiv()
            .addClass('sign')
            .append(x);
    };
    var createDrop = function (id) {
        return createDiv(id)
            .addClass('blank');
    };
    var blank = '----------';
    var resetDrops = function () {
	$('#drop0').html(blank);
	$('#drop1').html(blank);
	$('#drop2').html('------------');
	clock.reset();
	clock.setTime(10);
        clock.setCallback(checkAnswers);
    };

    var populateSyllables = function (words) {
        var syllables = Karma.shuffle(Array.prototype.concat.apply([], words));
        $(syllables.map(function (syllable) {
                            return createDiv()
                                .append(syllable)
                                .addClass('syllable')
                                .click(function () {
                                           if ($('#drop0').html() == blank) {
                                               $('#drop0').html(syllable);
                                               $('#drop0').data('syllable', $(this));
                                               clock.start();
                                           } else if ($('#drop1').html() == blank) {
                                               $('#drop1').html(syllable);
                                               $('#drop1').data('syllable', $(this));
                                               checkAnswers();
                                           }
                                       });
                        }))
          .appendTo($('#container'));
    };

    var generateBlockNames = function () {
        return ['top'].concat(range(0, 8).map(function () { return 'body'; }),
                              ['base']);
    };

    var generateBlocks = function (div, player_or_computer) {
        return generateBlockNames().map(
            function (name) {
                var img = karma.createImg(player_or_computer + '_' + name)
                    .hide();
                createDiv()
                    .addClass('default')
                    .append(img)
                    .appendTo(div);
                return img;
        });
    };

    var checkAnswers = function() {
        var words = tasks.map(function (task) { return task[0] + task[1]; });
        var current_word = $('#drop0').html() + $('#drop1').html();
        if (words.indexOf(current_word) != -1) {
	    karma.play('correct');
            $('#drop2').html(current_word);
            remaining_player_blocks.pop().show();
            $('#drop0').data('syllable').remove();
            $('#drop1').data('syllable').remove();
        } else {
            karma.play('incorrect');
	    $('#drop2').html('Not a Valid Word');
            remaining_computer_blocks.pop().show();
        }
        if (remaining_computer_blocks.length == 0) {
	    $('#leftText').html('The Computer Wins');
	    $('#topText').html('Sorry, you missed your chance! Click Play Again.');
            $('.syllable').unbind('click');
            clock.setCallback(function () {});
        } else if (remaining_player_blocks.length == 0) {
	    $('#rightText').html('You Win');
	    $('#topText').html('Great Job!');
            $('.syllable').unbind('click');
            clock.setCallback(function () {});
        } else {
            timer = setTimeout(resetDrops, 1000);
        }
    };

    $('#content')
        .removeClass('backOpaque')
        .empty()
	.append(createDiv('left-side')
                .append(createDiv('leftText')
                        .append('Computer building')))
	.append(createDiv('main-content')
                .append(createDiv('topText')
                        .append('Join two syllables to make one word.'))
                .append(createDiv('container'))
                .append(createDiv('joinSyllable')
                        .append(createDrop('drop0'))
                        .append(createSign('+'))
                        .append(createDrop('drop1'))
                        .append(createSign('='))
                        .append(createDrop('drop2').css({ width: 200 }))
                        .append()))
	.append(createDiv('right-side')
                .append(createDiv('rightText')
                        .append('Your building')));

    var remaining_computer_blocks = generateBlocks($('#left-side'), 'computer');
    var remaining_player_blocks = generateBlocks($('#right-side'), 'player');

    resetDrops();

    populateSyllables(Karma.shuffle(tasks).slice(0, 10));
}

setUpLesson(initialize, startLesson);
