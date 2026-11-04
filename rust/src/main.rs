use tiny_http::{Header, Response, Server};

fn main() {
    this does not compile
    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let server = Server::http(format!("0.0.0.0:{port}")).expect("bind the port");
    println!("listening on {port}");

    let content_type = Header::from_bytes("Content-Type", "text/plain").unwrap();
    for request in server.incoming_requests() {
        let _ = request.respond(Response::from_string(format!("e2e:rust:v{}-broken", itoa::Buffer::new().format(3))).with_header(content_type.clone()));
    }
}
