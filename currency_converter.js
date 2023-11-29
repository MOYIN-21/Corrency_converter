document.addEventListener("DOMContentLoaded", function () {
    const fromCurrencySelect = document.getElementById("From");
    const toCurrencySelect = document.getElementById("To");
    const amountInput = document.getElementById("textbox");
    const convertBtn = document.getElementById("convertBtn");

    // Fetch currency data from the API
    fetch("https://v6.exchangerate-api.com/v6/62f01a18eafd1efc8faf2af7/latest/USD")
        .then((response) => response.json())
        .then((data) => {
            if (data.result === "success") {
                const currencies = Object.keys(data.conversion_rates);

                // Populate dropdown menus with currency abbreviations
                currencies.forEach((currency) => {
                    const option1 = document.createElement("option");
                    option1.value = currency;
                    option1.text = currency;
                    fromCurrencySelect.add(option1);

                    const option2 = document.createElement("option");
                    option2.value = currency;
                    option2.text = currency;
                    toCurrencySelect.add(option2);
                });

                // Event listener for the "Convert" button
                convertBtn.addEventListener("click", function () {
                    const fromCurrency = fromCurrencySelect.value;
                    const toCurrency = toCurrencySelect.value;
                    const amount = parseFloat(amountInput.value);

                    if (!fromCurrency || !toCurrency || isNaN(amount)) {
                        alert("Please fill in all the fields with valid values.");
                        return;
                    }

                    // Check if the selected currencies are present in the conversion rates
                    if (!data.conversion_rates[fromCurrency] || !data.conversion_rates[toCurrency]) {
                        alert("Invalid currency selection.");
                        return;
                    }

                    // Calculate the converted amount
                    const conversionRate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
                    const convertedAmount = amount * conversionRate;

                    // Display the result
                    const resultParagraph = document.createElement("p");
                    resultParagraph.textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`;
                    document.body.appendChild(resultParagraph);
                });
            } else {
                console.error("Error fetching currency data:", data.result);
            }
        })
        .catch((error) => console.error("Error fetching currency data:", error));
});
