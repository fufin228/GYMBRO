// Функция для генерации рекомендаций по повторениям и подходам
function generateRepsAndSets(goal, fitnessLevel) {
    let sets, reps;

    if (goal === 'сила') {
        sets = fitnessLevel === 'начинающий' ? 3 : 5;
        reps = fitnessLevel === 'начинающий' ? 6 : 4;
    } else if (goal === 'кардио') {
        sets = 3;
        reps = fitnessLevel === 'начинающий' ? 15 : 20;
    } else if (goal === 'выносливость') {
        sets = fitnessLevel === 'начинающий' ? 3 : 4;
        reps = fitnessLevel === 'начинающий' ? 12 : 15;
    } else {
        sets = 3;
        reps = 10; // Значения по умолчанию
    }

    return { sets, reps };
}

// Функция для получения тренировочной программы
async function getWorkoutProgram() {
    // Собираем данные из формы
    const inputData = {
        goals: document.getElementById('goal').value.toLowerCase(),
        fitnessLevel: document.getElementById('level').value.toLowerCase(),
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        equipment: document.getElementById('equipment').value.toLowerCase(),
        time: document.getElementById('time').value
    };

    // Получаем количество упражнений из поля ввода
    const numberOfExercises = parseInt(document.getElementById('numberOfExercises').value) || 5;

    try {
        // Отправляем запрос к WGER API для получения упражнений
        const response = await fetch('https://wger.de/api/v2/exercise/?language=2', {
            method: 'GET',
            headers: {
                'Authorization': 'Token 35e79fb328590e9363fc67f12f080c547d8c5f9c', // Замените на ваш API-токен
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // Обрабатываем данные
        const data = await response.json();

        // Ограничиваем список упражнений по числу, выбранному пользователем
        const filteredExercises = data.results.slice(0, numberOfExercises).map(exercise => {
            // Генерируем рекомендации по повторениям и подходам
            const { sets, reps } = generateRepsAndSets(inputData.goals, inputData.fitnessLevel);

            // Формируем строку для упражнения
            return `- ${exercise.name}: ${sets} подхода(-ов) по ${reps} повторений`;
        });

        // Отображаем упражнения на странице
        const workoutProgram = filteredExercises.join('\n') || 'API вернуло пустой список упражнений.';
        document.getElementById('workoutProgram').innerText = workoutProgram;

        // Сохраняем программу тренировок в localStorage
        localStorage.setItem('workoutProgram', workoutProgram);

    } catch (error) {
        // Обрабатываем ошибки
        console.error('Ошибка при получении программы:', error);
        document.getElementById('workoutProgram').innerText = 'Произошла ошибка при получении программы тренировок.';
    }
}

// Обработчик для кнопки отправки
document.getElementById('submitButton').addEventListener('click', getWorkoutProgram);
