$(window).on('load', function () {
  waterfall();
  var dataInt = {
    'data': [
      {
        'src': '1.jpg'
      },
      {
        'src': '2.jpg'
      },
      {
        'src': '3.jpg'
      },
      {
        'src': '4.jpg'
      }
    ]
  }

  $(window).on('scroll', function() {
    if (checkScrollSlide) { //是否具备加载图片的条件
      $.each(dataInt.data, function (key, val) {
        let oBox = $('<div>').addClass('box').appendTo($('#main'));
        let oPic = $('<div>').addClass('pic').appendTo($(oBox));
        $('<img>').attr('src', '../images/' + $(val).attr('src')).appendTo($(oPic));
      })
      waterfall();
    }
  })
})

function waterfall() {
  let $boxs = $('#main>div');
  let w = $boxs.eq(0).outerWidth();//获取第一个盒子的宽度
  let cols = Math.floor($(window).width() / w);//获取当前列数
  $('#main').width(w * cols).css('margin', '0 auto');
  let hArr = [];
  $boxs.each(function(index, value) {//value 保存的是每一个盒子的dom对象
    let h = $boxs.eq(index).outerHeight();
    if (index < cols) {
      hArr[index] = h;
    } else {
      let minH = Math.min.apply(null, hArr);//获取最小高度
      let minHIndex = $.inArray(minH, hArr);//最小高度在数组中的索引
      $(value).css({//dom对象转化为jquery对象
        'position': 'absolute',
        'top': minH + 'px',
        'left': minHIndex * w + 'px'
      })
      hArr[minHIndex] += $boxs.eq(index).outerHeight();
    }
  })
}

function checkScrollSlide() {
  let $lastBox = $('#main>div').last();//获取最后一个元素
  let lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
  let scrollTop = $(window).scrollTop();//滚动条滚动高度
  let documentH = $(window).height();

  return (lastBoxDis < scrollTop + documentH) ? true : false;
}