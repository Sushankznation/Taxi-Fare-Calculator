 //For Flip
 function openRegister() {
    card.style.transform = "rotateY(-180deg)";
  }
  //For Calculate Fare
  function calculate(){
    let price = document.getElementById('price');
    let totalRoute = document.getElementById('from').value;
    parseInt(totalRoute)
    let display = document.getElementById('display');
    let RateReason = document.getElementById('price');
    RateReason.innerHTML = "Rs. 5/km for the first 10km, Rs2/km for the next 20, and Rs1/km after that";
    let kmFare = 1;
    if(totalRoute <=0)
    return;
    else if(totalRoute <=10){
      kmFare = 5;
    }
    else if(totalRoute <=20){
      kmFare = 2;
    }
    else{
      kmFare = 1;
    }
    let totalFare = (totalRoute*kmFare);
    display.innerHTML =totalFare +" Rs.";
  }
  // to fetch Google Map
   let input;
      function onOpenHandler(){
         input = window.open('https://www.google.com/maps/dir//Chandigarh,+Punjab/@30.5390636,75.9200133,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x391069a660696aef:0x3bc789e57615106b!2m2!1d75.9550329!2d30.5389944','_blank','width=800px,height=400px,left=100px,top=100px');
      }