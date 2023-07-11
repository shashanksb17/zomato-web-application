// DOM Elements
const addDishForm = document.getElementById('add-dish-form');
const menuList = document.getElementById('menu-list');
const takeOrderForm = document.getElementById('take-order-form');
const updateOrderForm = document.getElementById('update-order-form');
const orderList = document.getElementById('order-list');

// Function to send HTTP POST requests to the backend
async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
  
  // Function to send HTTP PUT requests to the backend
  async function putData(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
  
  // Handle Add Dish Form Submission
  addDishForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const dishName = document.getElementById('dish-name').value;
    const dishPrice = document.getElementById('dish-price').value;
  
    const data = {
      name: dishName,
      price: parseFloat(dishPrice)
    };
  
    try {
      const response = await postData('/menu', data);
      console.log(response); // Log the response from the backend
      // Clear the form fields
      addDishForm.reset();
      // Update the menu list dynamically
      addMenuItem(response.menuItem);
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  // Handle Take Order Form Submission
  takeOrderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const customerName = document.getElementById('customer-name').value;
    const dishId = parseInt(document.getElementById('dish-id').value);
  
    const data = {
      customerName: customerName,
      dishId: dishId
    };
  
    try {
      const response = await postData('/order', data);
      console.log(response); // Log the response from the backend
      // Clear the form fields
      takeOrderForm.reset();
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  // Handle Update Order Form Submission
  updateOrderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const orderId = parseInt(document.getElementById('order-id').value);
    const newStatus = document.getElementById('new-status').value;
  
    const data = {
      status: newStatus
    };
  
    try {
      const response = await putData(`/order/${orderId}`, data);
      console.log(response); // Log the response from the backend
      // Clear the form fields
      updateOrderForm.reset();
    } catch (error) {
      console.error('Error:', error);
    }
  });
  

// Function to dynamically add menu items to the menu list
function addMenuItem(item) {
  const li = document.createElement('li');
  li.textContent = `${item.name} - $${item.price}`;
  menuList.appendChild(li);
}

// Function to dynamically add orders to the order list
function addOrder(order) {
  const li = document.createElement('li');
  li.textContent = `${order.customerName} - Order ID: ${order.orderId} - Status: ${order.status}`;
  orderList.appendChild(li);
}

// Example code to add some initial menu items and orders (for testing purposes)
const initialMenuItems = [
  { name: 'Burger', price: 10.99 },
  { name: 'Pizza', price: 15.99 },
  // Add more menu items
];

const initialOrders = [
  { customerName: 'John Doe', orderId: 1, status: 'received' },
  { customerName: 'Jane Smith', orderId: 2, status: 'preparing' },
  // Add more orders
];

// Add initial menu items to the menu list
initialMenuItems.forEach(addMenuItem);

// Add initial orders to the order list
initialOrders.forEach(addOrder);
