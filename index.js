var readlineSync = require('readline-sync');
var fs = require('fs');

var patients = [];

// main function to run app
function main() {
	loadData();
	showMenu();
}

// Run app
main();

function showMenu() {
	console.log('1. Show all patients today');
	console.log('2. Create a new patients');
	console.log('3. Delete a patient');
	console.log('4. Save & Exit');
	console.log('5. Exit');
	var option = readlineSync.question('> ');

	switch(option) {
		case '1':
			showPatients();
			showMenu();
			break;
		case '2':
			showCreatePatient();
			showMenu();
			break;
		case '3':
			showDeletePatient();
			showMenu();
			break;	
		case '4':
			saveAndExit();
			break;
		case '5':
			break;
		default:
			console.log('Wrong option!');
			showMenu();
			break;
	}
}

function loadData() {
	var fileContent = fs.readFileSync('./data.json');
	patients = JSON.parse(fileContent);
}

function showPatients() {
	for( var patient of patients) {
		console.log(patient.name, patient.age);
	}
}

function showCreatePatient() {
	var newName = readlineSync.question('Name:');
	var newAge = readlineSync.question('Age:');
	var patient = {
		name: newName,
		age: parseInt(newAge)
	};
	patients.push(patient);
}

function showDeletePatient() {
	var delNumber = readlineSync.question('Number of patient(from 0): ');
	var delPatient = parseInt(delNumber);
	patients.splice(delPatient);
}

function saveAndExit() {
	var content = JSON.stringify(patients);
	fs.writeFileSync('./data.json', content, {encoding: 'utf8'});
}