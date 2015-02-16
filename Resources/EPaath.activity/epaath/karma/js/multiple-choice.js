var MCQuiz = Karma.create(
    {},
    {
        initialize: function (karma, configuration, tasks) {
            this.karma = karma;
            this.tasks = tasks;
            this.configuration = configuration;
            return this;
        },
        start: function () {
            scoreboardInitialize({winningScore: this.tasks.length});
            scoreboardReset();
            this.i = 0;
            if (!this.configuration.tasks_in_order) {
                this.tasks = Karma.shuffle(this.tasks);
            }
            this.presentTask();
        },
        currentTask: function () {
            return this.tasks[this.i];
        },
        presentTask: function () {
            var task = this.currentTask();
            var correct_option = task.correct_option;
            var options = Karma.shuffle(task.options);
            this.tries = 0;
            this.presentQuestion(task.question);
            var that = this;
            $('#optionSection').empty();
            options.forEach(
                function (option, i) {
                    var result = option == correct_option ?
                        'correct' :
                        'incorrect';
                    that.presentOption(option, i, result)
                        .click(function () { that.playAudio(result); })
                        .click(function () { that.tries++; })
                        .click(function () { that.clicked(result); });
                }
            );
        },
        clicked: toBeOverridden('clicked'),
        progress: function () {
            if (this.atEnd()) {
                this.gameOver();
            } else {
                this.gotoNext();
            }
        },
        gameOver: function () {
            $('#content')
                .empty()
                .append(createDiv('gameOver')
                        .append(createDiv('gameOver').html('Game Over !!!'))
                        .append(createDiv('gameOverInfo'))
                        .show());
            scoreboardAppendGameOverMessage($('#gameOverInfo'));
        },
        gotoNext: function () {
            ++this.i;
            this.presentTask();
        },
        atEnd: function () {
            return this.i == this.tasks.length - 1;
        },
        presentQuestion: toBeOverridden('presentQuestion'),
        presentOption: toBeOverridden('presentOption'),
        createImg: function (name) {
            return this.karma.createImg(name);
        },
        playAudio: function (name) {
            this.karma.audio[name].play();
        }
    }
);


var SimpleMCQuiz = Karma.create(
    MCQuiz,
    {
        initialize: function (karma, configuration, tasks) {
            // configuration options:
            // - title: string
            // - has_audio: boolean
            // - question: string
            MCQuiz.initialize.apply(this, [karma, configuration, tasks]);
            this.configuration = configuration || {};
            return this;
        },
        start: function () {
            var that = this;
            $('#content')
                .empty()
                .removeClass('backOpaque');
            if (this.configuration.title) {
                $('#content')
                    .append(createDiv('title')
                            .html(this.configuration.title));
            }
            if (this.configuration.question) {
                $('#content')
                    .append(createDiv('questionBox')
                            .html(this.configuration.question));
            }
            if (this.configuration.has_audio) {
                $('#content')
                    .append(createDiv('listenAgain')
                            .click(function () { that.sayCurrent(); }));
            }
            $('#content')
                .append(createDiv('imageBox'))
                .append(createDiv('checkedOption'))
                .append(createDiv('optionSection'));
            MCQuiz.start.apply(this, []);
        },
        sayCurrent: function () {
            this.playAudio(this.currentTask().question);
        },
        presentQuestion: function (what) {
            $('#imageBox')
                .empty()
                .append(this.createImg(what).addClass('imgQues'));
            $('#checkedOption')
                .empty();
            if (this.configuration.has_audio) {
                $('#listenAgain')
                    .hide();
                this.sayCurrent();
            }
        },
        clicked: function (result) {
            var that = this;
            clearTimeout(self.timer);
            $('#checkedOption')
                .empty()
                .append(this.createImg(result));
            if (result == 'correct') {
                if (this.configuration.has_audio) {
                    $('#listenAgain')
                        .hide();
                }
                $('.optImg').unbind('click');
                if (this.tries == 1) {
                    scoreboardHit();
                } else {
                    scoreboardMiss();
                }
                setTimeout(function () { that.progress(); }, 1500);
            } else {
                this.incorrect();
            }
        },
        incorrect: function () {
            $('#listenAgain')
                .show();
            self.timer = setTimeout(function () {
                                        $('#checkedOption').empty();
                                    },
                                    1000);
        },
        gameOver: function () {
            $('#content')
                .empty()
                .append(createDiv('gameOver').html('Game Over !!!')
                        .show());
        }
    }
);

function setUpSimpleMCQuiz(configuration, extensions, objects) {
    var tasks = objects.map(
        function (o) {
            return {
                question: o,
                options: randomElementsIncluding(objects, o, 4),
                correct_option: o
            };
        }
    );
    var startLesson = function (karma) {
        Karma
            .create(SimpleMCQuiz, extensions)
            .initialize(karma, configuration, tasks)
            .start();
    };

    setUpLesson(function () {}, startLesson);
}


var OneShotMCQuiz = Karma.create(
    MCQuiz,
    {
        initialize: function (karma, configuration, tasks) {
            MCQuiz.initialize.apply(this, [karma, configuration, tasks]);
            return this;
        },
        start: function () {
            $('#content')
                .empty()
                .removeClass('backOpaque');
            $('#content')
                .append(createDiv('topText'))
                .append(createDiv('question'))
                .append(createDiv('optionSection'))
                .append(createDiv('answer'))
                .append(createDiv('imgStory'));
            MCQuiz.start.apply(this, []);
        },
        presentQuestion: function (what) {
            $('#question')
                .empty()
                .append((scoreboardTotal() + 1) + '. ' +
                        'What is the ' + what + ' doing ?');
            $('#imgStory')
                .empty()
                .append(this.createImg(what));
            $('#answer')
                .empty();
            $('#check')
                .empty();
            $('#linkNextLesson').hide();
        },
        presentOption: function (x, i, result) {
            var that = this;
            var parent = $('#optionSection');
            var check = createDiv()
                .addClass('check')
                .appendTo(parent);
            var icon = createDiv()
                .addClass('options')
                .click(function () { check.append(that.createImg(result)); })
                .append(this.createImg('abcd'[i]))
                .appendTo(parent);
            createDiv()
                .addClass('optionText')
                .html(x)
                .appendTo(parent);
            return icon;
        },
        clicked: function (result) {
            $('.options').unbind('click');
            if (result == 'correct') {
                scoreboardHit();
            } else {
                scoreboardMiss();
            }
            this.displayMessage();
            this.progress();
        },
        gotoNext: function () {
            var that = this;
            $('#linkNextLesson')
                .unbind()
                .click(function () {
                           $('#linkNextLesson').hide();
                           MCQuiz.gotoNext.apply(that, []);
                       })
                .show();
        },
        currentMessage: function () {
            var task = this.currentTask();
            var correct = task.correct_option;
            if (task.question == 'man') {
                return correct + '.';
            } else {
                return 'The ' + task.question + ' is ' + correct + '.';
            }
        },
        displayMessage: function () {
            $('#answer')
                .empty()
                .show()
                .append(this.currentMessage());
        },
        gameOver: function () {
            var that = this;
            $('#linkNextLesson')
                .unbind()
                .click(function () {
                           that.displayGameOverMessage();
                       })
                .show();
        },
        displayGameOverMessage: function () {
            MCQuiz.gameOver.apply(this, []);
        }
    }
);
