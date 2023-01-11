//class
class Alternative {
  constructor(name = "", alts = [0, 0, 0, 0, 0, 0, 0]) {
    this.name = name;
    this.alts = alts;
  }
  getName() {
    return this.name;
  }
  getAlternative(number) {
    return this.alts[number]
  }
}






//додати альтернативу
function addAlternative() {
  let altName = document.getElementById('setAlternativeName').value
  let krit1 = document.querySelectorAll('.kriteria1 > div > input[type=checkbox]')
  let krit2 = document.querySelectorAll('.kriteria2 > div > input[type=checkbox]')
  let krit3 = document.querySelectorAll('.kriteria3 > div > input[type=checkbox]')
  let krit4 = document.querySelectorAll('.kriteria4 > div > input[type=checkbox]')
  let krit5 = document.querySelectorAll('.kriteria5 > div > input[type=checkbox]')
  let krit6 = document.querySelectorAll('.kriteria6 > div > input[type=checkbox]')
  let krit7 = document.querySelectorAll('.kriteria7 > div > input[type=checkbox]')

  let alt = new Alternative(altName, [getValues(krit1), getValues(krit2), getValues(krit3), getValues(krit4), getValues(krit5), getValues(krit6), getValues(krit7)])
  insertToTable(alt)
}

function insertToTable(alternative) {
  var mainTable = document.getElementById("mainTable").getElementsByTagName('tbody')[0];
  var newRow = mainTable.insertRow();
  newRow.insertCell(0).innerHTML = alternative.getName();
  newRow.insertCell(1).innerHTML = alternative.getAlternative(0);
  newRow.insertCell(2).innerHTML = alternative.getAlternative(1);
  newRow.insertCell(3).innerHTML = alternative.getAlternative(2);
  newRow.insertCell(4).innerHTML = alternative.getAlternative(3);
  newRow.insertCell(5).innerHTML = alternative.getAlternative(4);
  newRow.insertCell(6).innerHTML = alternative.getAlternative(5);
  newRow.insertCell(7).innerHTML = alternative.getAlternative(6);
  newRow.insertCell(8).innerHTML = '<button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteRow(this)"><i class="icon-trash"></i></button>';

}

function deleteRow(btn) {
  if (confirm('Ви впевнені, що хочете видалити цей супермаркет?')) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }
}



function getValues(krit) {
  let result = [];
  if (krit[0].checked == true) result.push(0);
  if (krit[1].checked == true) result.push(0.25);
  if (krit[2].checked == true) result.push(0.5);
  if (krit[3].checked == true) result.push(0.75);
  if (krit[4].checked == true) result.push(1);
  result = makeFull(result)
  return result;
}

function makeFull(result) {
  if (result == "") return 0.5;
  if (result.lenght == 1) return result;
  let newArr = [1];
  newArr[0] = Math.min(...result)
  maxVal = Math.max(...result)
  while (maxVal >= (newArr[newArr.length - 1] + 0.25)) {
    let lastel = newArr[newArr.length - 1] + 0.25;
    newArr.push(lastel);
  }
  return newArr;
}

