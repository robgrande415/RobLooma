function setUpScreen(karma, instruction,
                     user_select_subject, user_select_action) {
    var createA = function (x) {
        return $(document.createElement('a'))
            .addClass(x)
            .html(x);
    };

    var createList = function (id, title) {
        return createDiv(id)
            .append($(document.createElement('h2'))
                    .addClass(title)
                    .html(capitalize(title) + ':'))
            .append($(document.createElement('ul'))
                    .attr('id', id + '_list'));
    };

    $('#content')
        .append(createDiv('main')
                .append(createDiv('instruction')
                        .append(instruction))
                .append(createList('subjects', 'pronoun'))
                .append(createDiv('pic'))
                .append(createList('actions', 'verb')));

    var addElementsToList = function (list, elements, button_class) {
        list.empty();
        return $(elements.map(
                     function (x) {
                         return $(document.createElement('li'))
                             .addClass('buttonDiv')
                             .append($(document.createElement('a'))
                                     .attr('id', x)
                                     .addClass('button')
                                     .addClass(button_class)
                                     .html(capitalize(x)));
                     }
                 ))
            .appendTo(list);
    };

    var addActions = function (subject) {
        addElementsToList($('#actions_list'), actions[subject], 'action');
    };

    var selectSubject = function (subject) {
        $('.selected').removeClass('selected');
        $('#' + subject).addClass('selected');
        showPicture(subject);
        addActions(subject);
        user_select_subject(subject);
        $('#actions_list a')
            .clickable(function () {
                           $('.selected.action').removeClass('selected');
                           $(this).addClass('selected');
                           var action = $(this).attr('id');
                           showPicture(action);
                           user_select_action(subject, action);
                       });
    };

    var showPicture = function (name) {
        $('#pic')
            .empty()
            .append(karma.createImg(name));
    };

    addElementsToList($('#subjects_list'), subjects, 'subject');

    $('#subjects_list a')
        .clickable(function () { selectSubject($(this).attr('id')); });

    selectSubject('he');
}

function screen1(karma) {
    var selectSubject = function (subject) {
        $('#page1').hide();
    };
    var selectAction = function (subject, action) {
        $('#page1_question')
            .empty()
            .html('What is ' + subject + ' doing?');
        $('#page1').show();
    };
    setUpScreen(karma, $._('Select a <span class="pronoun">pronoun</span> and a <span class="verb">verb</span> to read a question.'), selectSubject, selectAction);
    $('#main')
        .append(createDiv('page1')
                .addClass('page')
                .append($(document.createElement('a'))
                        .attr('id', 'page1_title')
                        .html('Question'))
                .append($(document.createElement('p'))
                        .append($(document.createElement('a'))
                                .attr('id', 'page1_question')))
                .append($(document.createElement('p'))
                        .append($(document.createElement('a'))
                                .attr('id', 'page1_instruction')
                                .html('Read it aloud')))
                .hide());
}

function createBlank() {
    return createDiv()
        .addClass('blank')
        .droppable({
                       tolerance: 'intersect',
	               hoverClass: 'drophover',
	               drop: function(event, ui) {
                           $(ui.draggable[0])
                               .css({ left: 0, top: 0 })
                               .appendTo($(event.target));
	               }
                   });
}

var correct_answer;

var checkAnswer = function (karma) {
    // '.blank .word' doesn't work. If you put all words on the same
    // blank in the correct order, we would mistakenly consider it
    // correct.
    var words = $('.blank :first-child')
        .map(function (i, word) { return $(word).html(); })
        .get();
    var concat = String.prototype.concat;
    if (!correct_answer ||
        concat.apply('', correct_answer) != concat.apply('', words)) {
        karma.play('incorrect');
    } else {
        karma.play('correct');
    }
};

function createWords(words) {
    return $(words.map(function (word) {
                           return createDiv()
                               .addClass('word')
                               .html(word)
                               .draggable({ revert: 'invalid' });
                       }));
}

function screen2(karma) {
    var selectSubject = function (subject) {
        $('.word').remove();
        correct_answer = null;
    };

    var selectAction = function (subject, action) {
        $('.word').remove();
        correct_answer = ['What', 'is', subject, 'doing'];
        createWords(Karma.shuffle(correct_answer))
            .appendTo('#page2_box');
    };

    setUpScreen(karma, $._('Select a <span class="pronoun">pronoun</span> and a <span class="verb">verb</span> to make a question.'), selectSubject, selectAction);

    $('#main')
        .append(createDiv('page2')
                .addClass('page')
                .append(createDiv('page2_question'))
                .append(createDiv('page2_box')
                        .addClass('word_box'))
                .append(karma.createImg('question_mark')
                        .clickable(function () { checkAnswer(karma); })
                        .addClass('question_mark')));
    $(range(0, 4).map(createBlank))
        .appendTo('#page2_question');
    $('#page2_question').append('?');
}

function screen3(karma) {
    var drawBlanks = function (i) {
        $('#page3_answer').empty();
        $(range(0, i).map(createBlank))
            .appendTo('#page3_answer');
        $('#page3_answer').append(createDiv('dot'));
    };

    var selectSubject = function (subject) {
        $('.word').remove();
        $('#page3_question').empty();
        correct_answer = null;
        drawBlanks(4);
    };

    var selectAction = function (subject, action) {
        $('.word').remove();
        $('#page3_question')
            .html('What is ' + subject + ' doing?');
        correct_answer = words[action];
        drawBlanks(correct_answer.length);
        createWords(Karma.shuffle(correct_answer))
            .appendTo('#page3_box');
    };

    setUpScreen(karma, $._('Select a <span class="pronoun">pronoun</span> and a <span class="verb">verb</span>. Then give a correct answer.'),
                selectSubject, selectAction);

    $('#main')
        .append(createDiv('page3')
                .addClass('page')
                .append(createDiv('page3_question'))
                .append(createDiv('page3_answer'))
                .append(createDiv('page3_box')
                        .addClass('word_box'))
                .append(karma.createImg('question_mark')
                        .clickable(function () { checkAnswer(karma); })
                        .addClass('question_mark')));

}

setUpMultiScreenLesson([screen1, screen2, screen3]);
