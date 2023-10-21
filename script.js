(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ampm = "";

            if (h < 10) {
                h = "0" + h;
            }
            
            if (h > 12) {
                ampm = "PM";
                h = h-12;
                if (h < 10) {
                    h = "0" + h;
                }
            }
            else{
                ampm = "AM";
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            
            c.innerHTML = h + ":" + m + ":" + s + " " + ampm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";


    //Abifunktsioon
    const hasNumbers = (str) => {
        if (str.match(/\d+/g) !== null) {
          return true;
        } else {
          return false;
        }
      };     
    
    
    function estimateDelivery(event) {
        event.preventDefault();
        // Kus on hinnad?
        let hind = 50

        let firstName = document.getElementById("fname");
        let lastName = document.getElementById("lname");
        let linn = document.getElementById("linn");     
        
        let onKingitus = document.getElementById("v1").checked;
        let kontaktiVabaTarne = document.getElementById("v2").checked;


        let tarnijad = document.querySelectorAll('[name="tarnija"]');
        let radioButtonChecked = false;
        tarnijad.forEach(element => {
            if (element.checked == true){
                radioButtonChecked = true;
            }
        });



        if (firstName.value === '' || lastName.value === ''){
            alert("Palun täitke nimeväljad");
            firstName.focus();
            return;
        }
        else if (hasNumbers(firstName.value) || hasNumbers(firstName.value)){
            alert("Palun nimeväljadesse mitte numberid sisse pookida!!");
            firstName.focus();
            return;
        }
        else if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        } 
        else if (radioButtonChecked == false){
            alert("Palun valige tarnija");
            tarnijad[0].focus();
            return;
        }
        else {
            if (onKingitus == true)
                hind+=10
            if (kontaktiVabaTarne == true)
                hind+=20
            e.innerHTML = hind + " &euro;";
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let centerPointUT = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    let centerPointZoo = new Microsoft.Maps.Location(
        59.42170, 
        24.66513
    );
    
    let centerPoint = new Microsoft.Maps.Location(
        (58.38104 + 59.42170)/2, 
        (26.71992 +  24.66513)/2
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7.5,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin1 = new Microsoft.Maps.Pushpin(centerPointUT, {
            title: 'Tartu Ülikool'
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    let pushpin2 = new Microsoft.Maps.Pushpin(centerPointZoo, {
            title: 'Tallinna loomaaed'
            //subTitle: 'Heake koht',
            //text: 'Zoo'
        });

    const infoFunktsioon1 =  function(){
        var infobox = new Microsoft.Maps.Infobox( centerPointUT, {
            title: 'Delta hoone',
            description: 'See maja on delta õppehoone.'
        });
        infobox.setMap(map);

    }

    const infoFunktsioon2 =  function(){
        var infobox = new Microsoft.Maps.Infobox( centerPointZoo, {
            title: 'Tallinna loomaaed',
            description: 'Loomaaed asutati 1939ndal aastal.'
        });
        infobox.setMap(map);

    }

    Microsoft.Maps.Events.addHandler(pushpin1, 'click', infoFunktsioon1);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', infoFunktsioon2);



    map.entities.push(pushpin1);
    map.entities.push(pushpin2)

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

