// Функция для получения программы тренировок
async function getWorkoutProgram() {
    // Собираем данные из формы
    const inputData = {
        goals: document.getElementById('goal').value,
        fitnessLevel: document.getElementById('level').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        equipment: document.getElementById('equipment').value,
        time: document.getElementById('time').value
    };

    try {
        // Отправляем запрос к API OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-Jfdsxj0QGVWoX0q0zLTYMzoNSDRQqm2G4un_LPrvWGT3BlbkFJOWxTsqJ0F4B8cg28WJIWrMoP8XDpaFjLkw1fgFMkkA' // Замените на ваш ключ API
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Создай программу тренировок для следующих данных: ${JSON.stringify(inputData)}`
                    }
                ]
            })
        });

        // Проверяем, получен ли ответ
        if (response.status === 429) {
            // Если ошибка 429, подождите и попробуйте снова
            console.error('Слишком много запросов. Пожалуйста, подождите и попробуйте снова.');
            setTimeout(getWorkoutProgram, 5000); // Подождите 5 секунд и повторите запрос
            return;
        }

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // Получаем и обрабатываем данные
        const data = await response.json();
        const workoutProgram = data.choices[0].message.content;

        // Отображаем программу на странице
        document.getElementById('workoutProgram').innerText = workoutProgram;

    } catch (error) {
        // Обрабатываем ошибки
        console.error('Ошибка при получении программы:', error);
        document.getElementById('workoutProgram').innerText = 'Произошла ошибка при получении программы тренировок.';
    }
}

// Обработчик для кнопки отправки
document.getElementById('submitButton').addEventListener('click', getWorkoutProgram);


