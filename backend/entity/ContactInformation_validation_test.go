package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
	// "time"
)

func TestEmailNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	contactInformation := ContactInformation{
		Email:   "", // ผิด -->เช็คตรงนี้
		Phone:   "11234567890",
		Address: "Contact Address",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(contactInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Email"))
}

func TestIsEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	contactInformation := ContactInformation{
		Email:   "contactexample.com", // ผิด -->เช็คตรงนี้
		Phone:   "11234567890",
		Address: "Contact Address",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(contactInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Invalid Format"))
}

func TestPhoneNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	contactInformation := ContactInformation{
		Email:   "contact@example.com",
		Phone:   "", // ผิด -->เช็คตรงนี้
		Address: "Contact Address",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(contactInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Phone Numner"))
}

func TestPhoneIsNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	contactInformation := ContactInformation{
		Email:   "contact@example.com",
		Phone:   "+1-123-456-1234", // ผิด -->เช็คตรงนี้
		Address: "Contact Address",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(contactInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a valid Phone Number"))
}

func TestAddressNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	contactInformation := ContactInformation{
		Email:   "contact@example.com",
		Phone:   "11234567890",
		Address: "", // ผิด -->เช็คตรงนี้
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(contactInformation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Address"))
}
