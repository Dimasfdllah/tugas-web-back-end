import { useEffect, useRef, useState } from "react";
import { LuArrowLeftRight } from "react-icons/lu";
import ReactCountryFlag from "react-country-flag";
import country from "../data/country.js";

export default function Home() {
  const [listCountries, setListCountries] = useState([]);
  const [defaultOpt1, setDefaultOpt1] = useState("USD");
  const [defaultOpt2, setDefaultOpt2] = useState("IDR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isReverse, setIsReverse] = useState(false);
  const [isResultFrom, setIsResultFrom] = useState(null);
  const [isResultTo, setIsResultTo] = useState(null);
  const [isMessage, setIsMessage] = useState(null);
  const amountInputFromRef = useRef(null);

  useEffect(() => {
    document.title = "Home";
    const newListCountries = [];
    for (let countryKey in country) {
      newListCountries.push(countryKey);
      setListCountries(newListCountries);
    }
  }, []);

  const getData = async (from, to, amount) => {
    const url = `https://v6.exchangerate-api.com/v6/a24a19a1203457f58df05ae5/latest/${from}`;

    if (isNaN(amount)) {
      return setIsMessage("Isi dong formnyaa!!!");
    } else {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.conversion_rates && to) {
          const exchangeRate = data.conversion_rates[to];
          const converted = amount * exchangeRate;
          const convertedVal = converted.toFixed(0);
          const formatAmount = `${convertedVal} ${defaultOpt2}`;

          setConvertedAmount(formatAmount);

          function formattedAmountCountry(amount, currencyCode) {
            const formattedAmount = new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: currencyCode,
            });

            return formattedAmount.format(amount);
          }

          setIsResultFrom(formattedAmountCountry(amount, defaultOpt1));
          setIsResultTo(formattedAmountCountry(converted, defaultOpt2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsMessage(null);
    const fromCurrency = isReverse ? defaultOpt2 : defaultOpt1;
    const toCurrency = isReverse ? defaultOpt1 : defaultOpt2;
    console.log(amountInputFromRef);

    const amountToConvert = parseFloat(amountInputFromRef.current.value);
    getData(fromCurrency, toCurrency, amountToConvert);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (!isReverse) {
      setDefaultOpt1(defaultOpt2);
      setDefaultOpt2(defaultOpt1);
      setIsReverse(isReverse);
      console.log(isReverse);
    }
  };

  return (
    <section className="container-home">
      <div className="title-exchange">
        <p>
          Convert {defaultOpt1} to {defaultOpt2} at the real exchange rate
        </p>
      </div>
      <div className="content-home">
        <form onSubmit={handleSubmit}>
          <div className="list">
            <div className="currency amount-from">
              <label htmlFor="amount">Amount</label>
              <br />
              <input
                type="text"
                id="amount"
                name="amount"
                ref={amountInputFromRef}
              />
              {/* <div className="select-icon"> */}
              <ReactCountryFlag
                countryCode={country[defaultOpt1].code}
                svg
                className="flag-icon"
              />
              {/* </div> */}
              <select
                name="countries-from"
                value={defaultOpt1}
                onChange={(e) => setDefaultOpt1(e.target.value)}
              >
                {listCountries.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              {isMessage && <p style={{ color: "red" }}>{isMessage}</p>}
            </div>
            <div className="icon-change" onClick={handleChange}>
              <LuArrowLeftRight />
            </div>
            <div className="currency convert-to">
              <label htmlFor="convert">Converted to</label>
              <br />
              <input
                type="text"
                id="convert"
                name="convert"
                value={convertedAmount || ""}
                readOnly
              />
              {/* <div className="select-icon"> */}
              <ReactCountryFlag
                countryCode={country[defaultOpt2].code}
                svg
                className="flag-icon"
              />
              {/* </div> */}
              <select
                name="countries-to"
                value={defaultOpt2}
                onChange={(e) => setDefaultOpt2(e.target.value)}
              >
                {listCountries.map((code) => {
                  //   console.log(code);
                  const randomValue = Math.random()
                    .toString(36)
                    .substring(2, 10);
                  return (
                    <option key={randomValue} value={code}>
                      {code}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="bottom">
            <div className="result-converted">
              {isResultFrom && isResultTo
                ? `${isResultFrom} = ${isResultTo}`
                : "000000 = 000000"}
            </div>
            <input type="submit" value="Convert" className="submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
