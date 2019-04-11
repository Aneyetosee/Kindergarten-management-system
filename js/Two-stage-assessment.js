//添加图片获取本地连接
function startRead() {
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
    reader.onloadstart=function () {
        console.log('文件上传处理......')
    };
    //操作完成
    reader.onload = function(e){
        //file 对象的属性
        img.setAttribute('src',reader.result);

    };
}
// console.log($(".teacher_images").length)

$("#myImgSrc").on("click",function () {

    // 获取本地图片的src的地址
    let imgSrc = $("#imgContentImg").attr("src")
    //把获取的图片src地址添加到img里
    $("#two_staage_cut").append(
        `
                <div class="container-fluid Tow-stage-gg">
                    <div class="row towStageIfGreaterThan">
                        <div class="col-lg-3 col-md-3 teacher_images">
                            <div class="teacher_images_img_ab" >
                                <img class="img-responsive " src="${imgSrc}" alt="">
                             </div>
                            <div class="teacher_images_but">
                                <button data-toggle="modal" data-target="#issue_add_sheet">查看</button>
                                <button class="teacher_images_del">删除</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
    )
})


// 更改模态框放大图片路径this
$(".teacher_images_but").on("click", ".teacher_images_but_look", function () {
    let myImgSrc = $(this).parent().prev().children().attr("src")
    console.log(myImgSrc)
    // let  imgSrc = myImgSrc.attr("src")
    $(".add_picture_box_modal_float_img").css({
        width:"800px",
        height:"500px"
    }).attr("src",myImgSrc)

})


// 删除弹出模态框  点击确定删除 暂时不用
// $("body").append(
//     `
//     <div class="modal fade" id="myModal-ok" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//         <div class="modal-dialog" role="document">
//             <div class="modal-content">
//                 <div class="modal-body">
//                     <h4>是否确认删除</h4>
//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
//                     <button id="teacher_images_delete" type="button" class="btn btn-primary">确定</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `
// )

// 双击图片弹出模态框 图片放大
// $("body").append(
//     `
//     <div class="modal fade" id="myModal-ok" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//         <div class="modal-dialog" role="document">
//             <div class="modal-content">
//                 <div class="modal-body">
//                     <h4>是否确认删除</h4>
//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
//                     <button type="button" class="btn btn-primary">确定</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `
//     )

//放大图片模态框
// $(".teacher_images").append(
//     `
//     <div class="modal fade" id="issue_add_sheet" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
//         <div class="modal-dialog modal-lg" role="document">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//                     <h4></h4>
//                 </div>
//                 <div class="modal-body clear add_picture_box_modal_float">
//
//                 </div>
//             </div>
//         </div>
//     </div>
// `)


$(document).on("click",".teacher_images_del",function () {
    console.log("123456")
    // 点击删除按妞删除自己  无模态框
    $(this).parent().parent().remove()
    //点击删除有模态框未做完
    // $("#teacher_images_delete").click(function () {
    //     for (let i = 0;i<$(".teacher_images").length;i++){
    //         console.log($(this))
    //     })
    // })
})


//点击添加添加模态框


//点击添加添加一个图片展示区

//
// 切换大班小班中班
// <option value="qingxuanze">--请选择--</option>
//     <option value="daban">大班</option>
//     <option value="zhongban">中班</option>
//     <option value="xiaoban">小班</option>

function twoStageCut(value){
    var mySelectedOption=value.options[value.selectedIndex];
    if (mySelectedOption.value=="qingxuanze") {
        $(".img-responsive").css({
            opacity:"1",

        })
        $(".img-responsive-daban").css({
            opacity:"0",

        })
        $(".img-responsive-zhongban").css({
            opacity:"0",
        })
        $(".img-responsive-xiaoban").css({
            opacity:"0",
        })

    }else if (mySelectedOption.value=="daban") {
        $(".img-responsive").css({
            opacity:"0"

        })
        $(".img-responsive-daban").css({
            opacity:"1"
        })
        $(".img-responsive-zhongban").css({
            opacity:"0",
        })
        $(".img-responsive-xiaoban").css({
            opacity:"0",
        })
    }else if (mySelectedOption.value=="zhongban") {
        $(".img-responsive").css({
            opacity:"0"

        })
        $(".img-responsive-daban").css({
            opacity:"0"
        })
        $(".img-responsive-zhongban").css({
            opacity:"1",
        })
        $(".img-responsive-xiaoban").css({
            opacity:"0",
        })
    }else if (mySelectedOption.value=="xiaoban"){
        $(".img-responsive").css({
            opacity:"0"

        })
        $(".img-responsive-daban").css({
            opacity:"0"
        })
        $(".img-responsive-zhongban").css({
            opacity:"0",
        })
        $(".img-responsive-xiaoban").css({
            opacity:"1",
        })
    }
}

// $("#select_id option[value='3']")
