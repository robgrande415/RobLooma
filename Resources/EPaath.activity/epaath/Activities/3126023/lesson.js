var timer;
var one_second = 1000;


function displayImgInDiv(karma, parent, img, position) {
    return karma.createImg(img)
        .css({ position: 'absolute' })
        .css(position)
        .appendTo(parent);
}

function displayTextInDiv(parent, id, position, txt) {
    return createDiv(id)
        .css({ position: 'absolute',
               font: '2em arial,verdana,geneva,helvetica',
	       zIndex: 5,
	       whiteSpace: 'pre' })
        .css(position)
        .append(txt)
        .appendTo(parent);
}

function playAnimations(animations) {
    var f = function () {
        while (animations.length > 0) {
            var spec = animations.shift();
            if (spec instanceof Function) {
                spec();
            } else {
                if (spec.kind == 'translate') {
                    var object = $(spec.selector);
                    var pos = object.position();
                    object
                        .animate({ top: pos.top + spec.offset.top,
                                   left: pos.left + spec.offset.left },
                                 one_second,
                                 f);
                } else if (spec.kind == 'timeout') {
                    timer = setTimeout(f, spec.time);
                } else {
                    alert('don\'t know how to handle: ' + spec);
                }
                return;
            }
        }
    };
    f();
}

function createExplanationDisplayer(karma, content, explanations) {
    return function () {
        var explanation = explanations.shift();
        if (explanation instanceof Function) {
            explanation();
        } else {
            displayImgInDiv(karma, content, explanation.img, explanation.pos);
        }
        return explanations.length == 0;
    };
}

function createExplanationTextDisplayer(karma, content, explanations) {
    return function () {
        var explanation = explanations.shift();
        if (explanation instanceof Function) {
            explanation();
        } else {
            //displayImgInDiv(karma, content, explanation.img, explanation.pos);
	    //alert(explanation);
	    if(explanation.type == 'factor'){
		createDiv()
		    .append(explanation.title)
		    .addClass('text')
		    .css(explanation.css)
		    .appendTo(content);
		createDiv()
		    .append(explanation.number)
		    .addClass('text')
		    .css(explanation.css)
		    .css({left:350})
		    .appendTo(content);
	    }
	    else{
		createDiv()
		    .append(explanation.title)
		    .css(explanation.css)
		    .addClass('text')
		    .appendTo(content);
	    }
        }
        return explanations.length == 0;
    };
}


function repeat(x, n, separator) {
    var result = [];
    range(0, n).forEach(
        function (i) {
            if (i > 0) {
                result = result.concat(separator);
            }
            result = result.concat(x);
        }
    );
    return result;
}

function initialize() {
    scoreboardInitialize();
    scoreboard().hide();
}

function startLesson(karma, content) {
    screen1(karma, content);
}

