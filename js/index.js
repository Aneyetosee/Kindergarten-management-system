/**
 * Created by renfei on 2018/12/14.
 */
//得到权限内容
var thisPre = sessionStorage.getItem('loginUser');
pre = JSON.parse(thisPre);
//得到登录人员及他的权限
var thisId = sessionStorage.getItem('rebName');
var thisLimit;
var thisUser;
$(document).ready(function(){
    //将权限的资料放入头像和名字
    for(let i=0;i<pre.length;i++){
        if(thisId==pre[i].id){
            $('.index-image').attr('src',pre[i].headSrc);
            $('.index-userNameText').text(pre[i].userName);
            thisLimit = pre[i].limit;
            thisUser = pre[i];
        }
    }
    //邮件的读取
    if($('.index-emailQuickNum').text()==0){
        $('.index-emailQuickNum').css('display','none')
    }
    //根据权限生成右边菜单的数据
    $('.index-lefeNavContent ul').append(
        `<li class="index-lefeNavAll">
            <div class="index-lefeNavTitle on">
                <span class="iconfont">&#xe64e;</span>
                <span class="index-noneElement">首页</span>
            </div>
        </li>
        <li class="index-lefeNavAll">
            <div class="index-lefeNavTitle">
                <span class="iconfont">&#xe614;</span>
                <span class="index-noneElement">数据管理</span>
                <span class="iconfont index-otherInstructions">&#xe615;</span>
            </div>
            <ul class="index-lefeNavfirstDropDown">
                <li class="index-lefeNavfirstContent">
                    <span class="iconfont">&#xe66d;</span>
                    <span class="index-noneElement">班级管理</span>
                </li>
                <li class="index-lefeNavfirstContent">
                    <span class="iconfont">&#xe621;</span>
                    <span class="index-noneElement">学生管理</span>
                </li>
            </ul>
        </li>
        <li class="index-lefeNavAll">
            <div class="index-lefeNavTitle">
                <span class="iconfont">&#xe605;</span>
                <span class="index-noneElement">考勤管理</span>
            </div>
        </li>
        <li class="index-lefeNavAll">
            <div class="index-lefeNavTitle">
                <span class="iconfont">&#xe78e;</span>
                <span class="index-noneElement">公告通知</span>
            </div>
        </li>
        <li class="index-lefeNavAll">
            <div class="index-lefeNavTitle">
                <span class="iconfont">&#xe676;</span>
                <span class="index-noneElement">照片墙</span>
            </div>
        </li>
        `
    )
    if(thisLimit=='director'||thisLimit=='administrator'){
        $('.index-lefeNavfirstDropDown').children().first().before(
            `<li class="index-lefeNavfirstContent">
                <span class="iconfont">&#xe64e;</span>
                <span class="index-noneElement">部门管理</span>
            </li>
            <li class="index-lefeNavfirstContent">
                <span class="iconfont">&#xe631;</span>
                <span class="index-noneElement">职工管理</span>
            </li>`
        )
    }
    if(thisLimit=='administrator'){
        $('.index-lefeNavContent ul').children().eq(1).after(
            `<li class="index-lefeNavAll">
                <div class="index-lefeNavTitle">
                    <span class="iconfont">&#xe60d;</span>
                    <span class="index-noneElement">权限管理</span>
                </div>
            </li>`
        )
    }
    //直接跳转主页
    $('.myiframe').attr('src','indexPage.html');
})