function startCalculate(btn) {
  document.getElementById('resultContainer').removeAttribute('class', 'hidden-element')
  pesRes = document.getElementById('pesimismFunctionResult');
  optRes = document.getElementById('optimismFunctionResult');
  agrRes = document.getElementById('agregationFunctionResult');
  pesRes.innerHTML = "";
  optRes.innerHTML = "";
  agrRes.innerHTML = "";

  var tableInfo = getArrayFromTable("#mainTable");
  optimizeTable(tableInfo);
  makeTrapezoidalLT(tableInfo);
  addHTMLtoResult("<h3 class='text-center'>Матриця трапеційних ЛТ альтернативних рішень</h3>", pesRes);
  addHTMLtoResult("<h3 class='text-center'>Матриця трапеційних ЛТ альтернативних рішень</h3>", optRes)
  addHTMLtoResult("<h3 class='text-center'>Матриця трапеційних ЛТ альтернативних рішень</h3>", agrRes)
  arrayToTable(tableInfo, true, pesRes);
  arrayToTable(tableInfo, true, agrRes);
  arrayToTable(tableInfo, true, optRes);
  makeInteravalEstimate(tableInfo, document.getElementById('alphaValue').value);
  addHTMLtoResult("<h3 class='text-center'>Інтервальні оцінки</h3>", pesRes);
  addHTMLtoResult("<h3 class='text-center'>Інтервальні оцінки</h3>", optRes);
  arrayToTable(tableInfo, true, pesRes);
  arrayToTable(tableInfo, true, optRes);

  addHTMLtoResult("<h3 class='text-center'>Розрахунок песимістичної функції</h3>", pesRes)
  let minFuncArr = [];
  minFuncArr = makeOperationMin(tableInfo);
  let pesFuncArr = [];
  pesFuncArr = calculateProbabilityIndicators(minFuncArr);
  displayResult(pesFuncArr, pesRes);

  addHTMLtoResult("<h3 class='text-center'>Розрахунок оптимістичної функції</h3>", optRes)
  let maxFuncArr = [];
  maxFuncArr = makeOperationMax(tableInfo);
  let optFuncArr = [];
  optFuncArr = calculateProbabilityIndicators(maxFuncArr);
  displayResult(optFuncArr, optRes);

  var tableForAgregationMethod = getArrayFromTable("#mainTable");
  optimizeTable(tableForAgregationMethod);
  let combineTable = combineRows(tableForAgregationMethod);
  makeTrapezoidalLT(combineTable);
  addHTMLtoResult("<h3 class='text-center'>Агрегація трапеційних ЛТ</h5>", agrRes)
  arrayToTable(combineTable, false, agrRes);
  makeInteravalEstimate(combineTable, document.getElementById('alphaValue').value);
  addHTMLtoResult("<h3 class='text-center'>Інтервальні оцінки</h5>", agrRes)
  arrayToTable(combineTable, false, agrRes);
  let optimizeArr = optimizeBeforeProbability(combineTable)
  let agregFuncArr = calculateProbabilityIndicators(optimizeArr);
  addHTMLtoResult("<h3 class='text-center'>Розрахунок</h5>", agrRes)
  displayResult(agregFuncArr, agrRes);


  console.log(combineTable)
}

function getArrayFromTable(tableID) {
  var result = Array.prototype.map.call(document.querySelectorAll(tableID + ' tr'), function (tr) {
    return Array.prototype.map.call(tr.querySelectorAll('td'), function (td) {
      return td.innerHTML;
    });
  });
  return result;
}

/** 
 * Функція прибирає перший рядок та кнопку видалити. 
 * Також робить з елементів масиви, розділяючи їх за комою 
 */
function optimizeTable(table) {
  table.shift();
  for (let row in table) {
    table[row].pop();
  }
  for (let row in table) {
    for (let elements in table[row]) {
      if (elements != 0) {
        table[row][elements] = table[row][elements].split(',')
        for (let element in table[row][elements]) {
          table[row][elements][element] = +table[row][elements][element]
        }
      }
    }
  }
  return table;
}

//Робить дані для трапеційних ЛТ. Пропускає перший рядок, так як там там назви
function makeTrapezoidalLT(table) {
  for (let row in table) {
    for (let elements in table[row]) {
      if (elements != 0) {                          //окрім першого рядку з назвою
        if (table[row][elements].length == 1) {     //якщо лише один елемент, то продублювати його
          table[row][elements].push(table[row][elements][0])
        }
        table[row][elements] = [(Math.min(...table[row][elements])), (Math.max(...table[row][elements]))]
        //додавання на початок елемент -0.25, а у кінець +0.25
        let maxElement;
        let minElement;
        if (Math.max(...table[row][elements]) >= 1) { maxElement = 1; }
        else maxElement = Math.max(...table[row][elements]) + 0.25;
        if (Math.min(...table[row][elements]) <= 0) { minElement = 0; }
        else minElement = Math.min(...table[row][elements]) - 0.25;
        table[row][elements].push(maxElement);
        table[row][elements].unshift(minElement);
      }
    }
  }
  return table;
}

