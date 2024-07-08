package models

import "time"

type Task struct {
	ID          uint      `json:"id" gorm:"primarykey"`                           // ID
	UserID      string    `json:"user_id" gorm:"type:varchar(255);not null"`      // ユーザーID
	Title       string    `json:"title" gorm:"type:varchar(255);not null"`        // タスク名
	Description string    `json:"description" gorm:"type:text"`                   // タスクの説明
	Completed   bool      `json:"completed" gorm:"type:boolean;default:false"`    // 完了フラグ
	DueDate     time.Time `json:"due_date" gorm:"type:datetime;default:null"`     // 期限日: future work
	Priority    string    `json:"priority" gorm:"type:varchar(255);default:null"` // 優先度: future work
	CreatedAt   time.Time
	UpdatedAt   time.Time
	User        User `json:"user" gorm:"foreignKey:UserID;references:UserID"` // User
}
