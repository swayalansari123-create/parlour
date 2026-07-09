// ==========================================================================
// Glow Beauty Parlour Management System - Core Script
// ==========================================================================

// LocalStorage Data Load (Agar data pehle se hai toh loading, nahi toh empty array)
let customers = JSON.parse(localStorage.getItem("customers")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// Fixed Services List
const services = [
    "Facial Treatment",
    "Hair Cut & Styling",
    "Bridal Makeup",
    "Manicure",
    "Waxing",
    "Spa & Massage"
];

// 1. DASHBOARD COUNTERS UPDATE
function updateDashboard(){
    if(document.getElementById("customerCount")) {
        document.getElementById("customerCount").textContent = customers.length;
    }
    if(document.getElementById("serviceCount")) {
        document.getElementById("serviceCount").textContent = services.length;
    }
    if(document.getElementById("appointmentCount")) {
        document.getElementById("appointmentCount").textContent = appointments.length;
    }
}

// 2. SAVE DATA TO LOCAL STORAGE
function saveData(){
    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("appointments", JSON.stringify(appointments));
}

// ==========================================================================
// CUSTOMER MANAGEMENT LOGIC
// ==========================================================================

// Add Customer
function addCustomer(name, phone, email, address){
    customers.push({
        id: Date.now(),
        name: name,
        phone: phone,
        email: email || "N/A",
        address: address || "N/A"
    });

    saveData();
    updateDashboard();
    displayCustomers();
}

// Delete Customer
function deleteCustomer(id){
    customers = customers.filter(customer => customer.id !== id);

    saveData();
    updateDashboard();
    displayCustomers();
}

// Display Customers in Table
function displayCustomers(){
    const table = document.getElementById("customerTable");
    if(!table) return;

    table.innerHTML = "";

    if(customers.length === 0) {
        table.innerHTML = `<tr><td colspan="5" style="color: #888;">No customers added yet.</td></tr>`;
        return;
    }

    customers.forEach(customer => {
        table.innerHTML += `
        <tr>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.email}</td>
            <td>${customer.address}</td>
            <td>
                <button onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        </tr>
        `;
    });
}

// ==========================================================================
// APPOINTMENT MANAGEMENT LOGIC
// ==========================================================================

// Add Appointment
function addAppointment(customer, service, date, time){
    appointments.push({
        id: Date.now(),
        customer: customer,
        service: service,
        date: date,
        time: time
    });

    saveData();
    updateDashboard();
    displayAppointments(); // Fixed: Ab add hote hi table update hogi
}

// Delete / Cancel Appointment
function deleteAppointment(id){
    appointments = appointments.filter(app => app.id !== id);

    saveData();
    updateDashboard();
    displayAppointments(); // Fixed: Ab delete hote hi table update hogi
}

// Display Appointments in Table (Fixed: Yeh function missing tha)
function displayAppointments(){
    const table = document.getElementById("appointmentTable");
    if(!table) return;

    table.innerHTML = "";

    if(appointments.length === 0) {
        table.innerHTML = `<tr><td colspan="5" style="color: #888;">No appointments booked yet.</td></tr>`;
        return;
    }

    appointments.forEach(app => {
        table.innerHTML += `
        <tr>
            <td>${app.customer}</td>
            <td>${app.service}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td>
                <button onclick="deleteAppointment(${app.id})">Cancel</button>
            </td>
        </tr>
        `;
    });
}

// ==========================================================================
// PAGE INITIALIZATION & FORM LISTENERS
// ==========================================================================
window.onload = function(){
    // Initial UI Render
    updateDashboard();
    displayCustomers();
    displayAppointments(); // Fixed: Page load par purane appointments dikhenge

    // Customer Form Submit Listener
    const customerForm = document.getElementById("customerForm");
    if(customerForm){
        customerForm.addEventListener("submit", function(e){
            e.preventDefault();
            
            addCustomer(
                document.getElementById("customerName").value,
                document.getElementById("customerPhone").value,
                document.getElementById("customerEmail").value,
                document.getElementById("customerAddress").value
            );
            
            customerForm.reset();
        });
    }

    // Appointment Form Submit Listener (Fixed: Yeh listener missing tha)
    const appointmentForm = document.getElementById("appointmentForm");
    if(appointmentForm){
        appointmentForm.addEventListener("submit", function(e){
            e.preventDefault();
            
            addAppointment(
                document.getElementById("appCustomer").value,
                document.getElementById("appService").value,
                document.getElementById("appDate").value,
                document.getElementById("appTime").value
            );
            
            appointmentForm.reset();
        });
    }
}