package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/helpdesk-support-ticket-management-application/entity"
	"net/http"
)

// Main Table Ticket

func CreateTicket(c *gin.Context) {
	var TicketInformation entity.TicketInformation
	var ContactInformation entity.ContactInformation
	var Status entity.Status
	var Ticket entity.Ticket

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร Ticket
	if err := c.ShouldBindJSON(&Ticket); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา TicketInformation  ด้วย id
	if tx := entity.DB().Where("id = ?", Ticket.TicketInformationID).First(&TicketInformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ticket Information System  not found"})
		return
	}

	// 11: ค้นหา ContactInformation  ด้วย id
	if tx := entity.DB().Where("id = ?", Ticket.ContactInformationID).First(&ContactInformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Contact Information System  not found"})
		return
	}

	// 12: ค้นหา Status ด้วย id
	if tx := entity.DB().Where("id = ?", Ticket.StatusID).First(&Status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(Ticket); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: โยงข้อมูล
	ticketData := entity.Ticket{
		TicketInformationID:  Ticket.TicketInformationID,
		ContactInformationID: Ticket.ContactInformationID,
		StatusID:             Ticket.StatusID,
		Title:                Ticket.Title,
		Description:          Ticket.Description,
	}

	// 18: บันทึก
	if err := entity.DB().Create(&ticketData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Ticket})
}

// GET /GetTicket/:id
func GetTicket(c *gin.Context) {
	var getTicket entity.Ticket
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM tickets WHERE id = ?", id).Preload("TicketInformation").Preload("ContactInformation").Preload("Status").Find(&getTicket).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": getTicket})
}

// GET /ListTickets
func ListTickets(c *gin.Context) {
	var listTickets []entity.Ticket
	if err := entity.DB().Preload("TicketInformation").Preload("ContactInformation").Preload("Status").Find(&listTickets).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": listTickets})
}

// PATCH /updateTicket
func UpdateTicket(c *gin.Context) {
	var TicketInformation entity.TicketInformation
	var ContactInformation entity.ContactInformation
	var Status entity.Status
	var Ticket entity.Ticket

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร Ticket
	if err := c.ShouldBindJSON(&Ticket); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา TicketInformation  ด้วย id
	if tx := entity.DB().Where("id = ?", Ticket.TicketInformationID).First(&TicketInformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ticket Information System  not found"})
		return
	}

	// 11: ค้นหา ContactInformation  ด้วย id
	if tx := entity.DB().Where("id = ?", Ticket.ContactInformationID).First(&ContactInformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Contact Information System  not found"})
		return
	}

	// 12: ค้นหา Status ด้วย id
	if tx := entity.DB().Where("id = ?", Ticket.StatusID).First(&Status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}
	
	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(Ticket); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: โยงข้อมูล
	ticketData := entity.Ticket{
		TicketInformationID:  Ticket.TicketInformationID,
		ContactInformationID: Ticket.ContactInformationID,
		StatusID:             Ticket.StatusID,
		Title:                Ticket.Title,
		Description:          Ticket.Description,
	}

	if err := entity.DB().Model(ticketData).Where("id = ?", Ticket.ID).Updates(&ticketData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Ticket})
}
