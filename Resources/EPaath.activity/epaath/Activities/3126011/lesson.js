var tasks = [
    {
        question: 'समूह V = {a,e,i,o,u} लाई  कसरी लेख्दा ठिक हुदैन ?',
        options: ['V = {e,a,i,a,u}',
                  'V = {e,a,o,i,u}',
                  'V = {i,u,a,o,e}',
                  'V = {a,e,o,i,u}'],
        explanation : 'मझौँला कोष्ठ { curly brackets } भित्र समूहका सबै सदस्यहरूलाई जुनसुकै क्रम <br>( order ) मा पनि लेक्न सकिन्छ ।'
    },
    {
        question: 'MISSISSIPPI (नदीको) नाममा भएका अङ्ग्रेजी वर्णमालाका अक्षर हरूको M समूह बनाउँदा कसरी लेख्नुपर्छ ?',
        options: ['M = {M,I,S,P}',
                  'M = {M,I,S,I,P,I}',
                  'M = {M,I,S,S,I,S,S,I,P,P,I}',
                  'M = {M,I,S,S,P}'],
        explanation : 'मझौँला कोष्ठ { curly brackets } भित्र समूहका कुनै पनि सदस्यलाई एक पटक भन्दा बढी दोहोर्‍याएर लेखिदैन ।'
    },
    {
        question: 'चिन्ह  &isin; ले के जनाउँछ ?',
        options: ['समूहको सदस्य हो',
                  'समूहको सदस्य होइन',
                  'उप-समूह हो',
                  'उप-समूह होइन '],
        explanation : 'a &isin; V भन्नाले a भन्ने सदस्य समूह V={ a, e, i , o, u } को एउटा सदस्य हो भन्ने जनाउँछ ।'
    },
    {
        question: 'चिन्ह &notin; ले के जनाउँछ ?',
        options: ['समूहको सदस्य होइन',
                  'समूहको सदस्य हो',
                  'उप-समूह हो',
                  'उप-समूह होइन '],
        explanation : 'P &notin; V भन्नाले P भन्ने सदस्य समूह V = { a, e, i, o, u } को कुनै पनि सदस्य होइन भन्ने जनाउँछ ।'
    },
    {
        question: 'समूहको गणनात्मकता (cardinal numbers) भन्नाले के बुझिन्छ ?',
        options: ['समूहमा भएका सदस्यहरूको सङ्ख्या',
                  'सङ्ख्याहरू मिलेर बनेको समूह',
                  'समूहहरूको सङ्ख्या',
                  'समूहलाई गन्ने'],
        explanation : 'समूहमा भएका सदस्यहरूको सङ्ख्यालाई समूहको गणनात्मकता ( Cardinal number of set ) भनिन्छ । जस्तै - v = { a, e, i, o,u} , अथवा n ( v ) = 5 र coffee शब्दमा भएका अक्षरहरूको समूह C = { c, o, f, e} , अथवा n( C ) = 4 हुन्छ ।'
    },
    {
        question: 'बराबर समूह (equal sets) भन्नाले के बुझिन्छ ?',
        options: ['दुईओटा  समूहमा उत्तिकै र उही सदस्यहरू छन् ',
                  'दुईओटा  समूहमा उत्तिकै सङ्ख्यामा सदस्यहरू छन्',
		  'दुईओटा  समूहमा उत्तिकै  केही सदस्यहरू  एकअर्कासँग मिल्छन',
                  'दुईओटा  समूहमा उत्तिकै सङ्ख्यामा तर सदस्यहरू सबै फरक हुनुपर्छ '],
        explanation : 'यदि दुईओटा समूहका सदस्यहरू उत्तिकै र उही छन् भने ती दुई समूहहरू बराबर हुन्छन् । जस्तै - B = { b, e, a, r } , A = { b, a, r, e } भए B= A अथवा A = B दुबै समूह बराबर छन् ।'
    },
    {
        question: 'समतुल्य समूह (equivalent sets) भन्नाले के बुझिन्छ ?',
        options: ['दुईओटा  समूहमा उत्तिकै सङ्ख्यामा सदस्यहरू छन्',
                  'दुईओटा  समूहमा उत्तिकै र उही सदस्यहरू छन् ',
		  'दुईओटा  समूहमा उत्तिकै  केही सदस्यहरू एकअर्कासँग मिल्छन',
                  'दुईओटा  समूहमा उत्तिकै सङ्ख्यामा तर सदस्यहरू सबै फरक हुनुपर्छ '],
        explanation : 'यदि दुईओटा समूहहरू A र B मा भएका सदस्यहरुको सङ्ख्या बराबर छ भने <br> n ( A ) = n ( B ) लेख्न सकिन्छ । यहाँ दुई समूहका सदस्यहरू उही पनि हुन सक्छन् वा कुनै फरक अथवा सबै फरक पनि हुन सक्छन् । यस्ता समूहहरूलाई समतुल्य समूहहरु ( equivalent sets ) भनिन्छ र A = B लेखिन्छ ।'
    },
    {
        question: 'चिन्ह &empty; ले कस्तो समूह जनाउँछ ?',
        options: ['एउटा पनि सदस्य नभएको  समूह ',
                  ' 0 (शून्य) सङ्ख्या सदस्य भएको  समूह',
                  'सबैभन्दा ठूलो समूह ',
                  'उप-समूह'],
        explanation : 'एउटा पनि सदस्य नभएको समूहलाई खाली समूह भनिन्छ र यसलाई &empty; अथवा { } ले जनाउँछ ।'
    }
].map(function (x, i) {
          x.correct_option = x.options[0];
          return x;
      });

function startLesson(karma) {
    var extensions = {
        start: function () {
            $('#content')
                .empty()
                .removeClass('backOpaque');
            createDiv('section')
                .append(createDiv('topText')
                        .html('प्रश्न पढ र सही उत्तरमा क्लिक गर'))
                .append(createDiv('question'))
                .append(createDiv('optionSection'))
                .append(createDiv('answer'))
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
            $('#linkNextLesson').hide();
        },
        currentMessage: function () {
            var task = this.currentTask();
            return createDiv().append(task.explanation);
        },
        displayGameOverMessage: function () {
            $('#linkNextLesson').hide();
            $('#question').hide();
            $('#topText').hide();
            $('#answer').hide();
            $('#content')
                .empty()
                .append(createDiv('gameOver')
                        .html('Game Over !!!')
                        .append(createDiv('gameOverInfo'))
                        .show())
                .show();
            if (scoreboardTotal() == scoreboardScore()) {
		$('#gameOverInfo')
                    .append('बधाई छ !!!  सबै उत्तर सही भए !!! ');
            } else {
                var specialText = function (x) {
                    return $(document.createElement('span'))
                        .addClass('specialText')
                        .append(x);
                };
                $('#gameOverInfo')
                    .append('किन गलत भयो पत्ता लगाउ र अर्को पटक सही बनाउने कोशिश गर । ')
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
