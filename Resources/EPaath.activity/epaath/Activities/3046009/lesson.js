var initialized = false;

function initialize() {
    if (!initialized) {
        scoreboardInitialize({});
        initialized = true;
    }
}

// Concatenate the elements of array_of_arrays
function flatten1(array_of_arrays) {
    return Array.prototype.concat.apply([], array_of_arrays);
}

function showScreen(karma, content, sets, configuration) {
    initialize();
    scoreboardReset();

    var zIndex = 1;

    $('#linkNextLesson').hide();
    $('#linkPrevLesson').hide();

    var draggables_div = createDiv(configuration.draggables_div_id);
    var droppables_div = createDiv(configuration.droppables_div_id);
    content
        .append(createDiv('section')
                .append(draggables_div)
                .append(droppables_div));

    var array_of_arrays = sets.map(
        function (set) {
            return set.elements.map(
                function (element) {
                    return createDiv()
                        .append(element)
                        .addClass(configuration.drag_objects_class)
                        .data('set_name', set.name)
                        .data('first_try', true)
                        .draggable({
                                       containment: '#content',
                                       revert: 'invalid',
                                       start: function(event, ui) {
                                           $(this).css({ zIndex: zIndex++ });
                                       }
                                   })
                        .get()[0]; // Strip off the JQuery object.
                }
            );
        }
    );

    $(Karma.shuffle(flatten1(array_of_arrays)))
        .appendTo(draggables_div);

    $(sets.map(
          function (set) {
              var name = set.name;
              return createDiv()
                  .addClass(configuration.drop_objects_class)
                  .droppable(
                      {
                          hoverClass: 'drophover',
                          drop: function(event, ui) {
                              var draggable = ui.draggable;
                              if (draggable.data('set_name') == name) {
                                  draggable
                                      .draggable('disable')
                                      .addClass('dropped');
                                  if (draggable.data('first_try')) {
                                      scoreboardHit();
                                  }
                                  if ($('.dropped').length == 12) {
                                      configuration.navigationButtons.map(
                                          function (x) {
                                              $(x).show();
                                          }
                                      );
                                  }
                              } else {
                                  draggable.animate({ left: 0, top: 0 });
				  if(draggable.data('first_try')) {
                                      scoreboardMiss();
                                      draggable.data('first_try', false);
                                  }
                              }
                          }
                      });
          }))
        .appendTo(droppables_div);

    $(sets.map(
          function (set) {
              return createDiv()
                  .append(set.text)
                  .addClass('dropText');
          }))
        .appendTo(droppables_div);
}

function screen1(karma, content) {
	$("#help img").attr('src', 'help.png');
    content.append(createDiv('instructions')
        .html('खानेकुराहरूलाई कर्सरले तानेर मिल्ने नाङ्लोमा राख :'))
    var createElements = function (set_name) {
        return range(1, 5).map(function (i) {
                                   return karma.createImg(set_name + i);
                               });
    };
    var sets = [
        {
            name: 'fruit',
            text: 'फलफूलको  समूह',
            elements: createElements('fruit')
        },
	{
            name: 'veg',
            text: 'तरकारीको समूह',
            elements: createElements('veg')
        },
	{
            name: 'other',
            text: 'अन्य खानेकुराको समूह',
            elements: createElements('other')
        }
    ];
    var configuration = {
        draggables_div_id: 'shapesSection',
        droppables_div_id: 'dropSection',
        drag_objects_class: 'dragObjects',
        drop_objects_class: 'dropObjects',
        navigationButtons: ['#linkNextLesson']
    };
    showScreen(karma, content, sets, configuration);
}

var text_screen_configuration = {
    draggables_div_id: 'shapesSection1',
    droppables_div_id: 'dropSection1',
    drag_objects_class: 'dragObjectsText',
    drop_objects_class: 'dropObjects1'
};

function screen2(karma, content) {
	$("#help img").attr('src', 'help2.png');
    content.append(createDiv('instructions')
        .html('जनावरहरूका नामलाई कर्सरले तानेर ठीक समूहमा राख :'))
    var sets = [
        {
            name: 'air',
            text: 'चराको  समूह',
            elements: ['चील', 'परेवा', 'सुगा', 'मैना']
        },
	{ name: 'water',
          text: 'पानीमा पाइने  जनावरको समूह',
          elements: ['माछा', 'गोही', 'सार्क', 'डल्फिन']
        },
	{
            name: 'land',
            text: 'अन्य जनावरको समूह',
            elements: ['मृग', 'बाघ', 'घोडा', 'खसी']
        }
    ];
    var configuration = extend(text_screen_configuration,
                               { navigationButtons: ['#linkNextLesson',
                                                     '#linkPrevLesson'] });
    showScreen(karma, content, sets, configuration);
}

function screen3(karma, content) {
	$("#help img").attr('src', 'help3.png');

    content.append(createDiv('instructions')
        .html('वस्तुहरूलाई कर्सरले तानेर ठीक समूहमा राख :'))
    var sets = [
        {
            name: 'reading',
            text: 'पढ्ने सामग्रीको  समूह',
            elements: ['स्केल', 'कलम', 'इरेजर', 'किताब']
        },
	{
            name: 'playing',
            text: 'खेल्ने सामग्रीको समूह',
            elements: ['बल', 'तास', 'ब्याट', 'क्याराम']
        },
	{
            name: 'carrying',
            text: 'बोक्ने सामग्रीको समूह',
            elements: ['झोला', 'बाल्टिन', 'गाग्रो', 'डालो']
        }
    ];
    var configuration = extend(text_screen_configuration,
                               { navigationButtons: ['#linkPrevLesson'] });
    showScreen(karma, content, sets, configuration);
}

setUpMultiScreenLesson([screen1, screen2, screen3]);
