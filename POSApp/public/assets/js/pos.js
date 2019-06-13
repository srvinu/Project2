// import { isContext } from "v";

$(document).ready(() => {
  var userDupArray = []
  var userArray = []
  var orderForHTML = "";
  var orderName;
  var orderDishes = [];
  var endDiv = "</div></div>"
  var obj = {}

function findIcon(category){
  if (category === "Pizza"){
    return "pizza";
  } else if (category === "Burger"){
    return "burger"
  } else if (category === "Mexican"){
    return "taco"
  } else if (category === "Salad"){
    return "leaf"
  } else if (category === "Sandwich"){
    return "sub-sandwich"
  } else if (category === "Asian"){
    return "noodles"
  } else {
    return "restaurant"
  }
}

function removeDuplicate(arrayWithDup, withOutDup){
  $.each(arrayWithDup, function(i, el){
    if($.inArray(el, withOutDup) === -1) withOutDup.push(el);
});
}

function clearOrder(post) {
  $.ajax({
    method: "PUT",
    url: "/api/orderCompleted",
    data: post
  })
    .then(function() {
      console.log("Put method Triggered")
    });
}

function getOrderByUserName(){
  $.ajax({
    url: "/api/myorder",
    method: 'GET',
  }).then((response) => {
    // console.log(response)
    $.each(response, function (i, value) {
      userDupArray.push(value.username);
  });
  removeDuplicate(userDupArray, userArray)
  for (var i = 0; i < userArray.length; i++){
    var firstname = userArray[i].split('@')
    // console.log(firstname[0])
   var  order1 = `<div id="${firstname[0]}" class="col-3 col-md-3 col-sm-3"><div class="alert alert-dismissible alert-danger"><button data-id="${firstname[0]}" data-email="${userArray[i]}" type="submit" class="close" data-dismiss="alert">&times;</button><strong><u>Order For: ${userArray[i]}</u></strong><br><br>`
    for(var j = 0; j < response.length; j++){
      if(userArray[i] == response[j].username){
        // console.log(userArray[i]+ "  ---> "+response[j].order_name)
        var icn = findIcon(response[j].catogery)
        order1 += `<p style="font-size: 20px"><i class="icofont icofont-${icn}"></i>${response[j].order_name}</p>`

      }
      // order1 += orderName;
      // console.log(order1)

    }
    order1 += endDiv;
    $('#orderAdd').append(order1);
        // console.log(response[i].username)
  }
  // order1 += orderName;
  // console.log(order1)
  });
}

getOrderByUserName();
setTimeout(function(){
  window.location.reload(1);
}, 10000);
// var email = "srvinu@gmail.com"
// console.log(email.split('@'))
$(document).on('click', '.close', function() {
  var ids = $(this).data("id");
  var newemail = $(this).attr("data-email")
  console.log(newemail)
  console.log(ids)
  $('#'+ ids).remove();
  var email1 = {
    email: newemail
  }
  console.log(email1)
  clearOrder(email1)

})


});
