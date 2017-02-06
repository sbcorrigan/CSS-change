window.showCurrentPage = function(){

  /* start: is there a class already defined in the style sheet? */
  var cssRuleExists = false
  var css = document.styleSheets[0] || document.styleSheets
  if(css){
    try{
      var cssobj = css.cssRules || css.rules
      if(cssobj){
        for(var i=0; i<cssobj.length; i++){
          var o1 = cssobj[i]; if(o1 && o1.selectorText && o1.selectorText.match){
            if(o1.selectorText.match(/ivCP/)){ i=cssobj.length; cssRuleExists = 1; }
          }
        }
      }
    } catch(e){}
  }
  if(!cssRuleExists){
    var sel = '#linksarea a.ivCP,#linksarea a:link.ivCP,#linksarea a:visited.ivCP,#linksarea a:active.ivCP,#linksarea a:hover.ivCP,.ivCP'
    var pro = 'background: #000; color: #fff; text-decoration: none;'
    var str = sel + '{' + pro + '}';
    if(css.addRule){ try{css.addRule(sel,'{'+pro+'}');}catch(e){}}
    else if(css.insertRule){ css.insertRule(sel+'{'+pro+'}',css.length); }
    else{ css.cssText = css.cssText + sel+'{'+pro+'}'; }
  }
  /* end: is there a class already defined in the style sheet? */

  var obj = document.getElementById('linksarea')
  if(obj && obj.innerHTML){
    var arr = obj.getElementsByTagName('a')
    if(arr){
      var current = top.current_file || (window.opener ? window.opener.top.current_file : '');
      if (current) {
        for(var i=0; i<arr.length; i++){
          var o = arr[i];
          if (o.href.indexOf("'"+current+"'") != -1
              || o.href.indexOf("/"+current) != -1) {
            o.className = 'ivCP'
            o.href='javascript:void(0);'
          }
        }
      } else {
        var tmp = '';
        if(location && location.href && location.href.replace){
          tmp = location.href.replace(location.search,'')
        }
        for(var i=0; i<arr.length; i++){
          o = arr[i];
          var tmp2 = o.href; if(o.href && o.href.replace){ var tmp2 = o.href.replace(/#$/,''); } /* support preview mode which uses "#" as href */
          if(tmp2 == tmp){
            o.className = 'ivCP'
            o.href='javascript:void(0);'
            i = arr.length; /* highlight only the first nav link found */
          }
        }
      }
    }
    // hiding for now
    // if(!location.href.match(/cgi-bin/)) obj.innerHTML += ' <a class="menulinks" href="/cgi-bin/login">Login</a>'
  }
}

setTimeout('window.showCurrentPage()',1000)



window.adjustBlogCSSHeight = function(){
  /* nested tables size relationally, CSS's floating divs don't, 
     so try to adjust the background to match the actual document height 
  */
  obj = document.getElementById('mainarea')
  if(obj){
    var h = document.body.scrollHeight || 2000
    obj.style.height=''+h+'px';
  }
}; adjustBlogCSSHeight();

if ( typeof window.addEventListener !== "undefined" ) {
  window.addEventListener( "load", adjustBlogCSSHeight, false );
}
else if ( typeof window.attachEvent !== "undefined" ) {
  window.attachEvent( "onload", adjustBlogCSSHeight );
}