function screen1(karma, content) {
    clearTimeout(timer);
    $('#linkNextLesson').hide();
    $('#linkPrevLesson').hide();
    scoreboard().hide();
    content.empty();

    var displayImg = function (img, position) {
        return displayImgInDiv(karma, content, img, position);
    };

    var stride = 60;

    var frog_jump_animations = [
        function () {
            var p0 = $('#frog0').position();
            $('#frog0').hide();
            $('#frog1')
                .css({ top: p0.top - 22, left: p0.left })
                .show();
        },
        {
            kind: 'translate',
            time: one_second,
            selector: '#frog1',
            offset: { top: -4, left: stride }
        },
        {
            kind: 'translate',
            time: one_second,
            selector: '#frog1',
            offset: { top: 4, left: stride - 14 }
        },
        function () {
            $('#frog1').hide();
            $('#frog0')
                .show(); // First show(), otherwise position() returns (0,0).
            var left = $('#frog0').position().left + 2 * stride;
            $('#frog0')
                .css({ left: left });
            displayImg('ruler_ring', { top: 45, left: left + 14 });
        }
    ];
    var rabbit_jump_animations = [
        function () {
            var p0 = $('#rabbit0').position();
            $('#rabbit0').hide();
            $('#rabbit1')
                .css({ top: p0.top, left: p0.left })
                .show();
        },
        {
            kind: 'translate',
            time: one_second,
            selector: '#rabbit1',
            offset: { top: -15, left: stride * 1.5 }
        },
        {
            kind: 'translate',
            time: one_second,
            selector: '#rabbit1',
            offset: { top: 15, left: stride * 1.5 - 14 }
        },
        function () {
            $('#rabbit1').hide();
            $('#rabbit0')
                .show(); // First show(), otherwise position() returns (0,0).
            var left = $('#rabbit0').position().left + 3 * stride;
            $('#rabbit0')
                .css({ left: left });
            displayImg('ruler_ring', { top: 160, left: left + 14 });
        }
    ];

    var displayRulerIntersect = function () {
        var left = $('#frog0').position().left;
        displayImg('ruler_intersect',
                   { top: 0, left: left + 26 });
    };

    var explanations = function () {
        var first_screen_text = [{
			     title:'भ्यागुताले टेकेको स्थान:<br>2 को गुना ( Multiples of 2 )',
			     number:'2&nbsp;&nbsp;4&nbsp;&nbsp;6&nbsp;&nbsp;8&nbsp;&nbsp;10&nbsp;&nbsp;12&nbsp;&nbsp;14&nbsp;&nbsp;16&nbsp;&nbsp;18',
			     css:{position:'absolute',top : 262,left:0,color:'#0000FF'},
			     type:'factor'
			 },
			 {
			     title:'खरायोले टेकेको स्थान :<br>3 को गुना ( Multiples of 3 )',
			     number:'3&nbsp;&nbsp;6&nbsp;&nbsp;9&nbsp;&nbsp;12&nbsp;&nbsp;15&nbsp;&nbsp;18',
			     css:{position:'absolute',top : 332,left:0,color:'#7F007F'},
			     type:'factor'
			 },
			 {
			     title:'दुबैले टेकेको स्थान :<br>6 को गुना ( Multiples of 6 )',
			     number:'6&nbsp;&nbsp;&nbsp;&nbsp;12&nbsp;&nbsp;&nbsp;&nbsp;18',
			     css:{position:'absolute',top : 402,left:0,color:'#0000FF'},
			     type:'factor'
			 },
			 {
			     title:'सबै भन्दा पहिले टेकेको समान स्थान :',
			     number:'6',
			     css:{position:'absolute',top : 482,left:0,color:'#FF0000'},
			     type:'factor'
			 },
			 {
			     title:'2 र 3 को समान गुना Common Multiple :',
			     number:'6',
			     css:{position:'absolute',top : 542,left:0,color:'#FF0000'},
			     type:'factor'
			 },
			 {
			     title:'यो नै LCM ( Least Common Multiple ) अथवा लघुत्तम समापवर्त्य हो । त्यसैले खरायो र भ्यागुतो दुबैले टेकेको स्थान अथवा सबैभन्दा छोटो दूरी 6 फिटमा पर्दो रहेछ। ',
			     css:{position:'absolute',top : 620,left:0,color:'#FF0000',align:'center'},
			     type:'explain'},
			 {
			     title:'लघुत्तम समापवर्त्यलाई छोटकरीमा ल.स भनिन्छ र अङ्ग्रेजीमा L.C.M भनिन्छ।',
			     css:{position:'absolute',top : 700,left:300,color:'#0000FF',align:'center'},
			     type:'explain'
			 }
			];


        var displayNextExplanation = createExplanationTextDisplayer(karma,
                                                               content,
                                                               first_screen_text);
        //displayNextExplanation();
        content
            .append(createDiv()
                    .addClass('nextBtn')
                    .css({ top: 262, left: 1062 })
                    .clickable(function () {
                                   var done = displayNextExplanation();
                                   if (done) {
                                       $(this).remove();
                                       $('#linkNextLesson')
                                           .unclickable()
                                           .clickable(
                                               function () {
                                                   screen2(karma,
                                                           content.empty());
                                               })
                                           .show();
                                   }
                               }));
    };

    var frogJump = function (n) {
        playAnimations(repeat(repeat(frog_jump_animations,
                                     3,
                                     [{ kind: 'timeout', time: one_second }]),
                              n,
                              [displayRulerIntersect,
                               { kind: 'timeout', time: one_second }])
                       .concat([displayRulerIntersect,
                               explanations]));
    };

    var rabitJump = function (n) {
      playAnimations(repeat(repeat(rabbit_jump_animations,
                                   2,
                                   [{ kind: 'timeout', time: one_second }]),
                            n,
                            [{ kind: 'timeout', time: 4 * one_second }]));
    };

    var animateAnimals = function () {
        frogJump(3);
        rabitJump(3);
    };

    displayImg('ruler', { top: 60, left: 12 });
    displayImg('ruler', { top: 174, left: 12 });

    displayImg('frog0', { top: 30, left: 32.5})
        .attr('id', 'frog0');
    displayImg('frog1', {})
        .attr('id', 'frog1')
        .hide();
    displayImg('rabbit0', { top: 120, left: 32.5})
        .attr('id', 'rabbit0');
    displayImg('rabbit1', { top: 220, left: 32.5})
        .attr('id', 'rabbit1')
        .hide();
    timer = setTimeout(animateAnimals, one_second);
}

