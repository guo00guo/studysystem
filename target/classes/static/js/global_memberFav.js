/***************************/
/*依赖 jquery、layer
/***************************/
var Favorite = {
    createFavorite: function () {
        var result = {};
        result.result = 1;
        result.msg = "发送请求成功";

        var favorite = {};
        favorite.add = function (objType, courseId, title, callBack) {
            var data = {};
            data.objType = objType;
            data.courseId = courseId;
            data.title = title;
            if (!data.objType) { layer.msg("收藏类型不能为空"); return false; }
            if (!data.courseId) { layer.msg("课程ID不能为空"); return false; }
            if (!data.title) { layer.msg("标题不能为空"); return false; }
            
            $.ajax({
                url: "/course-course-addmemberfav.htm",
                data: data,
                type: "post",
                dataType: "json",
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    result.result = 0;
                    result.msg = "发送请求发生错误";
                    if ($.isFunction(callBack)) callBack.call(result, XMLHttpRequest);
                },
                success: function (d) {
                    if (d.result == 0 && d.msg) {
                        layer.msg(d.msg, 2, 8);
                    }
                    else {
                        layer.msg("收藏成功", 2, 9);
                    }
                    if ($.isFunction(callBack)) callBack.call(result, d);
                    return false;
                }
            });
        };
        return favorite;
    }
};