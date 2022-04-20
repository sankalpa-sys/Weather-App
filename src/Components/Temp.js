import React, { useEffect, useState } from "react";

export default function Temp() {
  const API_KEY = "aecea4893179728867bb51878cb13d39";
  const [city, setcity] = useState("");
  const [weather, setweather] = useState("");
  const [wind, setwind] = useState("");
  const [country, setcountry] = useState("");
  const [desc, setdesc] = useState("");

  useEffect(() => {
    getWeather();
  }, [city]);

  const getWeather = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
      const data = await response.json();
      setweather(data.main);
      setwind(data.wind);
      setcountry(data.sys);
      setdesc(data.weather);
  };

  const change = (event) => {
    setcity(event.target.value);
  };

  function capitalizeTxt(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1); //or if you want lowercase the rest txt.slice(1).toLowerCase();
  }
  return (
    <div className="container my-2">
      <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
        <div className="container py-5 h-100">
          <h1 style={{ fontFamily: "cursive", color: "#BEC2C2" }}>
            KhaliFa Weather APP
          </h1>
          <h5 style={{ color: "#BEC2C2", fontFamily: "fantasy" }}>City Name</h5>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={change}
            style={{ width: "100%", paddingLeft: "50%" }}
          />

          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div
                className="card"
                style={{ color: "#4B515D", borderRadius: "35px" }}
              >
                <div className="card-body p-4">
                  {!weather || !wind || !country || !desc ? (
                    "No Results Found"
                  ) : (
                    <div>
                      <div className="d-flex">
                        <h6 className="flex-grow-1">
                          {`${capitalizeTxt(city)} , ${country.country}`}
                        </h6>
                        <h6>
                          {new Date().getHours()}:
                          {new Date().getMinutes() < 10
                            ? "0" + new Date().getMinutes()
                            : new Date().getMinutes()}
                        </h6>
                      </div>

                      <div className="d-flex flex-column text-center mt-5 mb-4">
                        <h6
                          className="display-4 mb-0 font-weight-bold"
                          style={{ color: "#1C2331" }}
                        >
                          {" "}
                          {weather.temp}°C{" "}
                        </h6>

                        <span className="small" style={{ color: "#868B94" }}>
                          {desc[0].description}
                        </span>
                      </div>

                      <div className="d-flex align-items-center">
                        <div
                          className="flex-grow-1"
                          style={{ fontSize: "1rem" }}
                        >
                          <div>
                            <i
                              className="fas fa-wind fa-fw"
                              style={{ color: "#868B94" }}
                            ></i>{" "}
                            <span className="ms-1">
                              {" "}
                              Wind Speed: {wind.speed} km/h{" "}
                            </span>
                          </div>
                          <div>
                            <i
                              className="fas fa-tint fa-fw"
                              style={{ color: "#868B94" }}
                            ></i>{" "}
                            <span className="ms-1">
                              {" "}
                              Max Temp: {weather.temp_max}°C{" "}
                            </span>
                          </div>
                          <div>
                            <i
                              className="fas fa-sun fa-fw"
                              style={{ color: "#868B94" }}
                            ></i>{" "}
                            <span className="ms-1">
                              {" "}
                              Humidity: {weather.humidity}h{" "}
                            </span>
                          </div>
                        </div>
                        <div>
                          <img
                            src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-weather/ilu1.png"
                            width="100px"
                            alt=".."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
