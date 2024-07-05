const cors = require("cors");
const Express = require("express")().use(cors());
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
    cors: {
        origin: "http://localhost:5173", // Change this to your client's origin
        methods: ["GET", "POST"]
    }
});



var position = {
    x: 200,
    y: 200
}

Socketio.on("connection", socket => {
    socket.emit("position", position);
    socket.on("move", data => {
        switch (data) {
            case "left":
                position.x -= 10;
                break;
            case "right":
                position.x += 10;
                break;
            case "up":
                position.y -= 10;
                break;
            case "down":
                position.y += 10;
                break;
            default:
                break;
        }
        Socketio.emit("position", position)
    })
})

Http.listen(3210, () => {
    console.log("listening at 3210...");
})