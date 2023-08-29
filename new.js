function openRegister() {
    card.style.transform = "rotateY(-180deg)";
  }

  function calculate(){
    let totalRoute = document.getElementById('kilo').value;
    parseInt(totalRoute)
 let RateReason = document.getElementById('price');
    // RateReason.innerHTML = "Rs. 5/km for the first 10km, Rs2/km for the next 20, and Rs1/km after that";
    // let kmFare = 1;
    let totalFare;
    if(totalRoute <=10){
      totalFare = totalRoute*5;
    }
     else if((totalRoute > 10 && totalRoute <= 20)){
      totalFare = (totalRoute - 10) * 2 + 10 * 5;
    }
    else if (totalRoute >20){
      totalFare = (totalRoute - 20) + 10 * 2 + 10 * 5;
    }
    
    let display = document.getElementById('display').innerHTML = `${totalFare} ₹<br>`
     document.getElementById('price-details').innerHTML = `Rs. 5 per/km for first 10KM, Rs. 2 per/km for first 20KM and Rs. 1 per/km after that.`
  
  }

  $(document).ready(function () {
    $("#calculate_button").click(function () {
      calculate();
    });

    // Load Google Maps API asynchronously
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD51OcSUK4f64fv3yoiVhaMECtf1L6gItU&libraries=places&language=en&callback=initMap";
    document.body.appendChild(script);
  });

  // Initialize the map and autocomplete
  function initMap() {
    var from_places = new google.maps.places.Autocomplete(
      document.getElementById("from_places")
    );
    var to_places = new google.maps.places.Autocomplete(
      document.getElementById("to_places")
    );
  
    google.maps.event.addListener(from_places, "place_changed", function () {
      var from_place = from_places.getPlace();
      var from_address = from_place.formatted_address;
      $("#origin").val(from_address);
    });
  
    google.maps.event.addListener(to_places, "place_changed", function () {
      var to_place = to_places.getPlace();
      var to_address = to_place.formatted_address;
      $("#destination").val(to_address);
    });
}
  // Calculate distance and display results
  function calculateDistance() {
    var origin = $("#origin").val();
    var destination = $("#destination").val();
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false,
      },
      callback
    );
  }

  // Handle distance results
  function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      $("#result").html(err);
    } else {
      var origin = response.originAddresses[0];
      console.log(origin);
      var destination = response.destinationAddresses[0];
      console.log(destination);
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        $("#kilo").html(
          "Get Flight");
      } else {
        var distance = response.rows[0].elements[0].distance;
        console.log(distance);
        var duration = response.rows[0].elements[0].duration;
        console.log(duration);
        console.log(response.rows[0].elements[0].distance);
        var distance_in_kilo = distance.value / 1000; // the kilom
        var distance_in_mile = distance.value / 1609.34; // the mile
        console.log(distance_in_kilo);
        console.log(distance_in_mile);
        $("#kilo").html(
          `${distance_in_kilo.toFixed(2)}`
          // Distance in Kilometre: 
        );
      }
    }
  }

  $("#distance_form").submit(function (e) {
    e.preventDefault();
    calculateDistance();
  });