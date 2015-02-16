var timer;
var clock;

function initialize(karma){
    //scoreboardInitialize();
    clock = createCountdownTimer(function () {}, 10);
}

function startLesson(karma){
    var remaining_computer_boxes;
    var remaining_player_boxes;
    clearTimeout(timer);
    clock.show();
	
	var showArrow = function(an_integer) {
		$('.arrow').hide();
		$('#arrow' + an_integer).show();		
	};
	

    var createLevelButton = function (an_integer) {
       return createDiv()
            .addClass('level')
            .append(karma.createImg('level' + (an_integer + 1)))
			.append(karma.createImg('levelArrow')
				.addClass('arrow')
				.attr('id','arrow' + (an_integer)))
            .click(function () { selectLevel(an_integer); });
    };

    var createTruck = function (color) {
        return createDiv(color + 'Truck')
            .css({ zIndex: 5, position: 'absolute' })
            .append(createDiv(color + 'TruckText')
                    .css({ zIndex: 250, position: 'absolute' }))
            .append(createDiv(color + 'TruckImg')
                    .append(karma.createImg(color + 'Truck0'))
                    .css({ zIndex: 5, position: 'absolute' }));
    };

    $('#content')
        .empty()
        .append(createDiv('instructions')
                .html('छिटो गुणन गर्दै उत्तर टाइप गरेर Enter मा क्लिक गर : '))
        .append(createDiv('gameOver'))        
        .append(createDiv('imgMainBridge')
                .append(karma.createImg('main_bridge'))
                .css({
                         zIndex: 100,
                         position: 'absolute',
                         top: '100px',
                         left: 0
                     }))

        .append(createDiv('bridgeUp')
                .append(karma.createImg('bridgeUp'))
                .css({
                         zIndex: 90,
                         position: 'absolute',
                         top: '180px',
                         left: 0
                     }))
        .append(createDiv('bridge1')
                .css({
                         zIndex: 0,
                         position: 'absolute',
                         top: '115px',
                         left: 0
                     })
                .append(createTruck('red')))
        .append(createDiv('bridge2')
                .css({
                         zIndex: '0',
                         position: 'absolute',
                         top: '376px',
                         left: 0
                     })
                .append(createTruck('blue')))
        .append(createDiv('redTruckArea')
                .attr('class','truckArea')
                .css({
                         zIndex: '300',
                         position: 'absolute',
 			 'padding-top': 50,
                         top: 0,
                         left: 0,
						 font: '2em arial,verdana,geneva,helvetica'
                     })
				.bind({
					mouseover : function(){
						$('#redTruckArea').append(karma.createImg('imgComputerTruck'));
										  },
					mouseout : function(){
						$('#redTruckArea').empty();
										 }
					 })
				)	 

        .append(createDiv('blueTruckArea')
                .attr('class','truckArea')
                .css({
                         zIndex: '300',
                         position: 'absolute',
                         top: '214px',
			 'padding-top': 50,
                         left: 0,
						 font: '2em arial,verdana,geneva,helvetica'
                     })
				.bind({
					mouseover : function(){
						$('#blueTruckArea').append(karma.createImg('imgYourTruck'));
										  },
					mouseout : function(){
						$('#blueTruckArea').empty();
										 }
					 })
				)

        .append(createDiv('questionSection')
                .css({
                         zIndex: '110',
                         position: 'absolute',
                         top: '512px',
                         left: '335px'
                     })
                .append(createDiv('ques')
                        .attr('class','quesBoxes')
                       )
                .append(createDiv('answerShow')))
        .append(createDiv('infoText')
                .css({
                         zIndex: '180',
                         position: 'absolute',
                         bottom: '60px',
                         right: '100px'
                     })
		.bind({
			mouseover : function(){
				$('#infotextArea').append(karma.createImg('infoText'));
								  },
			mouseout : function(){
				$('#infotextArea').empty();
								 }
			 })
		)
				

        .append(createDiv('infotextArea')
                .css({
                         zIndex: '120',
                         position: 'absolute',
                         top: '240px',
                         left: '420px'
                     }))
        .append(createDiv('levelControl')
                .css({
                         zIndex: '120'
                     })
                .append(createLevelButton(0))
                .append(createLevelButton(1))
                .append(createLevelButton(2)));


    function resetTimer(){
        clock.reset();
        clock.setTime(5);
        clock.setCallback(checkAnswer);
        clock.start();
    }

    var createTaskGenerator = function (range1, range2) {
        return function () {
            return { x1: randomElement(range1),
                     x2: randomElement(range2) };
        };
    };

    var all_generators = [
        createTaskGenerator(range(2, 6),
                            range(1, 5)),
        createTaskGenerator(range(4, 9),
                            range(4, 8)),
        createTaskGenerator(range(8, 11),
                            range(7, 11))
    ];
    var generator;


    function selectLevel(current_level){
	showArrow(current_level);
        generator = all_generators[current_level];
        showQuestion();
    }

    function showQuestion(){
        resetTimer();
        var task = generator();
        $('#ques')
            .empty()
            .append(task.x1 +' X '+ task.x2 +' =  ?')
            .append($(document.createElement('input'))
                    .attr('class','inputBox')
                    .attr('id','ans'))
            .append(createDiv('displayImg'));
        var product = task.x1 * task.x2;
        $('#ans')
            .empty()
            .focus()
            .data('correct_answer', product)
            .data('feedback', task.x1 + ' X ' + task.x2 + ' = ' + product)
            .keypress(function(event) {
                          if(event.which === 13){
                              checkAnswer();
                          }
                      });
        $('#answerShow').empty();
    }

    function checkAnswer(){
        $('#answerShow').empty();
        clock.stop();
        $('#ans')
            .unbind('keypress')
            .select();
        if ($('#ans').val() == $('#ans').data('correct_answer')) {
            $('#displayImg').append(karma.createImg('correctFace'));
            karma.play('correct');
            $(remaining_player_boxes.shift()).show();
            if (remaining_player_boxes.length == 0) {
                imgAnimate($('#blueTruck'),
                           { top: 0, left: '63.5em' },
                           8000,
                          'You win !!!');
                return;
            }
        } else {
            $('#answerShow').html($('#ans').data('feedback'));
            $('#displayImg').append(karma.createImg('incorrectFace'));
            karma.play('incorrect');
            $(remaining_computer_boxes.shift()).show();
            if (remaining_computer_boxes.length == 0) {
                imgAnimate($('#redTruck'),
                           { top: 0, left: '63.5em' },
                           8000,
                           'Computer wins !!!');
                return;
            }
        }
        timer = setTimeout(showQuestion,1500);
    }

    function imgAnimate(object, position, duration, msg) {
        object.animate(
            position,
            duration,
            function () {
                $('#questionSection').empty();
                $('#gameOver').html(msg);
            }
        );
    }

    function loadBoxes(truck_color){
        var initial_left = 170;
        var top = 25;
        var last_box;
        range(0, 4).forEach(
            function (row) {
                var left = initial_left;
                var width = 0;
                range(0, 3).forEach(
                    function (column) {
                        $('#' + truck_color + 'TruckImg')
                            .append(last_box = createDiv()
                                    .addClass('boxes')
                                    .addClass(truck_color)
                                    .css({
                                             left: (left - width),
                                             top: top
                                         }));
                        left = last_box.position().left;
                        width = last_box.width();
                    }
                );
                top = last_box.position().top - last_box.height();
            }
        );
        $('.boxes').hide();
    }

    loadBoxes('red');
    loadBoxes('blue');
    remaining_player_boxes = $('.boxes.blue').get();
    remaining_computer_boxes = $('.boxes.red').get();

    selectLevel(0);//start question here
}

setUpLesson(initialize, startLesson);
