function $(dom) {
    return document.querySelector(dom);
}
function $$(dom) {
    return document.querySelectorAll(dom);
}


// 顶部banner轮播
new Swiper('.swiper', {
    loop: true, // 循环模式选项
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
    },
})
// 中间游戏轮播图
new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    on: {
        slideChange: function () {
            // 获取当前活动的slide的索引
            let currentIndex = this.realIndex;
            let lolS = $$(".banner-container .mark-container")
            lolS.forEach(lol => lol.classList.remove("appear"))
            lolS[currentIndex].classList.add("appear")
        },
    },
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
    },
    autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
    },
})
// 专题合集轮播图
new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true, // 循环模式选项
    navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
    }
});


// 获取单机游戏左侧按钮
let texts = $$(".hot-left ul li p")
// 获取li按钮数组
let btns = $$(".hot-left ul li")
let bigUL = $$(".hot-middle")
// 点击按钮变换数据
btns.forEach((btn, index) => {
    btns[index].onclick = () => {
        bigUL.forEach((ul, index) => {
            bigUL[index].classList.remove("go")
        })
        bigUL[index].classList.add("go")
        // 点击换图
        for (let j = 0; j < btns.length; j++) {
            btns[j].classList.remove("active")
            texts[j].style.color = "#999"
        }
        btns[index].classList.add("active")

        texts[index].style.color = "#FB9536"
    }
})


// 精品应用左侧列表
let iconList = $$(".activeShow .icon-list-container");
// 精品应用右侧分类列表
let buttonList = $$(".activeShow .buttonList-container .appear .for");
// 右侧按钮分页数据
let toggleNum = 11, page = 1; //每页显示条数，当前页码
let maxPage = Math.ceil(buttonList.length / toggleNum); //最大页数

// 精品应用左侧头部切换
let winBtn = $(".nice-app-container .switch-logo section div:nth-child(2)");
let macBtn = $(".nice-app-container .switch-logo section div:nth-child(3)");

winBtn.onclick = (e) => {
    // 改变tab样式
    e.target.classList.add("appActive");
    macBtn.classList.remove("appActive");

    $(".nice-app-container .switch-logo .more-active").classList.remove("more-active");
    $$(".nice-app-container .switch-logo>a")[0].classList.add("more-active");

    leftTabToggle($(".more-container .container-win"));
}
macBtn.onclick = (e) => {
    // 改变tab样式
    e.target.classList.add("appActive");
    winBtn.classList.remove("appActive");

    $(".nice-app-container .switch-logo .more-active").classList.remove("more-active");
    $$(".nice-app-container .switch-logo>a")[1].classList.add("more-active");

    leftTabToggle($(".more-container .container-mac"))
}

// 右侧按钮点击事件
buttonList.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        rightTabToggle(e, index);
    })
})

// 右侧左右箭头点击事件
let appBtnLeft = $(".activeShow .buttonList-top-container .appear .left");
let appBtnRight = $(".activeShow .buttonList-top-container .appear .right");
appBtnLeft.addEventListener("click", leftArrowClick)
appBtnRight.addEventListener("click", rightArrowClick);
function leftArrowClick(e) {
    page--;
    if (page < 1) page = 1;
    arrowToggle();
}
function rightArrowClick(e) {
    page++;
    if (page > maxPage) page = maxPage;
    arrowToggle();
}

//tips 左侧tab切换函数
function leftTabToggle(siblingBox) {
    // 切换左侧对应列表
    $(".more-container .activeShow").classList.remove("activeShow");
    siblingBox.classList.add("activeShow");
    buttonList = $$(".activeShow .buttonList-container .appear .for");
    maxPage = Math.ceil(buttonList.length / toggleNum);
    iconList = $$(".activeShow .icon-list-container");

    for (let i = 0; i < buttonList.length; i++) {
        if (buttonList[i].classList.contains("moreApp")) {
            buttonList[i].classList.remove("moreApp");
            iconList[i].classList.remove("appear");
            break;
        }
    }
    buttonList[0].classList.add("moreApp");
    iconList[0].classList.add("appear");

    buttonList.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            rightTabToggle(e, index);
        })
    })

    // 解除原事件
    appBtnLeft.removeEventListener("click", leftArrowClick);
    appBtnRight.removeEventListener("click", rightArrowClick);

    // 重新获取元素
    appBtnLeft = $(".activeShow .buttonList-top-container .appear .left");
    appBtnRight = $(".activeShow .buttonList-top-container .appear .right");

    // 绑定事件
    appBtnLeft.addEventListener("click", leftArrowClick);
    appBtnRight.addEventListener("click", rightArrowClick);

    page = 1;
    arrowToggle();
}

// tips 右侧分类按钮切换函数
function rightTabToggle(e, index) {
    $(".activeShow .buttonList-container .appear .moreApp").classList.remove("moreApp")
    e.target.classList.add("moreApp");

    $(".activeShow .appear").classList.remove("appear");
    iconList[index].classList.add("appear");
}

//tips 右侧左右箭头切换分页函数
function arrowToggle() {
    let start = (page - 1) * toggleNum;
    let end = page * toggleNum;
    buttonList.forEach((item, index) => {
        if (index >= start && index < end) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })
}
arrowToggle();


