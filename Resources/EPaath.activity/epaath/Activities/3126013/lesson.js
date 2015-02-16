var tasks = [
    {
        question: 'चित्रको कुन सरलरेखा (line) हो ?',
        options: ['AD', 'BC', 'BD', 'AB'],
        image: 'line_segment',
        position: { top: '40%' },
        definition: 'न त कतै सुरु हुने ना अन्त्य हुने अनन्त सम्म लम्बिइ रहने र नापेर नसकिने रेखालाइ सरलरेखा (Line) भनिन्छ ।'
    },
    {
        question: 'चित्रको कुन भाग रेखाखण्ड (line segment) हो ?',
        options: ['BC', 'AD', 'BD', 'AB'],
        image: 'line_segment',
        position: { top: '40%' },
        definition: 'दुई बिन्दुबिचको निश्चित लम्बाई लाई सिधा पारेर जोड्दा एउटा रेखाखण्ड (Line Segment) बन्छ ।'
    },
    {
        question: 'रुलर (ruler) के गर्नको लागि प्रयोग गरिन्छ ?',
        options: ['रेखाखण्ड नाप्न ', 'कोण नाप्न ', 'वर्ग नाप्न ', ' रेखा नाप्न '],
        image: 'scale',
        position: { top: '40%' },
        definition: 'रुलर (Scale) का सम्मुख किनाराहरु सिधा र निश्चित लम्बाई भएका हुनाले यसलाई रेखाखण्डको नाप लिन प्रयोग गरिन्छ ।'
    },
    {
        question: 'तलका  मध्ये कुन चित्रले समानान्तर रेखाहरु (parallel lines) जनाउछ ?',
        options: ['चित्र ख', 'चित्र क', 'चित्र ग', 'चित्र घ'],
        image: 'lines',
        position: { top: '20%' },
        definition: 'अनन्तसम्म तन्किरहदा पनि प्रतिच्छेदित नहुने र सधै बराबर दुरिमा रहने  दुई अथवा  दुईभन्दाबढी रेखाहरुलाई समानान्तर रेखा (Parallel Lines) भनिन्छ ।'
    },
    {
        question: 'तलका  मध्ये कुन चित्रले प्रतिच्छेदित रेखाहरु (intersecting lines) जनाउछ ?',
        options: ['चित्र क', 'चित्र ग', 'चित्र ख', 'चित्र घ'],
        image: 'lines',
        position: { top: '20%' },
        definition: 'कुनै एक बिन्दुमा काट्दै चारैतर्फ लम्बिने दुईवटा रेखाहरुलाई प्रतिच्छेदित (Intersecting Lines) भनिन्छ ।'
    },
    {
        question: 'तलका  मध्ये कुन चित्रले प्रतिच्छेदित लम्बरेखाहरु (perpendicular lines) जनाउछ ?',
        options: ['चित्र क', 'चित्र ख ', 'चित्र ग', 'चित्र घ'],
        image: 'lines',
        position: { top: '20%' },
        definition: 'आपसमा समकोण परिकन प्रतिच्छेदित भएका रेखाहरुलाई लम्बरेखाहरु  (Perpendicular Lines) भनिन्छ ।'
    }
].map(function (x, i) {
          x.correct_option = x.options[0];
          x.answer = 'answer' + (i + 1);
          return x;
      });

function startLesson(karma) {
    var extensions = {
        start: function () {
            $('#content')
                .empty()
                .removeClass('backOpaque');
	    createDiv('instructions')
		.append('प्रश्न पढ र सही विकल्पमा क्लिक गर :')
		.appendTo('#content');
	    createDiv('section')
                .append(createDiv('question'))
                .append(createDiv('optionSection'))
                .append(createDiv('answer'))
                .append(createDiv('imgStory'))
                .appendTo('#content');
            MCQuiz.start.apply(this, []);
        },
        presentQuestion: function (what) {
            var task = this.currentTask();
            $('#question')
                .empty()
                .append(Karma.convertNumToLocale(scoreboardTotal() + 1, 'ne') + '. ' +
                        task.question);
            $('#check')
                .empty();
            $('#answer')
                .hide();
            $('#imgStory')
                .empty()
                .append(karma.createImg(task.image))
                .css(task.position);
            $('#linkNextLesson').hide();
        },
        currentMessage: function () {
            return this.currentTask().definition;
        },
        displayGameOverMessage: function () {
            $('#linkNextLesson').hide();
            $('#content')
                .empty()
                .append(createDiv('gameOver')
                        .html('Game Over !!!')
                        .append(createDiv('gameOverInfo'))
                        .show())
                .show();
            if (scoreboardTotal() == scoreboardScore()) {
		$('#gameOverInfo')
                    .append('बधाई छ !!!  सबै उत्तर सहि भए !!! ');
            } else {
                var specialText = function (x) {
                    return $(document.createElement('span'))
                        .addClass('specialText')
                        .append(x);
                };
                $('#gameOverInfo')
                    .append('किन गलत भयो पत्ता लगाउ र अर्को पटक सहि बनाउने कोशिश गर । ')
                    .append(document.createElement('br'))
                    .append('You got ')
                    .append(specialText(scoreboardScore()))
                    .append(' correct out of ')
                    .append(specialText(scoreboardTotal()))
                    .append(' questions.');
            }
        }
    };
    var q = Karma
        .create(OneShotMCQuiz, extensions)
        .initialize(karma, {}, tasks);
    q.start();
}

setUpLesson(function () {}, startLesson);
