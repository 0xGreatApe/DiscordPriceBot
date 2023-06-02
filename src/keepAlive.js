import http from "http";

export default function keepAlive() {
  http
    .createServer(function (req, res) {
      res.write("I'm alive");
      res.end();
    })
    .listen(process.env.PORT || 8080);
}
