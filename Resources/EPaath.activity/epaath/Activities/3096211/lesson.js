function createButton(karma, button_spec) {
    return createDiv()
        .addClass('clickToChange large default')
        .append(button_spec.label)
        .mouseover(function () { $(this).addClass('hoverClick'); })
        .mouseout(function() { $(this).removeClass('hoverClick'); })
        .click(function () { karma.play(button_spec.audio); });
}


function screen1(karma, content) {
    var panels = [
        {
            original_img: 'fish',
            new_img: 'red_fish',
            top_button: { label: 'One fish', audio: 'one_fish' },
            bottom_button: { label: 'Red fish', audio: 'red_fish' }
        },
        {
            original_img: 'fish',
            new_img: 'blue_fish',
            top_button: { label: 'Two fish', audio: 'two_fish' },
            bottom_button: { label: 'Blue fish', audio: 'blue_fish' }
        },
        {
            original_img: 'house',
            new_img: 'red_house',
            top_button: { label: 'One house', audio: 'one_house' },
            bottom_button: { label: 'Red house', audio: 'red_house' }
        },
        {
            original_img: 'mouse',
            new_img: 'blue_mouse',
            top_button: { label: 'One mouse', audio: 'one_mouse' },
            bottom_button: { label: 'Blue mouse', audio: 'blue_mouse' }
        }
    ];
    var createPanel = function (spec) {
        var img = karma.createImg(spec.original_img);
        return createDiv()
            .addClass('imgBind')
            .append(createButton(karma, spec.top_button))
            .append(img)
            .append(createButton(karma, spec.bottom_button)
                    .click(function () {
                               img.replaceWith(karma.createImg(spec.new_img));
                           }));
    };
    content.append(createDiv('lesson1')
                   .addClass('lesson_1_and_2'));
    $(panels.map(createPanel))
        .appendTo($('#lesson1'));
}

function screen2(karma, content) {
    var panels = [
        {
            original_img: 'head',
            new_img: 'red_head',
            top_button: { label: 'One head', audio: 'one_head' },
            bottom_button: { label: 'Red head', audio: 'red_head' }
        },
        {
            original_img: 'bed',
            new_img: 'blue_bed',
            top_button: { label: 'One bed', audio: 'one_bed' },
            bottom_button: { label: 'Blue bed', audio: 'blue_bed' }
        }
    ];
    var createPanel = function (spec) {
        var img = karma.createImg(spec.original_img);
        return createDiv()
            .addClass('imgBind')
            .append(karma.createImg(spec.original_img))
            .append(createButton(karma, spec.top_button))
            .append(img)
            .append(createButton(karma, spec.bottom_button)
                    .click(function () {
                               img.replaceWith(karma.createImg(spec.new_img));
                           }));
    };
    content.append(createDiv('lesson2')
                   .addClass('lesson_1_and_2'));
    $(panels.map(createPanel))
        .appendTo($('#lesson2'));
}

function createColorsBar(karma, colors) {
    var result = createDiv()
        .addClass('colorBar');
    $(colors.map(
          function (color) {
              return createDiv()
                  .addClass('clickToChange medium border')
                  .addClass(color)
                  .mouseover(function () {
                                 $(this).toggleClass('hoverClick ' + color);
                             })
                  .mouseout(function() {
                                $(this).toggleClass('hoverClick ' + color);
                            })
                  .click(function () { karma.play(color); })
                  .append(capitalize(color));
          }))
        .appendTo(result);
    return result;
}

function showImage(karma, parent_selector, img) {
    return function () {
        $(parent_selector)
            .empty()
            .append(karma.createImg(img));
    };
}

function createImage(karma, spec) {
    return createDiv(spec.name)
        .append(karma.createImg(spec.name))
        .css({ position: 'absolute' })
        .css(spec.css || {});
}

