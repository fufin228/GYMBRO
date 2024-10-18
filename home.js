// script.js

async function getWorkoutProgram() {
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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sk-hPKuSPPcw9NJYQrAvBOmSVG9ks6IYjhtsclxT6PsMtT3BlbkFJD1F9_sOWK-HOoImOp1iFGy99AX2bcZgQa90qKfWJAA' // Замените на ваш ключ API
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Составь программу тренировок для следующих данных: ${JSON.stringify(inputData)}`
                }
            ]
        })
    });

    const data = await response.json();
    const workoutProgram = data.choices[0].message.content;
    document.getElementById('workoutProgram').innerText = workoutProgram; // Выводим программу в контейнер
}

// Добавляем обработчик события на кнопку
document.getElementById('submitButton').addEventListener('click', getWorkoutProgram);
