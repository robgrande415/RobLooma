var lesson1_data = {
    instructions: 'वस्तुको आकार हेर र कर्सरले तानेर मिल्ने नाङ्लोमा राख',
    id: 1,
    shapes: [
        {
            name: 'quad1',
            shape: 'quad'
        },
        {
            name: 'quad2',
            shape: 'quad'
        },
        {
            name: 'quad3',
            shape: 'quad'
        },
        {
            name: 'quad4',
            shape: 'quad'
        },
        {
            name: 'circle1',
            shape: 'circle'
        },
        {
            name: 'circle2',
            shape: 'circle'
        },
        {
            name: 'circle3',
            shape: 'circle'
        },
        {
            name: 'circle4',
            shape: 'circle'
        }
    ]
};

var lesson2_data = {
    instructions: 'दिइएका आकारलाई कर्सरले तानेर मिल्ने नाङ्लोमा राख',
    id: 2,
    shapes: [
        {
            name: 'quad21',
            shape: 'quad'
        },
        {
            name: 'quad22',
            shape: 'quad'
        },
        {
            name: 'quad23',
            shape: 'quad'
        },
        {
            name: 'quad24',
            shape: 'quad'
        },
        {
            name: 'circle21',
            shape: 'circle'
        }
        ,
        {
            name: 'circle22',
            shape: 'circle'
        }
        ,
        {
            name: 'circle23',
            shape: 'circle'
        }
        ,
        {
            name: 'circle24',
            shape: 'circle'
        },
        {
            name: 'triangle21',
            shape: 'triangle'
        }
        ,
        {
            name: 'triangle22',
            shape: 'triangle'
        }
        ,
        {
            name: 'triangle23',
            shape: 'triangle'
        }
        ,
        {
            name: 'triangle24',
            shape: 'triangle'
        }
    ]
};

var shapes3 = [
    {
        name: 'triangle31',
        shape: 'triangle',
        position: { top: 7, left: 28, width: 56, height: 36 }
    },
    {
        name: 'triangle32',
        shape: 'triangle',
        position: { top: 112, left: 300, width: 53, height: 31 }
    },
    {
        name: 'triangle33',
        shape: 'triangle',
        position: { top: 119, left: 424, width: 36, height: 34 }
    },
    {
        name: 'triangle34',
        shape: 'triangle',
        position: { top: 119, left: 548, width: 49, height: 35 }
    },
    {
        name: 'quad31',
        shape: 'quad',
        position: { top: 67, left: 148, width: 56, height: 32 }
    },
    {
        name: 'quad31',
        shape: 'quad',
        position: { top: 49, left: 253, width: 56, height: 32 }
    },
    {
        name: 'quad32',
        shape: 'quad',
        position: { top: 114, left: 223, width: 57, height: 33 }
    },
    {
        name: 'quad33',
        shape: 'quad',
        position: { top: 157, left: 228, width: 53, height: 31 }
    },
    {
        name: 'quad34',
        shape: 'quad',
        position: { top: 122, left: 462, width: 40, height: 30 }
    },
    {
        name: 'quad34',
        shape: 'quad',
        position: { top: 122, left: 506, width: 40, height: 30 }
    },
    {
        name: 'circle31',
        shape: 'circle',
        position: { top: 182, left: 398, width: 55, height: 35 }
    },
    {
        name: 'circle31',
        shape: 'circle',
        position: { top: 177, left: 623, width: 55, height: 35 }
    },
    {
        name: 'circle32',
        shape: 'circle',
        position: { top: 49, left: 583, width: 52, height: 42 }
    },
    {
        name: 'circle32',
        shape: 'circle',
        position: { top: 107, left: 678, width: 52, height: 42 }
    }
];

var shapes3bis = [
    {
        name: 'triangle31',
        shape: 'triangle',
        position: { left: 136, top: 63, width: 56, height: 36 }
    },
    {
        name: 'triangle32',
        shape: 'triangle',
        position: { left: 408, top: 168, width: 53, height: 31 }
    },
    {
        name: 'triangle33',
        shape: 'triangle',
        position: { left: 534, top: 175, width: 36, height: 34 }
    },
    {
        name: 'triangle34',
        shape: 'triangle',
        position: { left: 656, top: 175, width: 49, height: 35 }
    },
    {
        name: 'quad31',
        shape: 'quad',
        position: { left: 256, top: 123, width: 56, height: 32 }
    },
    {
        name: 'quad31',
        shape: 'quad',
        position: { left: 362, top: 105, width: 56, height: 32 }
    },
    {
        name: 'quad32',
        shape: 'quad',
        position: { left: 331, top: 170, width: 57, height: 33 }
    },
    {
        name: 'quad33',
        shape: 'quad',
        position: { left: 336, top: 213, width: 53, height: 31 }
    },
    {
        name: 'quad34',
        shape: 'quad',
        position: { left: 570, top: 178, width: 40, height: 30 }
    },
    {
        name: 'quad34',
        shape: 'quad',
        position: { left: 614, top: 178, width: 40, height: 30 }
    },
    {
        name: 'circle31',
        shape: 'circle',
        position: { left: 506, top: 238, width: 55, height: 35 }
    },
    {
        name: 'circle31',
        shape: 'circle',
        position: { left: 731, top: 233, width: 55, height: 35 }
    },
    {
        name: 'circle32',
        shape: 'circle',
        position: { left: 691, top: 105, width: 52, height: 42 }
    },
    {
        name: 'circle32',
        shape: 'circle',
        position: { left: 786, top: 163, width: 52, height: 42 }
    }
];

