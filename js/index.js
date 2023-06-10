const Orders = [];

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

const themeToggler = document.querySelector(".theme-toggler");


//Show Sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

//Close Sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

// Función para mostrar u ocultar el sidebar al cambiar el tamaño de la ventana
function toggleSidebar() {
    if (window.innerWidth >= 768) {
        sideMenu.style.display = 'block';
    } else {
        sideMenu.style.display = 'none';
    }
}

// Evento que se activa al cargar la página
window.addEventListener('load', toggleSidebar);

// Evento que se activa al cambiar el tamaño de la ventana
window.addEventListener('resize', toggleSidebar);

//Change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

//fill orders in table
Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent =   `
                            <td>${order.productName}</td>
                            <td>${order.productNumber}</td>
                            <td>${order.paymentStatus}</td>
                            <td class= "${
                                        order.shipping === 'Declined' ? 'danger':
                                        order.shipping === 'Pending' ? 'warning':
                                        'success'
                                        }"  >${order.shipping}</td>
                            <td class="primary">Details</td>
                        `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
})

// Función para agregar una orden a la tabla
function addOrder() {
    const orderData = {};

    // Solicitar el nombre del producto
    alert('Enter product name:');
    const productName = prompt('Product name:');
    orderData.productName = productName;

    // Solicitar el número del producto
    alert('Enter product number:');
    const productNumber = prompt('Product number:');
    orderData.productNumber = productNumber;

    // Solicitar el estado de pago
    alert('Enter payment status:');
    const paymentStatus = prompt('Payment status:');
    orderData.paymentStatus = paymentStatus;

    // Solicitar el estado de envío
    alert('Enter shipping status:');
    const shipping = prompt('Shipping status:');
    orderData.shipping = shipping;

    const tr = document.createElement('tr');
    const trContent = `
        <td>${orderData.productName}</td>
        <td>${orderData.productNumber}</td>
        <td>${orderData.paymentStatus}</td>
        <td class="${orderData.shipping === 'Declined' ? 'danger' : orderData.shipping === 'Pending' ? 'warning' : 'success'}">${orderData.shipping}</td>
        <td class="primary">Details</td>
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
}

// Agregar evento al span
const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addOrder);