package routers

import (
	"github.com/Teasegasugoi/simple-task-manager/backend/internal/routers/api"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.New()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	// CORSの設定
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	// ハンドラーの初期化
	h := api.NewHandler(db)

	root := r.Group("/api")
	{
		tasks := root.Group("/tasks")
		{
			tasks.GET("", h.GetTasksHandler)
			tasks.POST("", h.CreateTaskHandler)
			tasks.PUT("/:task_id", h.UpdateTaskHandler)
			tasks.DELETE("/:task_id", h.DeleteTaskHandler)
		}

		users := root.Group("/users")
		{
			users.GET("", h.GetUsersHandler)
			users.POST("", h.CreateUserHandler)
		}
	}

	return r
}
