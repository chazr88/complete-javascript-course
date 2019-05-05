//TO DO
//Add event handler
//Get input values
//Add the new item to our data structure
//Add the new item to the UI
//Calculate budget
//Update the UI

//App will be seperated into 3 modules

//UI Module
    //Get input values
    //Add the new item to the UI
    //Update the UI

//Data Module
    //Add the new item io our data structure
    //Calculate budget

//Controller Module..This module could control the entire app and as a link for the other 2
    //Add event handler

//This variable will be an immediatley invokde function expression that will return an object    
var budgetContoller = (function() {

    //Function constructor for expenses
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Function constructor for income
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //This data structure allows us to neatly store all data given to us by the app
    var data = {
        allItems: {//Here we will store the items in arrays
            exp: [],
            inc: [],

        },
        totals: {//Here we will keep track of the totals
            exp: 0,
            inc: 0
        }

    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //ID = last ID + 1
            //Create new Id
            if(data.allItems[type].length > 0){//This makes sure our array starts out at 0
            ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0;
            }
            //Create new item basied on inc or exp type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else {
                newItem = new Income(ID, des, val);
            }
            
            //Push into our data structure
            data.allItems[type].push(newItem);
            return newItem;//This gives our other module access to the newItem
        },

        testing: function() {
            console.log(data);
        }
    };

})();

var UIController = (function() {

    var DOMstrings = {//This is an object that will hold the classes of our selectors. This keeps us from having to chamge them in multiple places
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }

    return {//If there is anything we need to use in our app controller, we will put it in this return so we have access
        getinput: function() {//Gets the user input from the fields
            return{//To return all 3 values at the same time, we return them as an object.
                type: document.querySelector(DOMstrings.inputType).value,// Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        getDomstrings: function() {//Returns our DOMstrings so our other controllers have access to them
            return DOMstrings;
        }
    };

})();

//This wiil be our app controler. It will allow communication between our other controllers
//In this controller we can call the info in the other 2
var controller = (function(budgetCtrl, UICtrl) {//We rename them here incase we rename the controller later, we will only have to change the name where its passed in

    var setupEventListeners = function() {//This wil hold our code dealing with our event listeners to keep our code clean and orgainzed
        var DOM = UICtrl.getDomstrings();//Gets our DOMstrings from the UIController

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);//We call DOM here instead of DOMstrings, because that is what it is called in this controller

        //Lets them submit their entry with the ENTER key
        document.addEventListener('keypress', function(event) {
    
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
    
        });
    };

    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getinput();//This holds all of our input values

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);//We grab all the input values and pass them to our addItem in budgetController

        // 3. Add the item to the UI
        
        // 4. Calculate the budget

        // 5. Display the budget

    }

    return {
        init: function() {//After adding our setupEventListeners to a function, it no longer automatically runs. This can be called to make them run
            console.log('Application has started');
            setupEventListeners();
        }
    };

})(budgetContoller, UIController);//These controllers are passed into controller

controller.init();

