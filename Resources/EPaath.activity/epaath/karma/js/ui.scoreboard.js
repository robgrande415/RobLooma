(function ($) {
     $.widget('ui.scoreboard', {
          options: {
                  score: 0,
                  total: 0,
                  layout: 'horizontal',
                  winningScore: 0
          },
          _create: function () {
                  var layout_id = 'h';
                  this.options.initialScore = this.options.score;
                  this.options.initialTotal = this.options.total;
                  if (this.options.layout === 'vertical') {
                          layout_id = 'v';
                  }
                  var element = this.element;
                  element
                          .addClass('ui-scoreboard-container-' + layout_id)
                          .addClass('ui-widget ui-widget-content ui-corner-all');

                  var createLabeledNumber = function(label) {
                          $(document.createElement('div'))
                                  .addClass('ui-scoreboard-spacing-' + layout_id)
                                  .addClass('ui-corner-all ui-scoreboard-text')
                                  .append(label)
                                  .appendTo(element);
                          return $(document.createElement('div'))
                                  .addClass('ui-scoreboard-spacing-' + layout_id)
                                  .addClass('ui-scoreboard-number-' + layout_id)
                                  .appendTo(element);
                  };
                  this._score = createLabeledNumber('Score');
                  this._total = createLabeledNumber('Total');
                  this._refresh();
          },
          getScore : function () {
                  return this.options.score;
          },
          setScore : function (new_score) {
                  if (this.options.score != new_score) {
                          this.options.score = new_score;
                          this._refresh();
                  }
          },
          getTotal : function () {
                  return this.options.total;
          },
          setTotal : function (new_total) {
                  if (this.options.total != new_total) {
                          this.options.total = new_total;
                          this._refresh();
                  }
          },
          reset : function () {
                  this.options.score = this.options.initialScore;
                  this.options.total = this.options.initialTotal;
                  this._refresh();
          },
          inc : function (val) {
                  var incVal = parseInt(val) || 1;
                  this.options.score = this.options.score + incVal;
                  this._refresh();
                  if (this.options.winScore === this.options.score) {
                          this.element.trigger('winGame');
                  }
          },
          incTotal : function (val) {
                  var incVal = parseInt(val) || 1;
                  this.options.total = this.options.total + incVal;
                  this._refresh();
          },
          dec : function (val) {
                  var decVal = parseInt(val) || 1;
                  this.options.score =  this.options.score - decVal;
                  this._refresh();
          },
          decTotal : function (val) {
                  var decVal = parseInt(val) || 1;
                  this.options.total =  this.options.total - decVal;
                  this._refresh();
          },
          _refresh : function () {
                  this._score.text(this.options.score);
                  this._total.text(this.options.total);
          },
          destroy : function () {
                  this.element.remove();
                  $.widget.prototype.destroy.apply(this, arguments);
          }
  });
 })(jQuery);

function scoreboard() {
    return $('#score_box');
}

function scoreboardInitialize(configuration) {
    scoreboard()
        .show()
        .scoreboard(configuration);
}

function scoreboardReset() {
    scoreboard().scoreboard('reset');
}

function scoreboardHit() {
    scoreboard()
        .scoreboard('inc')
        .scoreboard('incTotal');
}

function scoreboardMiss() {
    scoreboard()
        .scoreboard('incTotal');
}

function scoreboardScore() {
    return scoreboard().scoreboard('getScore');
}

function scoreboardTotal() {
    return scoreboard().scoreboard('getTotal');
}

function scoreboardAppendGameOverMessage(div) {
    div
        .append('You got  ')
        .append($(document.createElement('span'))
                .addClass('specialText')
                .append(scoreboardScore()))
        .append(' correct out of ')
        .append($(document.createElement('span'))
                .addClass('specialText')
                .append(scoreboardTotal()))
        .append(' questions.');
}


