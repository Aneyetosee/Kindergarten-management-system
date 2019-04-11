var noticeUserJS=sessionStorage.getItem("noticeUser");
var limitUserJS=sessionStorage.getItem("loginUser");
myNotice=JSON.parse(noticeUserJS);
pre=JSON.parse(limitUserJS);
//获取时间
var dates={
    date:new Date(),
    year:function(){
        return this.date.getFullYear();
    },
    month:function(){
        return this.date.getMonth()+1;
    },
    day:function(){
        return this.date.getDate();
    },
    week:function(){
        return this.date.getDay();
    },
    hour:function(){
        return this.date.getHours();
    },
    minute:function(){
        return this.date.getMinutes();
    },
    second:function(){
        return this.date.getSeconds();
    }
}
var timer=dates.year()+'-'+dates.month()+'-'+dates.day()+' '+dates.hour()+":"+dates.minute();
/* function startRead() {
     var fileDom=document.getElementById('imgUpFile');
     var img=document.getElementById('imgContentImg');
     if (fileDom&&img){
         fileHandle(fileDom,img);
     }
 }
 //文件处理
 function fileHandle(fileDom,img) {
     //读取计算机文件
     var file=fileDom.files[0];
     var reader=new FileReader();
     reader.readAsDataURL(file);
     //操作完成
     reader.onload = function(e){
         //file 对象的属性
         img.setAttribute('src',reader.result);
     };
 }*/
//展示公告
function noticeShow(box,arr,num) {
    for (let i=0;i<myNotice.length;i++){
        if (myNotice[i].obj==pre[num].myclassName){
            $(box).append(
                `<div>
                     <span>${myNotice[i].name}：</span>
                    <p>${myNotice[i].context}</p>
                    <div>${myNotice[i].date}</div>
                    <i class="glyphicon glyphicon-remove"></i>
                </div>  `
            )
        }
    }
}
var thisId = sessionStorage.getItem('rebName');
for(let i=0;i<pre.length;i++){
    if(thisId==pre[i].id){
        var num=i;
        var mylimit=pre[i].limit;
    }
}
//点击发送
$(".send>button").click(function () {
    var myObj;
    var options=$("#myselect option:selected");//获取当前选择项.
    options.text();//获取当前选择项的文本.
    if ($($(this).parent().parent().children()[0]).val()){
        if (options.text()=="园区公告"){
            myObj="all"
        }
        if (options.text()=="班级公告"){
            myObj="小班"
        }
        if (options.text()=="家长公告"){
            $('#myNoticeModal').modal();
        }
        if (myObj=="all"&&pre[num].limit=="teacher") {
            $('#smallModal').modal();
            $('.smallModalText').text("你没有权限发送园区公告！")
            $("textarea").val("")
            return;
        }else {
            myNotice.push({
                name:pre[num].userName,
                context:$($(this).parent().parent().children()[0]).val(),
                date:timer,
                obj:myObj
            })
        }
    }else {
        $('#smallModal').modal();
        $('.smallModalText').text("不能发送空公告！")
        return;
    }
    let i=myNotice.length-1;
    if (myNotice[i].obj==pre[num].myclassName){
        if (myNotice[i].obj=="all"){
            $(".box1>div").append(
                `<div>
                     <span>${myNotice[i].name}：</span>
                    <p>${myNotice[i].context}</p>
                    <div>${myNotice[i].date}</div>
                    <i class="glyphicon glyphicon-remove"></i>
                </div>  `
            )
            $(".box3>div").append(
                `<div>
                     <span>${myNotice[i].name}：</span>
                    <p>${myNotice[i].context}</p>
                    <div>${myNotice[i].date}</div>
                    <i class="glyphicon glyphicon-remove"></i>
                </div>  `
            )
        } else {
            $(".box2>div").append(
                `<div>
                     <span>${myNotice[i].name}：</span>
                    <p>${myNotice[i].context}</p>
                    <div>${myNotice[i].date}</div>
                    <i class="glyphicon glyphicon-remove"></i>
                </div>  `
            )
            $(".box3>div").append(
                `<div>
                     <span>${myNotice[i].name}：</span>
                    <p>${myNotice[i].context}</p>
                    <div>${myNotice[i].date}</div>
                    <i class="glyphicon glyphicon-remove"></i>
                </div>  `
            )
        }
    }
    sessionStorage.setItem("noticeUser",JSON.stringify(myNotice));
    $("textarea").val("")
})
//家长公告
$(".emailSend").click(function () {
    var text=$("#myNoticeModal input").val();
    var reg=/^[\w]{4,16}[@][\w]{1,5}[.][a-zA-Z]{2,3}$/;//判断是否是邮箱
    if (reg.test(text)==true) {
        $('#smallModal').modal();
        $('.smallModalText').text("发送成功！")
        $(".emailClose").click()
    }else {
        $('#smallModal').modal();
        $('.smallModalText').text("格式错误，请重新输入！")
    }
});
//删除公告
$(".textbox").on("click",".glyphicon-remove",function () {
    let mydate=$(this).parent().children()[2].innerText
    for (let m=0;m<myNotice.length;m++){
        if (mydate==myNotice[m].date) {
            myNotice.splice(m,1);
        }
    }
    $(this).parent().remove();
    sessionStorage.setItem("noticeUser",JSON.stringify(myNotice));
});
$(document).ready(function () {
    noticeShow(".box1>div",myNotice,1);
    noticeShow(".box2>div",myNotice,0);
    noticeShow(".box3>div",myNotice,num);
});