//设置一个全局的变量，便于保存验证码
var code;
function createCode(){
    //首先默认code为空字符串
    code = '';
    //设置长度，这里看需求，我这里设置了4
    let codeLength = 4;
    //设置随机字符
    let random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
    //循环codeLength 我设置的4就是循环4次
    for(let i = 0; i < codeLength; i++){
        //设置随机数范围,这设置为0 ~ 36
            let index = Math.floor(Math.random()*36);
            //字符串拼接 将每次随机的字符 进行拼接
            code += random[index]; 
    }
    //将拼接好的字符串赋值给展示的Value
    $('#verification').val(code);
}

window.onload = function (){
    //获得权限相关缓存
    var thisPre = sessionStorage.getItem('loginUser');
    pre = JSON.parse(thisPre);
    //加载时清空输入框
    $('#verificationInput').val('');
        //判断记住我是否打钩
    if(sessionStorage.getItem('checked')=='checked'){
        $('#rebName').attr('checked','checked')
    }
    if($('#rebName').is(':checked')){
        $('#userName').val(sessionStorage.getItem('rebName'));
    }else{
        $('#userName').val('');
    }
   
    //点击span输入框获得焦点
    $('.login-userNameDiv').on('click','span',function(){
        $('#userName').focus();
    })
    $('.login-userPasswordDiv').on('click','span',function(){
        $('#userPassword').focus();
    })
    $('.login-userVerificationContent').on('click','span',function(){
        $('#verificationInput').focus();
    })
    //验证码生成
    createCode();
    $('.login-from').on('click','#verification',createCode);//点击新生成一个验证码
    //input获取焦点时，清除写下的文字
    $('.login-userNameDiv').on('focus','#userName',function(){
        $('.promptWordsName').hide().text('')
    })
    $('.login-userPasswordDiv').on('focus','#userPassword',function(){
        $('.promptWordsPassword').hide().text('')
    })
    $('.login-userVerificationContent').on('focus','#verificationInput',function(){
        $('.promptWordsVerification').hide().text('')
    })
    //登录判断
    $('.login-signIn').on('click','.login-signInBtn',function(){
        //判断是否为空
        if($('#userName').val()==''){
            $('.promptWordsName').css('left','265px').show().text('请输入账号')
        }
        if($('#userPassword').val()==''){
            $('.promptWordsPassword').show().text('请输入密码')
        }
        if($('#verificationInput').val()==''){
            $('.promptWordsVerification').show().text('请输入验证码')
        }
        //判断登录
        for(let i=0;i<pre.length;i++){
            if($('#userName').val()==pre[i].id && $('#userPassword').val()==pre[i].pwd){
                if($('#verificationInput').val().toUpperCase()==code){
                    sessionStorage.setItem('rebName',$('#userName').val());//传递登录人员
                    //判断记住我是否打钩
                    if($('#rebName').is(':checked')){
                        sessionStorage.setItem('checked','checked');
                    }else{
                        sessionStorage.setItem('checked','null');
                    }
                    //跳转页面
                    location.href = 'index.html';
                    break;
                }else{
                    if($('#verificationInput').val().toUpperCase()!=code&&$('#verificationInput').val()!=''){
                        $('.promptWordsVerification').show().text('验证码输入有误');
                    }
                }
            }
            if(i==pre.length-1){
                if($('#verificationInput').val().toUpperCase()!=code){
                    $('.promptWordsVerification').show().text('验证码输入有误');
                }
                $('.promptWordsName').css('left','210px').show().text('账号或密码输入有误');
                $('#userPassword').val('')
                createCode();
            } 
        }
    })
    //点击弹出手机验证码弹框
    $('.login-forgetPassword').on('click',function(){
        i=-1;
        $('#myModal').modal();
        $('.login-phoneVerificationContent').text('请获取验证码')
        $('.login-prompt').text('');
        $('#messageText').val('');
        $('.login-getVerificationInput').val('');
    })
    //手机验证码倒计时减少
    $('.login-phoneVerificationContent').click(function(){
        let valid_rule =/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        /* console.log($('#messageText').val().length)
        console.log(valid_rule.test($('#messageText').val()))
        console.log($('#messageText').val()) */
        if($('#messageText')!=''&&$('#messageText').val().length==11&&valid_rule.test($('#messageText').val())){
            $('.login-prompt').text('')
            if($('.login-phoneVerificationContent').text()=='请获取验证码'){
                i = 60;
                $('.login-phoneVerificationContent').text(i).css('width','18%');
                timer = setInterval(function(){
                    if(i<=0){
                        $('.login-phoneVerificationContent').text('请获取验证码').css('width','18%');
                        clearInterval(timer);
                    }else{
                        i--
                        $('.login-phoneVerificationContent').text(i);
                    }
                },1000) 
            }
        }else{
            $('.login-prompt').text('输入有误，请重新输入')
        }
    })

}
