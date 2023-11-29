document.addEventListener("DOMContentLoaded", function () {
    const sourceCurrencySelect = document.getElementById("sourceCurrency");
    const targetCurrencySelect = document.getElementById("targetCurrency");
    const amountInput = document.getElementById("amount");
    const convertBtn = document.getElementById("convertBtn");
    const resultDiv = document.getElementById("result");

    
    fetch("https://open.er-api.com/v6/latest?apikey=2559cdb3593580382aa8d0ae")
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);

            currencies.forEach(currency => {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                sourceCurrencySelect.appendChild(option.cloneNode(true));
                targetCurrencySelect.appendChild(option.cloneNode(true));
            });
        });

    
    convertBtn.addEventListener("click", function () {
        const sourceCurrency = sourceCurrencySelect.value;
        const targetCurrency = targetCurrencySelect.value;
        const amount = amountInput.value;

        
        fetch(`https://open.er-api.com/v6/convert?apikey=2559cdb3593580382aa8d0ae&from=${sourceCurrency}&to=${targetCurrency}&amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                const convertedAmount = data.result.toFixed(2);
                resultDiv.textContent = `Converted Amount: ${convertedAmount} ${targetCurrency}`;
            })
            .catch(error => {
                resultDiv.textContent = "Error fetching conversion data.";
                console.error(error);
            });
    });
});
