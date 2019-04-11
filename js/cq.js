/* // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
title: {
    text: '考勤统计表'
},
tooltip: {
    trigger: 'axis'
},
legend: {
    data:['小班','中班','大班',]
},
grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
},
toolbox: {
    feature: {
        saveAsImage: {}
    }
},
xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一','周二','周三','周四','周五',]
},
yAxis: {
    type: 'value'
},
series: [
    {
        name:'小班',
        type:'line',
        data:[1, 0, 3, 2, 5,]
    },
    
    {
        name:'中班',
        type:'line',
        data:[3, 2, 5, 4, 7,]
    },
    
    {
        name:'大班',
        type:'line',
        data:[5, 4, 7, 6, 9,]
    },
]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option); */
//======================================================以上是统计表的js

//当文档准备好了
const pageNum = 5
$(document).ready(function(){
    pageContent('#mytable',0,students,true)
    pageBtn("#myli",students,true)
    $(".myul").on("click",".btnlist",function(){
        let page = $(this).text()
        page = (page-1)*pageNum
        pageContent("#mytable",page,students,false)
    })
})
//老师账号渲染
function pageContent(table,countNum,students,mybool){
    if(mybool){
        for(let item in students[0]){
            if(item == "studentId"){
                //向表头添加学号
                $("#mytable thead tr").append("<th>学号</th>")
            }else if(item == "studentName"){
                //添加姓名
                $("#mytable thead tr").append("<th>姓名</th>")
            }else if(item == "studentsClass"){
                $("#mytable thead tr").append("<th>班级</th>")
            }else if(item == "arrivalTime"){
                $("#mytable thead tr").append("<th>入园时间</th>")
            }else if(item == "leaveTime"){
                $("#mytable thead tr").append("<th>出园时间</th>")
            }else if(item == "attendance"){
                $("#mytable thead tr").append("<th>请假（备注）</th>")
            }
        }
        $("#mytable thead tr").append("<th>操作</th>")
    }
   
    $(`${table} tbody`).html("")
    //给身体加东西
    for(let i = countNum; i<countNum + pageNum; i++){
        if(i<students.length){
            $(`${table} tbody`).append(`
            <tr>
                <td>${students[i].studentId}</td>
                <td>${students[i].studentName}</td>
                <td>${students[i].studentsClass}</td>
                <td class="myTD">${students[i].arrivalTime}</td>
                <td class="myTD">${students[i].leaveTime}</td>
                <td class="myTD">${students[i].attendance}</td>
                <td>
                    <button class="btn btn-success myXie" name='bc'>编辑</button>
                    <button class="btn btn-danger myDel">删除</button>
                </td>
            </tr>
        `)
        }
        
    }
}
//老师账号渲染
function pageContent1(table,countNum,students,mybool){
    if(mybool){
        for(let item in students[0]){
            if(item == "studentId"){
                //向表头添加学号
                $("#mytable thead tr").append("<th>学号</th>")
            }else if(item == "studentName"){
                //添加姓名
                $("#mytable thead tr").append("<th>姓名</th>")
            }else if(item == "studentsClass"){
                $("#mytable thead tr").append("<th>班级</th>")
            }else if(item == "arrivalTime"){
                $("#mytable thead tr").append("<th>入园时间</th>")
            }else if(item == "leaveTime"){
                $("#mytable thead tr").append("<th>出园时间</th>")
            }else if(item == "attendance"){
                $("#mytable thead tr").append("<th>请假（备注）</th>")
            }
        }
    }
   
    $(`${table} tbody`).html("")
    //给身体加东西
    for(let i = countNum; i<countNum + pageNum; i++){
        $(`${table} tbody`).append(`
            <tr>
                <td>${students[i].studentId}</td>
                <td>${students[i].studentName}</td>
                <td>${students[i].studentsClass}</td>
                <td>${students[i].arrivalTime}</td>
                <td>${students[i].leaveTime}</td>
                <td>${students[i].attendance}</td>
            </tr>
        `)
    }
}
//有多少按钮,分页
function pageBtn(element,arr,mybool){
    if(mybool==true){
        for(let i=0; i<Math.ceil(arr.length/pageNum);i++){
            $(element).before(`
                <li class='btnlist'><a href="##" >${i+1}</a></li>
            `)
        }
    }else if(mybool==false){
        $(".btnlist").html("")
        for(let i=0; i<Math.ceil(arr.length/pageNum);i++){
            $(element).before(`
                <li class='btnlist'><a href="##" >${i+1}</a></li>
            `)
        }
    }
    
}

