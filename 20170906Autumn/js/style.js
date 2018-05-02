$(document).ready(function(){
    $(".more").click(function(){
        $("#panel").slideToggle("slow");
        $(this).toggleClass("active"); return false;
    });
});
