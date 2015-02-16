$(function () {
      var back = 'index.html';
      var doc = '';
      var params = window.location.search.slice(1).split('&');
      if (params) {
          back = params[0].split('=')[1];
          doc = params[1].split('=')[1];
      }

      $('#iframeLessonPlan').attr('src', '' + doc + '.html');
      $('#kHeader').kHeader({ title: 'Teacher\'s Note', zoom: false });
      $('#kHeaderBackBtn').click(function () { window.location = back; });

      Karma.scaleToViewport();
  });