var zIndex = 1;

function handleDrop(karma, event, ui) {
    var draggable = ui.draggable;
    if (event.target.id == draggable.data('shape')) {
        karma.play('correct');
        draggable
            .draggable({ disabled: true })
            .unbind('mouseenter')
            .unbind('mouseleave');
    } else {
        karma.play('incorrect');
        draggable.animate(draggable.data('original_position'), 1000);
    }
}

function createLesson (karma, content, lesson_data) {
    var lesson_id = lesson_data.id;
    zIndex = 1;
    content
        .append(createDiv('instructions')
               .append(lesson_data.instructions))
        .append(createDiv('section' + lesson_id)
                .append(createDiv('shapesSection' + lesson_id))
                .append(createDiv('dropSection' + lesson_id)));

    if (lesson_id == 1) {
        $('#dropSection' + lesson_id)
            .append(createDiv('quad')
                    .addClass('dropObjects'))
            .append(createDiv('circle')
                    .addClass('dropObjects'))
            .append(createDiv()
                    .html('चतुर्भुज')
                    .addClass('dropText'))
            .append(createDiv()
                    .html('वृत')
                    .addClass('dropText'));
    } else {
        $('#dropSection' + lesson_id)
            .append(createDiv('triangle')
                    .addClass('dropObjects'))
            .append(createDiv('quad')
                    .addClass('dropObjects'))
            .append(createDiv('circle')
                    .addClass('dropObjects'))
            .append(createDiv()
                    .html('त्रिभुज')
                    .addClass('dropText'))
            .append(createDiv()
                    .html('चतुर्भुज')
                    .addClass('dropText'))
            .append(createDiv()
                    .html('वृत')
                    .addClass('dropText'));
    }
    var shapes = lesson_data.shapes.slice();
    Karma.shuffle(shapes)
        .forEach(function (img) {
                     $('#shapesSection' + lesson_id)
                         .append(createDiv()
                                 .addClass('dragObjects')
                                 .append(Karma.createImg(img.name))
                                 .data('shape', img.shape)
                                 .data('original_position', { top: 0, left: 0})
                                );
                 });
    $('.dragObjects')
        .draggable( { revert: 'invalid',
		      start: function(evt,ui){
			  $(this).css({ 'z-index': zIndex++});
		      }
		    });
    $('.dropObjects')
        .droppable({
                       hoverClass: 'drophover',
                       drop: function (event, ui) {
                           handleDrop(karma, event, ui);
                       }
                   });
}

function lessonThree(karma, content) {
    zIndex = 1;
    content
        .append(createDiv('instructions')
                .append('चित्रमा भएको आकारलाई कर्सरले तानेर मिल्ने कोठामा राख'))
        .append(createDiv('section3')
                .append(createDiv('shapesSection3')
                        .append(createDiv('shapes3Img')))
                .append(createDiv('dropSection3')
                        .append(createDiv('triangle')
                                .addClass('dropObjects3'))
                        .append(createDiv('quad')
                                .addClass('dropObjects3'))
                        .append(createDiv('circle')
                                .addClass('dropObjects3')))
                .append(createDiv()
                        .html('त्रिभुज')
                        .addClass('dropText'))
                .append(createDiv()
                        .html('चतुर्भुज')
                        .addClass('dropText'))
                .append(createDiv()
                        .html('वृत')
                        .addClass('dropText')));

    shapes3.forEach(function (shape) {
                        $('#shapesSection3')
                            .append(createDiv()
                                    .addClass('dragObjects')
                                    .data('shape', shape.shape)
                                    .data('original_position', shape.position)
                                    .css({ position: 'absolute' })
                                    .css(shape.position)
                                    .append(karma.createImg(shape.name)));
                    });

    var move = function (x, offset) {
        x.css({ top: x.position().top + offset.top,
                left: x.position().left + offset.left });
    };

    $('.dragObjects')
        .draggable({ revert: 'invalid',
                     stop: function () {
                         move($(this), { top: -3, left: -3 });
                     }})
        .hover(function () {
                   move($(this), { top: 3, left: 3});
               },
               function () {
                   move($(this), { top: -3, left: -3});
               });

    $('.dropObjects3')
        .droppable({
                       hoverClass: 'drophover',
                       drop: function (event, ui) {
                           handleDrop(karma, event, ui);
                       }
                   });
}

setUpMultiScreenLesson(
    [
        function (karma, content) { createLesson(karma, content, lesson1_data); },
        function (karma, content) { createLesson(karma, content, lesson2_data); },
        lessonThree
    ]
);

