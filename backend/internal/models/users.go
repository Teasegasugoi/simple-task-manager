package models

type User struct {
	UserID string `json:"user_id" gorm:"primaryKey;type:varchar(255)"` // UserID
}
