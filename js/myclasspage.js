var userJS=sessionStorage.getItem("user");
var userTeacherJS=sessionStorage.getItem("userTeacher");
var userStudentsJS=sessionStorage.getItem("userStudents");
var limitUserJS=sessionStorage.getItem("loginUser");
myclass=JSON.parse(userJS);
teachers=JSON.parse(userTeacherJS);
students=JSON.parse(userStudentsJS);
pre=JSON.parse(limitUserJS);
const pageNum=5;//一页显示数据条数
function pageContent(myclasstable,countNum,mybool,arrmyClass) {
    //显示thead
    if (mybool) {
        if (myclass==""){
            $("#classtable thead tr").append("<th  class='not'></th>");
            $("#classtable thead tr").append("<th>班级编号</th>")
            $("#classtable thead tr").append("<th>班级名称</th>")
            $("#classtable thead tr").append("<th>开班日期</th>")
            $("#classtable thead tr").append("<th>班级人数</th>")
            $("#classtable thead tr").append("<th>操作</th>");
            $("#classtable thead tr").append("<th>查看</th>");
            //表头居中
            $("table thead tr th").css({
                textAlign:"center"
            })
        }else {
            $("#classtable thead tr").append("<th class='not'></th>")
            for (let item in arrmyClass[0]){
                if(item=="myclassId") {
                    $("#classtable thead tr").append("<th>班级编号</th>")
                }else if (item=="myclassName") {
                    $("#classtable thead tr").append("<th>班级名称</th>")
                }else if(item=="myclassDate") {
                    $("#classtable thead tr").append("<th>开班日期</th>")
                }else if(item=="myclassNum") {
                    $("#classtable thead tr").append("<th>班级人数</th>")
                }
            }
            $("#classtable thead tr").append("<th>操作</th>");
            $("#classtable thead tr").append("<th>查看</th>");
        }
        //表头居中
        $("table thead tr th").css({
            textAlign:"center"
        })
    }
    //显示tbody
    /*//获取每个班级人数
    for (let a=0;a<students.length;a++){
        for (let b=0;b<myclass.length;b++)
        if (students[a].studentsClass==arrmyClass[b].myclassName){
            if (students[a].studentsClass=="小班"){
                arrmyClass[0].myclassNum+=1;
            }
            if (students[a].studentsClass=="中班"){
                arrmyClass[1].myclassNum+=1;
            }
            if (students[a].studentsClass=="大班"){
                arrmyClass[2].myclassNum+=1;
            }
        }
    }*/
    for(let i=countNum;i<countNum+pageNum;i++){
        if (i<arrmyClass.length) {
            $("#classtable tbody").append(
                `<tr>
                <td class="not"><input type="checkbox" class="mycheckbox"></td>
                <td>${arrmyClass[i].myclassId}</td>
                <td>${arrmyClass[i].myclassName}</td>
                <td>${arrmyClass[i].myclassDate}</td>
                <td>${arrmyClass[i].myclassNum}</td>
                <td>
                    <span class="alter">修改</span>
                    <span class="del">删除</span>
                </td>
                <td>
                    <span class="look">查看</span>
                </td>
            </tr>`);
        }
    }
}
//模糊查询
$(".inputPhoto").on("focus", function () {
    //输入实时查询事件，propertychange是IE的输入监听事件，input是其它浏览器
    $(".inputPhoto").on("input propertychange", function () {
        $("#classtable tbody tr")
            .hide()
            .filter(":contains('" + $(this).val().toLocaleLowerCase() + "')")//小写
            .show();
    });
});
//单独删除某一行
$("tbody").on("click",".del",function () {
    let m=parseInt($(this).parent().parent().children()[4].innerText);//找到班级人数
    let n=$(this).parent().parent().children()[0].childNodes;//找到复选框
    if ($(n).is(":checked")){//是否选中复选框
        if (m==0){
            let num=parseInt($(this).parent().parent().children()[1].innerText);
            $("#classtable tbody tr").remove();
            myclass.splice(num-1,1);
            for (let i=0;i<myclass.length;i++){
                if (i>=num-1) {
                    myclass[i].myclassId-=1;
                }
            };
        }else {
            $('#smallModal').modal();
            $('.smallModalText').text("该班级下还有学生，不能删除！")
        }
    } else {
        $('#smallModal').modal();
        $('.smallModalText').text("请选择班级！")
    }
    $("#classtable tbody tr").remove();//清空页面
    sessionStorage.setItem("user",JSON.stringify(myclass));
    pageContent("#classtable",0,false,myclass);
});
//修改某一行
$("tbody").on("click",".alter",function () {
    $('#myalterModal').modal();
    //获取初始信息
    $(".No1").val($(this).parent().parent().children()[1].innerText);
    $(".Name1").val($(this).parent().parent().children()[2].innerText);
    $(".Date1").val($(this).parent().parent().children()[3].innerText);
    $(".Num1").val($(this).parent().parent().children()[4].innerText);
    for (let i=0;i<myclass.length;i++){
        if ($(this).parent().parent().children()[1].innerText==myclass[i].myclassId) {
            $(".lessonTeacher1").val(myclass[i].myclassTeacher1);
            $(".lifeTeacher1").val(myclass[i].myclassTeacher2);
            //点击保存
            $("#myalterModal .save")[0].onclick=function () {//绑定了多个事件，但只触发最新的那个事件，也可以用全局变量解决，把i用全局变量存储
                myclass.splice(i,1,{
                    myclassId:parseInt($(".No1").val()),//班级编号
                    myclassName:$(".Name1").val(),//班级名称
                    myclassDate:$(".Date1").val(),//开班日期
                    myclassNum:parseInt($(".Num1").val()),//班级人数
                    myclassTeacher1:$(".lessonTeacher1").val(),//上课老师
                    myclassTeacher2:$(".lifeTeacher1").val(),//生活老师
                });
                $("#classtable tbody tr").remove();//清空页面
                sessionStorage.setItem("user",JSON.stringify(myclass));//重新加入缓存
                pageContent("#classtable",0,false,myclass)//重新渲染
            };
        }
    }
});
//查看某一行
$("tbody").on("click",".look",function () {
    $('#myLookModal').modal();
    $(".looktable thead tr").remove()
    $(".looktable tbody tr").remove()
    for (let i=0;i<myclass.length;i++){
        if ($(this).parent().parent().children()[1].innerText==myclass[i].myclassId) {
            $(".Num").val(myclass[i].myclassNum);
            $(".lessonTeacher").val(myclass[i].myclassTeacher1);
            $(".lifeTeacher").val(myclass[i].myclassTeacher2);
        }
    }
    //thead
    $("#myLookModal .looktable thead").append(
        `<tr class="info">
                 <th>学生姓名</th>
                 <th>学生年龄</th>
                 <th>学生性别</th>
                 <th>家长姓名</th>
                 <th>家长电话</th>
            </tr>`
    );
    //表头居中
    $("#myLookModal .looktable thead tr th").css({
        textAlign:"center"
    });
    //tbody
    for (let j=0;j<students.length;j++){
        if (students[j].studentsClass==$(this).parent().parent().children()[2].innerText){
            $("#myLookModal .looktable>tbody").append(
                `<tr>
                        <td>${students[j].studentName}</td>
                        <td>${students[j].studentAge}</td>
                        <td>${students[j].studentSex}</td>
                        <td>${students[j].parentName}</td>
                        <td>${students[j].parentCall}</td>
                    </tr>`
            )
        }
    }
});
//点击全选
$(".myul>li:nth-of-type(1)>span").click(function () {
    $(".mycheckbox").attr("checked",'checked')
});
//选中之后点击删除
$(".myul>li:nth-of-type(2)>span").click(function () {
    let n=$("#classtable input[type='checkbox']:checked");
    let num=n.parent().parent().children()[1].innerText;
    const sum=myclass.length;
    if($(".mycheckbox").is(":checked")){
        n.parent().parent().remove();
        // 只能全选删除，多选会出错
        for (let i=0;i<sum;i++){
            myclass.splice(num-1,1);
        }
    }
    sessionStorage.setItem("user",JSON.stringify(myclass));
});
//选择老师
function myOption(myselect,arrteachers) {
    for(let i=0;i<arrteachers.length;i++){
        if (i<arrteachers.length) {
            $(myselect).append(
                `<option>${arrteachers[i].teacherName}</option>`
            );
        }
    }
}
//保存
$("#myModal .save").click(function () {
    if ($("#classNo").val()&&$("#className").val()&&$("#classDate").val()&&$("#classNum").val()){
        myclass.push({
            myclassId:parseInt($("#classNo").val()),//班级编号
            myclassName:$("#className").val(),//班级名称
            myclassDate:$("#classDate").val(),//开班日期
            myclassNum:parseInt($("#classNum").val()),//班级人数
            myclassTeacher1:$(".col-md-10 select:nth-of-type(1)").val(),//上课老师
            myclassTeacher2:$(".col-md-10 select:nth-of-type(2)").val(),//生活老师
        });
    } else {
        $('#smallModal').modal();
        $('.smallModalText').text("必填信息不能为空！")
        return;
    }
    let i=myclass.length-1;
    $("#classtable tbody").append(
        `<tr>
                <td class="not"><input type="checkbox" class="mycheckbox"></td>
                <td>${myclass[i].myclassId}</td>
                <td>${myclass[i].myclassName}</td>
                <td>${myclass[i].myclassDate}</td>
                <td>${myclass[i].myclassNum}</td>
                <td>
                    <span class="alter">修改</span>
                    <span class="del">删除</span>
                </td>
                <td>
                    <span class="look">查看</span>
                </td>
            </tr>`);
    sessionStorage.setItem("user",JSON.stringify(myclass));
    //加入缓存之后清空input和select
    $("input").val("");
    $("select").val("");
    $(".cancel").click();
});
//导出Excel
$(".export").click(function () {
    $("#classtable").table2excel({
        exclude  : ".not", //过滤位置的 css 类名
        filename : "班级管理"+".xls" //文件名称
    });
});
//升班
/*$(".up").click(function () {
    $(".upBox").remove();
    $("#myLookModal").append(
        `<div class="upBox">
             <span>班级名称：</span>
             <input type="text" class="Name1"><br><br>
        </div>
    `)
});*/
$(document).ready(function () {
    pageContent("#classtable",0,true,myclass);
    myOption(".col-md-10 select",teachers);
});