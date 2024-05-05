import { useState } from "react";
import { PatternFormat } from "react-number-format";
import Swal from "sweetalert2";

const HataliGiris = ({ errors }) => {
  return (
    <span style={{ color: "red", fontSize: "13px"}}>
      {errors ? <p style={{margin:"2px 0px 0px 0px" }}> {errors}</p> : null}
    </span>
  );
};

function App() {
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    age: "",
    address: "",
    email: "",
    tcNo: "",
    creditCard: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const valueControl = (inputs) => {
    let errors = {};

    if (inputs.name.length < 1) {
      errors.nameErr = "ismi boş bırakamazsınız";
    } else if (inputs.name.length > 15 || inputs.name.length < 3) {
      errors.nameErr = "isim 2-15 karakter içerebilir";
    }

    if (inputs.surname.length < 1) {
      errors.surnameErr = "Soyismi boş bırakamazsınız";
    } else if (inputs.surname.length > 15 || inputs.surname.length < 3) {
      errors.surnameErr = "isim 2-15 karakter içerebilir";
    }

    if (inputs.address.length < 1) {
      errors.addressErr = "Adres boş bırakamazsınız";
    } else if (inputs.address.length < 10) {
      errors.addressErr = "Lütfen adresi doğru giriniz.";
    }

    if (inputs.phoneNumber.length < 1) {
      errors.phoneNumberErr = "Telefon No boş bırakamazsınız";
    } else if (inputs.phoneNumber[inputs.phoneNumber.length - 1] == "_") {
      errors.phoneNumberErr = "Telefon no en fazla 11 karakter içerebilir";
    }

    if (inputs.email.length < 1) {
      errors.emailErr = "Email boş bırakamazsınız";
    } else if (inputs.email.length > 1) {
      let kontrol =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (kontrol.test(inputs.email) === false) {
        errors.emailErr = "Hatalı Mail Girildi";
      }
    }

    if (inputs.age.length < 1) {
      errors.ageErr = "Yaş boş bırakamazsınız";
    } else if (inputs.age < 18) errors.ageErr = "18 yaşından büyük olmalısınız";

    if (inputs.tcNo.length < 1) {
      errors.tcNoErr = "Tc Kimlik No boş bırakamazsınız";
    } else if (inputs.tcNo[inputs.tcNo.length - 1] == "_") {
      errors.tcNoErr = "Tc no 11 haneli olmalıdır";
    }

    if (inputs.creditCard.length < 1) {
      errors.creditCardErr = "Kredi Kartı No boş bırakamazsınız";
    } else if (inputs.creditCard[inputs.creditCard.length - 1] == "_") {
      errors.creditCardErr = "Kredi kart no 16 haneli olmalıdır";
    }

    console.log(inputs.phoneNumber);
    console.log(inputs.phoneNumber.length);

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const error=valueControl(inputs)
    setErrors(error);
    if (Object.keys(error).length===0) {
     
      Swal.fire({
        title: "Başarıyla Gönderildi",
        icon: "success",
      });
      setInputs({
        name: "",
        surname: "",
        phoneNumber: "",
        age: "",
        address: "",
        email: "",
        tcNo: "",
        creditCard: "",
      })
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop:"10px"
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "self-end",
          }}
        >
          <span>
            <label for="name">*Ad:</label>
            <input
              type="text"
              name="name"
              onChange={(e) =>
                handleChange({
                  target: {
                    value: e.target.value.replace(/[^a-zA-Z]/gi, ""),
                    name: "name",
                  },
                })
              }
              value={inputs.name}
            />
            <HataliGiris errors={errors.nameErr} />
          </span>

          <span>
            <label for="soyad">*Soyad:</label>
            <input
              type="text"
              name="surname"
              onChange={(e) =>
                handleChange({
                  target: {
                    value: e.target.value.replace(/[^a-zA-Z]/gi, ""),
                    name: "surname",
                  },
                })
              }
              value={inputs.surname.replace(/[^a-zA-Z]/gi, "")}
            />
            <HataliGiris errors={errors.surnameErr} />
           
          </span>

          <span>
            <label for="phoneNumber">*Telefon No:</label>
            <PatternFormat
              value={inputs.phoneNumber}
              format="0 (5##) ### ## ##"
              allowEmptyFormatting
              mask="_"
              name="phoneNumber"
              onChange={handleChange}
            />
            <HataliGiris errors={errors.phoneNumberErr} />
          </span>

          <span>
            <label for="age">Yaş:</label>
            <PatternFormat
              value={inputs.age}
              allowEmptyFormatting
              format="##"
              name="age"
              onChange={handleChange}
            />
            <HataliGiris errors={errors.ageErr} />
          </span>

          <span>
            <label for="address">*Adres:</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={inputs.address}
            />
            <HataliGiris errors={errors.addressErr} />{" "}
          </span>
          <span>
            <label for="email">*E-Mail:</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={inputs.email}
            />
            <HataliGiris errors={errors.emailErr} />
          </span>

          <span>
            <label for="tcNo">*Tc Kimlik No:</label>
            <PatternFormat
              value={inputs.tcNo}
              allowEmptyFormatting
              format="###########"
              mask="_"
              name="tcNo"
              onChange={handleChange}
            />
            <HataliGiris errors={errors.tcNoErr} />
          </span>

          <span>
            <label for="creditCard">*Kredi Kart No:</label>
            <PatternFormat
              value={inputs.creditCard}
              allowEmptyFormatting
              format="####-####-####-####"
              mask="_"
              name="creditCard"
              onChange={handleChange}
            />
            <HataliGiris errors={errors.creditCardErr} />
         
          </span>
          <input type="submit" />
          
        </form>
      </div>
    </div>
  );
}

export default App;
