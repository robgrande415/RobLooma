// This file can replace global.js in karma.

function padLeft(str, pad_character, length) {
    str = str.toString();
    pad_character = pad_character.toString();
    while (str.length < length) {
        str = pad_character + str;
    }
    return str;
}

function controlButtonClickCallback($button, callback) {
    $button.click(function () {
                      if (!$button.data('disabled')) {
                          callback();
                      }
                  });
}

function enableControlButton($button) {
    $button
        .css({opacity: 1, cursor: 'pointer'})
        .data('disabled', false);
}

function disableControlButton($button) {
    $button
        .css({opacity: 0.3, cursor: 'default'})
        .data('disabled', true);
}

function setUpLinkBackLesson() {
    $('#linkBackLesson')
        .click(function () {
                   window.location = '../../index.html';
               });
}

function setUpHelp() {
    var $help = $('#help');
    $('#linkHelp')
        .click(function () { $help.slideDown(2000); })
        .mouseout(function () { $help.slideUp(2000); });
}

function setUpPlayAgain(karma, start_game) {
    controlButtonClickCallback($('#linkPlayAgain'),
                               function () {
                                   start_game(karma, $('#content'));
                               });
}

/*
 * initialize is called once before the game is started. It is passed
 * the karma object as an argument.
 * Each time a game is started or restarted, start_game is called
 * with the karma object as an argument.
 */
function setUpLesson(initialize, start_game) {
    $(function () {
          setSelectable($('body'), false);

          $('#linkPrevLesson').hide();
          $('#linkNextLesson').hide();
          $("#linkCheck").hide();
		  disableImageDragging("#lesson_title img");
          var karma = lesson_karma();
          var $content = $('#content'); // TBD: error if absent
          karma.ready(
              function () {
                  setUpLinkBackLesson();
                  setUpHelp();
                  setUpPlayAgain(karma, start_game);
                  initialize(karma, $content);
                  start_game(karma, $content);
                  setSelectable($('input'), true);
              });
      });
}

function setUpMultiScreenLesson(draw_screen_fns) {
    $(function () {
          setSelectable($('body'), false);

          $('#linkPrevLesson').hide();
          $('#linkNextLesson').hide();
          $("#linkCheck").hide();
		  disableImageDragging("#lesson_title img");

          var karma = lesson_karma();
          var $content = $('#content'); // TBD: error if absent
          var current_screen = 0;

          var gotoFirstScreen = function() {
              current_screen = 0;
              updateScreen();
          };

          var updateScreen = function () {
              $content.empty();

              if (current_screen == 0) {
                  $('#linkPrevLesson').hide();
              } else {
                  $('#linkPrevLesson').show();
              }
              if (current_screen == draw_screen_fns.length - 1) {
                  $('#linkNextLesson').hide();
              } else {
                  $('#linkNextLesson').show();
              }
              draw_screen_fns[current_screen](karma, $content);
              setSelectable($('input'), true);
          };

          $('#linkNextLesson')
              .click(function () {
                         if (karma.audio.trigger) {
                             karma.audio.trigger.play();
                         }
                         ++current_screen;
                         updateScreen();
                     });
          $('#linkPrevLesson')
              .click(function () {
                         if (karma.audio.trigger) {
                             karma.audio.trigger.play();
                         }
                         --current_screen;
                         updateScreen();
                     });

          karma.ready(
              function () {
                  setUpLinkBackLesson();
                  setUpHelp();
                  setUpPlayAgain(karma, gotoFirstScreen);
                  gotoFirstScreen();
              });
      });
}


function setSelectable(target, is_selectable) {
    $(target).map(function(index, elem){
        setElementSelectable(elem, is_selectable);
    });
}

function setElementSelectable(target, is_selectable) {
    if (is_selectable != true) is_selectable = false;

    if (typeof target.onselectstart != 'undefined') { //IE
        target.onselectstart = function () { return is_selectable; };
    } else if (typeof target.style.MozUserSelect != 'undefined') { //Firefox
        target.style.MozUserSelect = is_selectable ? 'text' : '-moz-none';
    } else if (typeof target.style.KhtmlUserSelect != 'undefined') { //Webkit
        target.style.KhtmlUserSelect = is_selectable ? 'element' : 'none';
    } else { //Opera
        target.onmousedown = function () { return is_selectable; };
    }
    if (!is_selectable){
        target.style.cursor = 'default';
    }
}

function disableImageDragging(img) {
    $(img).mousedown(function (event) { event.preventDefault(); });
}

// TBD: move to Karma
function randomElement(collection) {
    return collection[Karma.random(0, collection.length - 1)];
}

// TBD: move to Karma
function range(lower, upper) {
    var result = [];
    for (var i = lower; i < upper; ++i) {
        result.push(i);
    }
    return result;
}

