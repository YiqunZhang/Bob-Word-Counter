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

    if ($option.model == 1){
        result = {
            'toParagraphs': [
                `中文 ${d.cn} 字\r英文 ${d.enwords} 词\r总计 ${d.enwords+d.cn} 字词\r\r总字符数: ${d.totals-d.lines}\r总字符数(不含空白): ${d.totals-d.blank-d.lines}\r空白字符数: ${d.blank}\r英文字符数: ${d.en}\r标点符号数: ${d.marks}\r其它字符数: ${d.totals-d.en-d.blank-d.cn-d.lines-d.marks}\r`

            ]
        }
    }else{
        result = {
            'toParagraphs': [
                "中文" + d.cn + "字  英文" + d.enwords + "词  总计" + (d.cn + d.enwords) + "字词"
            ]
        }
    }

    completion({'result': result});
}
