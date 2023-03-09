$(document).ready(function () {
    $(".toggle-sidebar-btn").on("click",function(){
     let leftContent = $(".left-main-content");
     let rightContent = $(".right-main-content");
     let btnText = $(".toggle-btn-text");
     let btnIcon = $(this).find("i")
     btnText.text(btnText.text() == 'Mở rộng' ? 'Thu gọn' : 'Mở rộng');
     leftContent.toggle();
     rightContent.toggleClass("col-lg-9 col-lg-12");
     btnIcon.toggleClass("fe fe-chevron-left fe fe-chevron-right");
    })
   });