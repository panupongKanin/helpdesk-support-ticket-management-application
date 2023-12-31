package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/helpdesk-support-ticket-management-application/entity"
	"net/http"
)

// POST /TicketInformation
func CreatTicketInformation(c *gin.Context) {
	var TicketInformation entity.TicketInformation

	// bind เข้าตัวแปร TicketInformation
	if err := c.ShouldBindJSON(&TicketInformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(TicketInformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// โยงข้อมูล
	ticketInformationData := entity.TicketInformation{
		EventDate:       TicketInformation.EventDate,
		EventTime:       TicketInformation.EventTime,
		Venue:           TicketInformation.Venue,
		TicketPrice:     TicketInformation.TicketPrice,
		Sales:           TicketInformation.Sales,
		Restrictions:    TicketInformation.Restrictions,
		TermsConditions: TicketInformation.TermsConditions,
	}

	// บันทึก
	if err := entity.DB().Create(&ticketInformationData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": TicketInformation})
}

// GET /ticketInformation/:id
func GetTicketInformation(c *gin.Context) {
	var user entity.User
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM ticketInformations WHERE id = ?", id).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /ticketInformations
func ListTicketInformations(c *gin.Context) {
	var ticketInformations []entity.TicketInformation
	if err := entity.DB().Raw("SELECT * FROM ticket_informations").Scan(&ticketInformations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ticketInformations})
}

// GET Last id /getLastTicketInformationID
func GetLastTicketInformationID(c *gin.Context) {
	var ticketInformations []entity.TicketInformation
	if err := entity.DB().Raw("SELECT * FROM ticket_informations WHERE id = (SELECT COUNT(*) AS row_count FROM ticket_informations)").Scan(&ticketInformations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ticketInformations})
}

// PATCH /updateTicketInformation
func UpdateTicketInformation(c *gin.Context) {
	var updateTicketInformation entity.TicketInformation
	if err := c.ShouldBindJSON(&updateTicketInformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(updateTicketInformation).Where("id = ?", updateTicketInformation.ID).Update("EventDate", updateTicketInformation.EventDate).Update("EventTime", updateTicketInformation.EventTime).Update("Venue", updateTicketInformation.Venue).Update("TicketPrice", updateTicketInformation.TicketPrice).Update("Sales", updateTicketInformation.Sales).Update("Restrictions", updateTicketInformation.Restrictions).Update("TermsConditions", updateTicketInformation.TermsConditions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(updateTicketInformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": updateTicketInformation})
}
