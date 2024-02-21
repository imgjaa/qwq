//相关信息
const waterfall = document.querySelector(".waterfall");
const imgWidth = 220; // 每张图片的宽度

//创建元素
function creatImg() {
  waterfall.innerHTML = ""; // 清空原有内容
  for (let i = 2; i <= 54; i++) {
    // 创建img元素
    const img = document.createElement("img");
    const div = document.createElement("div");
    div.classList.add("waterfallBox");
    // 设置img的src属性
    img.src = `./img/a${i}.jpg`;
    // 将img添加到waterfall中
    div.appendChild(img);
    waterfall.appendChild(div);
    img.addEventListener("load", layout);
  }
}

creatImg();
window.addEventListener("load", layout);
window.addEventListener("resize", layout);

//布局
function layout() {
  function getinfo() {
    let waterfallWidth = waterfall.offsetWidth;
    let column = Math.floor(waterfallWidth / imgWidth);
    let gapCount = column - 1;
    let freeSpace = waterfallWidth - imgWidth * column;
    let gap = freeSpace / gapCount;
    return {
      gap: gap,
      column: column,
    };
  }
  let info = getinfo();
  let nextTop = new Array(info.column);
  nextTop.fill(0);
  // 求一维数组的最小值
  function getMinTop(nextTop) {
    let min = nextTop[0],
      index = 0;
    for (let i = 0; i < nextTop.length; i++) {
      if (nextTop[i] < min) {
        min = nextTop[i];
        index = i;
      }
    }
    return {
      min: min,
      index: index,
    };
  }
  // 求一维数组的最大值
  function getMaxTop(nextTop) {
    let max = nextTop[0],
      index = 0;
    for (let i = 0; i < nextTop.length; i++) {
      if (nextTop[i] > max) {
        max = nextTop[i];
        index = i;
      }
    }
    return {
      max: max,
      index: index,
    };
  }
  for (let i = 0; i < waterfall.children.length; i++) {
    const img = document.querySelector(`.waterfall div:nth-child(${i + 1})`);
    let minTop = getMinTop(nextTop);
    img.style.left = `${minTop.index * (imgWidth + info.gap)}px`;
    img.style.top = `${minTop.min + info.gap / 2}px`;
    // 更新数组
    nextTop[minTop.index] =
      nextTop[minTop.index] + img.offsetHeight + info.gap / 2;
    let maxTop = getMaxTop(nextTop);
    waterfall.style.height = maxTop.max + "px";
    img.children[0].style.opacity = 1;
  }
}
