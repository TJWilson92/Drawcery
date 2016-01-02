$(document).ready(function () {
  console.log('loaded');
  $('#addQuestionsDiv').hide(function () {});
  $('#newNotificationDiv').hide(function () {});

  $('#addQuestionButton').click(function () {
    $('#addQuestionsDiv').slideToggle('fast', function () {

    });
  });

  $('#showNewNotificationButton').click(function () {
    $('#newNotificationDiv').slideToggle('fast', function () {});
  });
});
