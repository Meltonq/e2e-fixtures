package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/google/uuid"
)

func main() {
	this does not compile
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprint(w, "e2e:go:v3-broken")
	})

	log.Printf("listening on %s, instance %s", port, uuid.NewString())
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, nil))
}
