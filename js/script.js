function setPromt() {
  const holiday = document.getElementById('Select3').value;
  const recipientGender = document.querySelector('input[name="gridRadios"]:checked').value;
  const formality = document.querySelector('input[name="gridRadios1"]:checked').value;

  const greeting1 = generateGreeting(holiday, recipientGender, formality);
  const greeting2 = generateGreeting(holiday, recipientGender, formality);
  const greeting3 = generateGreeting(holiday, recipientGender, formality);

  document.querySelector('.res1').textContent = greeting1;
  document.querySelector('.res2').textContent = greeting2;
  document.querySelector('.res3').textContent = greeting3;
}

// function generateGreeting(holiday, recipientGender, formality) {
//   // Modify this function to generate greetings based on the parameters
//   // Example:
//   const greeting = getRandomElement(phrases.greetings);
//   const wish = holiday === "1" ? "Happy New Year" : getRandomElement(phrases.wishes); // Example for holiday
//   // Add more logic here based on recipientGender and formality

//   return `${greeting}, ${wish}.`; // Modify this line as needed
// }

// Rest of the code remains the same


// const phrases = {
//   greetings: ["Вітаю з днем народження!", "З днем народження!", "Привіт! З днем народження!", "Вітаю з чудовим святом. Твоїм днем народження!"],
//   wishes: ["Бажаю тобі чудово провести цей день!", "Насолодись своїм днем.", "Бажаю чудово провести час!", "Бажаю гарно провести час із близькими."],
//   gratitude: ["А також щастя тобі, здоров'я і добробуту!", "Ще бажаю здійснення своїх мрій!", "Бажаю щоб в тебе все було чудово!", "Всього найкращого!"],
//   concludingRemarks: ["Добре провести час!", "Побачимось!", "Ще раз з днем народження!", "Ну, бувай!"]
// };

const phrases = {
  greetings: ["Вітаю з Днем народження!", "З Днем народження!", "Привіт! З днем народження!", "Вітаю тебе з твоїм днем народження!", "Щирі вітання з днем народження!", "Сердечно вітаю тебе з днем народження!", "З найкращими побажаннями в твій день народження!", "Від щирого серця вітаю з Днем народження!", "Теплі вітання з днем народження!", "Вітаю з твоїм Днем народження!", "Прийми мої найщиріші вітання з Днем народження!"],
  greetings_ny: ["Вітаю з Новим роком!", "З Новим роком!", "Привіт! З Новим роком!", "Вітаю тебе з Новим роком!", "Щирі вітання з Новим роком!", "З найкращими побажаннями в Новий рік!", "Від щирого серця вітаю з Новим роком!", "Теплі вітання з Новим роком!"],
  wishes: ["Нехай цей день принесе багато щастя і буде наповнений радістю та теплом!", "Бажаю тобі яскравих вражень у житті та здійснення всіх мрій!", "Нехай цей день буде особливим і повен приємних сюрпризів!", "Нехай цей день буде легким і радісним!","Бажаю безмежної щасливості, море радості та веселощів!", "Нехай цей рік принесе тобі нові досягнення і великі успіхи.", "Бажаю бути таким же мужнім, сильним та успішним", "Бажаю тобі безмежної радості і щасливих моментів у житті.", "Нехай кожен новий день приносить тобі нові досягнення і перемоги.", "Щоб здоров\'я завжди було на висоті і ти завжди був на піку форми.", "Нехай усі твої мрії здійснюються, а плани здійснюються без зайвих зусиль.", "Бажаю тобі великої кількості незабутніх моментів разом з родиною і друзями.", "Нехай успіх супроводжує тебе в усіх твоїх начинаннях і проектах.", "Бажаю тобі завжди знаходити в собі сили і впевненість для подолання будь-яких труднощів.", "Нехай твоя кар\'єра розвивається і приносить великі доходи.", "Бажаю тобі відкривати нові горизонти і досліджувати світ.", "Нехай твоя улублена робота приносить задоволення і творче задоволення.", "Бажаю тобі безмежного кохання і підтримки від тих, кого ти любиш.", "Нехай усі твої проекти і плани будуть вдалими і успішними.", "Бажаю тобі великої душевної гармонії і спокою.", "Нехай кожен день твого життя буде наповнений сміхом і радістю.", "Бажаю тобі завжди залишатися тим же чудовим чоловіком, яким ти є сьогодні."],
  gratitude: ["Ну і звісно, щастя тобі, здоров'я і добробуту!", "Вдячний за всі хороші моменти разом!", "Спасибі за твою підтримку та розуміння!", "Дякую за твою дружбу та товариство!", "Будь завжди здоровим і щасливим.", "Будь завжди успішним у всіх своїх починаннях.", "Будь завжди оточений сім'єю і друзями, які тебе підтримують.", "Будь завжди навколо красивих і незабутніх моментів.", "Будь завжди надихаючим і відданим своїм цілям.", "Будь завжди готовим до нових пригод і викликів.", "Будь відкритим для нових ідей і можливостей.", "Будь завжди сповненим ентузіазму та енергії.", "Будь завжди уважним і добрим до інших.", "Будь завжди обдарованим гармонією і миром.", "Будь завжди вірним своїм принципам і цінностям.", "Продовжуй і надалі радувати всіх своєю присутністю.", "Продовжуй і надалі умілим у вирішенні складних завдань."],
  concludingRemarks: ["І нехай удача завжди буде поряд!", "І нехай цей рік принесе тобі безмежну радість і щасливі моменти!", "І нехай твої мрії стаються реальністю, одна за одною!", "І нехай здоров'я завжди береже тебе і дарує силу для досягнень!", "І нехай твій день народження буде наповнений сміхом та веселощами!", "І нехай кохання та щастя супроводжують тебе кожен день життя!", "І нехай твоя кар'єра розвивається і приносить успіхи!", "І щоб був ти завжди оточений близькими та друзями!", "І щоб кожен новий день приносив незабутні враження та пригоди!", "І нехай відкриються нові можливості і горизонти перед тобою!", "І щоб ти завжди був молодим душею та серцем!", "І нехай цей день народження буде справді особливим для тебе!"]
};


