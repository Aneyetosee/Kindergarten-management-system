const pageNum = 5;
var b=1;
var stuInfo = sessionStorage.getItem("userStudents");
var students= JSON.parse(stuInfo);
$(document).ready(function () {
    page(0,true);
    pageLi("#myli2");
    my_delete();
    dianjiLI();
    class_delete()
});
//点击换页
function dianjiLI() {
    $(".btns").on("click",function () {
        let a = $(this).text();
        b = a;
        a = (a-1)*pageNum;
        page(a,false);
    })
}
//添加数据
function page(num,mybool) {
    if (mybool==true){
        for (let item in students[0]) {
            //添加表头
            if (item == "studentId") {
                $("table thead tr").append("<th style='text-align: center'>学号</th>")
            } else if (item == "studentName") {
                $("table thead tr").append("<th style='text-align: center'>姓名</th>")
            } else if (item == "studentsClass") {
                $("table thead tr").append("<th style='text-align: center'>班级</th>")
            } else if (item == "studentAge") {
                $("table thead tr").append("<th style='text-align: center'>年龄</th>")
            } else if (item == "studentSex") {
                $("table thead tr").append("<th style='text-align: center'>性别</th>")
            } else if (item == "studentBirth") {
                $("table thead tr").append("<th style='text-align: center'>出生日期</th>")
            } else if (item == "studentAddress") {
                $("table thead tr").append("<th style='text-align: center'>地址</th>")
            } else if (item == "parentName") {
                $("table thead tr").append("<th style='text-align: center'>家长姓名</th>")
            } else if (item == "parentCall") {
                $("table thead tr").append("<th style='text-align: center'>家长电话</th>")
            } else if (item == "parentEmial") {
                $("table thead tr").append("<th style='text-align: center'>家长邮箱</th>")
            } else if (item == "relation") {
                $("table thead tr").append("<th style='text-align: center'>关系</th>")
            }
        }
        $("table thead tr").append("<th style='text-align: center'>操作</th>");
    }
    $("table tbody").html("");
    for (let i=num;i<num+pageNum;i++){
        if (i<students.length) {
            $("table tbody").append(`
           <tr class="my_tr" >
                <td style="height: 47px; line-height: 47px">${students[i].studentId}</td>
                <td style="height: 47px; line-height: 47px">${students[i].studentName}</td>
                <td style="height: 47px; line-height: 47px">${students[i].studentsClass}</td>
                <td style="height: 47px; line-height: 47px">${students[i].studentAge}</td>
                <td style="height: 47px; line-height: 47px">${students[i].studentSex}</td>
                <td style="height: 47px; line-height: 47px">${students[i].studentBirth}</td>
                <td style="height: 47px; line-height: 47px">${students[i].studentAddress}</td>
                <td style="height: 47px; line-height: 47px">${students[i].parentName}</td>
                <td style="height: 47px; line-height: 47px">${students[i].parentCall}</td>
                <td style="height: 47px; line-height: 47px">${students[i].parentEmial}</td>
                <td style="height: 47px; line-height: 47px">${students[i].relation}</td>
                <td>
                <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-success change_tr" data-toggle="modal" data-target="#changeModa">修改</button></span>
                <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-danger delete_tr">删除</button></span>
                <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-info view_tr" data-toggle="modal" data-target="#viewModa">查看</button></span>
                </td>
           </tr>
           `)
        }
    }
    sessionStorage.setItem("userStudents" ,JSON.stringify(students));//加入缓存
}
//分页
function pageLi(tianjia){
    for (let i=0; i<Math.ceil(students.length/pageNum);i++) {
        $(tianjia).before(
            `<li class="btns"><a>${i+1}</a></li>`
        )
    }
}
//左翻页
$("#myli1").on("click",function () {
    if (b>1){
        b--;
        let c=(b-1)*pageNum;
        page(c,false)
    }
});
//右翻页
$("#myli2").on("click",function () {
    if (b<Math.ceil(students.length/pageNum)){
        b++;
        let c=(b-1)*pageNum;
        page(c,false)
    }
});
//删除学生信息
function my_delete() {
    $("tbody").on("click",".delete_tr",function () {
        let num = $(this).parent().parent().parent().children()[0].innerText;
        for (let i=0; i<students.length;i++ ){
            if (students[i].studentId==num){
                $(this).parent().parent().parent().remove();
                students.splice(i,1);
            }
        }
       
            page(0,false);
            $(".btns").html("");
            pageLi("#myli2");
            dianjiLI();


    });
    sessionStorage.setItem("userStudents" ,JSON.stringify(students));
}
//班级选择后的删除
function class_delete() {
    $("tbody").on("click",".delete_tr_2",function () {
        let num = $(this).parent().parent().parent().children()[0].innerText;
        for (let i=0; i<students.length;i++ ){
            if (students[i].studentId==num){
                $(this).parent().parent().parent().remove();
                students.splice(i,1);
            }
        }
    });
    sessionStorage.setItem("userStudents" ,JSON.stringify(students));
}
//日期
for(i=2018;i>=2010;i--){
    var txt=$("<option></option>").text(i);
    $(".Year").append(txt)
}
for(i=1;i<=12;i++){
    var txt=$("<option></option>").text(i);
    $(".Month").append(txt)
}
for(i=1;i<=31;i++){
    var txt=$("<option></option>").text(i);
    $(".Day").append(txt)
}
$(".Year").change(function () {
    $(this).siblings(".Month").html("<option>"+"</option>");
    $(this).siblings(".Day").html("<option>"+"</option>");
    for(i=1;i<=12;i++){
        var txt=$("<option></option>").text(i);
        $(this).siblings(".Month").append(txt)
    }
})
$(".Month").change(function () {
    var Yea = parseInt($($(this).siblings(".Year")).val());
    var Mon = parseInt($(this).val());
    if(Mon==1||Mon==3||Mon==5||Mon==7||Mon==8||Mon==10||Mon==12){
        $(this).siblings(".Day").html("<option>"+"</option>");
        for(i=1;i<=31;i++){
            var txt=$("<option></option>").text(i);
            $(this).siblings(".Day").append(txt)
        }
    }else if(Mon==4||Mon==6||Mon==9||Mon==11){
        $(this).siblings(".Day").html("<option>"+"</option>");
        for(i=1;i<=30;i++){
            var txt=$("<option></option>").text(i);
            $(this).siblings(".Day").append(txt)
        }
    }else if(Mon==2&&((Yea%4==0&&Yea%100!=0)||Yea%400==0)){
        $(this).siblings(".Day").html("<option>"+"</option>");
        for(i=1;i<=29;i++){
            var txt=$("<option></option>").text(i);
            $(this).siblings(".Day").append(txt)
        }
    }else if(Mon==2){
        $(this).siblings(".Day").html("<option>"+"</option>");
        for(i=1;i<=28;i++){
            var txt=$("<option></option>").text(i);
            $(this).siblings(".Day").append(txt)
        }
    }
})
//添加学生
$("#AddQd").on("click",function () {
    let i= students.length-1;
    $("table tbody").append(
        `<tr>
               <td style="height: 51px; line-height: 51px">${students[i].studentId}</td>
               <td style="height: 51px; line-height: 51px">${students[i].studentName}</td>
               <td style="height: 51px; line-height: 51px">${students[i].studentsClass}</td>
               <td style="height: 51px; line-height: 51px">${students[i].studentAge}</td>
               <td style="height: 51px; line-height: 51px">${students[i].studentSex}</td>
               <td style="height: 51px; line-height: 51px">${students[i].studentBirth}</td>
               <td style="height: 51px; line-height: 51px">${students[i].studentAddress}</td>
               <td style="height: 51px; line-height: 51px">${students[i].parentName}</td>
               <td style="height: 51px; line-height: 51px">${students[i].parentCall}</td>
               <td style="height: 51px; line-height: 51px">${students[i].parentEmial}</td>
               <td style="height: 51px; line-height: 51px">${students[i].relation}</td>
             <tr>
        `);
    addJudge();//当添加合理时清空，当不合理的时候提示
    page(0,false);
    $(".btns").html("");
    pageLi("#myli2");
    dianjiLI();
    my_delete();

    sessionStorage.setItem("userStudents" ,JSON.stringify(students));
});
//修改学生
$("tbody").on("click",".change_tr",function () {
    $(".Lspan").remove();
    $("#changeStudentName").val($(this).parent().parent().parent().children()[1].innerText);
    $("#changeStuNum").val($(this).parent().parent().parent().children()[0].innerText);
    $("#changeStuAge").val($(this).parent().parent().parent().children()[3].innerText);
    $("#changePatName").val($(this).parent().parent().parent().children()[7].innerText);
    $("#changePatPhoneNum").val($(this).parent().parent().parent().children()[8].innerText);
    $("#changemyParentEmial").val($(this).parent().parent().parent().children()[9].innerText);
    $("#changemyRelation").val($(this).parent().parent().parent().children()[10].innerText);
    let a = $(this).parent().parent().parent().children()[4].innerText;
    console.log(a)
    if(a == "男"){
        $('input:radio[name="changeSex"]')[0].checked=true;
    }else {
        $('input:radio[name="changeSex"]')[1].checked = true;
    }
    let stustr1=new String();
    let stuarr1=new Array();
    let stustr2 = new String();
    let stuarr2= new Array();
    let stuarr3= new Array();
    let stuarr4= new Array();
    stustr1 = $(this).parent().parent().parent().children()[5].innerText;
    stuarr1=stustr1.split('.');
    stustr2 = $(this).parent().parent().parent().children()[6].innerText;
    stuarr2=stustr2.substring(0,2);
    stuarr3=stustr2.substring(2,4);
    stuarr4=stustr2.substring(4);
    $(".Year").val(stuarr1[0]);
    $(".Month").val(stuarr1[1]);
    $(".Day").val(stuarr1[2]);
    $(".City").val(stuarr2);
    $(".District").val(stuarr3);
    $("#changeHomeAdd").val(stuarr4);
    for (let i=0;i<students.length;i++){
        if ($(this).parent().parent().parent().children()[0].innerText==students[i].studentId){
            $("#changestudentClass").val(students[i].studentsClass);
            $("#changeAddQd")[0].onclick =function () {
                students.splice(i,1,{
                    studentName:$("#changeStudentName").val(),
                    studentSex:$("input[type='radio']:checked").val(),
                    studentId:$("#changeStuNum").val(),
                    studentAge:$("#changeStuAge").val(),
                    studentBirth:$(".Year").val()+"."+$(".Month").val()+"."+$(".Day").val(),
                    studentsClass:$("#changestudentClass").val(),
                    studentAddress:$(".City").val()+$(".District").val()+$("#changeHomeAdd").val(),
                    parentName:$("#changePatName").val(),
                    parentCall:$("#changePatPhoneNum").val(),
                    parentEmial:$("#changemyParentEmial").val(),
                    relation:$("#changemyRelation").val(),
                });
                $("#my_table tbody tr").remove();
                page(0,false);
            }
        }
    }
    sessionStorage.setItem("userStudents" ,JSON.stringify(students));
})
//查看学生
$("tbody").on("click",".view_tr",function () {
    $(".Lspan").remove();
    $("#viewStudentName").val($(this).parent().parent().parent().children()[1].innerText);
    $("#viewStuNum").val($(this).parent().parent().parent().children()[0].innerText);
    $("#viewStuAge").val($(this).parent().parent().parent().children()[3].innerText);
    $("#viewPatName").val($(this).parent().parent().parent().children()[7].innerText);
    $("#viewPatPhoneNum").val($(this).parent().parent().parent().children()[8].innerText);
    $("#viewmyParentEmial").val($(this).parent().parent().parent().children()[9].innerText);
    $("#viewmyRelation").val($(this).parent().parent().parent().children()[10].innerText);
    let a = $(this).parent().parent().parent().children()[4].innerText;

    if(a == "男"){
        $('input:radio[name="viewSex"]')[0].checked=true;
    }else {
        $('input:radio[name="viewSex"]')[1].checked = true;
    }
    let stustr1=new String();
    let stuarr1=new Array();
    let stustr2 = new String();
    let stuarr2= new Array();
    let stuarr3= new Array();
    let stuarr4= new Array();
    stustr1 = $(this).parent().parent().parent().children()[5].innerText;
    stuarr1=stustr1.split('.');
    stustr2 = $(this).parent().parent().parent().children()[6].innerText;
    stuarr2=stustr2.substring(0,2);
    stuarr3=stustr2.substring(2,4);
    stuarr4=stustr2.substring(4);
    $(".Year").val(stuarr1[0]);
    $(".Month").val(stuarr1[1]);
    $(".Day").val(stuarr1[2]);
    $(".City").val(stuarr2);
    $(".District").val(stuarr3);
    $("#viewHomeAdd").val(stuarr4);
    for (let i=0;i<students.length;i++){
        if ($(this).parent().parent().parent().children()[0].innerText==students[i].studentId){
            $("#viewstudentClass").val(students[i].studentsClass);
        }
    }
})
//模糊查询
$(".changeinput").on("focus", function () {
    //输入实时查询事件，propertychange是IE的输入监听事件，input是其它浏览器
    $(".changeinput").on("input propertychange", function () {
        $("#my_table tbody tr")
            .hide()
            .filter(":contains('" + $(this).val().toLocaleLowerCase() + "')")//小写
            .show();
    });
});
//判断信息是否输入
function addJudge() {
    let addName = true;
    let addSex = true;
    let addNum1 = true;
    let addNum2 = true;
    let addAge = true;
    let addBirth = true;
    let Address = true;
    let addClass1 = true;
    let addPatName = true;
    let addPatPhone = true;
    let addParentEmial1 = true;
    let addParentEmial2 = true;
    let addRelation = true;
    $(".Lspan").remove();
    if ($("#studentName").val()=="") {
        $("#studentName").after(
        `<span class="Lspan">请填写姓名</span>`
        )
        addName = false
    }
    if($('input:radio[name="Sex"]:checked').val()==null){
        $(".mySex1").after(
            `<span class="Lspan">请选择性别</span>`
        )
        addSex = false
    }
    if ($("#StuNum").val()=="") {
        $("#StuNum").after(
            `<span class="Lspan">请填写学号</span>`
        )
        addNum1 = false;
    }
    if ($("#StuAge").val()=="") {
        $("#StuAge").after(
            `<span class="Lspan">请填写年龄</span>`
        )
        addAge = false
    }
    if($("#Birthdate").children(".Year").val()=="年"||$("#Birthdate").children(".Month").val()=="月"||$("#Birthdate").children(".Day").val()=="日"){
        $("#Birthdate").after(
            `<span class="Lspan">请选择年月日</span>`
        )
        addBirth = false
    }
    if($("#HomeAdd").val()==""){
        $("#HomeAdd").after(
            `<span class="Lspan">请填写地址</span>`
        )
        Address = false;
    }
    if($("#studentClass").val()=="班级"){
        $("#studentClass").after(
            `<span class="Lspan">请选择班级</span>`
        )
        addClass1 = false
    }
    if ($("#PatName").val()=="") {
        $("#PatName").after(
            `<span class="Lspan">请填写家长姓名</span>`
        )
        addPatName = false
    }
    if ($("#PatPhoneNum").val()=="") {
        $("#PatPhoneNum").after(
            `<span class="Lspan">请填写家长电话</span>`
        )
        addPatPhone = false
    }
    if ($("#myParentEmial").val()=="") {
        $("#myParentEmial").after(
            `<span class="Lspan">请填写家长邮箱</span>`
        )
        addParentEmial1 = false
    }
    if ($("#myRelation").val()=="") {
        $("#myRelation").after(
            `<span class="Lspan">请填写与学生关系</span>`
        )
        addRelation = false
    }
    for (let i=0;i<students.length;i++){
        if (students[i].studentId==$("#StuNum").val()){
            $("#StuNum").after(
                `<span class="Lspan">已有此学号，请重新输入</span>`
            );
            addNum2 = false;
        }
    }
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//邮箱表达式
    if (!reg.test($("#myParentEmial").val())) {
        $("#myParentEmial").after(
            `<span class="Lspan">请输入正确的邮箱</span>`
        )
        addParentEmial2 = false
    }
    if (addName == true && addSex == true && addNum1 == true && addAge == true && addBirth == true && Address ==true && addClass1 == true && addPatName == true
    && addPatPhone == true && addParentEmial1 == true && addRelation == true&& addNum2==true && addParentEmial2 == true){
        if ($("#studentName").val()&&$("input:radio[name='Sex']:checked").val()!=null&&$("#StuNum").val()&&
            $("#StuAge").val()&&$(".Year").val()&&$(".Month").val()&&$(".Day").val()&&$("#studentClass").val()&&
            $(".City").val()&&$(".District").val()&&$("#HomeAdd").val()&&$("#PatName").val()&& $("#PatPhoneNum").val()&&
            $("#myParentEmial").val()&&  $("#myRelation").val()&&$("#studentClass").val()!="班级"&&$(".Year").val()!="年"&&
            $(".Month").val()!="月"&&$(".Day").val()!="月") {
            students.push({
                studentName:$("#studentName").val(),
                studentSex:$("input[type='radio']:checked").val(),
                studentId:$("#StuNum").val(),
                studentAge:$("#StuAge").val(),
                studentBirth:$(".Year").val()+"."+$(".Month").val()+"."+$(".Day").val(),
                studentsClass:$("#studentClass").val(),
                studentAddress:$(".City").val()+$(".District").val()+$("#HomeAdd").val(),
                parentName:$("#PatName").val(),
                parentCall:$("#PatPhoneNum").val(),
                parentEmial:$("#myParentEmial").val(),
                relation:$("#myRelation").val(),
            });
        }//当所有不为空时执行
        $('#AddModa').modal('hide');
        /*addEmpty()*/
        addinit()
    }
}
//清空添加模态框
function addinit() {
        $("#studentName").val("");
          if($('input:radio[name="Sex"]:checked').val()!=null){
           $('input:radio[name="Sex"]:checked')[0].checked=false;
         }
        $("#StuNum").val("");
        $("#StuAge").val("");
        $(".Year").val("年")+"."+$(".Month").val("月")+"."+$(".Day").val("日");
        $("#studentClass").val("班级");
        $(".City").val("成都")+$(".District").val("金牛")+$("#HomeAdd").val("");
        $("#PatName").val("");
        $("#PatPhoneNum").val("");
        $("#myParentEmial").val("");
        $("#myRelation").val("");
}
//关闭添加成功模态框
function  addEmpty(){
    $("#AddQd").on("click",function () {
        $('#AddModa').modal('hide');
    })
}
//点击取消
$("#AddQx").on("click",function () {
    $('#AddModa').modal('hide');
     addinit();
    $(".Lspan").remove();
});
//点击叉叉
$("#addClose").on("click",function () {
    $('#AddModa').modal('hide');
    addinit();
    $(".Lspan").remove();
});
//点击班级
    $("#mystuclass").on("change",function() {
        console.log($(this).val())
        if ($(this).val()==0){
            $("table tbody").html("");
            page(0,false);
            $(".btns").html("");
            pageLi("#myli2");
            dianjiLI();
        }
        if ($(this).val()==1){
            $("table tbody").html("");
            for (let i=0;i<students.length;i++){
                if (students[i].studentsClass=="小班"){
                    $("table tbody").append(
                        `<tr class="my_tr" >
                   <td style="height: 47px; line-height: 47px">${students[i].studentId}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentName}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentsClass}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentAge}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentSex}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentBirth}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentAddress}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].parentName}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].parentCall}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].parentEmial}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].relation}</td>
                   <td>
                   <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-success change_tr" data-toggle="modal" data-target="#changeModa">修改</button></span>
               <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-danger delete_tr_2">删除</button></span>
               <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-info view_tr" data-toggle="modal" data-target="#viewModa">查看</button></span>
               </td>
               </tr>`)
                }
            }
            $(".btns").html("");
            $("#myli2").before(
                        `<li class="btns"><a>1</a></li>`
                    )
        }
        if ($(this).val()==2){
            $("table tbody").html("");
            for (let i=0;i<students.length;i++){
                if (students[i].studentsClass=="中班"){
                    $("table tbody").append(
                        `<tr class="my_tr" >
                   <td style="height: 47px; line-height: 47px">${students[i].studentId}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentName}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentsClass}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentAge}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentSex}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentBirth}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentAddress}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].parentName}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].parentCall}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].parentEmial}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].relation}</td>
                   <td>
                   <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-success change_tr" data-toggle="modal" data-target="#changeModa">修改</button></span>
               <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-danger delete_tr_2">删除</button></span>
               <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-danger view_tr" data-toggle="modal" data-target="#viewModa">查看</button></span>
               </td>
               </tr>`)
                }
            }
            $(".btns").html("");
            $("#myli2").before(
                `<li class="btns"><a>1</a></li>`
            )
        }
        if ($(this).val()==3){
            $("table tbody").html("");
            for (let i=0;i<students.length;i++){
                if (students[i].studentsClass=="大班"){
                    $("table tbody").append(
                        `<tr class="my_tr" >
                   <td style="height: 47px; line-height: 47px">${students[i].studentId}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentName}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentsClass}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentAge}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentSex}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentBirth}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].studentAddress}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].parentName}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].parentCall}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].parentEmial}</td>
                   <td style="height: 47px; line-height: 47px">${students[i].relation}</td>
                   <td>
                   <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-success change_tr" data-toggle="modal" data-target="#changeModa">修改</button></span>
               <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-danger delete_tr_2">删除</button></span>
               <span style="height: 47px; line-height: 47px"><button type="button" class="btn btn-danger view_tr" data-toggle="modal" data-target="#viewModa">查看</button></span>
               </td>
               </tr>`)
                }
            }
            $(".btns").html("");
            $("#myli2").before(
                `<li class="btns"><a>1</a></li>`
            )
        }
    });





