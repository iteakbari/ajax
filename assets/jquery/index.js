

// //////////////////////////////////////////

$(".k-code").on("keyup", function () {
  $(".k-code").each(function () {
      if ($(this).val() != "") {
          $("#submit").addClass('active');
      } else {
        $("#submit").removeClass('active');
      }
  });
});

// login with code
let mobInputAction = function () {
  $(".confirmBox").addClass("on");
  $(".mobileLogin").hide();
  $(".emailLogin").hide();
  $(".k-sign-label").text("کد تایید را وارد کنید");
  // $(".sign > div").css("min-height", "420px");

  var phone = $("#mobileInput").val();
  $('.k-number').text(phone[0] + phone.slice(1, 5) + "*".repeat(4) + phone.slice(-2));
  // $(".k-number").text(phone);
  $('.k-code:first-child').focus();
  doFocus();
  timer();
};

$("document").ready(function () {
  $(".nextStep").click(function () {
    mobInputAction();
  });
  $("#mobInput").keypress(function (e) {
    var inpVal = $("#mobInput").val();
    if (e.which == 13 && inpVal) {
      //Enter key pressed
      console.log($("#mobInput").val());
      mobInputAction();
    }
  });
  $(".k-reSend").on("click", function () {
    timer();
    $(".k-countdown").show();
    $(this).hide();
  });

  $(".k-changeNumber").on("click", function () {
    var minp = $("#mobInput");
    $(".k-code-box").removeClass("on");
    $(".k-code").val("");
    // minp.removeClass("deActive");
    // $(".sign > div").css("min-height", "200px");
    minp.show();
    $("#mobBtn").show();
    var tmpStr = minp.val();
    minp.val("");
    minp.val(tmpStr);
    minp.focus();
    $(".k-sign-label").text("شماره همراه خود را وارد کنید");
  });
});

// ///////////////////////////////

$(".k-step-one button").on("click", function () {
  $(".k-step-one").hide();
  $(".k-code-box").show();
  codeBox();
});

// timer               //////////////////////////
let timer = function () {
  var timer2 = "2:01";
  var interval = setInterval(function () {
    var timer = timer2.split(":");
    //by parsing integer, I avoid all extra string processing
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = seconds < 0 ? --minutes : minutes;
    if (minutes < 0) {
      clearInterval(interval);
      $(".k-countdown").hide();
      $(".k-reSend").show();
    }
    seconds = seconds < 0 ? 59 : seconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    //minutes = (minutes < 10) ?  minutes : minutes;
    $(".k-countdown").html(minutes + ":" + seconds);
    timer2 = minutes + ":" + seconds;
  }, 1000);
};
// ////////////////////////////////////////////
