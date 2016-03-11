$(document).ready(function () {
    console.log("It's working");
});

$(document).on("keydown", function () {

});
$(document).on("touchmove", function (e) {
    var currentY = e.originalEvent.touches ?
        e.originalEvent.touches[0].pageY : e.pageY;
    if (currentY > lastY) {
        console.log('moving down');
    } else {
        console.log('moving up');
    }
});