let startBtn =                 document.getElementById('start'),
    budgetValue =              document.getElementsByClassName('budget-value')[0],
    daybudgetValue =           document.getElementsByClassName('daybudget-value')[0],
    levelValue =               document.getElementsByClassName('level-value')[0],
    expensesValue =            document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue =    document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue =              document.getElementsByClassName('income-value')[0],
    monthsavingsValue =        document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue =         document.getElementsByClassName('yearsavings-value')[0],

    expensesItem =             document.getElementsByClassName('expenses-item'),
    expensesBtn =              document.getElementsByTagName('button')[0],
    optionalexpensesBtn =      document.getElementsByTagName('button')[1],
    countBtn =                 document.getElementsByTagName('button')[2],
    optionalexpensesItem =     document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome =             document.querySelector('.choose-income'),
    checkSavings =             document.querySelector('#savings'),
    chooseVale =               document.querySelector('.choose-sum'),
    percentVale =              document.querySelector('.choose-percent'),
    yearValue   =               document.querySelector('.year-value'),
    monthValue =               document.querySelector('.month-value'),
    dayValue =                 document.querySelector('.day-value');


  let money, time;

   startBtn.addEventListener('click', function() {
      time = prompt('введите дату в формате YYYY-MM-DD', '');
      money = +prompt('ваш бюджет на месяц?', '');

      while (isNaN(money) || money == '' || money == null) {
          money = prompt('ваш бюджет?', '');
      }
       appData.budget = money;
       appData.timeData = time;
       budgetValue.textContent = money.toFixed();
       yearValue.value = new Date(Date.parse(time)).getFullYear();
       monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
       dayValue.value = new Date(Date.parse(time)).getDate();
   });

   expensesBtn.addEventListener('click', function() {
       let sum = 0;

       for (let i = 0; i < expensesItem.length; i++) {
            let  a = expensesItem[i].value,
              b = expensesItem[++i].value;

         if ((typeof(a)) === "string" && (typeof(a)) != null && (typeof(b)) != null && a != "" && b != "" && a.length < 50 ) {
           console.log("done");
            appData.expenses[a] = b;
            sum += +b;
         } else {
           i -= 1;
         }
         expensesValue.textContent = sum;
   }});

  optionalexpensesBtn.addEventListener('click', function() {
    for (let i = 0; i < optionalexpensesItem.length; i++) {
         opt = optionalexpensesItem[i].value;
         appData.optionalExpenses[i] = opt;
         optionalexpensesValue.textContent +=  appData.optionalExpenses[i] + ' ';
    }
  });

 countBtn.addEventListener('click', function() {

         if (appData.budget != undefined) {

         appData.monyPerDay = (appData.budget / 30).toFixed();
         daybudgetValue.textContent = appData.monyPerDay;

         if (appData.monyPerDay < 100) {
           levelValue.textContent = "минимальный уровень достатка";
         } else if (appData.monyPerDay > 100 && appData.monyPerDay < 2000) {
           levelValue.textContent = "средний уровень достатка";
         } else if (appData.monyPerDay > 2000) {
           levelValue.textContent = "высокий уровень достатка";
         } else {
           levelValue.textContent = "произошла ошибка";
         }
       } else {
           daybudgetValue.textContent = "произошла ошибка";
       }
 });

          chooseIncome.addEventListener('input', function() {
            let itens = chooseIncome.value;
            appData.income = itens.split(", ");
            incomeValue.textContent = appData.income;
          });


      checkSavings.addEventListener('input', function() {
          if (appData.savings == true) {
            appData.savings = false;
          } else {
            appData.savings = true;
          }

      });

      chooseVale.addEventListener('input', function() {
          if (appData.savings == true) {
           let sum = +chooseVale.value,
               percent = +percentVale.value;

               appData.month = sum / 100 / 12 * percent;
               appData.year = sum / 100 * percent;

               monthsavingsValue.textContent = appData.month.toFixed(1);
               yearsavingsValue.textContent = appData.year.toFixed(1);
          }
      });

      percentVale.addEventListener('input', function() {
          if (appData.savings == true) {
            let sum = +chooseVale.value,
                percent = +percentVale.value;

                appData.month = sum / 100 / 12 * percent;
                appData.year = sum / 100 * percent;

                monthsavingsValue.textContent = appData.month.toFixed(1);
                yearsavingsValue.textContent = appData.year.toFixed(1);
          }
      });



   let appData = {
     budget: money, // проверить что бы было число
     timeData: time, // проверить на дату
     expenses: {},
     optionalExpenses: {},
     income: [],
     savings: false,
   };















    //
