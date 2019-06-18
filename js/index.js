//javascript 实现瀑布流
window.onload = function () {
  waterfall('main', 'box');

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
  //滚动条事件
  window.onscroll = function () {
    if (checkScrollSlide) {//是否开始加载
      //将数据块渲染到当前页面的尾部
      let oParent = document.getElementById('main');
      for (let i = 0; i < dataInt.data.length; i++) {
        let oBox = document.createElement('div');
        oBox.className = 'box';
        oParent.appendChild(oBox);
        let oPic = document.createElement('div');
        oPic.className = 'pic';
        oBox.appendChild(oPic);
        let oImg = document.createElement('img');
        oImg.src = 'images/' + dataInt.data[i].src;
        oPic.appendChild(oImg);
      }
      waterfall('main', 'box');//使得新添加的元素添加样式
    }
  }
}

function waterfall(parent, box) {
  //将main下所有的class为box的元素取出来
  let oParent = document.getElementById(parent);
  let oBoxs = getByClass(oParent, box);//
  //计算整个页面显示的列数（页面宽/box的宽）
  let oBoxW = oBoxs[0].offsetWidth;//单个盒子的宽度
  let cols = Math.floor(document.documentElement.clientWidth / oBoxW);//获取列数
  //设置main的宽, 对齐方式
  oParent.style.cssText = 'width: ' + oBoxW * cols + 'px; margin: 0 auto';

  let hArr = [];
  for (let i = 0; i < oBoxs.length; i++) {
    if (i < cols) {
      hArr.push(oBoxs[i].offsetHeight);//第一行每个盒子的高度
    } else {
      let minH = Math.min.apply(null, hArr);//获取最小盒子的高度
      let index = getMinhIndex(hArr, minH);//最小盒子的索引
      oBoxs[i].style.position = 'absolute';
      oBoxs[i].style.top = minH + 'px';
      oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';// oBoxs[i].style.left = oBoxW * index + 'px';
      hArr[index] += oBoxs[i].offsetHeight;
    }
  }
}

//根据class获取元素
function getByClass(parent, clsName) {
  let boxArr = new Array(), //用来存储获取到的所有class为box的元素
      oElements = parent.getElementsByTagName('*');//获取父元素下的所有子元素
  for (var i = 0; i < oElements.length; i++) {
    if (oElements[i].className == clsName) {
      boxArr.push(oElements[i]);
    }
  }

  return boxArr;
}

//获取最小盒子的索引 index
function getMinhIndex(arr, val) {
  for(let i in arr) {
    if (arr[i] == val) {
      return i;
    }
  }
}

//检测是否具备了滚动条加载数据库的条件
function checkScrollSlide() {
  let oParent = document.getElementById('main');
  let oBoxs = getByClass(oParent, 'box');//找见所有的盒子
  let lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight/2);
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.body.clientHeight || document.documentElement.clientHeight;

  return (lastBoxH < scrollTop + height) ? true : false;
}