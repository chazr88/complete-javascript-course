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

    //Calculates the total of either an expense or income, whichever is passes in. 
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {//Loops thru allItems expense or income array 
            sum += cur.value;//Each loop adds its value to the sum
        });
        data.totals[type] = sum;//After loop is finished, put the final sum in the correct property... totals inc or exp.
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
        },
        budget: 0,
        percentage: -1//Se set this to -1 because we dont want it to exist at first. 0 would make it 0%

    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //[1 2 3 4 5], next ID = 6
            //[1 2 3 4 6 8], next ID = 9
            //ID = last ID +1

            //Create new Id
            if(data.allItems[type].length > 0){//This makes sure our array where we store starts out at 0
            ID = data.allItems[type][data.allItems[type].length -1].id + 1;//Caclulates the next number by grabbing the id of the last item and adding 1
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

        deleteItem: function(type, id) {
            var ids, index

            // id = 3
            //data.allItems[type][id];//This will not work
            // ids = [1 2 4 6 8]
            //index of 6 = 3

            //We use map to return a new array
            //Gives us an array of just the ids of our data items
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);//Gives us the index if the ids. Ex.. [1 2 4 6 8] if we wanted 6, that index would be 3

            if(index !== -1){//This checks to see if it found the element. Remember -1 means it dont exist. This checks if it dont not exist.... if it exists.
                data.allItems[type].splice(index, 1);//Starts removing elements at the specified index and keeps untill the number in the 2nd param is reached
            }
        },

        calculateBudget: function() {

            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;//Calculates budget then stores it in bueget data property

            //Calculate the percentage of income that we spent
            if(data.totals.inc > 0){//Keeps percentage from trying to divide by 0 (if we add an expense before there is any income)
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBueget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        //This is for test purposes. It allows us to log the data by calling this in the console "budgetController.testing()" after an item is added
        testing: function() {
            console.log(data);
        }
    };

})();



var UIController = (function() {

    var DOMstrings = {//This is an object that will hold the classes of our selectors. This keeps us from having to chamge them in multiple places if HTML is changed 
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLable: '.budget__expenses--percentage',
        container: '.container'
    }

    return {//If there is anything we need to use in our app controller, we will put it in this return so we have access
        getinput: function() {//Gets the user input from the fields
            return{//To return all 3 values at the same time, we return them as an object.
                type: document.querySelector(DOMstrings.inputType).value,// Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)//We use parseFloat to convert string into float
            }
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;

            // Create HTML string with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;//Here we select the element where the html will be inserted
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn">' +
                '<i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type ==='exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>' +
                '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with read data
            newHtml = html.replace('%id%', obj.id);//id is our counter for each new income or expense
            newHtml = newHtml.replace('%description%', obj.description);//Here now do newHtml = newHtml because our html was repalced with newHtml in the line above
            newHtml = newHtml.replace('%value%', obj.value);


            // Insert the HTML into the DOM
            test = document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);//Takes the element and html (based on if its income or expense) and inserts it into the html
            
        },

        deleteListItem: function(selectorID) {

            var el = document.getElementById(selectorID);//Gets element with specified ID
            el.parentNode.removeChild(el)//Selects the parent of that element, then uses remove child to remove the specified element.
        
        },


        //Clears the fields after item is added
        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)//Grabs desc and input fields and gives them to us in a list

            //We use the slice methond on the Array.prototype, then call .call on that passing fields as the .this
            //This tricks the .slice into working on fields. 
            fieldsArr = Array.prototype.slice.call(fields);

            //Loops thru array changing the values of each item to ""
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            //Sets focus back on description after fields are clear, letting you immediatly add another item
            fieldsArr[0].focus();

        },

        displayBudget: function(obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
            
            //Shows % sign in us if % is greater than 0. Else it shows dashes instead of -1 that would show if % does not exist. 
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLable).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLable).textContent = '---';
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
        var DOM = UICtrl.getDomstrings();//Gets our DOMstrings from the UIController...REMINDER in this module we call it DOM not DOMStrings because of this line

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);//We call DOM here instead of DOMstrings, because that is what it is called in this controller

        //Lets them submit their entry with the ENTER key
        document.addEventListener('keypress', function(event) {
    
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);//Listens for click on the container area the calls ctrlDeleteItem function further down
    };

    var updateBudget = function () {

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBueget();

        // 3. Display the budget
        UICtrl.displayBudget(budget);//Calling display budget and passing the obj budget created a few lines above

    }

    var ctrlAddItem = function() {//Tells other moduels what to do, gets data back, then sends data where it needs to go
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getinput();//Grabs our input data pased from get input, and stores for later use as an object

        //Keeps item from submitting with empty fields
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);//We grab all the input values and store then an obj then pass them to our addItem in budgetController

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
        } else {
            alert ("Fields cannot be empty, and value cannot be 0")
        }

    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;//Gets the specified parent (4 levels up) of the event target

        if(itemID) {

            //inc-1
            splitID = itemID.split('-');//We are splitting the string at the dash so we have acces to just the ID. Returns an array of all the items before and after the dash
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the UI
            UIController.deleteListItem(itemID);//Passes in the full id of the element Ex... <div id="income-1"

            // 3. Update and show the new budget
            updateBudget();

        }
        
    };

    return {
        init: function() {//After adding our setupEventListeners to a function, it no longer automatically runs. This can be called to make them run
            console.log('Application has started');
            //Sets everything to 0 on page load
            UICtrl.displayBudget({//Here we pass an obj we create as the argument for this function
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(budgetContoller, UIController);//These controllers are passed into controller

controller.init();

