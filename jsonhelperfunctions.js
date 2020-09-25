//global variables



function getData(date,statecode){
    //converting string to date format to make subracting date easier
    var ndate=new Date(date);
    //fetch api to fetch json object from url
    return fetch('https://api.covid19india.org/v4/timeseries.json')
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
                        confirmed : nconfirmed,
                        recovered :nrecovered,
                        deceased :ndeceased
                    }
                    data.push(object)
                //reseting date back to original date
                ndate=new Date(date);
            }   
            return data;
            //console.log( data);
    }).catch(err => console.error(err));
}
