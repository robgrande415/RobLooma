(function ($) {
     $.fn.clickable = function (click_handler) {
         return this.each(function () {
                              $(this)
                                  .bind('click.interactive', click_handler)
                                  .css({cursor: 'pointer'});
                          });
     };
     $.fn.unclickable = function () {
         return this.each(function (object) {
                              $(this)
                                  .unbind('click.interactive')
                                  .css({cursor: 'default'});
                          });
     };
 })(jQuery);
