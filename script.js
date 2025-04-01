let locationButton = document.getElementById("get-location");
let locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", ()=>{
    //Geolocation APU is used to get geographical position of a user and is available inside the nagavation object 
    if(navigator.geolocation){
        //returns position(latitude and langitude) or error
        navigator.geolocation.getCurrentPosition(showLocation, checkError);
    }else{
        //for old browsers i.e IE
        locationDiv.innerText = "The browser dosen't support geolocation";
    }
} );

//Error checking
const checkError = (error) =>{
    switch(error.code){
        case error.PERMISSION_DENIED:
            locationDiv.innerText = "Please allow access to location";
            break;
        case error.POSITION_UNAVAILABLE:
                //usually fired for firefox
                locationDiv.innerText = "Location Information Unavailable";

        case error.TIMEOUT:
            locationDiv.innerText = "The request to get user location timed out";
    }
};

const showLocation = async (position) =>{
    //we use the Nominatim API for getting actual address from latitude and longitude 
    let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);

    
//store response object
let data = await response.json();
console.log();
console.log();
locationDiv.innerHTML = `${data.address.city}, ${data.address.country}`;



}
