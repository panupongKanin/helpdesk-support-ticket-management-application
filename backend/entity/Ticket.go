package entity

import (
	"gorm.io/gorm"
)

type Ticket struct {
	gorm.Model

	Title       string `valid:"required~Please enter a Title"`
	Description string `valid:"required~Please enter a Description"`

	TicketInformationID *uint
	TicketInformation   TicketInformation `gorm:"foreignKey:TicketInformationID" valid:"-"`

	ContactInformationID *uint
	ContactInformation   ContactInformation `gorm:"foreignKey:ContactInformationID" valid:"-"`

	StatusID *uint
	Status   Status `gorm:"foreignKey:StatusID"`
}

type TicketInformation struct {
	gorm.Model
	EventDate       string  `valid:"required~Please enter a Event Date"`
	EventTime       string  `valid:"required~Please enter a Event Time"`
	Venue           string  `valid:"required~Please enter a Venue"`
	TicketPrice     float64 `valid:"float,required~Please enter a Ticket Price"`
	Sales           string  `valid:"required~Please enter a Sales"`
	Restrictions    string  `valid:"required~Please enter a Restrictions"`
	TermsConditions string  `valid:"required~Please enter a Terms Conditions"`

	Tickets []Ticket `gorm:"foreignKey:TicketInformationID"`
}

type ContactInformation struct {
	gorm.Model
	Email   string   `valid:"email~Invalid Format,required~Please enter a Email"`
	Phone   string   `valid:"required~Please enter a Phone Numner,numeric~Please enter a valid Phone Number"`
	Address string   `valid:"required~Please enter a Address"`
	Tickets []Ticket `gorm:"foreignKey:ContactInformationID"`
}

type Status struct {
	gorm.Model
	StatusName string   `valid:"-"`
	Tickets    []Ticket `gorm:"foreignKey:StatusID"`
}
