

//A CONNECTION REQUEST GET TO THE BACKEND
const socket= io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const{latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
    },
    (error)=>{
        console.log(error);
    },{
        enableHighAccuracy:true,
        timeout:3000,
        maximumAge:0
    });
}

const map=L.map("map").setView([0,0],10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"sachin katiyar",
}).addTo(map)

const markers={};

socket.on("receive-location",(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude])
    if(markers[id]){
        markers[id].setLatLang([latitude,longitude]);
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
})