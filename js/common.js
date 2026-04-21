$(function () {

 //----------------------------------------------
 $('a[href^="#"]').on('click', function() {
     var speed = 500;
     var href = $(this).attr("href");
     var target = $(href == "#" || href == "" ? 'html' : href);
     var position = target.offset().top-126;
     $("html, body").animate({ scrollTop: position }, speed, "swing");
     return false;
 });

 //----------------------------------------------
 $('#nav-btn').on('click', function() {
     if ($(this).hasClass('on')) {
         $("#nav-fixed").removeClass("navOpen");
         $("#nav-fixed").addClass("navClose");
         $(this).removeClass("on");
         var src = $(this).children('img').attr('src').replace('_close', '_open');
         $(this).children('img').attr('src', src);
     } else {
         $("#nav-fixed").removeClass("navClose");
         $("#nav-fixed").addClass("navOpen");
         $(this).addClass("on");
         var src = $(this).children('img').attr('src').replace('_open', '_close');
         $(this).children('img').attr('src', src);
     }
 });
 $('#nav-fixed a').on('click', function() {
     $("#nav-fixed").removeClass("navOpen");
     $("#nav-fixed").addClass("navClose");
     $("#nav-btn").removeClass("on");
     var src = $("#nav-btn").children('img').attr('src').replace('_close', '_open');
     $("#nav-btn").children('img').attr('src', src);
 });

 //----------------------------------------------
var topBtn = $('#page-top');
topBtn.hide();
var banner = $('.page-btn-sp');
var off = $('footer').offset();

    $(window).scroll(function () {
        if ($(this).scrollTop() > off.top - 600) {
            banner.fadeOut();
        } else {
            banner.fadeIn();
        }

        if ($(this).scrollTop() > 300) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });

    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});


const fixedButton = document.getElementById('fixedButton');
const informationSection = document.querySelector('.information');

// fixedButtonが存在するかチェック
if (fixedButton) {
  // スクロールイベントを監視
  window.addEventListener('scroll', () => {
    // information要素の上端のY座標を取得
    const infoTop = informationSection.getBoundingClientRect().top;
    
    // 画面の高さ（ビューポートの高さ）を取得
    const windowHeight = window.innerHeight;
    
    // information要素が画面内に入ったらボタンを非表示にする
    if (infoTop < windowHeight) {
      fixedButton.classList.remove('is-visible');
    } else {
      fixedButton.classList.add('is-visible');
    }
  });
}

$(window).on('load', function () {
});


// accordion --jquery
$(function(){
    var closeFlag = "true";
    $('.campaign-accordion .campaign-accordion-title button').click(function(){
        if (closeFlag === "true") {

            $(this).attr('aria-expanded', 'true');
            closeFlag = "false";
        } else {
            $(this).attr('aria-expanded', 'false');
            closeFlag = "true";
        }
        $(this).parent().next('.campaign-accordion-body').stop().slideToggle();
    });
});

$(function(){
  $('.question-accordion-title button').click(function(){
      var $button = $(this);
      var isExpanded = $button.attr('aria-expanded') === 'true';

      $button.attr('aria-expanded', !isExpanded);

      var controlsId = $button.attr('aria-controls');
      $('#' + controlsId).stop().slideToggle();
  });
});

$(function(){
    var flag = "close";
    $(".present-btn-more").on("click", function() {
        // Removed the click handling for the "もっと見る" button
    });
  });

// モーダル
$(function () {
  const focusableElements = 'a, button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"]), iframe, audio, video';
  let $previousActiveElement;
  let scrollPosition = 0; // スクロール位置を保存する変数

  // モーダルを開く
  function openModal($modal) {
    $previousActiveElement = $(document.activeElement); // 現在のフォーカスを保存
    scrollPosition = $(window).scrollTop(); // スクロール位置を記録
    $("body").addClass("no-scroll") // スクロールを無効化
    $modal.attr("aria-hidden", "false");
    const $focusable = $modal.find(focusableElements);
    if ($focusable.length) $focusable.first().focus(); // 最初のフォーカス可能要素にフォーカス
  }

  // モーダルを閉じる
  function closeModal($modal) {
    $("body").removeClass("no-scroll") // スクロールを有効化
    $(window).scrollTop(scrollPosition); // 元の位置にスクロールを戻す
    $modal.attr("aria-hidden", "true");
    if ($previousActiveElement) $previousActiveElement.focus(); // 元のフォーカス位置に戻す
  }

  // 開くボタンのイベント
  $(".modal_open").on("click", function () {
    const modalId = $(this).data("modal-target");
    const $modal = $(modalId);
    $(this).attr("aria-expanded", "true"); // ボタンのaria-expandedをtrueに
    openModal($modal);
  });

  // 閉じるボタンのイベント
  $(".modal").on("click", ".modal_close", function () {
    const $modal = $(this).closest(".modal");
    $(`[data-modal-target="#${$modal.attr("id")}"]`).attr("aria-expanded", "false"); // ボタンのaria-expandedをfalseに
    closeModal($modal);
  });

  // 背景クリックでモーダルを閉じる
  $(".modal").on("click", function (e) {
    if ($(e.target).is(".modal")) {
      closeModal($(this));
    }
  });

  // フォーカストラップ
  $(".modal").on("keydown", function (e) {
    const $modal = $(this);

    if (e.key === "Tab") {
      const $focusable = $modal.find(focusableElements);
      const first = $focusable.first()[0];
      const last = $focusable.last()[0];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }

    if (e.key === "Escape") {
      closeModal($modal);
    }
  });
});
