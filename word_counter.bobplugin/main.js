function supportLanguages() {
    return ['auto', 'zh-Hans', 'zh-Hant','en'];
}



function translate(query, completion) {

	var j=query.text
    var g=query.text.replace(/\r\n/g,"\n")
    var e=g.length

    var d={
        wd:0
        ,enwords:0
        ,totals:0
        ,cb:0
        ,lines:0
        ,en:0
        ,cn:0
        ,blank:0
        ,marks:0
    }

    var n=g.match(/\b\w+\b/g)||[]
    var f=g.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/g)||[]
    d.enwords=n.length;d.cn=f.length
    for(var h=0;h<e;h++){
        var p=g.charAt(h)
        d.totals++;
        var o=/[\`\~\,\.\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\:\;\"\'\<\>\/\?\\\\|。，、；：？！…—·ˉ¨‘’“”～々‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝]/g;
        if(o.test(p)){
            d.marks++
        }
        switch(true){
            case /[a-zA-Z]/.test(p):
                d.en++;
                break;
            case /\S/.test(p):
                d.cb++;
                break;
            case /\s/.test(p):
                if(p=="\n"||p=="\r")
                    {d.lines++}
                else
                    {d.blank++}
                break
        }
    }

    d.wd=d.enwords+d.cn;

    result = {
        'toParagraphs': [
            "中文" + d.cn + "字  英文" + d.enwords + "词  总计" + (d.cn + d.enwords) + "字词"
        ]
    }

    completion({'result': result});
}
