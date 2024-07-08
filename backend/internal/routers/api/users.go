package api

import (
	"net/http"

	"github.com/Teasegasugoi/simple-task-manager/backend/internal/models"
	"github.com/gin-gonic/gin"
)

type GetUsersResponse struct {
	Users []models.User `json:"users"`
}

func (h *Handler) GetUsersHandler(c *gin.Context) {
	var users []models.User
	h.DB.Find(&users)
	c.JSON(http.StatusOK, GetUsersResponse{Users: users})
}

type CreateUserRequest struct {
	UserID string `json:"user_id" binding:"required"`
}

type CreateUserResponse struct {
	User models.User `json:"user"`
}

func (h *Handler) CreateUserHandler(c *gin.Context) {
	var req CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		UserID: req.UserID,
	}

	h.DB.Create(&user)
	c.JSON(http.StatusOK, CreateUserResponse{User: user})
}
