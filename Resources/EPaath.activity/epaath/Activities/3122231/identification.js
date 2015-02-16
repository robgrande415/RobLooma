setUpSimpleMCQuiz(
    configuration,
    {
        presentOption: function (x) {
          return createDiv()
              .addClass('optImg')
              .html(x)
              .appendTo('#optionSection');
        }
    },
    things);
