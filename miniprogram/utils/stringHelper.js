"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgSizeLimit = void 0;
function ImgSizeLimit(html) {
    var str = html;
    if (str == null) {
        return str;
    }
    var index = html.indexOf("<ol");
    if (index != -1) {
        str = html.slice(0, index + 3) + " type='A'" + html.slice(index + 3);
    }
    else {
        str = html;
    }
    // var reg = /<img .+style[ ]*?=[ ]*?(['"]).*\1/g;
    // return html.replace(reg, '<img style="max-width:100%;height:auto" ')
    var imgReg = /<img[^>]*?>/g;
    str = str.replace(imgReg, function (imgtag, x) {
        var attrReg = /<img[^>]*?src[ ]*=[ ]*(['"])([^\1]*?)\1.*>/;
        var match = imgtag.match(attrReg);
        if (match != null) {
            var src = match[2];
            return "<img src=\"" + src + "\" style=\"max-width:100%;height:auto\" />";
        }
        return "";
    });
    return str;
}
exports.ImgSizeLimit = ImgSizeLimit;