//名字点击出现按钮
$('.index-userChoose').on('click','.index-userName',function(){
    if($('.index-uesrMenu').hasClass('on')){
        $('.index-uesrMenu').removeClass('on');
        $(this).children().last().removeClass('on')
    }else{
        $('.index-uesrMenu').addClass('on');
        $(this).children().last().addClass('on')
    }
})
//注销
$('.index-uesrMenu').on('click','.index-logout',function(){  
    location.href = 'login.html';
})
$('.index-rightNavRightThemeText').on('click',function(){  
    location.href = 'login.html';
})
$('.index-emailQuick').on('click',function(){
    location.href = 'http://mail.qq.com';
})
//点击左菜单出现效果
$('.index-lefeNavContent').on('click','.index-lefeNavTitle',function(){
    //所有子菜单复原
    $('.index-lefeNavTitle').removeClass('on');
    $('.index-lefeNavTitle').children('.index-otherInstructions').removeClass('on');
    $('.index-lefeNavTitle').next('.index-lefeNavfirstDropDown').css('height',0);
    //点击的元素的变化
    $(this).addClass('on');
    if($(this).next('.index-lefeNavfirstDropDown').css('height')=='0px'){
        $(this).next('.index-lefeNavfirstDropDown').css('height',$('.index-lefeNavfirstDropDown').children().length*40+'px');
        $(this).children('.index-otherInstructions').addClass('on');
    }else{
        $(this).next('.index-lefeNavfirstDropDown').css('height',0);
        $(this).children('.index-otherInstructions').removeClass('on');
    }
    //路径导航显示
    $('.index-breadNav').html(`<li class="active">${$(this).children('.index-noneElement').text()}</li>`);
    //菜单的跳转
    if($(this).children('.index-noneElement').text()=='首页'){
        $('.myiframe').attr('src','indexPage.html');
    }else if($(this).children('.index-noneElement').text()=='数据管理'){
        $('.myiframe').attr('src','1218.html');
        $('.index-lefeNavfirstContent').removeClass('on');
        $('.index-lefeNavTitle').next().children().first().addClass('on');
        $('.index-breadNav').html(`
            <li class="active">${$(this).children('.index-noneElement').text()}</li>
            <li class="active">${$(this).next().children().first().children('.index-noneElement').text()}</li>
        `);
    }else if($(this).children('.index-noneElement').text()=='权限管理'){
        $('.myiframe').attr('src','privilegeManagement.html');
    }else if($(this).children('.index-noneElement').text()=='考勤管理'){
        $('.myiframe').attr('src','chuqin.html');
    }else if($(this).children('.index-noneElement').text()=='公告通知'){
        $('.myiframe').attr('src','page_notice.html');
    }else if($(this).children('.index-noneElement').text()=='照片墙'){
        $('.myiframe').attr('src','Two-stage-assessment.html');
    }
    
})
//子菜单点击的样式和办法
$(document).on('click','.index-lefeNavfirstContent',function(){
    $('.index-lefeNavfirstContent').removeClass('on');
    $(this).addClass('on')
    $('.index-breadNav').html(`
        <li class="active">${$(this).parent().prev().children('.index-noneElement').text()}</li>
        <li class="active">${$(this).children('.index-noneElement').text()}</li>
    `);
    //子菜单跳转
    if($(this).children('.index-noneElement').text()=='班级管理'){
        $('.myiframe').attr('src','page_class.html');
    }else if($(this).children('.index-noneElement').text()=='职工管理'){
        $('.myiframe').attr('src','jiaoZhongGuanLI.html');
    }else if($(this).children('.index-noneElement').text()=='部门管理'){
        $('.myiframe').attr('src','1218.html');
    }else if($(this).children('.index-noneElement').text()=='学生管理'){
        $('.myiframe').attr('src','student.html');
    }
})
//点击顶部导航菜单图标
$('.index-rightNavLeftAboutContent').on('click','.index-rightNavLeftAboutMenu',function(){
    if(!($('.index-rightNavLeftAboutMenu').hasClass('on'))){
        //点击后的状态
        $('.index-rightNavLeftAboutMenu').addClass('on');
        //左菜单变化
        $('.index-leftNav').css('width','3%');
        $('.index-image').fadeOut(300);
        $('.index-userChoose').slideUp(300);
        $('.index-noneElement').css('display','none');
        $('.index-otherInstructions').css('opacity',0);
        $('.index-lefeNavTitle').children().css('padding-left','25%');
        $('.index-lefeNavfirstContent').children().css('padding-left','28%');
        //右菜单变化
        $('.index-rightNav').css('width','97%');
        $('.index-rightIframe').css('width','97%');
    }else{
        //还原点击状态 
        $('.index-rightNavLeftAboutMenu').removeClass('on');
        //还原左菜单
        $('.index-leftNav').css('width','15%');
        $('.index-image').fadeIn(300);
        $('.index-userChoose').slideDown(300);
        $('.index-noneElement').css('display','inline');
        $('.index-otherInstructions').css('opacity',1);
        $('.index-lefeNavTitle').children().css('padding-left','0%');
        $('.index-lefeNavfirstContent').children().css('padding-left','3%');
        //还原右菜单
        $('.index-rightNav').css('width','85%');
        $('.index-rightIframe').css('width','85%');
    }
})
//点击出现注销页面
$('.index-rightNavRightTheme').on('click','.index-rightNavRightClick',function(){
    if(!($('.index-rightNavRightThemeContent').hasClass('on'))){
        $('.index-rightNavRightThemeContent').addClass('on').fadeIn(300).animate({'bottom':'-30px'},200)

    }else{
        $('.index-rightNavRightThemeContent').removeClass('on').animate({'bottom':'-50px'},200).fadeOut(300).animate({'bottom':'-10px'},100)
    }
})
//点击出现改个人信息的模态框
$('.personalInformation').on('click',function(){
    $('.index-confirm').val('');
    $('.login-revisePassword').val('');
    $('#index-Modal').modal()
    $('.index-reviseUser').val(thisUser.userName);
})
//点击确定保存修改
$('#saveAdd').on('click',function(){
    for(let i=0;i<pre.length;i++){
        if(thisId==pre[i].id){
            if(($('.index-confirm').val()!=''&&$('.login-revisePassword').val()=='')||($('.index-confirm').val()==''&&$('.login-revisePassword').val()!='')){
                if($('.login-revisePassword').val()==''){
                    $('.index-prompt2').text('请输入新密码');
                }
                if($('.index-confirm').val()==''){
                    $('.index-prompt3').text('请确认新密码');
                }
            }
            if( $('.index-reviseUser').val()!=''){
                if($('.index-confirm').val()==''&&$('.login-revisePassword').val()==''){
                    pre[i].userName = $('.index-reviseUser').val();
                    $('.index-userNameText').text($('.index-reviseUser').val());
                    sessionStorage.setItem('loginUser', JSON.stringify(pre));
                    $('.cancel').click()
                }else if($('.index-confirm').val()!=''&&$('.login-revisePassword').val()!=''){
                    if($('.index-confirm').val()!=$('.login-revisePassword').val()){
                        $('.index-prompt3').text('两次输入的密码不一致');
                    }else if($('.index-confirm').val()==$('.login-revisePassword').val()){
                        pre[i].userName = $('.index-reviseUser').val();
                        $('.index-userNameText').text($('.index-reviseUser').val());
                        pre[i].pwd = $('.login-revisePassword').val();
                        sessionStorage.setItem('loginUser', JSON.stringify(pre));
                        location.href = 'login.html';
                    }
                }
            }else{
                $('.index-prompt1').text('请输入一个昵称');
            } 
        }
    }
})
//点击出现修改头像图片的模态框
$('#index-headPortrait').on('click',function(){
    $('#index-headModal').modal();   
    $('.yulan').css('opacity','0')
})
var image = '';
$('#choosePic').on('change',function(){
    if (!this.files || !this.files[0]) {
        return;
    }
    var reg = new RegExp(/jpg|jpeg|png|gif|bmp|pic/);
    var thisImgSrc = this.files[0].name.split('.')[this.files[0].name.split('.').length-1];
    /* console.log(reg.test()) */
    if(!reg.test(thisImgSrc)){
        $('.yulan').css('opacity','0')
        $('.index-imgPrompt').text('格式不正确，请重新上传')
        return
    }
    $('.index-imgPrompt').text('')
    var reader = new FileReader();
    reader.onload = function (evt) {
        $('#yulanPic').attr('src',evt.target.result)
        image = evt.target.result;
    }
    $('.yulan').css('opacity','1')
    reader.readAsDataURL(this.files[0]);
    /* var objUrl = getObjectURL(this.files[0]) ;
    if (objUrl) {
        $('#yulanPic').attr("src", objUrl);
        $('.yulan').css('opacity','1')
        image = objUrl;
    }
    
    function getObjectURL(file) {
        console.log(.readAsDataURL(this.files))
        url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    } */
    
})
$('#addPic').on('click',function(){
    /* console.log(url) */
    if($('.yulan').css('opacity')=='1'){
        $('.index-image').attr('src',image);
        for(let i=0;i<pre.length;i++){
            if(thisId==pre[i].id){
                pre[i].headSrc = image ;
            }
        }
        console.log(image)
        /* console.log(pre) */
        sessionStorage.setItem('loginUser', JSON.stringify(pre));
        $('.cancel').click();
    }
})

