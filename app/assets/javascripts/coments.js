$(document).on('turbolinks:load', function(){

  function buildHTML(jdata){
 
    var imageHTML = jdata.image.url ? `<img src="${jdata.image.url}"> ` : ``;
    
    var html = 
    `<div class="message">
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
      // console.log(jdata);
      var html = buildHTML(jdata);
      $('.main__contents').append(html)
      $('.new_message')[0].reset();
      $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
    })

    .fail(function(){
      alert('error');
    })

  })
})