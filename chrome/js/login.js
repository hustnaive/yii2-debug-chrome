$("input[type='submit']").on('click',function(){
      var auth = $("input[name='auth']").val();
      if( !auth ) {
        alert("请输入服务端auth密码");
      }
      else {
        chrome.runtime.sendMessage({action:'set-auth',auth:auth},function(resp){
			window.close();
        });
      }
});

chrome.runtime.sendMessage({action:'get-auth'},function(resp){
    $("input[name='auth']").val(resp);
});
