$( document ).ready(function () {
  $('#newGroupContainer').hide(function () {});
  $( '#newGroupButton' ).click(function () {
    $('#newGroupContainer').slideToggle('slow', function () {

    });
  });
});