function combineRows(table) {
  for (let row in table) {
    let maxElement = table[row][1][0];
    let minElement = table[row][1][0];
    for (let elements in table[row]) {
      if (elements != 0) {                          //окрім першого рядку з назвою
        if (table[row][elements].length == 1) {     //якщо лише один елемент, то продублювати його
          table[row][elements].push(table[row][elements][0])
        }
        table[row][elements] = [(Math.min(...table[row][elements])), (Math.max(...table[row][elements]))]
        if (table[row][elements][1] > maxElement) maxElement = table[row][elements][1];
        if (table[row][elements][0] < minElement) minElement = table[row][elements][0];
      }
    }
    table[row] = [table[row][0], [minElement, maxElement]]
  }
  return table;
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

/** 
 * Перетворює масив у таблицю
 * @param {array} tableData Массив для перетвоерння
 * @param {boolean} haveHeader Чи показати заголовки (7 шт) 
*/
function arrayToTable(tableData, haveHeader, place) {
  var container = place;
  var border = document.createElement('div');
  border.setAttribute("class", "table-border table-responsive")
  var table = document.createElement('table');
  table.setAttribute('class', 'table table-borderless table-hover table-sm table-success')
  var tableBody = document.createElement('tbody');
  if (haveHeader == true) {
    table.insertRow(0).innerHTML = `<th scope="col">Назва</th>
    <th scope="col">Критерій 1</th>
    <th scope="col">Критерій 2</th>
    <th scope="col">Критерій 3</th>
    <th scope="col">Критерій 4</th>
    <th scope="col">Критерій 5</th>
    <th scope="col">Критерій 6</th>
    <th scope="col">Критерій 7</th>`
  }
  tableData.forEach(function (rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function (cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  border.appendChild(table);
  table.appendChild(tableBody);
  container.appendChild(border);
}

//
function makeInteravalEstimate(table, alpha) {
  for (let row in table) {
    for (let elements in table[row]) {
      if (elements != 0) {                          //окрім першого рядку з назвою
        let a1 = table[row][elements][0]
        let a2 = table[row][elements][1]
        let a3 = table[row][elements][2]
        let a4 = table[row][elements][3]
        let left = alpha * (a2 - a1) + a1;
        let right = a4 - alpha * (a4 - a3);
        table[row][elements] = [left, right]
      }
    }
  }
  return table;
}

//
function makeOperationMin(table) {
  let newArr = [];
  for (let row in table) {
    let min1 = table[row][1][0];
    let min2 = table[row][1][1];
    for (let elements in table[row]) {
      if (elements != 0) {                          //окрім першого рядку з назвою
        if (min1 > table[row][elements][0]) {
          min1 = table[row][elements][0];
        }
        if (min2 > table[row][elements][1]) {
          min2 = table[row][elements][1];
        }
      }
    }
    newArr.push([table[row][0], min1, min2])
  }
  return newArr
}

//
function makeOperationMax(table) {
  let newArr = [];
  for (let row in table) {
    let max1 = table[row][1][0];
    let max2 = table[row][1][1];
    for (let elements in table[row]) {
      if (elements != 0) {                          //окрім першого рядку з назвою
        if (max1 < table[row][elements][0]) {
          max1 = table[row][elements][0];
        }
        if (max2 < table[row][elements][1]) {
          max2 = table[row][elements][1];
        }
      }
    }
    newArr.push([table[row][0], max1, max2])
  }
  return newArr
}

function optimizeBeforeProbability(table) {
  let newArr = [];
  for (let row in table) {
    newArr.push([table[row][0], table[row][1][0], table[row][1][1]])
  }
  return newArr
}

//
function calculateProbabilityIndicators(FuncArr) {
  let result = [];
  for (let row in FuncArr) {
    result.push([FuncArr[row][0], (Math.max((1 - Math.max(((1 - FuncArr[row][1]) / (FuncArr[row][2] - FuncArr[row][1] + 1)), 0)), 0))])
  }
  return result
}

//
function displayResult(pesFuncArr, place) {
  let container = place;
  let resultDisplay = document.createElement('p');
  let result = [pesFuncArr[0][0], pesFuncArr[0][1]];
  for (let row in pesFuncArr) {
    resultDisplay.innerHTML += "Показник ймовірності у " + pesFuncArr[row][0] + " = " + pesFuncArr[row][1] + " <br>"
    if (result[1] < pesFuncArr[row][1]) result = [pesFuncArr[row][0], pesFuncArr[row][1]];
  }
  resultDisplay.innerHTML += "<br> <center><b>Кращий супермаркет " + result[0] + " з показником ймовірності " + result[1] + "</b></center>";
  container.appendChild(resultDisplay);
}

//
function addHTMLtoResult(html, place) {
  let container = place;
  let div = document.createElement('div');
  div.innerHTML = html;
  container.appendChild(div);
}