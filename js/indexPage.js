var noticeUserJS=sessionStorage.getItem("noticeUser");
var limitUserJS=sessionStorage.getItem("loginUser");
myNotice=JSON.parse(noticeUserJS);
pre=JSON.parse(limitUserJS);
//天气插件
function getWeather(location,type,el){
    var url = "http://restapi.amap.com/v3/weather/weatherInfo";
     var postData = {
        key: "dfb9a576fbcb2c9a13a65ab736e47004",
        city: location,
        extensions: "all"
    };
    $.ajax({
        url:url,
        type:type,
        data:postData,
        success:function(status,data){
            console.log(status);
            var html1 = "";
            var html2 = "";
            if(status.forecasts.length == 1){
                $(".data1").css("display","none");
                $(".data2").css("display","none");
                $(".data3").css("display","block");
                var weatherData = status.forecasts[0].casts;
                $(".thisWeather").html(weatherData[0].dayweather + '~' + weatherData[0].nightweather);
                $(".temp").html(weatherData[0].daytemp + '~' + weatherData[0].nighttemp);
                $(".wind1").html('风向：'+weatherData[0].daywind);
                $(".wind2").html('风速：'+weatherData[0].daypower);
            }else{
                $(".data1").css("display","block");
                $(".data2").css("display","block");
                $(".data3").css("display","none");
            }
        },
        error:function(status){
        }
    })
}
$(window).load(function(){
    getWeather('成都',"post",".box1")
})
//日历
var mySchedule = new Schedule({
    el: '#schedule-box',
    //date: '2018-9-20',
    clickCb: function (y,m,d) {
        document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
    },
    nextMonthCb: function (y,m,d) {
        document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
    },
    nextYeayCb: function (y,m,d) {
        document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
    },
    prevMonthCb: function (y,m,d) {
        document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
    },
    prevYearCb: function (y,m,d) {
        document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
    }
});
function time(Num){
    //获取时间
    var times =  new Date();
    //获取月份
    var month = times.getMonth()+1;
    //获取星期
    var weeks = times.getDay(),
        week = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
    //获取小时
    var hours = times.getHours(),
        hours = hours<10 ? '0'+hours: hours;
    //获取分
    var minutes = times.getMinutes(),
        minutes = minutes<10 ? '0'+minutes:minutes;
    //获取秒
    var seconds = times.getSeconds(),
        seconds = seconds<10 ? '0'+seconds:seconds;
      
    myear = times.getFullYear()+'年'+month+'月'+times.getDate()+'日'+' '+week[weeks]
    myour = hours+'时'+minutes+'分'+seconds+'秒';
    if(Num==1){
        return myear;
    }else{
        return myour;
    }
}
setInterval(function(){
    $('.year-mouth-day').text(time(1))
    $('.hour-mintes-seconds').text(time(0))
},1000)

//展示公告
function noticeShow(box,arr,num) {
    for (let i=0;i<myNotice.length;i++){
        if (myNotice[i].obj==pre[num].myclassName){
            $(box).append(
                `<div>
                    <span>${myNotice[i].name}：</span>
                    <p>${myNotice[i].context}</p>
                    <div class="smallFont">${myNotice[i].date}</div>
                </div>  `
            )
        }
    }
}
noticeShow(".announcement-content",myNotice,1);

//点击公告进入公告页面
$(".announcement").click(function () {
    window.location.href="page_notice.html"//本页面跳转
})