function createLine(karma, elements) {
    var createElement = function (spec) {
        if (spec.kind == 'text') {
            return $(document.createElement('span'))
                .addClass(spec.className ? spec.className : 'clickTextInfo')
                .append(spec.label);
        } else if (spec.kind == 'button') {
            var result = createDiv()
                .addClass('clickToChange small border');
            if (spec.color) {
                result.addClass(spec.color);
            }
            if (spec.audio) {
                result.click(function () { karma.play(spec.audio); } );
            }
            if (spec.click) {
                result.click(spec.click);
            }
            if (spec.label) {
                result.append(spec.label);
            }
            return result;
        } else if (spec.kind == 'element') {
            return spec.element;
        }
        return null;
    };
    var result = createDiv();
     $(elements.map(createElement))
        .appendTo(result);
    return result;
}

function screen3(karma, content) {
    var lines = [
        [{ kind: 'text', label: 'See the little ' },
         { kind: 'button', label: 'turtle.', color: 'yellow', audio: 'turtle' }],
        [{ kind: 'text', label: 'The turtle is ' },
         { kind: 'button', label: 'purple.', color: 'purple', audio: 'purple',
           click: showImage(karma, '#turtle', 'turtle_purple') }],
        [{ kind: 'text', label: 'Its name is Punckle.' }],
        [{ kind: 'text', label: 'It has a ' },
         { kind: 'button', label: 'brown', color: 'brown', audio: 'brown' },
         { kind: 'button', label: 'uncle.', color: 'yellow', audio: 'uncle' }],
        [{ kind: 'text', label: 'The turtle ate a ' },
         { kind: 'button', label: 'bean.', color: 'yellow', audio: 'bean' }],
        [{ kind: 'text', label: 'It became ' },
         { kind: 'button', color: 'green', audio: 'green',
           click: showImage(karma, '#turtle', 'turtle_green') }],
        [{ kind: 'text', label: 'The turtle went to '},
         { kind: 'button', label: 'bed.', color: 'yellow', audio: 'bed' }],
        [{ kind: 'text', label: 'It became '},
         { kind: 'button', label: 'red.', color: 'red', audio: 'red',
           click: showImage(karma, '#turtle', 'turtle_red') }]
    ];
    var images = [
        { name: 'turtle', css: { top: 75, left: 0 } },
        { name: 'uncle', css: { top: 150, left: 500 } },
        { name: 'bean', css: { top: 275, left: 450 } },
        { name: 'bed', css: { top: 400, left: 490 } }
    ];
    content.append(createDiv('lesson3')
                   .addClass('lesson3'));
    $('#lesson3')
        .append(createColorsBar(karma, ['green', 'brown', 'purple']));
    $(lines.map(function (line) {
                    return createLine(karma, line)
                        .addClass('lesson3css');
                }))
        .appendTo($('#lesson3'));
    $(images.map(function (spec) { return createImage(karma, spec); }))
        .appendTo($('#lesson3'));
}

function screen4(karma, content) {
    var lines = [
        [{ kind: 'text', label: 'We go to the ' },
         { kind: 'button', label: 'zoo.', color: 'yellow', audio: 'zoo' }],
        [{ kind: 'text', label: 'One animal is ' },
         { kind: 'button', label: 'dead.', color: 'yellow', audio: 'dead' }],
        [{ kind: 'text', label: 'Its color is ' },
         { kind: 'button', color: 'red', audio: 'red',
           click: showImage(karma, '#dead', 'dead_red') }],
        [{ kind: 'text', label: 'This animal is ' },
         { kind: 'button', label: 'yellow.', color: 'yellow', audio: 'yellow',
           click: showImage(karma, '#giraffe', 'giraffe_yellow') }],
        [{ kind: 'text', label: 'It is a tall ' },
         { kind: 'button', label: 'fellow.', color: 'yellow', audio: 'fellow' }],
        [{ kind: 'text', label: 'We go to see the birds.' }],
        [{ kind: 'text', label: 'A bird just '},
         { kind: 'button', label: 'flew.', color: 'yellow', audio: 'flew' }],
        [{ kind: 'text', label: 'Its color is '},
         { kind: 'button', color: 'blue', audio: 'blue',
           click: showImage(karma, '#bird', 'bird_blue') }]
    ];
    var images = [
        { name: 'zoo', css: { top: 20, left: 450 } },
        { name: 'dead', css: { top: 135, left: 425 } },
        { name: 'giraffe', css: { top: 180, left: 0 } },
        { name: 'bird', css: { top: 250, left: 500 } },
        { name: 'cage', css: { top: 280, left: 550 } }
    ];
    content.append(createDiv('lesson4')
                   .addClass('lesson4'));
    $('#lesson4')
        .append(createColorsBar(karma, ['red', 'yellow', 'blue']));
    $(lines.map(function (line) {
                    return createLine(karma, line)
                        .addClass('lesson3css');
                }))
        .appendTo($('#lesson4'));
    $(images.map(function (spec) { return createImage(karma, spec); }))
        .appendTo($('#lesson4'));
}