function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateGreeting(holiday, recipientGender, formality) {
  const greeting = holiday === "1" ? getRandomElement(phrases.greetings_ny) : getRandomElement(phrases.greetings); 
  const wish = getRandomElement(phrases.wishes);
  const gratitude = getRandomElement(phrases.gratitude);
  const concludingRemark = getRandomElement(phrases.concludingRemarks);
  //const wish = holiday === "1" ? "Happy New Year" : (holiday === "0" ? "Birthday" : getRandomElement(phrases.greetings_bd));

  return `${greeting} ${wish} ${gratitude} ${concludingRemark}`;
}


/**
Вітаємо тебе з чудовим і радісним святом! Бажаємо безмежної щасливості, море радості та веселощів у цей особливий день. Нехай тобі супроводжує удача, і нехай всі твої мрії збуваються!

Від щирого серця вітаємо з Днем народження! Нехай цей рік принесе тобі нові досягнення і великі успіхи. Здоров'я, кохання та щасливих моментів в житті!

Вітаємо тебе з особливим днем народження! Бажаємо багато незабутніх митей, приємних сюрпризів та найкращих подарунків. Нехай цей день буде сповнений радістю та позитивом!

З нагоди твого Дня народження хочемо побажати тобі безмежної гармонії в житті, яскравих моментів і великих досягнень. Нехай цей рік стане для тебе початком нових надзвичайних пригод!

Вітаємо тебе із святом народження, дорогий друге! Бажаємо тобі багато здоров'я, щасливих митей та незабутніх подарунків. Нехай кожен день твого життя буде сповнений радістю і усмішками!

Вітаємо тебе з чудовим святом! Нехай цей день буде сповнений радістю, щастям та незабутніми миттєвостями. Бажаємо здоров'я, успіхів та виконання всіх твоїх мрій!

Вітаємо з найщасливішим днем у році! Нехай цей рік приносить тобі лише позитивні емоції та незабутні миттєвості. Бажаємо світлого майбутнього та величезної кількості усмішок!

З найкращими побажаннями у твій особистий святковий день! Бажаємо щасливої долі, здоров'я, благополуччя та радості від життя. Нехай цей рік принесе тобі безмежне щастя!

Хай цей день буде сповнений радістю, сміхом та безмежними можливостями. Бажаємо тобі впевненості у собі, тепла від рідних та друзів, а також реалізації всіх твоїх планів та мрій!

Вітаємо зі святом народження! Бажаємо найкращих вражень, море приємних сюрпризів та щасливих моментів. Нехай ця нова сторінка життя принесе тобі найбільше радості та незабутніх спогадів!




 */