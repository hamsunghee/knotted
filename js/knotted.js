$(document).ready(function () {

let $simg=$(".slide ul");
let $simgli=$(".slide ul li");
let $sbtn=$(".slide_btn ul li");
let $snext=$(".slide_side_btn .nex");
let $spre=$(".slide_side_btn .pre");
let simg_w=$simgli.width(); //이미지의 가로너비
let simg_n=$simgli.length; //이미지의 총개수
let soldidx=0; //기존이미지
let sindex=0; //선택된 새이미지

//index번째 비주얼이미지 이동하는 함수생성
function slideImg(sindex){

  targetX=-(sindex*simg_w)//움직이는 거리 (너비)

  $simg.animate({left:targetX},600);//위에서 계산한 거리만큼 움직임
  $sbtn.eq(soldidx).removeClass("active");//기존버튼 비활성화
  $sbtn.eq(sindex).addClass("active");//선택버튼 활성화
  soldidx=sindex;
};

//슬라이드 자동함수 생성
  function slideAuto(){
  
    sindex++;
    if(sindex==simg_n){ //simg_n은 이미지개수 5, index는 0,1,2,3,4
    sindex=0;
    }
    slideImg(sindex);
  };

  auto=setInterval(slideAuto ,4000);

  //하단버튼...
  $sbtn.click(function(){

    clearInterval(auto); //버튼 클릭시 자동함수 해지
    $(".play").hide();
    $(".stop").show();
    sindex=$(this).index();
    slideImg(sindex);
    auto=setInterval(slideAuto,4000);//버튼 클릭안할 땐 다시 자동함수 실행
  });

  //좌우버튼...
$snext.click(function(){

  clearInterval(auto);//멈추는 거 
  $(".play").hide();
  $(".stop").show();
  sindex++;
  if(sindex>simg_n-1){//마지막 이미지까지 오면 다시 첫번째 이미지부터 다시...
    sindex=0;
  }
  slideImg(sindex);
  auto=setInterval(slideAuto,4000);

});

$spre.click(function(){

  clearInterval(auto);
  $(".play").hide();
  $(".stop").show();
  sindex--;
  if(sindex<0){//첫번째 이미지까지 오면 다시 맨마지막 이미지부터 다시...
    sindex=simg_n-1;//총개수 4(이미지4컷)에서 1을 뺀 3-> index=3(0,1,2,3)
  }
  slideImg(sindex);
  auto=setInterval(slideAuto,4000);

});



  //Play,Stop...
  $(".play").hide();//처음에는 Stop버튼은 보이게 하기위해 Play버튼을 숨김

  $(".stop").click(function(){
    clearInterval(auto);
    $(".stop").hide();
    $(".play").show();
  });

  $(".play").click(function(){
    auto=setInterval(slideAuto,4000);
    $(".play").hide();
    $(".stop").show();
  });
  
  // 메인 
  $(".main").hover(function(){
    $(this).find(".sub").stop().slideDown();
  },function(){
    $(this).find(".sub").stop().slideUp();
  });

  //인스타

  $(".testimonial-pic img").click(function(){

    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    $(".testimonial .content").removeClass("active");
    $("#"+$(this).attr("data-alt")).addClass("active");//$("#tab1").addClass("active")
    //#tab1== $(this).attr("data-alt")

    });


  });
/* 팝업 */

$(document).on("click", ".btn-open", function (e){
  var target = $(this).attr("href");
  $(target).addClass("show");
});

// 외부영역 클릭 시 팝업 닫기
$(document).mouseup(function (e){
  var LayerPopup = $(".layer-popup");
  if(LayerPopup.has(e.target).length === 0){
    LayerPopup.removeClass("show");
  }
});

$(".tit").click(function(){
  
  $(this).siblings(".tit").removeClass("active"); //토글 한장소일 때만 가능
  $(this).toggleClass("active"); 
  $(this).siblings(".desc").stop().slideUp();
  $(this).next().stop().slideToggle();
  //find는 하위요소 찾을 때 , next는 같은 요소 찾을 때

  let dataImage= $(this).attr("data-image");
  $(".image img").attr("src", dataImage).hide().fadeIn();

});

