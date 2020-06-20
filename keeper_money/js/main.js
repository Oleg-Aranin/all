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
    yearValue                  document.querySelector('.year-value'),
    monthValue =               document.querySelector('.month-value'),
    dayValue =                 document.querySelector('.day-value');


  let money, time;

   startBtn.addEventListener('click', function() {
      time = prompt('введите дату в формате YYYY-MM-DD', '');
      money = +prompt('ваш бюджет на месяц?', '');

      while (isNan(money) || money == '' || money == null) {
          money = prompt('ваш бюджет?', '');
      }
       appData.budget = money;
       appData.timeData = time;
       budgetValue.textContent = money.toFixed();
   });


   let appData = {
     budget: money, // проверить что бы было число
     timeData: time, // проверить на дату
     expenses: {},
     optionalExpenses: {},
     income: [],
     savings: true,
     chooseExpenses: function() {
       for (let i = 0; i < 2; i++) {
            let  a = prompt("введите обязательную статью расходов в этом месяце", ""),
              b = prompt("во сколько обойдется?", "");

         if ((typeof(a)) === "string" && (typeof(a)) != null && (typeof(b)) != null && a != "" && b != "" && a.length < 50 ) {
           console.log("done");
            appData.expenses[a] = b;
             y = 1;
         } else {
           i = i - 1;
         }
       }
     },
     каждый_день: function() {
       appData.monyPerDay = (appData.budget / 30).toFixed();
       alert("ежедневный бюджет:" + appData.monyPerDay);
     },
     уровень_дохода: function() {
       if (appData.monyPerDay < 100) {
         console.log("минимальный уровень достатка");
       } else if (appData.monyPerDay > 100 && appData.monyPerDay < 2000) {
         console.log("средний уровень достатка");
       } else if (appData.monyPerDay > 2000) {
         console.log("высокий уровень достатка");
       } else {
         console.log("ошибка");
       }
     },
      chekSav: function() {
        if (appData.savings == true) {
            st = +prompt("какова сумма");
            pr = +prompt("под какой прцент?");

            appData.month = st / 100 / 12 * pr;
            alert("доход в месяц " + appData.month);
        }
      },
      optionalExpenses: function() {
        for (let i = 1; i < 3; i++) {
             opt = prompt("статья не обязательных расходов");
             appData.optionalExpenses[i] = opt;
        };
      },
      chooseIncome: function() {
       let itens = prompt("что принесет дополнительный доход? (перечислеть через запятую)");
       appData.income = itens.split(", ");
       appData.income.push(prompt("может еще что то?"));
       appData.income.sort();
      }
   };















    //
