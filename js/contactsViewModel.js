// Set up the data as observables for the app. When observables change,
// the data changes throughout the app automagically 
var contactModel = function(firstName, lastName, email, phone) {
	var self = this;
	this.firstName = ko.observable(firstName);
	this.lastName = ko.observable(lastName);
	this.email = ko.observable(email);
	this.phone = ko.observable(phone);
};

// The app view model, e.g. the data objects and functions used in the UI
var ContactsModel = function(contacts) {
    var self = this;
	// Observablke array made up of observable data points
	self.contacts = ko.observableArray([]);
 
    // Create a new row with empty fields
	self.addContact = function() {
        self.contacts.push({
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
        });
    };
 
	self.removeContact = function(contact) {
		// remove contact from self.contacts array.  Array is updated automatically because it is observable
        self.contacts.remove(contact);
		// save updated array (minus removed contact) in JSON format to localStorage
		localStorage.setItem('contacts', ko.toJSON(self.contacts()));
    };
 
	self.removeAllContacts = function() {
		// remove all contacts from self.contacts array.  Array is updated automatically because it is observable
        self.contacts.removeAll();
		// clear localStorage of all saved data
		localStorage.clear();
    };
 
	self.saveContact = function(){
		// save updated contact(s) to self.contacts array into the localStorage "contacts" object using JSON format
		localStorage.setItem('contacts', ko.toJSON(self.contacts()));
	};

	self.loadData = function(){
		// get existing data from storage
		var contacts = localStorage.getItem('contacts');
		// before creating the self.contacts array, check to see if there is any
		/// data in localStorage first
		if (contacts) {
			var data = JSON.parse(contacts);
			// iterate over data in array of objects, create variables from that data
			for(var x in data) {
				var firstName = data[x]['firstName'],
					lastName = data[x]['lastName'],
					email = data[x]['email'],
					phone = data[x]['phone'];
					// populate observable array with data from localStorage using the contactModel format
					self.contacts.push(new contactModel(firstName, lastName, email, phone));					
			}
		}
	};
	 
};

// Apply the viewModel to the page
ko.applyBindings(new ContactsModel());


