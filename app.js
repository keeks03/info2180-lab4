document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("search-btn");
    const searchField = document.getElementById("search");
    const resultDiv = document.getElementById("result");

    button.addEventListener("click", (e) => {
        e.preventDefault(); // stops form-style reload, just in case

        // Get and "sanitize" the input on the JS side
        const query = searchField.value.trim();

        // Build URL: with or without query string
        let url = "superheroes.php";
        if (query !== "") {
            url += `?query=${encodeURIComponent(query)}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(data => {
                // Put the HTML returned from PHP into the result div
                resultDiv.innerHTML = data;
            })
            .catch(error => {
                console.error(error);
                resultDiv.innerHTML = "<p class='error'>There was an error fetching the data.</p>";
            });
    });
});