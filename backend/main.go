package main

import (
	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/helpdesk-support-ticket-management-application/controller"
	"github.com/panupongKanin/helpdesk-support-ticket-management-application/entity"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	
	r.POST("/CreateTicket", controller.CreateTicket)
	r.GET("/ListTickets", controller.ListTickets)
	r.GET("/GetTicket/:id", controller.GetTicket)
	r.PATCH("/updateTicket", controller.UpdateTicket)

	r.POST("/CreatTicketInformation", controller.CreatTicketInformation)
	r.GET("/ticketInformations", controller.ListTicketInformations)
	r.GET("/getLastTicketInformationID", controller.GetLastTicketInformationID)
	r.PATCH("/updateTicketInformation", controller.UpdateTicketInformation)

	r.POST("/CreatContactInformation", controller.CreatContactInformation)
	r.GET("/contactInformations", controller.ListContactInformations)
	r.GET("/getLastContactInformationID", controller.GetLastContactInformationID)
	r.PATCH("/updateContactInformation", controller.UpdateContactInformation)

	r.POST("/CreatStatus", controller.CreatStatus)
	r.GET("/statuses", controller.ListStatuses)
	r.GET("/status/:id", controller.GetStatus)

	// User Routes
	r.GET("/users", controller.ListUsers)
	r.GET("/user/:id", controller.GetUser)
	r.POST("/users", controller.CreateUser)
	r.PATCH("/users", controller.UpdateUser)
	r.DELETE("/users/:id", controller.DeleteUser)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,PATCH,DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
