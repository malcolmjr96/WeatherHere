 try{// making a map and tiles
 const checkinmap = L.map('checkinmap').setView([0, 0], 1);
 const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap.org</a> contributors.';
 const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
 const tiles = L.tileLayer(tileUrl, { attribution });
 tiles.addTo(checkinmap);

getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    
    for (item of data) {
        console.log(item.air);

        const marker = L.marker([item.lat, item.lon]).addTo(checkinmap);
        let txt = `The weather here in ${item.weather.name}, ${item.weather.sys.country} is currently ${item.weather.weather[0].description}. And the temperature is ${item.weather.main.temp} &deg;C based on your coordinates: ${item.lon}, ${item.lat}.`;

        if (item.air.value < 0){
        txt += ' No air quality reading.'
        } else {
            txt +=  `The concentration of particulate matter (${item.air[0].measurements[0].parameter}) is ${item.air[0].measurements[0].value} ${item.air[0].measurements[0].unit} last read on ${item.air[0].measurements[0].lastUpdated}.`;
        }

        marker.bindPopup(txt);
    }
    console.log(data);
}
 }catch(err){
    console.log(err);
 };