function graduallyDisplayExplanations(displayer) {
    var done = displayer();
    if (!done) {
        timer = setTimeout(function () {
                               graduallyDisplayExplanations(displayer);
                           },
                           1000);
    }
}

function screen2(karma, content) {
    clearTimeout(timer);
    $('#linkPrevLesson')
        .unclickable()
        .clickable(function () { screen1(karma, content.empty()); })
        .show();
    $('#linkNextLesson')
        .unclickable()
        .clickable(function () { screen3(karma, content.empty()); })
        .show();

    var displayImg = function (img, position) {
        return displayImgInDiv(karma, content, img, position);
    };

    var explanations = [
        { img: 'lesson2ImgDef0',
          pos: { top: 0, left: 12 } },
        { img: 'lesson2ImgDef1',
          pos: { top: 130, left: 12 } },
        { img: 'lesson2ImgDef2',
          pos: { top: 160, left: 12 } },
        { img: 'lesson2ImgDef3',
          pos: { top: 200, left: 12 } },
        { img: 'lesson2ImgDef4',
          pos: { top: 330, left: 12 } },
        { img: 'lesson2ImgDef5',
          pos: { top: 360, left: 12 } },
        { img: 'lesson2ImgDef6',
          pos: { top: 405, left: 120 } }
    ];
    var displayText = function (id, position, txt) {
        return displayTextInDiv(content, id, position, txt);
    };
    var displayNextExplanation = createExplanationDisplayer(karma,
                                                            content,
                                                            explanations);
    displayNextExplanation();

    var explanations2 = [
        function () {
            displayImg('lesson2ImgSign', { top: 450, left: 240 });
	    displayText('lesson2Text1', { top: 446, left: 224}, '2   4,8');
        },
        function () {
            displayImg('lesson2ImgSign', { top: 478, left: 240 });
            displayText('lesson2Text2', { top: 476, left: 224}, '2   2,4');
        },
        function () {
	    displayText('lesson2Text3', {top: 510, left: 260}, '1,2');
        },
        { img: 'lesson2ImgDef7',
          pos: { top: 460, left: 370 } },
        { img: 'lesson2ImgDef8',
          pos: { top: 490, left: 370 } },
        { img: 'lesson2ImgDef9',
          pos: { top: 550, left: 300 } },
        function () {
        }
    ];

    content
        .append(createDiv()
                .addClass('nextBtn')
                .css({ top: 60, left: 1062 })
                .clickable(
                    function () {
                        var done = displayNextExplanation();
                        if (done) {
                            $(this).remove();
                            var displayer = createExplanationDisplayer(karma,
                                                                       content,
                                                                       explanations2);
                            graduallyDisplayExplanations(displayer);
                        }
                    }));
}

