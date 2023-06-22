package controller
 
import (
	"github.com/panupongKanin/helpdesk-support-ticket-management-application/entity"
    "github.com/gin-gonic/gin"
    "net/http"
)


// POST /CreatStatus
func CreatStatus(c *gin.Context) {
	var createStatus entity.Status
	if err := c.ShouldBindJSON(&createStatus); err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}

	if err := entity.DB().Create(&createStatus).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": createStatus})
}



// GET /status/:id
func GetStatus(c *gin.Context) {
	var getStatus entity.Status
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = ?", id).Scan(&getStatus).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}

	c.JSON(http.StatusOK, gin.H{"data": getStatus})
}

// GET /statuses
func ListStatuses(c *gin.Context) {
	var listStatuses []entity.Status
	if err := entity.DB().Raw("SELECT * FROM statuses").Scan(&listStatuses).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}

	c.JSON(http.StatusOK, gin.H{"data": listStatuses})
}

// // DELETE /users/:id
// func DeleteTicketInformation(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM ticketInformations WHERE id = ?", id); tx.RowsAffected == 0 {
// 		   c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		   return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }


// // PATCH /users
// func UpdateTicketInformation(c *gin.Context) {
// 	var user entity.User
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		   return
// 	}

// 	if tx := entity.DB().Where("id = ?", user.ID).First(&user); tx.RowsAffected == 0 {
// 		   c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		   return
// 	}

// 	if err := entity.DB().Save(&user).Error; err != nil {
// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		   return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": user})
// }