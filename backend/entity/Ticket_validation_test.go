package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
	// "time"
)

func TestTitleNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ticket := Ticket{
		Title:       "", // ผิด -->เช็คตรงนี้
		Description: "Support ticket description",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ticket)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Title"))
}

func TestDescriptionNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ticket := Ticket{
		Title:       "Support Ticket Title",
		Description: "", // ผิด -->เช็คตรงนี้
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ticket)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Description"))
}
