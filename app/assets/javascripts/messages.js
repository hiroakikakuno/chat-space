
$(document).on('turbolinks:load', function(){

  /////非同期通信/////////////////////////
  function buildHTML(jdata){
 
    var imageHTML = jdata.image.url? `<img src="${jdata.image.url}"> ` : ``;
    
    var html = 
    `<div class="message" data-message-id="${jdata.id}">
      <div class="user-date">
       <div class="name">
        ${jdata.user_name}
      </div>
    <div class="date">
      ${jdata.time}
    </div>
    </div>
    <div class="user-message">
      <p class="lower-message__content">
        ${jdata.message}
      </p>
      </div>
      ${imageHTML}
      </div>`
      
      return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
  
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(jdata){
      var html = buildHTML(jdata);
      $('.main__contents').append(html)
      $('#new_message')[0].reset();
      // $(".form__submit").attr('disabled', false);
      $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
    })

    .fail(function(){
      alert('error');
    })

    .always(() => {
      $(".form__submit").removeAttr("disabled");
      });

  })

/////自動更新システム//////

var reloadMessages = function() {

  if (window.location.href.match(/\/groups\/\d+\/messages/)){
  //今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。

  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $('.message:last').data("message-id");
  
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: "api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })

  .done(function(messages) {
      //追加するHTMLの入れ物を作る
    var insertHTML = '';//追加するHTMLの入れ物を作る
    messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
      $('.main__contents').append(insertHTML);//メッセージを追加
      $('.new_message')[0].reset();
    $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight}, 'fast');
    //最新のメッセージが一番下に表示されようにスクロールする。
  })
  })

  .fail(function() {
    console.log('error');
  });
 
};
};
  setInterval(reloadMessages, 5000);
  
}); ///end///
  