function listeningNotice(){
    console.log($('.myiframe').attr('src'))
    if($('.myiframe').attr('src')=='page_notice.html'){
        console.log(11)
    }
}
/* listeningNotice() */
/* var clearListeningNotice = setInterval(listeningNotice,40) */
/* //点击切换主题
$('.index-rightNavRightThemeContent').on('click','.index-rightNavRightThemeColor',function(){
    if($(this).hasClass('backColorBlue')){
        $('.index-leftNav').css('backgroundColor','#00A9C1');
        $('.index-rightNavContent').css(' background-color','#45C8DC');
        $('.index-uesrMenu>li').css('border-bottom','1px solid #32B9CD');
        $('.index-uesrMenu>li').hover(function(){
            $(this).css('background-color','#0BD6D8')
        },function(){
            $('.index-uesrMenu>li').css('background-color','')
        })
        $('.index-lefeNavTitle.on').css('background-color','#0A89CE');
        $('.index-lefeNavfirstContent.on').css('border-left','3px solid #0A89CE');
        $('.index-lefeNavfirstContent').hover(function(){
            $(this).css('border-left','3px solid #0A89CE');  
        },
        function(){
            $('.index-lefeNavfirstContent').css('border-left','3px solid #CDCECC');
        });
    }else if($(this).hasClass('backColorOrange')){
        $('.index-leftNav').css('backgroundColor','#CE713E');
        $('.index-rightNavContent').css('background-color','#E56B50');
        $('.index-uesrMenu li').css('border-bottom','1px solid #E57D41');
        $('.index-uesrMenu li:hover').css('background-color','#E56827');
        $('.index-lefeNavTitle.on').css('background-color','#E57941');
        $('.index-lefeNavfirstContent.on').css('border-left','3px solid #E57941');
        $('.index-lefeNavfirstContent:hover').css('border-left','3px solid #E57941');
    }else if($(this).hasClass('backColorGreed')){
        $('.index-leftNav').css('backgroundColor','#99D88B');
        $('.index-rightNavContent').css(' background-color','#45C8DC');
        $('.index-uesrMenu>li').css('border-bottom','1px solid #32B9CD');
        $('.index-uesrMenu>li:hover').css('background-color','#0BD6D8');
        $('.index-lefeNavTitle.on').css('background-color','#0A89CE');
        $('.index-lefeNavfirstContent.on').css('background-color','#0A89CE');
        $('.index-lefeNavfirstContent:hover').css('background-color','#0A89CE');
    }
}) */