function screen3(karma, content) {
    clearTimeout(timer);
    $('#linkPrevLesson')
        .unclickable()
        .clickable(function () { screen2(karma, content.empty()); })
        .show();
    $('#linkNextLesson').hide();

    var displayImg = function (img, position) {
        return displayImgInDiv(karma, content, img, position);
    };
    var displayText = function (id, position, txt) {
        return displayTextInDiv(content, id, position, txt);
    };
    //displayImg('lesson3ImgDef0', { top: 0, left: 107 });
    createDiv('instructions')
	.append('शुन्य बाहेकको सबैभन्दा सानो सङ्ख्या जसलाई दुई वा सोभन्दा बढी सङ्ख्याले भाग गर्दा नि:शेष भाग लाग्छ ।')
	.appendTo(content);
    displayImg('lesson3ImgDef1', { top: 105, left: 333 });

    var displayDefinition = function (config) {
        var input_box;
        var check_box;
        var check_btn;
        var show_btn;
        next_button
            .unclickable()
            .hide();
        var finish = function () {
            input_box
                .val(config.answer)
                .attr({ disabled: true });
            check_btn.unclickable();
            show_btn.unclickable();
            check_box
                .empty()
                .append(karma.createImg('correct'));
            next_button
                .show()
                .clickable(config.next_function);
        };
        var answerCorrect = function () {
           return input_box.val().replace(' ', '') == config.answer;
        };
        return createDiv()
            .append(displayImg(config.img, { top: 0, left: 0 }))
            .append(input_box = $(document.createElement('input'))
                    .addClass('inputBox')
                    .attr({ type: 'text' })
                    .css({ position: 'absolute', top: 131, left: 0 })
                    .focus(function () {
                               $(this).addClass('focus');
                           })
                    .blur(function () {
                               $(this).removeClass('focus');
                          }))
            .append(check_box = createDiv()
                    .css({ position: 'absolute', top: 131, left:  120 }))
            .append(check_btn = createDiv()
                    .addClass('checkAns')
                    .css({ position: 'absolute', top: 176, left: -13 })
                    .clickable(function () {
                                   if (answerCorrect()) {
                                       karma.play('correct');
                                       finish();
                                   } else {
                                       karma.play('incorrect');
                                       check_box
                                           .empty()
                                           .append(karma.createImg('incorrect'));
                                   }
                               }))
            .append(show_btn = createDiv()
                    .addClass('showAns')
                    .css({ position: 'absolute', top: 176, left: 133 })
                    .clickable(finish))
            .appendTo(content);
    };

    var displayLeftDefinition = function () {
        displayDefinition({ answer: '7',
                            img: 'lesson3ImgDef2',
                            next_function: displayRightDefinition })
            .css({ position: 'absolute', top: 120, left: 0 });
    };

    var displayRightDefinition = function () {
        var explanations = [
            { img: 'lesson3ImgDef4',
              pos: { top: 294, left: 374 }
            },
            function () {
                next_button.hide();
                displayImg('lesson3ImgDef5', { top: 374, left: 200 });
            }
        ];
        var next_function = createExplanationDisplayer(karma,
                                                       content,
                                                       explanations);
        displayDefinition({ answer: '1,3,7',
                            img: 'lesson3ImgDef3',
                            next_function: next_function })
            .css({ position: 'absolute', top: 120, left: 867 });
    };

    var next_button = createDiv()
        .addClass('nextBtn')
        .css({ top: 250, left: 467})
        .clickable(displayLeftDefinition);

    content
        .append(next_button);


    var exercise_title = displayText('exerciseClickTitle',
                                     { top: 454, left: 426},
                                     'Exercise --- अभ्यास')
        .css({ color: '#FF0000' });
    displayTextInDiv(exercise_title, 'line', { top: -27, left: -186 },
                     '_____________________');

    var exercises = [
        function () {
            exercise(karma, content, tasks1, 'L.C.M पत्ता लगाऊ र सही उत्तरमा क्लिक गर:', true);
        },
        function () {
            exercise(karma, content, tasks2, 'कापीमा हिसाब गरेर L.C.M पत्ता लगाऊ :', false);
        },
        function () {
            exercise(karma, content, tasks3, 'कापीमा हिसाब गरेर L.C.M पत्ता लगाऊ :', false);
        }
    ];

    $(exercises.map(
        function (fn, i) {
            return createDiv('exercise' + (i + 1))
                .addClass('exerciseButtons')
                .css({ bottom: 7, left: 267 + i * 200 })
                .clickable(fn);
        }
      ))
        .appendTo(content);
}

// Euclid's Algorithm
function gcd(x1, x2) {
    if (x1 < x2) {
        return gcd(x2, x1);
    } else {
        var q = Math.floor(x1 / x2);
        var r = x1 % x2;
        if (r == 0) {
            return x2;
        } else {
            return gcd(x2, r);
        }
    }
}

function lcm2(x1, x2) {
    return x1 * x2 / gcd(x1, x2);
}

function lcm(/* x1, x2, ... */) {
    var args = Array.prototype.slice.apply(arguments, []);
    return args.reduce(lcm2);
}


var tasks1 = [
    [45, 50],
    [3, 6],
    [7, 4],
    [24, 18],
    [15, 25],
    [24, 2],
    [20, 16],
    [8, 4],
    [11, 17],
    [12, 6],
    [7, 10],
    [18, 5],
    [2, 16],
    [5, 12],
    [9, 15]
];
var tasks2 = [
    [13, 65],
    [21, 49],
    [37, 6],
    [28, 84],
    [243, 27],
    [248, 29],
    [95, 25],
    [65, 15],
    [25, 40],
    [105, 35],
    [300, 125],
    [900, 60],
    [76, 30],
    [31, 310],
    [225, 50]
];
var tasks3 = [
    [17, 34, 51],
    [27, 28, 36],
    [6, 36, 216],
    [9, 81, 243],
    [2, 3, 4],
    [5, 3, 90],
    [64, 8, 1],
    [2, 56, 14],
    [12, 16, 18],
    [6, 2, 98],
    [70, 14, 49],
    [65, 13, 26],
    [78, 12, 9],
    [69, 4, 30],
    [60, 70, 40]
];

