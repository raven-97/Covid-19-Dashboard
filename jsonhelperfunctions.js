//global variables
var allDate=[];
var date,statecode,statecode2;
var f = 0;
function getData(date,statecode){
    //converting string to date format to make subracting date easier
    var ndate=new Date(date);
    //fetch api to fetch json object from url
    fetch('https://api.covid19india.org/v4/timeseries.json')
        .then(res => res.json())
        .then((out) => {
            var data=[],isodate,nconfirmed,nrecovered,ndeceased;
            for(let i=7;i>0;i--){
                //subtracting date
                ndate.setDate(ndate.getDate() - i);
              
                //converting date back to iso format
                year = ndate.getFullYear();
                month = ndate.getMonth()+1;
                dt = ndate.getDate();
                //for single digits
                if (dt < 10) {
                    dt = '0' + dt;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                isodate=year+'-' + month + '-'+dt;
                //if data is not present
                if(out[statecode].dates[isodate].delta==undefined){
                    nconfirmed=nrecovered=ndeceased=0;
                }
                else{
                    nconfirmed=out[statecode].dates[isodate].delta.confirmed;
                    nrecovered=out[statecode].dates[isodate].delta.recovered;
                    ndeceased=out[statecode].dates[isodate].delta.deceased;
                    if(nconfirmed==undefined)
                        nconfirmed=0;
                    if(nrecovered==undefined)
                        nrecovered=0;
                    if(ndeceased==undefined)
                        ndeceased=0;
                }
                object={
                        allDate : isodate,
                        confirmed : nconfirmed,
                        recovered :nrecovered,
                        deceased :ndeceased
                    }
                    data.push(object)
                //reseting date back to original date
                ndate=new Date(date);
            }   

      var dataPoints1 = [],dataPoints2 = [],dataPoints3 = [];
      var options =  {
        animationEnabled: true,
        theme: "light2",
        title: {

          text: "Covid Data : "+$('#state option:selected').text()

        },
        axisX: {
			title: "Days",
          valueFormatString: "DD MMM YY",
		  titleFontSize: 24
        },
        axisY: {
          title: "Count",
          titleFontSize: 24
        },
        data: [{

           name: "Confirmed",
          type: "spline",
          showInLegend: true,
          dataPoints: dataPoints1
        },{
          type: "spline", 
           name: "Recovered",
          showInLegend: true,
          dataPoints: dataPoints2
        },{
          type: "spline", 
           name: "Deceased",
          showInLegend: true,

          dataPoints: dataPoints3
        }]
      };

      for (var i = 0; i < data.length; i++) {
		dataPoints1.push({
			x: new Date(data[i]['allDate']),
			y: data[i]['confirmed']
		});
		dataPoints2.push({
			x: new Date(data[i]['allDate']),
			y: data[i]['recovered']
		});
		dataPoints3.push({
			x: new Date(data[i]['allDate']),
			y: data[i]['deceased']
		});
        
	}
      try
        {
          $('#chartContainer').CanvasJSChart(options);
        }
      catch(e)
        {
          console.log(e.name,e.message );
        }
        
    
          }).catch(err => console.error(err));

}
function getDataComp(date,statecode,statecode2,ch){
  //converting string to date format to make subracting date easier
  var ndate=new Date(date);
  //fetch api to fetch json object from url
  fetch('https://api.covid19india.org/v4/timeseries.json')
      .then(res => res.json())
      .then((out) => {
          var data=[],isodate,nconfirmed,nrecovered,ndeceased;
          var data2=[],isodate2,nconfirmed2,nrecovered2,ndeceased2;
          for(let i=7;i>0;i--){
              //subtracting date
              ndate.setDate(ndate.getDate() - i);
            
              //converting date back to iso format
              year = ndate.getFullYear();
              month = ndate.getMonth()+1;
              dt = ndate.getDate();
              //for single digits
              if (dt < 10) {
                  dt = '0' + dt;
              }
              if (month < 10) {
                  month = '0' + month;
              }
              isodate=year+'-' + month + '-'+dt;
              //if data is not present
              if(out[statecode].dates[isodate].delta==undefined){
                  nconfirmed=nrecovered=ndeceased=0;
              }
              else{
                nconfirmed=out[statecode].dates[isodate].delta.confirmed;
                nrecovered=out[statecode].dates[isodate].delta.recovered;
                ndeceased=out[statecode].dates[isodate].delta.deceased;

                if(nconfirmed==undefined)
                    nconfirmed=0;
                if(nrecovered==undefined)
                    nrecovered=0;
                if(ndeceased==undefined)
                    ndeceased=0;
            } 
            object={
              allDate : isodate,
              confirmed : nconfirmed,
              recovered :nrecovered,
              deceased :ndeceased
          }
          data.push(object)                         
              if(out[statecode2].dates[isodate].delta==undefined)
              {
                nconfirmed2=nrecovered2=ndeceased2=0;
              }
              else
              {
                nconfirmed2=out[statecode2].dates[isodate].delta.confirmed;
                nrecovered2=out[statecode2].dates[isodate].delta.recovered;
                ndeceased2=out[statecode2].dates[isodate].delta.deceased;

                if(nconfirmed2==undefined)
                    nconfirmed2=0;
                if(nrecovered2==undefined)
                    nrecovered2=0;
                if(ndeceased2==undefined)
                    ndeceased2=0;
              }
              object2={
                allDate : isodate,
                confirmed : nconfirmed2,
                recovered :nrecovered2,
                deceased :ndeceased2
            }
            data2.push(object2)              


              //reseting date back to original date
              ndate=new Date(date);
          }   

    var dataPoints1 = [],dataPoints2 = [];
    var options =  {
      animationEnabled: true,
      theme: "light2",
      title: {

        text: "Covid Data : Comparion "+$('#state option:selected').text()+" , "+$('#state2 option:selected').text()

      },
      axisX: {
    title: "Days",
        valueFormatString: "DD MMM YY",
    titleFontSize: 24
      },
      axisY: {
        title: "Count",
        titleFontSize: 24
      },
      data: [{

         name: $('#state option:selected').text(),
        type: "spline",
        showInLegend: true,
        dataPoints: dataPoints1
      },{
        type: "spline", 
         name: $('#state2 option:selected').text(),
        showInLegend: true,
        dataPoints: dataPoints2
      }]
    };

    for (var i = 0; i < data.length; i++) {
  dataPoints1.push({
    x: new Date(data[i]['allDate']),
    y: data[i][ch]
  });
  dataPoints2.push({
    x: new Date(data[i]['allDate']),
    y: data2[i][ch]
  });

}
    try
      {
        $('#chartContainer').CanvasJSChart(options);
      }
    catch(e)
      {
        console.log(e.name,e.message );
      }
      
  
        }).catch(err => console.error(err));

}
function getTable(date,statecode){
  var x, y ,z;
  var ndate = new Date(date);
  ndate.setDate(ndate.getDate() - 1);
  var pdate = ndate.toISOString().slice(0,10);
  var urlt='https://api.covid19india.org/v4/data-' + date + '.json';
  var urlp='https://api.covid19india.org/v4/data-' + pdate + '.json';
  var data=[],nconfirmed,nrecovered,ntested,confirmed,recovered,tested,deceased;
    //fetch api to fetch json object from url
  return fetch(urlp)
        .then(rest => rest.json())
        .then((outp) => {
                    nconfirmed=outp[statecode].total.confirmed;
                    nrecovered=outp[statecode].total.recovered;
                    ntested=outp[statecode].total.tested;
                    if(nconfirmed==undefined)
                        nconfirmed=0;
                    if(nrecovered==undefined)
                        nrecovered=0;
                    if(ntested==undefined)
                        ntested=0;
                    x=nconfirmed;
                    y=nrecovered;
                    z=ntested;   

                    fetch(urlt)
                    .then(res => res.json())
                    .then((out) => {
                      nconfirmed=out[statecode].total.confirmed;
                      nrecovered=out[statecode].total.recovered;
                      ntested=out[statecode].total.tested;
                      confirmed=out[statecode].total.confirmed;
                      recovered=out[statecode].total.recovered;
                      tested=out[statecode].total.tested;
                      deceased=out[statecode].total.deceased;
                      if(nconfirmed==undefined)
                        nconfirmed=0;
                      if(nrecovered==undefined)
                        nrecovered=0;
                      if(ntested==undefined)
                        ntested=0;
                      if(confirmed==undefined)
                        confirmed=0;
                      if(recovered==undefined)
                        recovered=0;
                      if(tested==undefined)
                        tested=0;
                      if(deceased==undefined)
                        deceased=0;
                      object={
                        nconfirm : nconfirmed-x,
                        nrecover : nrecovered-y,
                        ntest : ntested-z,
                        confirm : confirmed,
                        recover : recovered,
                        test : tested,
                        deceas : deceased
                    }
                    data.push(object);
					var parts = date.split('-');
					var newdate = parts[2]+'-'+parts[1]+'-'+(parseInt(parts[0], 10)%100);					
					
					var v1="<th colspan='7' class='tableheader'>Data for "+$('#state option:selected').text()+" on "+newdate+"</th></tr>";
					var v2="<th>State</th><th>New confirmed</th><th>New recovered</th><th>New tested</th><th>Confirmed</th><th>Deceased</th><th>Recovered</th><th>Tested</th></tr>";
					var tr="<tr>";
			    var td1="<td>"+$('#state option:selected').text()+"</td>"
					var td2="<td>"+data[0].nconfirm+"</td>";
					var td3="<td>"+data[0].nrecover+"</td>";
					var td4="<td>"+data[0].ntest+"</td>";
					var td5="<td>"+data[0].confirm+"</td>";
					var td6="<td>"+data[0].deceas+"</td>";
					var td7="<td>"+data[0].recover+"</td>";
					var td8="<td>"+data[0].test+"</td></tr>";
					
					$("#mytable").append(tr+v2+tr+td1+td2+td3+td4+td5+td6+td7+td8); 
          
          
					
                    //console.log( data);
            
                }).catch(err => console.error(err));
            
            //console.log( data);
    }).catch(err => console.error(err));
}
function getTable2(date,statecode){
  console.log(statecode);
  var x, y ,z;
  var ndate = new Date(date);
  ndate.setDate(ndate.getDate() - 1);
  var pdate = ndate.toISOString().slice(0,10);
  var urlt='https://api.covid19india.org/v4/data-' + date + '.json';
  var urlp='https://api.covid19india.org/v4/data-' + pdate + '.json';
  var data=[],nconfirmed,nrecovered,ntested,confirmed,recovered,tested,deceased;
    //fetch api to fetch json object from url
  return fetch(urlp)
        .then(rest => rest.json())
        .then((outp) => {
                    nconfirmed=outp[statecode].total.confirmed;
                    nrecovered=outp[statecode].total.recovered;
                    ntested=outp[statecode].total.tested;
                    if(nconfirmed==undefined)
                        nconfirmed=0;
                    if(nrecovered==undefined)
                        nrecovered=0;
                    if(ntested==undefined)
                        ntested=0;
                    x=nconfirmed;
                    y=nrecovered;
                    z=ntested;   

                    fetch(urlt)
                    .then(res => res.json())
                    .then((out) => {
                      nconfirmed=out[statecode].total.confirmed;
                      nrecovered=out[statecode].total.recovered;
                      ntested=out[statecode].total.tested;
                      confirmed=out[statecode].total.confirmed;
                      recovered=out[statecode].total.recovered;
                      tested=out[statecode].total.tested;
                      deceased=out[statecode].total.deceased;
                      if(nconfirmed==undefined)
                        nconfirmed=0;
                      if(nrecovered==undefined)
                        nrecovered=0;
                      if(ntested==undefined)
                        ntested=0;
                      if(confirmed==undefined)
                        confirmed=0;
                      if(recovered==undefined)
                        recovered=0;
                      if(tested==undefined)
                        tested=0;
                      if(deceased==undefined)
                        deceased=0;
                      object={
                        nconfirm : nconfirmed-x,
                        nrecover : nrecovered-y,
                        ntest : ntested-z,
                        confirm : confirmed,
                        recover : recovered,
                        test : tested,
                        deceas : deceased
                    }
                    data.push(object);
          var parts = date.split('-');
          var newdate = parts[2]+'-'+parts[1]+'-'+(parseInt(parts[0], 10)%100);         
          var tr="<tr>";
          var td1="<td>"+$('#state2 option:selected').text()+"</td>"
          var td2="<td>"+data[0].nconfirm+"</td>";
          var td3="<td>"+data[0].nrecover+"</td>";
          var td4="<td>"+data[0].ntest+"</td>";
          var td5="<td>"+data[0].confirm+"</td>";
          var td6="<td>"+data[0].deceas+"</td>";
          var td7="<td>"+data[0].recover+"</td>";
          var td8="<td>"+data[0].test+"</td></tr>";
          
          $("#mytable").append(tr + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8); 

          
                    //console.log( data);
            
                }).catch(err => console.error(err));
            
            //console.log( data);
    }).catch(err => console.error(err));
}

$(document).ready( ()=>{
  console.log("ready");


  $(".compareContainer").hide();
  $("#comparebt").click(function(){
    value = $("#comparebt").attr("value");
    if(value=="Hide DIV"){
      $(".compareContainer").show();
      $("#comparebt").attr("value", "Show DIV");
      f = 1;
    }
    else {
    $(".compareContainer").hide();
     f= 0;
     $("#comparebt").attr("value", "Hide DIV");
    }
    



});
$('#today').on('change',()=>{
    var $date = $('#today').val();
    if (new Date($date)>new Date())
      {
        $("table, #chartContainer").hide();
        $("#err").text("Invalid Date");
        $("#err").show();
      }
      
   else{
     $("table, #chartContainer").show();
     $("#err").hide();

   }
     
   
 });
 
 $("#today, #state,#state2, #radiobutton").on('change',async ()=> {
    var $date = $('#today').val();
    var $state = $('#state').val();
    
    //call getData only if both state and date have been changed
    if(f==0){
    if($date!="" && $state!="DF")
      {
        $("#mytable").empty();
        getData($date,$state);
        getTable($date,$state);
      }
    }
    else{
        var selection = $("#radiobutton input[type='radio']:checked").val();
        var $state2 = $('#state2').val();
        var $date = $('#today').val();
        var $state = $('#state').val();
        if (selection == undefined || $state2 == "DF") {
          //print selection error message
        }
        else {
          getDataComp($date, $state, $state2, selection);
          $("#mytable").empty();
          await getTable($date,$state);
          getTable2($date,$state2);


        }
    }

  });
 
 

});


