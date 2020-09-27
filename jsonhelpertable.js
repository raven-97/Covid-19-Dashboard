function getTable(date,statecode){
  var x, y ,z;
  var ndate = new Date(date);
  ndate.setDate(ndate.getDate() - 1);
  var pdate = ndate.toISOString().slice(0,10);
  var urlt='https://api.covid19india.org/v4/data-' + date + '.json';
  var urlp='https://api.covid19india.org/v4/data-' + pdate + '.json';
  var data, nconfirmed,nrecovered,ntested,confirmed,recovered,tested,deceased;
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

                    return fetch(urlt)
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
                      data={
                        nconfirm : nconfirmed-x,
                        nrecover : nrecovered-y,
                        ntest : ntested-z,
                        confirm : confirmed,
                        recover : recovered,
                        test : tested,
                        deceas : deceased
                    } 
                    return data;
            //console.log( data);
                }).catch(err => console.error(err));
    }).catch(err => console.error(err));
}
 getTable('2020-09-02','AN').then(function(result) {
  console.log(result);
});