function exercise(karma, content, tasks, subtitle, display_options) {
    $('#linkPrevLesson')
        .unclickable()
        .clickable(function () {
                       scoreboard().hide();
                       screen3(karma, content.empty());
                   })
        .show();
    $('#linkNextLesson')
        .hide();

    scoreboardReset();
    scoreboard().show();
    var tasks_at_a_time = 5;
    var remaining_tasks = Karma.shuffle(tasks);
    var isComplete = function () {
        var count = 0;
        $('.ansBox').map(function (i, x) {
                             if ($(x).val() != '') {
                                 ++count;
                             }
                         });
        return count == tasks_at_a_time;
    };
    var checkAnswers = function () {
        $('.displayBox').empty();
        $('.ansBox').map(
            function (i, x) {
                var check = $(x).data('check')
                    .empty();
                if ($(x).val() == '' + $(x).data('solution')) {
                    check.append(karma.createImg('correct'));
                    scoreboardHit();
                } else {
                    check.append(karma.createImg('incorrect'));
                    scoreboardMiss();
                }
            }
        );
        $('.showAns').show();
        if (remaining_tasks.length > 0) {
            $('#moreQues').show();
        }
    };
    var showAnswers = function () {
        $('.ansBox').map(
            function (i, x) {
                $(x).val($(x).data('solution'));
                $(x).data('check')
                    .empty()
                    .append(karma.createImg('correct'));
            }
        );
        $('.showAns').hide();
    };

    content
        .empty()
        .append(createDiv('exerciseContainer'))
        .append(createDiv('checkButton')
                .append(createDiv()
                        .addClass('checkAns')
                        .css({ position: 'absolute',
                               top: 375,
                               left: 780 })
                        .clickable(checkAnswers)
                        .hide())
                .append(createDiv()
                        .addClass('showAns')
                        .css({ position: 'absolute',
                               top: 460,
                               left: 30 })
                        .clickable(showAnswers)
                        .hide())
                .append(createDiv('moreQues')
                        .css({ position: 'absolute',
                               top: 460,
                               left: 1020 })
                        .clickable(function () {
                                       displayTasks();
                                       $(this).hide();
                                       $('.showAns').hide();
                                       $('.checkAns').hide();
                                   })
                        .hide()));
    var displayTasks = function () {
        scoreboardReset();
        $('#exerciseContainer')
            .empty()
	    .append(createDiv('instructions')
		   .append(subtitle));
        $(range(0, tasks_at_a_time)
          .map(function (i) {
                   var task = remaining_tasks.shift();
                   var solution = lcm.apply([], task);
                   var input;
                   var check;
                   var result = createDiv()
                       .addClass('questions')
                       .append(createDiv()
                               .addClass('romanNums')
                               .append(toRoman(i + 1).toLowerCase() + ' )'))
                       .append(createDiv()
                               .addClass('numbersBox')
                               .append(task.join(',')))
                       .append(createDiv()
                               .addClass('inpBox')
                               .append(input = $(document.createElement('input'))
                                       .attr('type', 'text')
                                       .data('solution', solution)
                                       .addClass('ansBox default')
                                       .focus(function () {
                                                  $(this).addClass('focus');
                                              })
                                       .blur(function () {
                                                 $(this).removeClass('focus');
                                                 if (isComplete()) {
                                                     $('.checkAns')
                                                         .show();
                                                 }
                                             })
                                       .keypress(function (event) {
                                                     if (event.which == 13) {
                                                         if (isComplete()) {
                                                             $('.checkAns')
                                                                 .show();
                                                         }
                                                     }
                                                 })))
                       .append(check = createDiv()
                               .addClass('displayBox'));
                   input.data('check', check);
                   return result;
               }))
            .appendTo($('#exerciseContainer'));
        if (display_options) {
            $('#exerciseContainer')
                .append(createDiv('giveOptions'));
            $(Karma.shuffle($('.ansBox').get())
              .map(function (x) {
                       return createDiv()
                           .addClass('options')
                           .append($(x).data('solution'));
                   }))
                .appendTo($('#giveOptions'));
        }
    };
    displayTasks();
}

setUpLesson(initialize, startLesson);
