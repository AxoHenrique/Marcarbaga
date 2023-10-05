function fillCurrentDate(){
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

    document.getElementById('date').value = formattedDate;
}

window.onload = function(){
    fillCurrentDate();
}

document.addEventListener('DOMContentLoaded', function(){
    const companySelect = document.getElementById('companyDestiny');
    const carrierSelect = document.getElementById('carrier');
    const employeeSelect = document.getElementById('employee');

    const otherCompanyInput = document.getElementById('otherCompanyDestinyInput');
    const otherCarrierInput = document.getElementById('otherCarrierInput');
    const otherEmployeeInput = document.getElementById('otherEmployeeInput');
    
    companySelect.addEventListener('change', function(){
        const selectedValue = companySelect.value;
        if (selectedValue === 'Outros'){
            otherCompanyInput.style.display = 'block';
        } else {
            otherCompanyInput.style.display = 'none';
        }
    });

    carrierSelect.addEventListener('change', function(){
        const selectedValue = carrierSelect.value;
        if (selectedValue === 'Outros'){
            otherCarrierInput.style.display = 'block';
        } else {
            otherCarrierInput.style.display = 'none';
        }
    });

    employeeSelect.addEventListener('change', function(){
        const selectedValue = employeeSelect.value;
        if (selectedValue === 'Outros'){
            otherEmployeeInput.style.display = 'block';
        } else {
            otherEmployeeInput.style.display = 'none';
        }
    });
    
});

let order = 1;

function addToArrivalList() {
    const rawDate = document.getElementById('date').value;
    const dateParts = rawDate.split('-');
    const dates = dateParts.reverse().join('/');

    const date = document.getElementById('date').value;
    const horsePlate = document.getElementById('horsePlate').value;
    const cartPlate = document.getElementById('cartPlate').value;
    const company = getSelectedOption('companyDestiny');
    const carrier = getSelectedOption('carrier');
    const driverName = document.getElementById('driverName').value;
    const shift = getSelectedOption('shift');
    const employee = getSelectedOption('employee');

    const horsePlateUpperCase = horsePlate.toUpperCase();
    const cartPlateUpperCase = cartPlate.toUpperCase();

    const listItem = document.createElement('li');
    const firstLineDiv = document.createElement('div');
    firstLineDiv.style.textAlign = 'center';
    firstLineDiv.innerHTML = `<strong>${shift}° Turno - ${employee} - ${dates}<br><br></strong>`;
    listItem.appendChild(firstLineDiv);
    listItem.innerHTML += `
                       	<strong>Nome do Motorista:</strong> ${driverName} <br><br>
                       	<strong>Placa do Cavalo:</strong> ${horsePlateUpperCase} <br><br>
			<strong>Placa da Carreta:</strong> ${cartPlateUpperCase} <br><br>
                       	<strong>Empresa de Destino:</strong> ${company} <br><br>
			<strong>Transportadora:</strong> ${carrier}`;
    
    
    const list = document.getElementById('list');
    list.appendChild(listItem);

    order++;
    
    clearInputFields();
}

function getSelectedOption(selectId){
    const select = document.getElementById(selectId);
    const selectedValue = select.value;
    if (selectedValue === 'Outros'){
        if (selectId === 'companyDestiny'){
            return document.getElementById('otherCompanyDestinyInput').value;
        } else if (selectId === 'carrier'){
            return document.getElementById('otherCarrierInput').value;
        } else if (selectId === 'employee'){
            return document.getElementById('otherEmployeeInput').value;
        }
    }

    return selectedValue;
}

function clearInputFields(){
    document.getElementById('companyDestiny').value = '';
    document.getElementById('carrier').value = '';
    document.getElementById('driverName').value = '';
    document.getElementById('shift').value = '';
    document.getElementById('employee').value = '';
    document.getElementById('otherCompanyDestinyInput').value = '';
    document.getElementById('otherCarrierInput').value = '';
    document.getElementById('otherEmployeeInput').value = '';
    document.getElementById('horsePlate').value = '';
    document.getElementById('cartPlate').value = '';

    document.getElementById('otherCompanyDestinyInput').style.display = 'none';
    document.getElementById('otherCarrierInput').style.display = 'none';
    document.getElementById('otherEmployeeInput').style.display = 'none';
}

function updateLogoVisibility(){
    var logoImage = document.getElementById("logo-image");
    if (window.innerWidth <= 980){
        logoImage.style.display = "none";
    } else {
        logoImage.style.display = "block";    
    }
}

updateLogoVisibility();

window.addEventListener("resize", updateLogoVisibility);

function printArrivalList(){
    var printContents = document.getElementById("arrival-list").innerHTML;
    var originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContents;
    
    window.print();
    
    document.body.innerHTML = originalContents;

    location.reload();
}

document.getElementById("printButton").addEventListener("click", printArrivalList);