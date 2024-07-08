package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Teasegasugoi/simple-task-manager/backend/internal/models"
	"github.com/Teasegasugoi/simple-task-manager/backend/internal/routers"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {

	// DB
	db, err := gorm.Open(sqlite.Open("tasks.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	err = db.AutoMigrate(&models.Task{}, &models.User{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Ginのモードを設定
	gin.SetMode(gin.DebugMode)

	// ルーターの設定
	routers := routers.SetupRouter(db)

	// サーバーの設定
	endPoint := fmt.Sprintf(":%d", 8080)
	server := &http.Server{
		Addr:    endPoint,
		Handler: routers,
	}

	log.Printf("Server is running on %s", endPoint)

	server.ListenAndServe()
}
