function sendMsg() {
    ws = new WebSocket('wss://echo-ws-service.herokuapp.com/');
    const chat = document.querySelector(".chat");
    ws.onopen = function (e) {
        text = document.querySelector(".text").value;
        chat.innerHTML = `${chat.innerHTML}<span class="right">${text}</span><p>`;
        ws.send(text);
        document.querySelector(".text").value = '';
    };
    ws.onmessage = function (event) {
        chat.innerHTML = `${chat.innerHTML}Ответ: ${event.data}<p>`;
    };
    ws.onerror = function (error) {
        console.log(`${error.message}`);
    };
}

function getGeoLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            //window.open(`http://www.openstreetmap.org/?mlat=${coords.latitude}&mlon=${coords.longitude}&zoom=12`);
            const html_out = `<a href="http://www.openstreetmap.org/?mlat=${coords.latitude}&mlon=${coords.longitude}&zoom=12" target="_blank">Geoposition</a>`
            ws = new WebSocket('wss://echo-ws-service.herokuapp.com/');
            const chat = document.querySelector(".chat");
            ws.onopen = function (e) {
                const text = document.querySelector(".text").value;
                chat.innerHTML = `${chat.innerHTML}<span class="right">${html_out}</span><p>`;
                ws.send(text);
            };
        });
    }
}