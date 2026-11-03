package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprint(w, "e2e:go:v1")
	})

	log.Printf("listening on %s", port)
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, nil))
}