Karma.createImg = function (name, disable_dragging) {
    disable_dragging = typeof(disable_dragging) != 'undefined' ? disable_dragging : true;
    if (!this.image[name]) {
        alert('Missing image: ' + name);
    }
    var result = $(document.createElement('img'))
        .attr('src', this.image[name].src);
    if (disable_dragging) {
        disableImageDragging(result);
    }
    return result;
};

Karma.play = function (sound_name) {
    if (!this.audio[sound_name]) {
        alert('Missing sound file: ' + sound_name);
    }
    this.audio[sound_name].play();
}

Karma.random = Karma.rand;

function createDiv(id) {
    var result = $(document.createElement('div'));
    if (typeof(id) != 'undefined') {
        result.attr('id', id);
    }
    return result;
}

// Return 'n' elements from 'all', amongst which 'x'.
function randomElementsIncluding(all, x, n) {
    var others = all.filter(function (y) { return x != y; });
    var result = Karma.shuffle(others).slice(0, n - 1);
    result.push(x);
    return Karma.shuffle(result);
}

function extend(object, properties) {
    for (prop in properties) {
        if (properties.hasOwnProperty(prop)) {
            object[prop] = properties[prop];
        }
    }
    return object;
}

function toBeOverridden(method) {
    return function () {
        alert('Override ' + method);
    };
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

/*
 * Simple Drag and Drop:
 *  - you can drag the draggables to a droppable and drop it.
 *  - there can only be one draggable per droppable.
 *  - if you drop a draggable where there is no (free) droppable it will
 *    revert its position.
 *  - you can drag a previously dropped draggable.
 *  - once dropped the draggable will center itself on the droppable.
 *  - the dropHover class is removed if a droppable is occupied.
 *
 * The options_draggable argument accepts the same options as a
 * ui.draggable, except start/stop.
 *
 * The options_droppable argument accepts the same options as a
 * ui.draggable, except drop.
 * It takes an extra option dropSuccess, a callback that will be
 * invoked on a successful drop.
 */
function enableSimpleDragAndDrop(draggables,
                                 options_draggable,
                                 droppables,
                                 options_droppable) {
    var vacateDroppable = function (draggable) {
        var droppable = draggable.data('droppable');
        if (droppable) {
            droppable.data('draggable', null);
            draggable.data('droppable', null);
            var hover_class = options_droppable.hoverClass;
            if (hover_class) {
                droppable.droppable('option',
                                    'hoverClass',
                                    hover_class);
            }
        }
    };
    var revertOnMissedDrop = function (draggable) {
        if (!draggable.data('droppable')) {
            draggable.animate({ left: 0, top: 0 });
        }
    };
    $(draggables).draggable(
        extend(options_draggable,
               {
                   start: function (event, ui) {
                       vacateDroppable(ui.helper);
                   },
                   stop: function (event, ui) {
                       revertOnMissedDrop(ui.helper);
                   }
               })
    );
    var isVacant = function (droppable) {
        return !droppable.data('draggable');
    };
    var occupy = function (droppable, draggable) {
        droppable.data('draggable', draggable);
        draggable.data('droppable', droppable);
        draggable.position({ my: 'center', at: 'center', of: droppable });
        droppable.droppable('option', 'hoverClass', '');
    };
    $(droppables).droppable(
        extend(
            options_droppable,
            {
                drop: function (event, ui) {
                    var droppable = $(this);
                    var draggable = ui.draggable;
                    if (isVacant(droppable)) {
						allowDrop = true;
						if ( options_droppable.dropTest ){
							allowDrop = options_droppable.dropTest.apply(this, [event, ui]);
						}
						if ( allowDrop != false ){
							occupy(droppable, draggable);
							var success = options_droppable.dropSuccess;
							if (success) {
								success.apply(this, [event, ui]);
							}
						}
                    }
                }
            }
        )
    );
}

function objKeys(obj) {
    var keys = [];
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            keys.push(prop);
        }
    }
    return keys;
}

function constantly(x) {
    return function () { return x; };
}

function identity(x) {
    return x;
}

function toRoman(x) {
    var mapping = [
        { roman: 'M', arabic: 1000 },
        { roman: 'CM', arabic: 900 },
        { roman: 'D', arabic: 500 },
        { roman: 'CD', arabic: 400 },
        { roman: 'C', arabic: 100 },
        { roman: 'XC', arabic: 90 },
        { roman: 'L', arabic: 50 },
        { roman: 'XL', arabic: 40 },
        { roman: 'X', arabic: 10 },
        { roman: 'IX', arabic: 9 },
        { roman: 'V', arabic: 5 },
        { roman: 'IV', arabic: 4 },
        { roman: 'I', arabic: 1 }
    ];
    var i = 0;
    var result = [];
    while (x > 0) {
        var arabic = mapping[i].arabic;
        if (arabic <= x) {
            result.push(mapping[i].roman);
            x -= arabic;
        } else {
            ++i;
        }
    }
    return String.prototype.concat.apply('', result);
}
