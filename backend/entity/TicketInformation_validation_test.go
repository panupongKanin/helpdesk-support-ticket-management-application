package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
	// "time"
)

func TestEventDateNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ticketInformation := TicketInformation{
		EventDate:       "", // ผิด -->เช็คตรงนี้
		EventTime:       "20:00",
		Venue:           "Ticket Venue",
		TicketPrice:     9.99,
		Sales:           "Ticket Sales Information",
		Restrictions:    "Ticket Restrictions",
		TermsConditions: "Ticket Terms and Conditions",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ticketInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Event Date"))
}

func TestEventTimeNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ticketInformation := TicketInformation{
		EventDate:       "2023-06-23",
		EventTime:       "", // ผิด -->เช็คตรงนี้
		Venue:           "Ticket Venue",
		TicketPrice:     9.99,
		Sales:           "Ticket Sales Information",
		Restrictions:    "Ticket Restrictions",
		TermsConditions: "Ticket Terms and Conditions",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ticketInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Event Time"))
}

func TestVenueNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ticketInformation := TicketInformation{
		EventDate:       "2023-06-23",
		EventTime:       "20:00",
		Venue:           "", // ผิด -->เช็คตรงนี้
		TicketPrice:     9.99,
		Sales:           "Ticket Sales Information",
		Restrictions:    "Ticket Restrictions",
		TermsConditions: "Ticket Terms and Conditions",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ticketInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Venue"))
}

func TestTicketPriceNotZero(t *testing.T) {
	g := NewGomegaWithT(t)

	ticketInformation := TicketInformation{
		EventDate:       "2023-06-23",
		EventTime:       "20:00",
		Venue:           "Ticket Venue",
		TicketPrice:     0, // ผิด -->เช็คตรงนี้
		Sales:           "Ticket Sales Information",
		Restrictions:    "Ticket Restrictions",
		TermsConditions: "Ticket Terms and Conditions",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ticketInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Ticket Price"))
}


func TestSalesNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ticketInformation := TicketInformation{
		EventDate:       "2023-06-23",
		EventTime:       "20:00",
		Venue:           "Ticket Venue",
		TicketPrice:     9.99, 
		Sales:           "", // ผิด -->เช็คตรงนี้
		Restrictions:    "Ticket Restrictions",
		TermsConditions: "Ticket Terms and Conditions",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ticketInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Sales"))
}

func TestRestrictionsNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ticketInformation := TicketInformation{
		EventDate:       "2023-06-23",
		EventTime:       "20:00",
		Venue:           "Ticket Venue",
		TicketPrice:     9.99, 
		Sales:           "Ticket Sales Information", 
		Restrictions:    "", // ผิด -->เช็คตรงนี้
		TermsConditions: "Ticket Terms and Conditions",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ticketInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Restrictions"))
}

func TestTermsConditionsNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ticketInformation := TicketInformation{
		EventDate:       "2023-06-23",
		EventTime:       "20:00",
		Venue:           "Ticket Venue",
		TicketPrice:     9.99, 
		Sales:           "Ticket Sales Information", 
		Restrictions:    "Ticket Restrictions", 
		TermsConditions: "", // ผิด -->เช็คตรงนี้
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ticketInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Terms Conditions"))
}