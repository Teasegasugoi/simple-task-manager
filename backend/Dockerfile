FROM golang:1.22-alpine3.20

ENV CGO_ENABLED=1

RUN apk add --no-cache \
    gcc \
    musl-dev

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o /usr/local/bin/app ./cmd/...

EXPOSE 8080

CMD ["app"]
