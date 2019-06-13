// import { partials } from "handlebars";

$(document).ready(() => {


  function getPercentage(number){
    if(number > 0){
      return(parseInt(number) * 100 / 25)
    }
    else{
      return (100)
    }
  }
  function getAvailable(number){
  if (number > 25){
      return("out of stock")
    } else {
      return (25 - parseInt(number))
    }
  }
  function checkoutPost(Post) {
    $.post("/api/menuPost/", Post, function() {
      // window.location.href = "/thankyou";
      console.log(Post)
    });
  }

  function percentageBubble(){
    var title = [];
    var uniqueTitle = [];
    var category = [];
    var percentage = [];
    var bubbleHTML;
    var tableHTML;
    var count = [];
    var countMenu = []
    var countUnique = []

    $.ajax({
      url: "/api/OCMS",
      method: 'GET',
    }).then((response) => {
      // console.log(response)
      for(var i = 0; i < response.length; i++){
        title.push(response[i].menu_title)
        uniqueTitle.push(response[i].unique_title)
        category.push(response[i].catogery)
      }
      console.log("b4 --> "+title)
    });
    $.ajax({
      url: "/api/dashCount",
      method: 'GET',
    }).then((response) => {
      // console.log(response)
      for(var i = 0; i< title.length; i++){
        for(var j = 0; j<response.length; j++ ){
          if(title[i] == response[j].order_name){
            console.log("Menu Item -->"+title[i]+" -->"+response[j].order_id)
            countMenu.push(title[i])
            count.push(response[j].order_id)
            countUnique.push(uniqueTitle[i])
            title.splice($.inArray(title[i], title),1);
            uniqueTitle.splice($.inArray(uniqueTitle[i], uniqueTitle),1);
          }
        }
      }
      console.log("after --> "+title)
      console.log(count)
      for (var i = 0 ; i<countMenu.length; i++){
        // bubbleHTML = `<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12"><div style="padding-bottom: 5px;" class="email-statis-inner notika-shadow"><div class="email-ctn-round"><div class="email-rdn-hd"><h2>${countMenu[i]}</h2></div><div class="email-statis-wrap"><div class="email-round-nock"><input type="text" class="knob" value="0" data-rel="${getPercentage(count[i])}" data-linecap="round" data-width="130" data-bgcolor="#E4E4E4" data-fgcolor="#00c292" data-thickness=".10" data-readonly="true"></div><div class="email-ctn-nock"></div></div></div></div></div>`
        bubbleHTML=`<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12"><div style="padding-bottom: 5px;" class="email-statis-inner notika-shadow"><div class="email-ctn-round"><div class="email-rdn-hd"><h5>${countMenu[i]}</h5></div><div class="radial-progress" data-progress="${getPercentage(count[i])}">	<div class="circle"><div class="mask full"><div class="fill"></div></div><div class="mask half"><div class="fill"></div><div class="fill fix"></div></div><div class="shadow"></div></div><div class="inset"><div class="percentage"><div class="numbers"><span>-</span><span>0%</span><span>1%</span><span>2%</span><span>3%</span><span>4%</span><span>5%</span><span>6%</span><span>7%</span><span>8%</span><span>9%</span><span>10%</span><span>11%</span><span>12%</span><span>13%</span><span>14%</span><span>15%</span><span>16%</span><span>17%</span><span>18%</span><span>19%</span><span>20%</span><span>21%</span><span>22%</span><span>23%</span><span>24%</span><span>25%</span><span>26%</span><span>27%</span><span>28%</span><span>29%</span><span>30%</span><span>31%</span><span>32%</span><span>33%</span><span>34%</span><span>35%</span><span>36%</span><span>37%</span><span>38%</span><span>39%</span><span>40%</span><span>41%</span><span>42%</span><span>43%</span><span>44%</span><span>45%</span><span>46%</span><span>47%</span><span>48%</span><span>49%</span><span>50%</span><span>51%</span><span>52%</span><span>53%</span><span>54%</span><span>55%</span><span>56%</span><span>57%</span><span>58%</span><span>59%</span><span>60%</span><span>61%</span><span>62%</span><span>63%</span><span>64%</span><span>65%</span><span>66%</span><span>67%</span><span>68%</span><span>69%</span><span>70%</span><span>71%</span><span>72%</span><span>73%</span><span>74%</span><span>75%</span><span>76%</span><span>77%</span><span>78%</span><span>79%</span><span>80%</span><span>81%</span><span>82%</span><span>83%</span><span>84%</span><span>85%</span><span>86%</span><span>87%</span><span>88%</span><span>89%</span><span>90%</span><span>91%</span><span>92%</span><span>93%</span><span>94%</span><span>95%</span><span>96%</span><span>97%</span><span>98%</span><span>99%</span><span>100%</span></div>	</div></div></div> </div></div></div>`
        $('#bubbleChart').append(bubbleHTML)
        if(countMenu[i].toLocaleLowerCase().includes("pizza")){
          $("#pizzaTab").append(`<tr> <td class="f-500 c-cyan">${countMenu[i]}</td> <td>${count[i]}</td><td class="f-500 c-cyan">${getAvailable(count[i])}</td></tr>`)
        }else if(countMenu[i].toLocaleLowerCase().includes("burger")){
          $("#burgerTab").append(`<tr> <td class="f-500 c-cyan">${countMenu[i]}</td> <td>${count[i]}</td><td class="f-500 c-cyan">${getAvailable(count[i])}</td></tr>`)
        }else if(countMenu[i].toLocaleLowerCase().includes("sandwich")){
          $('#sandwichTab').append(`<tr> <td class="f-500 c-cyan">${countMenu[i]}</td> <td>${count[i]}</td><td class="f-500 c-cyan">${getAvailable(count[i])}</td></tr>`)
        }else if(countMenu[i].toLocaleLowerCase().includes("salad")){
          $('#saladTab').append(`<tr> <td class="f-500 c-cyan">${countMenu[i]}</td> <td>${count[i]}</td><td class="f-500 c-cyan">${getAvailable(count[i])}</td></tr>`)
        }else if(countMenu[i].toLocaleLowerCase().includes("noodle")){
          $('#asianTab').append(`<tr> <td class="f-500 c-cyan">${countMenu[i]}</td> <td>${count[i]}</td><td class="f-500 c-cyan">${getAvailable(count[i])}</td></tr>`)
        } else {
          $('#mexTab').append(`<tr> <td class="f-500 c-cyan">${countMenu[i]}</td> <td>${count[i]}</td><td class="f-500 c-cyan">${getAvailable(count[i])}</td></tr>`)
        }
      }

      for (var j = 0; j < title.length; j++){
        bubbleHTML=`<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12"><div style="padding-bottom: 5px;" class="email-statis-inner notika-shadow"><div class="email-ctn-round"><div class="email-rdn-hd"><h5>${title[j]}</h5></div><div class="radial-progress" data-progress="0">	<div class="circle"><div class="mask full"><div class="fill"></div></div><div class="mask half"><div class="fill"></div><div class="fill fix"></div></div><div class="shadow"></div></div><div class="inset"><div class="percentage"><div class="numbers"><span>-</span><span>0%</span><span>1%</span><span>2%</span><span>3%</span><span>4%</span><span>5%</span><span>6%</span><span>7%</span><span>8%</span><span>9%</span><span>10%</span><span>11%</span><span>12%</span><span>13%</span><span>14%</span><span>15%</span><span>16%</span><span>17%</span><span>18%</span><span>19%</span><span>20%</span><span>21%</span><span>22%</span><span>23%</span><span>24%</span><span>25%</span><span>26%</span><span>27%</span><span>28%</span><span>29%</span><span>30%</span><span>31%</span><span>32%</span><span>33%</span><span>34%</span><span>35%</span><span>36%</span><span>37%</span><span>38%</span><span>39%</span><span>40%</span><span>41%</span><span>42%</span><span>43%</span><span>44%</span><span>45%</span><span>46%</span><span>47%</span><span>48%</span><span>49%</span><span>50%</span><span>51%</span><span>52%</span><span>53%</span><span>54%</span><span>55%</span><span>56%</span><span>57%</span><span>58%</span><span>59%</span><span>60%</span><span>61%</span><span>62%</span><span>63%</span><span>64%</span><span>65%</span><span>66%</span><span>67%</span><span>68%</span><span>69%</span><span>70%</span><span>71%</span><span>72%</span><span>73%</span><span>74%</span><span>75%</span><span>76%</span><span>77%</span><span>78%</span><span>79%</span><span>80%</span><span>81%</span><span>82%</span><span>83%</span><span>84%</span><span>85%</span><span>86%</span><span>87%</span><span>88%</span><span>89%</span><span>90%</span><span>91%</span><span>92%</span><span>93%</span><span>94%</span><span>95%</span><span>96%</span><span>97%</span><span>98%</span><span>99%</span><span>100%</span></div>	</div></div></div> </div></div></div>`
        $('#bubbleChart').append(bubbleHTML)
        if(title[j].toLocaleLowerCase().includes("pizza")){
          $("#pizzaTab").append(`<tr> <td class="f-500 c-cyan">${title[j]}</td> <td>0</td><td class="f-500 c-cyan">25</td></tr>`)
        }else if(title[j].toLocaleLowerCase().includes("burger")){
          $("#burgerTab").append(`<tr> <td class="f-500 c-cyan">${title[j]}</td> <td>0</td><td class="f-500 c-cyan">25</td></tr>`)
        }else if(title[j].toLocaleLowerCase().includes("sandwich")){
          $('#sandwichTab').append(`<tr> <td class="f-500 c-cyan">${title[j]}</td> <td>0</td><td class="f-500 c-cyan">25</td></tr>`)
        }else if(title[j].toLocaleLowerCase().includes("salad")){
          $('#saladTab').append(`<tr> <td class="f-500 c-cyan">${title[j]}</td> <td>0</td><td class="f-500 c-cyan">25</td></tr>`)
        }else if(title[j].toLocaleLowerCase().includes("noodle")){
          $('#asianTab').append(`<tr> <td class="f-500 c-cyan">${title[j]}</td> <td>0</td><td class="f-500 c-cyan">25</td></tr>`)
        } else {
          $('#mexTab').append(`<tr> <td class="f-500 c-cyan">${title[j]}</td> <td>0</td><td class="f-500 c-cyan">25</td></tr>`)
        }
      }


    });
  }
  $('head style[type="text/css"]').attr('type', 'text/less');
  less.refreshStyles();
  percentageBubble()
$('#addMenu').on('click', function(){
  var newMenu = {
    menu_title: $('#title').val().trim(),
    unique_title: $('#uniq_title').val().trim(),
    menu_des: $('#des').val().trim(),
    img_loc: $('#img_loc').val().trim(),
    menu_text: $('#menu_text').val().trim(),
    category: $('#category').val(),
    price: $('#price').val().trim()
  }
  // console.log(newMenu)
  checkoutPost(newMenu);
  window.location.reload();
})
$.ajax({
  url: "/api/feedback",
  method: 'GET',
}).then((response) => {
  // console.log(response)
  for(var i = 0; i < response.length; i++){
    ratingHTML = `<tr> <td class="f-500 c-cyan">${response[i].username}</td> <td>${response[i].order_name}</td><td class="f-500 c-cyan">${response[i].rating}</td></tr>`
    $('#cusRatingTab').append(ratingHTML)
  }
});


$('#prodOverview').on('click', function(){
  $('#bubbleChart').show();
  $('#tableChart1').hide();
  $('#tableChart2').hide();
  $('.addMenuForm').hide();
  $('#custRating').hide();
});
$('#addProd').on('click', function(){
  $('#bubbleChart').hide();
  $('#tableChart1').hide();
  $('#tableChart2').hide();
  $('#custRating').hide();
  $('.addMenuForm').show();
});
$('#salesReport').on('click', function(){
  $('#bubbleChart').hide();
  $('#tableChart1').show();
  $('#tableChart2').show();
  $('.addMenuForm').hide();
  $('#custRating').hide();
});
$('#feedback').on('click', function(){
  $('#bubbleChart').hide();
  $('#tableChart1').hide();
  $('#tableChart2').hide();
  $('.addMenuForm').hide();
  $('#custRating').show();
});



});
