$(document).ready(() => {

function addtoCart(title, img_loc, price, utitle){
  // addCartHTML = `<div id="${utitle}" class="col-sm-12"><div class="box"><button data-rmtitle="${utitle}" style="margin-left: 40%; margin-right: auto%;" class="btn rmbtn"><i class="icofont icofont-ui-close"></i></button> <a href="#"><img src="${img_loc}" alt="image" title="image" style="width: 100%;" class="img-fluid" ></a><div style="margin-left: 0px;" class="caption"><h4>${title}</h4><p>$${price}</p></div></div></div></div>`
  addCartHTML = `<div class="card" id="${utitle}"><button data-rmtitle="${utitle}" style="margin-left: 0%; margin-right: auto%;" class="btn rmbtn"><i class="icofont icofont-ui-close"></i></button><img class="card-img-top" src="${img_loc}"><div class="card-body"><h5 class="card-title" style="color: #e54c2a;">${title}</h5><p class="card-text" style="color: #e54c2a;">Price: $${price}</p></div></div>`
  $('#addCart').append(addCartHTML)
}
var ids = [];
var menu_title = [];
var menu_price = [];
var menu_category = [];
var myHistory = "";

function checkoutPost(Post) {
  $.post("/api/posts/", Post, function() {
    // window.location.href = "/thankyou";
    console.log(Post)
  });
}

  $('.price').on('click', function(){
    var title = $(this).data("title");
    var des = $(this).data("des");
    var img_loc = $(this).data("img_loc");
    var price = $(this).data("price")
    var utitle = $(this).data("utitle")

    console.log("Title: "+utitle)
    console.log("des: "+des)
    addtoCart(title, img_loc, price, utitle)
    $(".dishes").show();

  })
  $(document).on('click', '.rmbtn', function (){
    var rmtitle = $(this).data("rmtitle");
    console.log(rmtitle)
    $('#'+ rmtitle).remove();
    // $('#'+ rmtitle).hide();

  })
$('.checkoutbtn').on('click', function(){
  $("#addCart").find(".card").each(function(){ ids.push(this.id); });
  console.log(ids)
  $.ajax({
    url: "/api/menu",
    method: 'GET',
  }).then((response) => {
    // console.log(response)
    for (var i = 0; i < ids.length; i++) {
      for (var j = 0; j < response.length; j++ ){
        if(response[j].unique_title === ids[i]){
          menu_title.push(response[j].menu_title);
          menu_price.push(response[j].price);
          menu_category.push(response[j].catogery)
        }

      }
    }
  var username = sessionStorage.getItem('username');
  console.log(menu_category)

  if(ids.length > 0) {
      console.log("Post triggered")
      for (var i = 0; i < ids.length; i++){
        console.log("Menu Title  "+menu_title[i])
        var order = {
          username: username,
          order_name: menu_title[i],
          order_unique: ids[i],
          order_price: menu_price[i],
          order_status: true,
          order_category: menu_category[i]
        }
        checkoutPost(order);
      }
  }
  window.location.href = "/thankyou";

  });

  $(document).on('click', '#orderHistory', function(){
    var username = sessionStorage.getItem('username');
    console.log(username)
    // console.log("triggered")
    // $.ajax({
    //   url: "/api/myorderhistory",
    //   method: 'GET',
    // }).then((response) => {
    //   console.log(response)
    //   for (var i = 0 ; i < response.length; i++){
    //     if(response[i].username == username){
    //       myHistory +=  `<li class="dropdown-item foodHistory"><a href="#" data-myOrder=${response[i].order_unique}>${response[i].order_name}</a></li>`
    //     }
    //   }
    //   console.log(myHistory)

    // });

  });

})

function submitFeedback(post) {
  $.ajax({
    method: "POST",
    url: "/api/submitFeedback",
    data: post
  })
    .then(function() {
      console.log("Put method Triggered")
    });
}
$("input[type='radio']").click(function(){
  var value =  $(this).attr("value")
  var uni_value = $(this).attr("data-order")
  console.log(value)
  var feedbackData = {
    rate: $(this).attr("value"),
    email: window.location.href.split('/').pop(),
    uni_value: $(this).attr("data-order")
  }
  console.log(feedbackData)
  submitFeedback(feedbackData)
  window.location.reload(1);

})




});
