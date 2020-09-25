//global variables
var allDate=[];
var date,statecode;

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
              allDate.push(isodate);
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
                        confirmed : nconfirmed,
                        recovered :nrecovered,
                        deceased :ndeceased
                    }
                    data.push(object)
                //reseting date back to original date
                ndate=new Date(date);
            }   
            console.log(data);
      var dataPoints1 = [],dataPoints2 = [],dataPoints3 = [];
      var options =  {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Covid Data"
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
          type: "spline", 
          dataPoints: dataPoints1
        },{
          type: "spline", 
          dataPoints: dataPoints2
        },{
          type: "spline", 
          dataPoints: dataPoints3
        }]
      };

      for (var i = 0; i < data.length; i++) {
		dataPoints1.push({
			x: new Date(allDate[i]),
			y: data[i]['confirmed']
		});
		dataPoints2.push({
			x: new Date(allDate[i]),
			y: data[i]['deceased']
		});
		dataPoints3.push({
			x: new Date(allDate[i]),
			y: data[i]['recovered']
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
$(document).ready( ()=>{
  console.log("ready");
  $("#today, #state").on('change',()=> {
    var $date = $('#today').val();
    var $state = $('#state').val();
    //call getData only if both state and date have been changed
    if($date!="" && $state!="DF")
      {
        getData($date,$state);
      }  
});
});
