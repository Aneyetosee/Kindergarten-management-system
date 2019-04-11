//得到权限内容
var thisPre = sessionStorage.getItem('loginUser');
    pre = JSON.parse(thisPre);
//获取登录名
var thisUser = sessionStorage.getItem('rebName');


const pageNum = 5;//一页显示五条
var page = 1;

function pageData(countNum,mybool){
    if(mybool){
        $("table thead tr").append("<th>编号</th>");
        for(let item in pre[0]){
            if(item=='id'){
                $('table thead tr').append('<th>账号</th>');
            }else if(item=='limit'){
                $('table thead tr').append('<th>当前权限</th>');
            }else if(item=='userName'){
                $('table thead tr').append('<th>用户昵称</th>');
            }
        }
        $("table thead tr").append("<th>操作</th>");
        //表头居中
        $("table thead tr th").css({
            textAlign:"center"
        })
    }
    
    //渲染表身
    for(let i=countNum;i<countNum+pageNum;i++){
        if(i<pre.length){
            $("table tbody").append(
                `<tr>
                <td>${i+1}</td>
                <td>${pre[i].id}</td>
                <td>${pre[i].limit}</td>
                <td>${pre[i].userName}</td>
                <td>
                    <span class="alter">修改</span>
                    <span class="del">删除</span>
                </td>
            </tr>`);
        }
        
    }
}
//点击删除时
$("tbody").on("click",".del",function () {
    let thisID=$(this).parent().parent().children()[1].innerText;
    if(thisID != thisUser){
        $(this).parent().parent().remove();
        for(let i=0;i<pre.length;i++){
            if(thisID==pre[i].id){
                pre.splice(i,1);
            }
        }
        //清除数据
        $("#limitTable tbody tr").remove();
        //清除分页
        $('.clickPage').children().remove()
        $('.clickPage').append(
            `<li class="previousPage">
                <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="Next">
                <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>`
        )
        //渲染数据
        pageData(0,false); 
        
        //渲染分页
        thisPageNum()
        //添加缓存  
        sessionStorage.setItem("loginUser",JSON.stringify(pre));
    }else{
        $('#smallModal').modal();
        return;
    }
});
//点击修改时
$('tbody').on('click','.alter',function(){
    $('#myModal').modal();
    //获取初始值
    let thisID = $(this).parent().parent().children().eq(1).text(),
        thisUser = $(this).parent().parent().children().eq(3).text(),
        thisLimit = $(this).parent().parent().children().eq(2).text();
    $('#idName').val(thisID);
    $('#UserName').val(thisUser);
    //管理员禁止更改自己的权限
    if($(this).parent().parent().children().eq(2).text()!='administrator'){
        $('#chooseLimit').removeAttr('disabled');
        $('#chooseLimit').css('backgroundColor','#fff');
    }else{
        $('#chooseLimit').attr('disabled','disabled');
        $('#chooseLimit').css('backgroundColor','rgb(207, 206, 206)');
    }
    //点击确定
    $("#myModal .save")[0].onclick=function(){
        for(let i=0;i<pre.length;i++){
            if(thisID==pre[i].id){
                if($('#idName').val()!=''){
                    pre[i].id=$('#idName').val();
                }
                if($('#UserName').val()!=''){
                   pre[i].userName =$('#UserName').val(); 
                }
                if(thisLimit!='administrator'){
                    if($('#chooseLimit').val()!='请选择'){
                        pre[i].limit=$('#chooseLimit').val();
                    }
                }
            }
        }
        //回复选择
        $('#chooseLimit option:first').prop("selected", 'selected');
        //清空数据
        $("#limitTable tbody tr").remove();
        //重新渲染
        pageData(0,false);
        //存入缓存
        sessionStorage.setItem("loginUser",JSON.stringify(pre));
    }
})
//模糊查询
$(".inputPhoto").on("focus", function () {
    //输入实时查询事件，propertychange是IE的输入监听事件，input是其它浏览器
    $(".inputPhoto").on("input propertychange", function () {
        $("#limitTable tbody tr")
            .hide()
            .filter(":contains('" + $(this).val().toLocaleLowerCase() + "')")//小写
            .show();
    });
});
//添加点击时
$('.saveAdd')[0].onclick = function(){
    let Num=0;
    for(let i=0;i<pre.length;i++){
        if($('#addIdName').val()!=pre[i].id){
            Num += 1 ;
        }else{
            $('.promptWords1').text('输入的账号有重复，请重新输入');
            break;
        }
    }
    if(Num==pre.length){
        if($('#addIdName').val()==''){
            $('.promptWords1').text('账号名不能为空');
        }
        if($('#addChooseLimit').val()=='请选择'){
            $('.promptWords3').text('权限选择不能为空');
        }
        if($('#addUserName').val()==''){
            $('.promptWords2').text('用户昵称不能为空');
        }
        //输入框获得焦点清除提示文字
        $('#addIdName').focus(function(){
            $('.promptWords1').text('');
        })
        $('#addChooseLimit').focus(function(){
            $('.promptWords3').text('');
        })
        $('#addUserName').focus(function(){
            $('.promptWords2').text('');
        })
        //成功提交生成新的账号
        if($('#addIdName').val()!=''&&$('#addChooseLimit').val()!='请选择'&&$('#addUserName').val()!=''){
            pre.push({
                id:$('#addIdName').val(),
                pwd:'123456',
                limit:$('#addChooseLimit').val(),
                userName:$('#addUserName').val(),
                themeColor:'bule',
                headSrc:'../images/UI_02.png',
                
            })
            if($('#addChooseLimit').val()=='teacher'){
                pre[pre.length-1].myclassName = '小班'
            }else if($('#addChooseLimit').val()=='director'){
                pre[pre.length-1].myclassName = 'all'
            }
            //清空输入框,还原选项
            $('#addIdName').val('');
            $('#addChooseLimit option:first').prop("selected", 'selected');
            $('#addUserName').val('');
            //关闭模态框
            $('.cancel').click()
            //清除数据
            $("#limitTable tbody tr").remove();
            //清除分页
            $('.clickPage').children().remove()
            $('.clickPage').append(
                `<li class="previousPage">
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="Next">
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>`
            )
            //渲染数据
            pageData(0,false)
            //渲染分页
            thisPageNum()
            //放入缓存
            sessionStorage.setItem("loginUser",JSON.stringify(pre));
            page=1;
        }
    }
}
//分页的计算
function thisPageNum(){
    //有多少页的部分
    for(let i=0;i<Math.ceil(pre.length/pageNum);i++){
        $('.Next').before(
            `<li class="toPage"><a href="#">${i+1}</a></li>`
        )
    }
}
//点击分页
$('.clickPage').on('click','.toPage',function(){
    page = $(this).text();
    //清除数据
    $("#limitTable tbody tr").remove();
    //渲染数据
    pageData((parseInt(page)-1)*pageNum,false); 
})
//点击上一页
$('.clickPage').on('click','.previousPage',function(){
    if(page > 1){
        page = parseInt(page)-1;
        //清除数据
        $("#limitTable tbody tr").remove();
        //渲染数据
        pageData((parseInt(page)-1)*pageNum,false);
    }else{
        page =parseInt(page)
    }
})
//点击下一页
$('.clickPage').on('click','.Next',function(){
    if(page > 0&&page<Math.ceil(pre.length/pageNum)){
        page = parseInt(page)+1;
        //清除数据
        $("#limitTable tbody tr").remove();
        //渲染数据
        pageData((parseInt(page)-1)*pageNum,false);
    }else{
        page=parseInt(page)
    }
})
$(window).load(function(){
    pageData(0,true)
    thisPageNum()
})