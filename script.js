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
        reps = 10; 
    }

    return { sets, reps };
}

async function getWorkoutProgram() {
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

    const numberOfExercises = parseInt(document.getElementById('numberOfExercises').value) || 5;

    try {
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

        const data = await response.json();

        const filteredExercises = data.results.slice(0, numberOfExercises).map(exercise => {
            const { sets, reps } = generateRepsAndSets(inputData.goals, inputData.fitnessLevel);

            return `- ${exercise.name}: ${sets} подхода(-ов) по ${reps} повторений`;
        });

        const workoutProgram = filteredExercises.join('\n') || 'API вернуло пустой список упражнений.';
        document.getElementById('workoutProgram').innerText = workoutProgram;

        localStorage.setItem('workoutProgram', workoutProgram);

    } catch (error) {
        console.error('Ошибка при получении программы:', error);
        document.getElementById('workoutProgram').innerText = 'Произошла ошибка при получении программы тренировок.';
    }
}

document.getElementById('submitButton').addEventListener('click', getWorkoutProgram);