function screen5(karma, content) {
    var lines = [
        [{ kind: 'text', label: 'From the zoo we came ' },
         { kind: 'button', label: 'back.', color: 'yellow', audio: 'back' }],
        [{ kind: 'text', label: 'Let us go to see the orange tree.' }],
        [{ kind: 'text', label: 'An orange is ' },
         { kind: 'button', label: 'orange.', color: 'orange', audio: 'orange',
           click: showImage(karma, '#orange', 'orange') }],
        [{ kind: 'text', label: 'Have you seen an orange that is ' },
         { kind: 'button', label: 'green?', color: 'green', audio: 'green',
           click: showImage(karma, '#orange', 'orange_green') }],
        [{ kind: 'text', label: 'An orange on a ' },
         { kind: 'element',
           element: $(document.createElement('span')).addClass('lesson5tree') },
         { kind: 'text', label: ' is '},
         { kind: 'button', color: 'green', audio: 'green',
           click: showImage(karma, '#orange', 'orange_green') }],
        [{ kind: 'text', label: 'It becomes ' },
         { kind: 'button', color: 'orange', audio: 'orange',
           click: showImage(karma, '#orange', 'orange') },
         { kind: 'text', label: ' in ', className: 'smallclickTextInfo' },
         { kind: 'button', label: 'November.', color: 'yellow', audio: 'november' }]
    ];
    var images = [
        { name: 'orange', css: { top: 190, left: 600 } },
        { name: 'tree', css: { top: 350, left: 320 } }
    ];
    content.append(createDiv('lesson5')
                   .addClass('lesson5'));
    $('#lesson5')
        .append(createColorsBar(karma, ['orange', 'white', 'black']));
    $(lines.map(function (line) {
                    return createLine(karma, line)
                        .addClass('lesson5css');
                }))
        .appendTo($('#lesson5'));
    $(images.map(function (spec) { return createImage(karma, spec); }))
        .appendTo($('#lesson5'));
}

function screen6(karma, content) {
    var lines = [
        [{ kind: 'text', label: 'Look at the cat.' }],
        [{ kind: 'text', label: 'It is ' },
         { kind: 'button', label: 'white', color: 'white', audio: 'white',
           click: showImage(karma, '#cat', 'cat') },
         { kind: 'text', label: ' and fat.', className: 'smallclickTextInfo' }],
        [{ kind: 'text', label: 'Make the white cat ' },
         { kind: 'button', label: 'black.', color: 'black', audio: 'black',
           click: showImage(karma, '#cat', 'cat_black') }],
        [{ kind: 'text', label: 'Give that black cat white ' },
         { kind: 'button', label: 'spots.', color: 'yellow', audio: 'spots',
           click: showImage(karma, '#cat', 'cat_with_spots') }],
        [{ kind: 'text', label: 'Now is the cat ' },
         { kind: 'button', color: 'white', audio: 'white',
           click: showImage(karma, '#cat', 'cat') },
         { kind: 'text', label: ', ', className: 'smallclickTextInfo' },
         { kind: 'button', color: 'black', audio: 'black',
           click: showImage(karma, '#cat', 'cat_black') },
         { kind: 'text', label: ' or fat?', className: 'smallclickTextInfo' }]
    ];
    content.append(createDiv('lesson6')
                   .addClass('lesson6'));
    $('#lesson6')
        .append(createLine(karma, lines[0])
               .addClass('lesson6css'))
        .append(createImage(karma,
                            { name: 'cat', css: { position: 'relative' } }));
    $(lines.slice(1).map(function (line) {
                             return createLine(karma, line)
                                 .addClass('lesson5css');
                         }))
        .appendTo($('#lesson6'));
}

