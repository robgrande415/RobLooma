var timer = null;

// TBD: Don't use png for text (e.g. section3ImgTop)

function instructionScreen(karma, content) {
    clearTimeout(timer);
    content.append(createDiv('section1'));
}

var protractor_angles = [30, 45, 60, 90, 120, 135, 150, 180];

function focusOnInputText() {
    $('input[type="text"]')
        .val('')
        .focus();
}

function protractorScreen(karma, content) {
    var all_correct = true;
    clearTimeout(timer);
    var remaining_angles = Karma.shuffle(protractor_angles);
    var current_angle;

    // TBD: use canvas.
    // TBD: don't use em.
    var positions = {
        0: { top: '15.8em', left: '18.65em' },
	30: { top: '6.8em', left: '18.65em' },
	45: { top: '2.68em', left: '18.65em' },
	60: { top: '-.45em', left: '18.65em' },
	90: { top: '-3em', left: '18.65em' },
	120: { top: '-.5em', left: '8.7em' },
	135: { top: '2.8em', left: '4.7em' },
	150: { top: '7em', left: '1.7em' },
	180: { top: '15.8em', left: '-1em' }
    };

    var createLine = function(div, degrees) {
        return div
            .empty()
            .append(karma.createImg('line' + degrees))
            .css(positions[degrees]);
    };

    content
        .append(createDiv('instructions')
                .append('रेखाहरूले बनाएको कोणहरू अनुमान गर र टाइप गर'))
        .append(createDiv('medalArea'))
        .append(createDiv('protractor')
                .append(createDiv('lineDefault')
                        .css({ position: 'absolute' }))
                .append(createDiv('line')
                        .css({ position: 'absolute' })))
        .append(karma.createImg('section2ImgHint')
                .attr('id', 'section2ImgHint'))
        .append(createDiv('inputArea1')
                .append(createDiv('angleName'))
                .append($(document.createElement('input'))
                        .attr({
                                  id: 'ans',
                                  type: 'text',
                                  maxLength: 3
                              })
                        .addClass('inputBox')
                        .focus(function () {
                                   $(this).addClass('focus');
                               })
                        .blur(function () {
                                  $(this).removeClass('focus');
                              })
                        .keypress(function (event) {
                                      if (event.which == 13) {
                                          $(this).blur();
                                          checkAnswer();
                                      }
                                  })));

    createLine($('#lineDefault'), 0);

    var checkAnswer = function () {
        if ($('#ans').val() == current_angle) {
            karma.play('correct');
            $('#medalArea').append(createDiv().addClass('medal'));
        } else {
            karma.play('incorrect');
            all_correct = false;
        }
        timer = setTimeout(next, 1000);
    };

    var displayPoint = function (degrees, point) {
        var r = 280;
        var radians = Karma.radians(degrees);
        $('#protractor')
            .append(createDiv('point')
                    .append(point)
                    .css({
                             position: 'absolute',
                             left: 240 + r * Math.cos(radians),
                             top: 205 - r * Math.sin(radians),
                             font: '2em arial,verdana,geneva,helvetica',
                             color: '#000000',
                             zIndex: 5
                         }));
    };

    var next = function () {
        $('#point').remove();
        if (remaining_angles.length) {
            current_angle = remaining_angles.shift();
            createLine($('#line'), current_angle);
            var point;
            if (current_angle == 180) {
                // X is already part of protractor picture, so no need
                // to call displayPoint
                point = 'X';
            } else {
                point = randomElement('ABC');
                displayPoint(current_angle, point);
            }
            $('#angleName')
                .empty()
                .append(karma.createImg('angle'))
                .append('YO' + point + ' = ');
            focusOnInputText();
        } else {
            levelOver();
        }
    };

    var levelOver = function () {
        $('#section2ImgHint').hide();
        $('#inputArea1').hide();
        var img = all_correct ? 'gameOverSuccess' : 'gameOverTry';
        $('#protractor')
            .empty()
            .append(createDiv('gameOver')
                    .append(karma.createImg(img)));
    };

    next();
}

function normalizeDegrees(x) {
    x = x % 360;
    if (x < 0) {
        x += 360;
    }
    return x;
}

function explosionScreen(karma, content) {
    clearTimeout(timer);
    content
        .append(createDiv('instructions')
                .append('वस्तुको कोण अनुमान गरेर टाइप गर्दै पक्का हो बटनमा क्लिक गरेर देखिएको वस्तुलाई बलले हान'))
        .append(karma.createImg('section3ImgTop'))
        .append(createDiv('section3')
                .append(createDiv('ballOutline')
                        .append(createDiv('ball'))))
        .append(createDiv('inputArea')
                .append($(document.createElement('input'))
                        .attr({
                                  id: 'ans',
                                  type: 'text',
                                  maxLength: 3
                              })
                        .addClass('inputBox')
                        .focus(function () {
                                   $(this).addClass('focus');
                               })
                        .blur(function () {
                                  $(this).removeClass('focus');
                              })
                        .keypress(function (event) {
                                      if (event.which == 13) {
                                          $(this).blur();
                                          animate(normalizeDegrees(parseInt($(this).val())));
                                      }
                                  })));
    var animate = function (degrees) {
        var radians = Karma.radians(degrees);
        var r = 187;
        var left = r * Math.cos(radians);
        var top = -r * Math.sin(radians);
        var between = function (low, high) {
            return function (x) { return low <= x && x <= high; };
        };
        var explosion_positions = [
            { predicate: between(0, 8), position: {top: -30, left: 150 } },
            { predicate: between(351, 359), position: { top: -30, left: 150 } },
            { predicate: between(20, 35), position: { top: -110, left: 115 } },
            { predicate: between(45, 68), position: {top: -180, left: 70 } },
            { predicate: between(80, 98), position: { top: -215, left: -30 } },
            { predicate: between(122, 145), position: {top: -160, left: -160 } },
            { predicate: between(168, 198), position: {top: -30, left: -200 } },
            { predicate: between(215, 250), position: {top: 100, left: -130 } },
            { predicate: between(260, 280), position: {top: 140, left: -30 } },
            { predicate: between(305, 330), position: {top: 100, left: 100 } }
        ];
        var explosionPosition = function (degrees) {
            for (var i = 0; i < explosion_positions.length; ++i) {
                if (explosion_positions[i].predicate(degrees)) {
                    return explosion_positions[i].position;
                }
            }
            return false;
        };

        $('#ball').animate({ left: left, top: top },
                           1000,
                           function () {
                               var position = explosionPosition(degrees);
                               if (position) {
                                   $('#ballOutline')
                                       .append(createDiv('ballExplode')
                                               .css({ position: 'absolute' })
                                               .css(position)
                                               .append(karma.createImg('boom')));
                                   karma.play('explode');
                               }
                               timer = setTimeout(cleanUpExplosion, 1000);
                           });
        focusOnInputText();
    };
    var cleanUpExplosion = function () {
        $('#ballExplode').remove();
        $('#ball').css({ top: 0, left: 0 });
        $('#answ').val('');
    };

    focusOnInputText();
}

setUpMultiScreenLesson([instructionScreen,
                        protractorScreen,
                        explosionScreen]);
