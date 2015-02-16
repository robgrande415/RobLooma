var tasks = [
    ['table spoons', 'eight'],
    ['cups', 'seventeen'],
    ['frying pans', 'three'],
    ['serving spoons', 'six'],
    ['kettles', 'three'],
    ['stove', 'one','is'],
    ['knives', 'five'],
    ['plates', 'ten'],
    ['glasses', 'thirteen'],
    ['buckets', 'two']];

function createContentDivs(karma) {
    $('#content')
        .empty()
        .append(createDiv('gameTitle').html('Number in words'))
        .append(createDiv('def')
                .addClass('text')
                .html('Count and click on the letters to spell the number'))
        .append(karma.createImg('mainImage').addClass('imgHangMan'))
        .append(createDiv('questionSection')
                .addClass('text'))
        .append(createDiv('answerSection')
                .addClass('text'))
        .append(createDiv('infoSection')
                .addClass('text')
                .html('Click on the letters that fit in the answer. ' +
                      'You are given 3 chances to complete the answer.'))
        .append(createKeyboard())
        .append(createDiv('missedText')
                .html('Sorry, you missed it.')
                .hide())
        .append(createDiv('hangManSection'));
    showHangMan(karma, 0);
    $('#questionSection')
        .append('How many ')
        .append($(document.createElement('span')).addClass('objectName'))
        .append(' are there?');
}

function setUpAnswer(q_and_a) {
    var question = q_and_a[0];
    var answer = q_and_a[1];
    var isOrAre = "are ";
    if (q_and_a[2]=="is") {
        isOrAre = "is ";
    }
    var $answerSection = $('#answerSection')
        .empty()
        .append('There '+isOrAre);
    createAnswerBoxes(answer, $answerSection);
    $answerSection
        .append('&nbsp;&nbsp;')
        .append($(document.createElement('span')).addClass('objectName'))
        .append('.');
    $('.objectName')
        .empty()
        .append(question);
    return answer;
}
