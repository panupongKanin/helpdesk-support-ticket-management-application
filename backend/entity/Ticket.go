package entity

import (
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"time"
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
	EventDate       string `valid:"required~Please enter a Event Date"`
	EventTime       string `valid:"required~Please enter a Event Time"`
	Venue           string `valid:"required~Please enter a Venue"`
	TicketPrice     float64 `valid:"float,required~Please enter a Ticket Price"`
	Sales           string `valid:"required~Please enter a Sales"`
	Restrictions    string `valid:"required~Please enter a Restrictions"`
	TermsConditions string `valid:"required~Please enter a TermsConditions"`

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

func init() {
	govalidator.CustomTypeTagMap.Set("CheckDateTime_ClaimTime", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-30*time.Minute)) || t.After(time.Now().Add(30*time.Minute)) {
			return false
		} else {
			return true
		}
	})
}
