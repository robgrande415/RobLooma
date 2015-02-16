var tasks = [
    {
        question1: 'एउटा झोलामा  x ओटा आँपहरु छन  ।',
        question2: 'x भनेको कति हो खनाएर हेर्दा थाहा हुन्छ ।',
        info: 'आप खन्याउन झोलामा  क्लिक गर्नुहोस ।',
        answer: 12,
        variable: 'x',
        img_name: 'img0'
    },
    {
        question1: 'एउटा बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन ।',
        question2: 'x भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ ।',
        info: 'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस ।',
        answer: 10,
        variable: 'x',
        img_name: 'img1'
    },
    {
        question1: 'एउटा प्याकेटमा z ओटा कलमहरु छन ।',
        question2: 'z भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ ।',
        info: 'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस ।',
        answer: 10,
        variable: 'z',
        img_name: 'img2'
    },
    {
        question1: 'एउटा झोलामा  y ओटा आपहरु छन ।',
        question2: 'y भनेको कति हो खनाएर हेर्दा थाहा हुन्छ ।',
        info: 'आप खन्याउन झोलामा  क्लिक गर्नुहोस ।',
        answer: 9,
        variable: 'y',
        img_name: 'img3'
    },
    {
        question1: 'एउटा डालोमा  y ओटा आपहरु छन ।',
        question2: 'y भनेको कति हो खनाएर हेर्दा थाहा हुन्छ ।',
        info: 'आप खन्याउन डालोमा  क्लिक गर्नुहोस ।',
        answer: 10,
        variable: 'y',
        img_name: 'img4'
    },
    {
        question1: 'एउटा बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन ।',
        question2: 'x भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ ।',
        info: 'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस ।',
        answer: 15,
        variable: 'x',
        img_name: 'img5'
    },
    {
        question1: 'एउटा बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन ।',
        question2: 'x भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ ।',
        info: 'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस ।',
        answer: 20,
        variable: 'x',
        img_name: 'img6'
    },
    {
        question1: 'एउटा बट्टामा z ओटा कलमहरु छन ।',
        question2: 'z भनेको कति हो बट्टा खोलेर  हेर्दा थाहा हुन्छ ।',
        info: 'बट्टा खोल्न बट्टामा  क्लिक गर्नुहोस ।',
        answer: 4,
        variable: 'z',
        img_name: 'img7'
    }
];

var timer;

function initialize(){
    scoreboardInitialize({});
}

function startLesson(karma) {
    clearTimeout(timer);
    scoreboardReset();

    var remaining_tasks = Karma.shuffle(tasks);
    var current_task;
    var number_of_tries = 0;

    $('#content')
        .empty()
	.append(createDiv('instructions')
		.html('निर्देशन अनुसार चलको मान पत्ता लगाऊ :'))
        .append(createDiv('section')
                .append(createDiv('leftSide')
                        .append(createDiv()
                                .addClass('bgQues')))
                .append(createDiv('rightSide')
                        .append(createDiv('question1')
                                .addClass('bgQuestion'))
                        .append(createDiv('question2')
                                .addClass('bgQuestion'))
                        .append(createDiv()
                                .addClass('bgInfo'))
			.append(createDiv()
				.addClass('bgAns'))));

    var imgClicked = function () {
        $('#linkCheck')
            .show();
        $('.bgQues')
            .empty()
            .append(karma.createImg(current_task.img_name + 'Clicked'));
        $('.bgInfo')
	    .remove();
	$('.bgAns')
            .empty()
            .show()
            .append(createDiv('ans')
                    .addClass('quesText')
                    .append('तेसो भए यहा ' + current_task.variable + "=")
                    .append($(document.createElement('input'))
                            .addClass('textBox')
                            .attr('maxlength', '2')
                            .keypress(
                                function (event) {
                                    if (event.which == 13) {
                                        checkAnswer();
                                    }
                                }))
                    .append(' हुन्छ ।'));
        //$('.bgInfo')
            //.addClass('quesText')
            //.html(current_task.info_clicked);
        $('.textBox').focus();
    };

    var checkAnswer = function () {
        number_of_tries++;
        if (current_task.answer == $('.textBox').val()) {
            if (number_of_tries == 1) {
                scoreboardHit();
            } else {
                scoreboardMiss();
            }
                    $('#linkCheck').hide();
            karma.play('correct');
            timer = setTimeout(nextQuestion, 1000);
        } else {
            karma.play('incorrect');
        }
    };

    $('#linkCheck')
        .unclickable()
        .clickable(checkAnswer);

    var nextQuestion = function () {
        number_of_tries = 0;
        if (remaining_tasks.length == 0) {
            $('#content')
                .empty()
                .append(createDiv('gameOver'));
        } else {
            current_task = remaining_tasks.shift();
            $('.bgAns').hide();
            $('.bgQues')
                .empty()
                .append(karma.createImg(current_task.img_name)
                        .clickable(imgClicked));
            $('#question1')
                .empty()
                .addClass('quesText')
                .html(current_task.question1);
            $('#question2')
                .empty()
                .addClass('quesText')
                .html(current_task.question2);
            $('.bgInfo')
                .addClass('quesText')
                .html(current_task.info);
        }
    };

    nextQuestion();
}

setUpLesson(initialize, startLesson);
