export default {
    // Function to replace newline characters with <br> tags
    addLineBreaks(text) {
        return text.replace(/\n/g, '<br>');
    },
    //Date and Formater
    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
    
        // Extract date components
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
    
        // Extract time components
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        // Format date and time
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }
}