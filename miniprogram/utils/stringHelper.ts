
export function ImgSizeLimit(html: string): string {
    let str = html;
    if(str==null){
        return str;
    } 
    let index = html.indexOf("<ol");
    if (index != -1) {
      str = html.slice(0, index + 3) + " type='A'" + html.slice(index + 3);
    } else {
      str = html;
    }
    // var reg = /<img .+style[ ]*?=[ ]*?(['"]).*\1/g;
    // return html.replace(reg, '<img style="max-width:100%;height:auto" ')

    var imgReg = /<img[^>]*?>/g;
    str = str.replace(imgReg,(imgtag,x)=>{
        let attrReg = /<img[^>]*?src[ ]*=[ ]*(['"])([^\1]*?)\1.*>/
        let match = imgtag.match(attrReg);
        if(match != null){
            let src = match[2];
            return `<img src="${src}" style="max-width:100%;height:auto" />`;
        }
        return ``;
    })

    return str;
}

