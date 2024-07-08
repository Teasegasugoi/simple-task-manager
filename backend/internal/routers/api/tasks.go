package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/Teasegasugoi/simple-task-manager/backend/internal/models"
)

type GetTasksResponse struct {
	Tasks []models.Task `json:"tasks"`
}

func (h *Handler) GetTasksHandler(c *gin.Context) {
	userID := c.Query("user_id")
	var tasks []models.Task
	h.DB.Where("user_id = ?", userID).Find(&tasks)
	c.JSON(http.StatusOK, GetTasksResponse{Tasks: tasks})
}

type CreateTaskRequest struct {
	UserID      string     `json:"user_id" binding:"required"`
	Title       string     `json:"title" binding:"required"`
	Description string     `json:"description"`
	DueDate     *time.Time `json:"due_date"`
}

type CreateTaskResponse struct {
	Task models.Task `json:"task"`
}

func (h *Handler) CreateTaskHandler(c *gin.Context) {
	var req CreateTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task := models.Task{
		UserID:      req.UserID,
		Title:       req.Title,
		Description: req.Description,
	}

	if req.DueDate != nil {
		// リクエストから受け取った日付を日本時間に変換
		loc, _ := time.LoadLocation("Asia/Tokyo")
		task.DueDate = req.DueDate.In(loc)
	}

	h.DB.Create(&task)
	c.JSON(http.StatusOK, CreateTaskResponse{Task: task})
}

type UpdateTaskRequest struct {
	Title       string     `json:"title"`
	Description string     `json:"description"`
	Completed   bool       `json:"completed"`
	DueDate     *time.Time `json:"due_date"`
}

type UpdateTaskResponse struct {
	Task models.Task `json:"task"`
}

func (h *Handler) UpdateTaskHandler(c *gin.Context) {
	taskID := c.Param("task_id")

	var req UpdateTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var task models.Task
	// タスクが存在するかどうかを確認
	if err := h.DB.First(&task, "id = ?", taskID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	// タスクを更新
	task.Title = req.Title
	task.Description = req.Description
	task.Completed = req.Completed
	if req.DueDate != nil {
		// リクエストから受け取った日付を日本時間に変換
		loc, _ := time.LoadLocation("Asia/Tokyo")
		task.DueDate = req.DueDate.In(loc)
	}

	h.DB.Save(&task)
	c.JSON(http.StatusOK, UpdateTaskResponse{Task: task})
}

func (h *Handler) DeleteTaskHandler(c *gin.Context) {
	taskID := c.Param("task_id")

	var task models.Task
	if err := h.DB.Where("id = ?", taskID).Delete(&task).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