function screen7(karma, content) {
    var lines1 = [
        [{ kind: 'text', label: 'Which would you like to ' },
         { kind: 'button', label: 'drink?', color: 'yellow', audio: 'drink' }],
        [{ kind: 'text', label: '        This,  this or this?' }],
        [{ kind: 'text', label: 'That one is ' },
         { kind: 'button', label: 'black', color: 'black', audio: 'black' },
         { kind: 'button', label: 'ink.', color: 'yellow', audio: 'ink' }],
        [{ kind: 'text', label: 'Don\'t drink ' },
         { kind: 'button', color: 'black', audio: 'black' },
         { kind: 'text', label: ' ink.', className: 'smallclickTextInfo' }],
        [{ kind: 'text', label: 'It will make you ' },
         { kind: 'button', label: 'sink.', color: 'yellow', audio: 'sink' }]];
    var lines2 = [
        [{ kind: 'text', label: 'That is ' },
         { kind: 'button', label: 'gray', color: 'gray', audio: 'gray'},
         { kind: 'text', label: ' ink.', className: 'smallclickTextInfo' }],
        [{ kind: 'text', label: 'It will make you ' },
         { kind: 'button', label: 'stink.', color: 'yellow', audio: 'stink' }]];
    var lines3 = [
        [{ kind: 'text', label: 'That is ' },
         { kind: 'button', label: 'pink', color: 'pink', audio: 'pink'},
         { kind: 'text', label: ' ink.', className: 'smallclickTextInfo' }],
        [{ kind: 'text', label: 'It will make you ' },
         { kind: 'button', label: 'think.', color: 'yellow', audio: 'think' }]
    ];
    var images = [
        { name: 'sink', css: { top: 135, left: 470 } },
        { name: 'stink', css: { top: 280, left: 570 } },
        { name: 'think', css: { top: 375, left: 820 } }
    ];

    content
        .append(createDiv('lesson7')
                .addClass('lesson7')
                .append(createColorsBar(karma, ['black', 'gray', 'pink'])
                        .removeClass('colorBar')
                        .addClass('lesson7ColorBar'))
                .append(createLine(karma, lines1[0])
                        .addClass('lesson7css marginSmall'))
                .append(createDiv('bindImgGlasses')
                        .addClass('lesson7css marginSmall')
                        .append(karma.createImg('black_glass'))
                        .append(karma.createImg('grey_glass'))
                        .append(karma.createImg('pink_glass'))));
    $(lines1.slice(1).map(function (line) {
                              return createLine(karma, line)
                                  .addClass('lesson7css marginSmall');
                          }))
        .appendTo('#lesson7');
    $(lines2.map(function (line) {
                     return createLine(karma, line)
                         .addClass('lesson7css marginMedium');
                 }))
        .appendTo('#lesson7');
    $(lines3.map(function (line) {
                     return createLine(karma, line)
                         .addClass('lesson7css marginLarge');
                 }))
        .appendTo('#lesson7');

    $(images.map(function (spec) { return createImage(karma, spec); }))
        .appendTo($('#lesson7'));
}

setUpMultiScreenLesson([screen1,
                        screen2,
                        screen3,
                        screen4,
                        screen5,
                        screen6,
                        screen7]);