//点击删除按钮
$("tbody").on('click','.myDel',function(){
    if(window.confirm("您确定要删除数据吗?")){
        let num = parseInt($(this).parent().parent().children()[0].innerText);
        $("#mytable tbody tr").remove();
        students.splice(num-1,1);
        for (let i=0;i<students.length;i++){
            if (i>=num-1) {
                students[i].studentId-=1;
            }
        }
        pageContent('#mytable',0,students,false)
        pageBtn("#myli",students,false)
	}
})

//点击编辑的方法
var cq_bj;
$("tbody").on("click",".myXie",function(){
    let myName=$(this).attr("name")
    if(myName=="bc"){
        $(this).text("保存")
        $(this).attr("name","bj")
    }else{
        $(this).text("编辑")
        $(this).attr("name","bc")
    }
    
    $(this).parent().siblings(".myTD").each(function(){//找同类元素td
        var is_text = $(this).find("input:text");//判断单元格下是否含有文本框
        if (!is_text.length) {
            $(this).html("<input size='7' type='text' value=' "+$(this).text()+" ' />");
        }
        else
            $(this).html(is_text.val());
    })
})


//请假录入按钮点击时，先获取input的值
$('#btn1').click(function () {
    var sId=$('#studentId').val();
    var sClasses=$('#studentName').val();
    var sState=$('#studentsClass').val();
    var sArrival=$('#arrivalTime').val();
    var sLeave=$('#leaveTime').val();
    var sAttendance=$('#attendance').val();

    if (sId=='' || sClasses=='' || sState=='' || sArrival=='' || sLeave=='' || sAttendance==''){
        $('#smallModal').modal();
        $('.smallModalText').text('每一项内容必填')
    }else{
        students.push(
            {
                studentId:sId,
                studentName:sClasses,
                studentsClass:sState,
                arrivalTime:sArrival,
                leaveTime:sLeave,
                attendance:sAttendance
            }
        );
        //往身体里添加东西
        $('.kq-ggg').append('<tr><td>'+sId+'</td><td>'+sClasses+'</td><td>'+sState+'</td>+<td>'+sArrival+'</td>+<td>'+sLeave+'</td>+<td>'+sAttendance+'</td>+<td><button class="btn btn-success">编辑</button> <button class="btn btn-danger">删除</button></td></tr>')
        pageContent('#mytable',0,students,false)
        //清空值
        $('#studentId').val('');
        $('#studentName').val('');
        $('#studentsClass').val('');
        $('#arrivalTime').val('');
        $('#leaveTime').val('');
        $('#attendance').val('');
    }
});

//邮件发送
/* $("#btn2").click(function(){
    alert("邮件已发送至家长邮箱")
}) */
//查询的方法
$(function(){
    $('#kq-btn3').click(function(){
        for(let i=0; i<students.length; i++){
            var text = $('#kq-find').val();//获取文本框输入
            if($.trim(text) != ""){
                $("#mytable tr:not('#theader')").hide().filter(":contains('"+text+"')").show();
            }
        }
    })
    //pageContent('#mytable',0,students,false)
});

//返回按钮点击的方法
$('#kq-btn2').click(function () {
    javascript:window.location.reload()
});

//点击导出数据按钮的方法
$(".kq-bt5").click(function(){
    console.log(123)
    $('#mytable').table2excel( {//导出表格
        exclude:"not",
        filename:"考勤管理"+".xls"
    });
})

//判断是老师账号还是园长或者管理员
/* if(teacherId == pre[0].id && teacherPwd == pre[0].pwd){//老师账号
    pageContent('#mytable',0,students,true)
}else if((directorId == pre[1].id && directorId == pre[1].pwd) || (administratorId == pre[2].id && administratorId == pre[2].pwd)){//管理员或者园长账号登陆
    pageContent1('#mytable',0,students,true)
    $(".kq-bt1").css({
        display: none
    })
    $(".kq-bt4").css({
        display: none
    })
} */


