package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("my-ticket-app.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&User{},
		&Ticket{},
		&TicketInformation{},
		&ContactInformation{},
		&Status{},
	)

	db = database

	// ticket := TicketInformation{
	// 	EventDate:       "10th January 2023",
	// 	EventTime:       "6:00 PM",
	// 	Venue:           "Olympic Stadium",
	// 	TicketPrice:     99.99,
	// 	Sales:           "Online ticketing website",
	// 	Restrictions:    "Age limit: 18+",
	// 	TermsConditions: "No refunds or exchanges",
	// }
	// db.Model(&TicketInformation{}).Create(&ticket)
}
