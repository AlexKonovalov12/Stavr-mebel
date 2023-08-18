'use strict'
// Переход по определенному фильтру

$(document).ready(function () {
    var filter = window.location.hash.replace('#', '');
    $('.filter-item[data-filter="' + filter + '"]').click();
});


