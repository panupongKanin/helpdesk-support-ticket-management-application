package entity

import (
	"gorm.io/gorm"
)

type Ticket struct {
	gorm.Model

	Title       string
	Description string

	TicketInformationID *uint
	TicketInformation   TicketInformation `gorm:"foreignKey:TicketInformationID"`

	ContactInformationID *uint
	ContactInformation   ContactInformation `gorm:"foreignKey:ContactInformationID"`

	StatusID *uint
	Status   Status `gorm:"foreignKey:StatusID"`
}

type TicketInformation struct {
	gorm.Model
	EventDate       string 
	EventTime       string
	Venue           string
	TicketPrice     float64
	Sales           string
	Restrictions    string
	TermsConditions string

	Tickets []Ticket `gorm:"foreignKey:TicketInformationID"`
}

type ContactInformation struct {
	gorm.Model
	Email   string
	Phone   string
	Address string
	Tickets []Ticket `gorm:"foreignKey:ContactInformationID"`
}

type Status struct {
	gorm.Model
	StatusName string
	Tickets    []Ticket `gorm:"foreignKey:StatusID"`
}
