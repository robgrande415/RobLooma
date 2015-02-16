var img_names = ['ball', 'banana', 'balloon', 'chilli', 'fish', 'flower'];
var timer;

var BOX_SIZE = 190;

function initialize(karma) {
    var createBox = function (id) {
        return createDiv(id).addClass('box');
    };
    var createChimp = function (id) {
        return karma.createImg(id)
            .attr('id', id)
            .addClass('chimp')
            .hide();
    };
    $('#content')
        .append(createDiv('instructions')
                .append('जोड र मिल्ने उत्तर भएको कोठामा क्लिक गर'))
        .append(createDiv('main')
                .append(createDiv('top')
                        .append(createDiv('topLeftArea')
                                .append(createBox('topLeftBox')))
                        .append(createDiv('topMiddleArea')
                                .append(karma.createImg('plussign')
                                        .attr('id', 'plusSign')))
                        .append(createDiv('topRightArea')
                                .append(createBox('topRightBox'))))
                .append(createDiv('bottom')
                        .append(createDiv('bottomLeft')
                                .addClass('bottom')
                                .append(createBox('bottomLeftBox')
                                        .addClass('bottomCard')))
                        .append(createDiv('bottomMiddle')
                                .addClass('bottom')
                                .append(createBox('bottomMiddleBox')
                                        .addClass('bottomCard')))
                        .append(createDiv('bottomRight')
                                .addClass('bottom')
                                .append(createBox('bottomRightBox')
                                        .addClass('bottomCard')))))
        .append(createDiv('side')
                .append(createDiv()
                        .addClass('sideItem')
                        .append(karma.createImg('scorebox')
                                .attr('id', 'timer'))
                        .append(createDiv('timerIndicator')))
                .append(createDiv()
                        .addClass('sideItem')
                        .append(karma.createImg('scorebox')
                                .attr('id', 'scoreBox'))
                        .append(createDiv('scoreBoxText')))
                .append(createDiv()
                        .addClass('sideItem')
                        .append(createDiv('chimpDiv')
                                .append(createChimp('normal_chimp'))
                                .append(createChimp('happy_chimp'))
                                .append(createChimp('sad_chimp')))))
        .append(createDiv('overlay'))
        .append(createDiv('overlayPaper'));
}

function startLesson(karma) {
    clearTimeout(timer);
    $('.chimp').hide();
    $('#normal_chimp').show();
    $('#overlay').hide();
    $('#overlayPaper').hide();
    var level = 0;
    var choice_papers = [$('#bottomLeftBox'),
                         $('#bottomMiddleBox'),
                         $('#bottomRightBox')];
    var score = 0;

    var processAnswer = function (is_correct) {
        $('.bottomCard').unclickable();
        if (is_correct) {
            score++;
        } else {
            score--;
        }
        animateChimp(is_correct);
        next();
    };

    var displayScore = function () {
        $('#scoreBoxText').html(score);
    };

    var displayObjects = function (where, what, n) {
        // The initial points ensure that we stay out of the (rounded) corners.
        var r = 25;
        var points = [{ x: r, y: r },
                      { x: r, y: BOX_SIZE - r },
                      { x: BOX_SIZE - r, y: r },
                      { x: BOX_SIZE - r, y: BOX_SIZE - r }];
        var includes = function (rectangle, point) {
            var top_left = rectangle.top_left;
            var bottom_right = rectangle.bottom_right;
            var x = point.x;
            var y = point.y;
            return (top_left.x <= x) && (x <= bottom_right.x) &&
                (top_left.y <= y) && (y <= bottom_right.y);
        };
        var is_good = function (rectangle) {
            // We don't want any object to be obscured, so we make sure
            // that the (bounding) rectangle doesn't include any of the
            // other rectangles' center points.
            // This ensures that every center point always is visible.
            return !points.some(function (point) {
                                    return includes(rectangle, point);
                                });
        };
        where.empty();
        range(0, n).forEach(
            function () {
                var img = karma.createImg(what)
                    .addClass('object')
                    .appendTo(where);
                var top, left;
                var w, h;
                do {
                    w = img.width();
                    h = img.height();
                    var inset = 1;
                    top = Karma.random(inset, BOX_SIZE - inset - h);
                    left = Karma.random(inset, BOX_SIZE - inset - w);
                } while (!is_good({
                                      top_left: { x: left, y: top },
                                      bottom_right: { x: left + w,
                                                      y: top + h }
                                  }));
                img.css({
                            position: 'absolute',
                            left: left,
                            top: top
                        });
                points.push({ x: left + w / 2,
                              y: top + h / 2 });
            }
        );
    };

    var animateChimp = function (correct) {
        $('.chimp').hide();
        $(correct ? '#happy_chimp' : '#sad_chimp').show();
        setTimeout(function () {
                       $('.chimp').hide();
                       $('#normal_chimp').show();
                   },
                   800);
    };

    var resetTimer = function () {
        $('#timerIndicator')
            .css({
                     position: 'absolute',
                     width: 85,
                     height: 20,
                     left: 33,
                     top: 37,
                     backgroundColor: 'white'
                 });
    };

    var startTimer = function () {
        resetTimer();
        $('#timerIndicator')
            .animate({ top: 130 },
                     12000 - level * 1000,
                     function () {
                         karma.play('trigger');
                         // Timeout is needed because otherwise it doesn't
                         // start counting down again after time runs out.
                         setTimeout(function () { processAnswer(false); }, 0);
                     });
    };

    var gameOver = function () {
        resetTimer();
        $('#scoreBoxText').empty();
        $('.object').remove();
        $('#overlay')
            .show()
            .css({
                     position: 'absolute',
                     background: 'white',
                     opacity: 0.7,
		     width: 800,
                     height: 600,
                     zIndex: 10
                 });
	$('#overlayPaper')
            .show()
            .css({
                     position: 'absolute',
                     zIndex: 100
                 })
            .empty()
            .append(karma.createImg('happy_chimp')
                    .css({
                             position: 'absolute',
                             left: 200,
                             top: 100,
                             width: 300,
                             height: 400
                         })
                    .clickable(function () {
                                   $('#overlay').hide();
                                   $('#overlayPaper').hide();
                               }))
            .append(createDiv()
                    .html('Great Job!')
                    .css({
                             position: 'absolute',
                             left: 35,
                             top: 500,
                             width: 800,
                             fontSize: 80
                         }));
    };

    var next = function () {
        var total = Karma.rand(2, 5 + level);
        var x1 = total - Karma.rand(1, total - 1);
        var x2 = total - x1;
        var img_name;
        var choices = randomElementsIncluding(range(1, 10), total, 3);

        $('#timerIndicator').stop();
        displayScore();

        if (score == 30) {
            gameOver();
            return;
        }
        if (score % 5 == 0) {
            level = score < 0 ? 0 : Math.floor(score / 5);
        }
        img_name = img_names[level];


        displayObjects($('#topLeftBox'), img_name, x1);
        displayObjects($('#topRightBox'), img_name, x2);
        choices.forEach(
            function (choice, i) {
                var paper = choice_papers[i];
                displayObjects(paper, img_name, choice);
                paper.clickable(function () {
                                    var correct = choice == total;
                                    karma.play(correct ? 'correct' : 'incorrect');
                                    processAnswer(correct);
                                });
            }
        );
        startTimer();
    };
    choice_papers.forEach(function (x) { x.unclickable(); });
    next();
}

setUpLesson(initialize, startLesson);
