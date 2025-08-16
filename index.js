// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const company = formData.get('company');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const services = formData.get('services');
            const additionalInfo = formData.get('additionalInfo');
            
            // Create email body
            const emailBody = `
New Contact Form Submission from TerBush Engineering Services Website

Name: ${firstName} ${lastName}
Company: ${company || 'Not specified'}
Phone: ${phone}
Email: ${email}
Services Needed: ${services}
Additional Information: ${additionalInfo || 'None provided'}

---
This message was sent from the TerBush Engineering Services contact form.
            `.trim();
            
            // Create email subject
            const emailSubject = `New Contact Form Submission - ${firstName} ${lastName}`;
            
            // Create mailto link
            const mailtoLink = `mailto:tylerterbush@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Show success message
            showMessage('Thank you for contacting TerBush Engineering Services PLLC. We will respond to your inquiry as soon as possible.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Message display function
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 6px;
        font-weight: 500;
        text-align: center;
    `;
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d1fae5';
        messageDiv.style.color = '#065f46';
        messageDiv.style.border = '1px solid #a7f3d0';
    } else {
        messageDiv.style.backgroundColor = '#dbeafe';
        messageDiv.style.color = '#1e40af';
        messageDiv.style.border = '1px solid #93c5fd';
    }
    
    // Insert message after the form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}
