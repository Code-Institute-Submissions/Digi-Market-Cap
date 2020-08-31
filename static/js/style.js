/*jshint esversion: 6 */
/*globals $:false */

$(window).on("load", function(){
    $(".preloader-wrapper").toggleClass("hidden");
});


$(document).ready(function () {
    // materialize inistialise form fuctions 
    $('.sidenav').sidenav();
    $('.datepicker').datepicker();
    $('select').formSelect();
    
    // datatable.net settings   
    $('#myCoinTable').DataTable({
        "dom":"ftip",
        "paging": false,
        "columnDefs": [{
            "targets":[0],
            "orderable": false
        }]         
    });

    $('#mybagTable').DataTable({
        "paging": false, 
        "searching": false,
        "columnDefs": [{
            "targets":[7,8,9],
            "orderable": false
        }]
    });

    // favourites functionality
    $('.fav_star').click(function(){
        $(this).toggleClass("yellow");
        $(this).closest('tr').toggleClass('favourite');
    });

    $('#is_favourite').click(function(){
        $('tr').each(function(){
            if ($(this).hasClass('favourite') == false ){
                $(this).toggleClass('hidden');
            }
        });    
        
    });    
    
    // Chartist.js function
    var myValues = [];
    
    var myVal = $('.pieChart_value');
    for (var vals of myVal)
        myValues.push(parseFloat(vals.textContent.slice(1)));


    var myLabels = [];
    
    var myLab = $('.assetName');
    for (var lab of myLab)
        myLabels.push(lab.textContent);

    var data = {
        series: myValues 
      };
      
    var sum = function(a, b) { return a + b };
      var Chartist = new Chartist.Pie('.ct-chart', data, {
        labelInterpolationFnc: function(value, idx) {
          let percentage = Math.round(value / data.series.reduce(sum) * 100) + '%';
          return myLabels[idx] +' '+ percentage;
        }, 
      });
});

