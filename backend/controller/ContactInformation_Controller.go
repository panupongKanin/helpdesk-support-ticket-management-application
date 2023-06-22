package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/helpdesk-support-ticket-management-application/entity"
	"net/http"
)

// POST /CreatContactInformation
func CreatContactInformation(c *gin.Context) {
	var ContactInformation entity.ContactInformation

	// bind เข้าตัวแปร TicketInformation
	if err := c.ShouldBindJSON(&ContactInformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(ContactInformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// โยงข้อมูล
	contactInformationData := entity.ContactInformation{
		Email:   ContactInformation.Email,
		Phone:   ContactInformation.Phone,
		Address: ContactInformation.Address,
	}

	// บันทึก
	if err := entity.DB().Create(&contactInformationData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ContactInformation})
}

// GET /contactInformation/:id
func GetContactInformation(c *gin.Context) {
	var getContactInformation entity.ContactInformation
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM contact_informations WHERE id = ?", id).Scan(&getContactInformation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": getContactInformation})
}

// GET /contactInformations
func ListContactInformations(c *gin.Context) {
	var listContactInformations []entity.ContactInformation
	if err := entity.DB().Raw("SELECT * FROM contact_informations").Scan(&listContactInformations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": listContactInformations})
}

// GET Last id /getLastContactInformationID
func GetLastContactInformationID(c *gin.Context) {
	var contactInformation []entity.ContactInformation
	if err := entity.DB().Raw("SELECT * FROM contact_informations WHERE id = (SELECT COUNT(*) AS row_count FROM contact_informations)").Scan(&contactInformation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": contactInformation})
}

// PATCH /updateContactInformation
func UpdateContactInformation(c *gin.Context) {
	var updateContactInformation entity.ContactInformation
	if err := c.ShouldBindJSON(&updateContactInformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(updateContactInformation).Where("id = ?", updateContactInformation.ID).Update("Email", updateContactInformation.Email).Update("Phone", updateContactInformation.Phone).Update("Address", updateContactInformation.Address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(updateContactInformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": updateContactInformation})
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
