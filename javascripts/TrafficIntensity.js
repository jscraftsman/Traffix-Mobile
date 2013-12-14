var count;
function set_cookie ( name, value, expires_year, expires_month, expires_day,expires_hour, expires_min, path, domain, secure ){
    var cookie_string = name + "=" + escape ( value );

    if ( expires_year ){
        var expires = new Date ( expires_year, expires_month, expires_day ,expires_hour, expires_min );
        cookie_string += "; expires=" + expires.toGMTString();
    }

    if ( path )
        cookie_string += "; path=" + escape ( path );

    if ( domain )
        cookie_string += "; domain=" + escape ( domain );

    if ( secure )
        cookie_string += "; secure";

    document.cookie = cookie_string;

}
function delete_cookie ( cookie_name ){
    var cookie_date = new Date ( );  // current date & time
    cookie_date.setTime ( cookie_date.getTime() - 1 );
    document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function get_cookie ( cookie_name ){
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
     return null;
}
function create_cookie(){
  var new_cookie = get_cookie("TI-"+Traffic_intensity_id);
   var current_date = new Date();
      var cookie_year = current_date.getFullYear ( );
      var cookie_month = current_date.getMonth ( );
      var cookie_day = current_date.getDate ( );
      var cookie_hour = current_date.getHours();
      var cookie_min = current_date.getMinutes()+1;
  if(new_cookie == null){
     
      count = 1;
  }else{
      count = parseInt(new_cookie) + 1;
  }
  set_cookie ( "TI-" + Traffic_intensity_id, count, cookie_year, cookie_month, cookie_day, cookie_hour, cookie_min );
  count++;

}
$(".lane-options").on("click", ".left, .right", function() {   
  $('.two-lanes-btn').removeAttr('disabled');
  IS_LEFT = $(this).hasClass('left') ? 1 : 0;
  
});

$(".one-lane").on("click", ".light, .medium, .heavy", function() {
  create_cookie();
  if($(this).hasClass('light')){
    _intensitySave('Light','NONE');
  }else if($(this).hasClass('medium')){
    _intensitySave('Medium','NONE');
  }else if($(this).hasClass('heavy')){
    _intensitySave('Heavy','NONE');
  }
});
$(".two-lanes").on("click", ".light, .medium, .heavy", function() {
  
  create_cookie();
  if(IS_LEFT == 0){
    if($(this).hasClass('light')){
      _intensitySave('Light','Right');
    }else if($(this).hasClass('medium')){
      _intensitySave('Medium','Right');
    }else if($(this).hasClass('heavy')){
      _intensitySave('Heavy','Right');
    }
  }else{
    if($(this).hasClass('light')){
      _intensitySave('Light','Left');
    }else if($(this).hasClass('medium')){
      _intensitySave('Medium','Left');
    }else if($(this).hasClass('heavy')){
      _intensitySave('Heavy','Left');
    }
  }

 // $(".two-lanes-btn").attr("disabled","disabled");   
});
function _intensitySave(iv,lane){
  
  $.ajax({
        url: '/intensityReport',
        type: 'POST',
        data: {traffic_intensity_id:Traffic_intensity_id , intensity_value:iv, lane: lane}
      });
}
