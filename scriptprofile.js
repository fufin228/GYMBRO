function updateProgressBar(input) {
    const max = parseInt(input.max, 10); // Преобразуем max в число
    let value = parseInt(input.value, 10); // Преобразуем введенное значение в число

    // Проверка, если значение не является числом (NaN), устанавливаем на 0
    if (isNaN(value)) {
        value = 0;
    }

    // Проверка, если значение больше максимального
    if (value > max) {
        value = max; // Устанавливаем value на максимальное, если превышает
    } else if (value < 0) {
        value = 0; // Устанавливаем value на 0, если меньше 0
    }

    input.value = value; // Обновляем значение поля ввода

    const fillBar = document.getElementById(`fill${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`);
    
    // Обновляем ширину прогресс-бара в зависимости от введенного значения
    if (fillBar) {
        fillBar.style.width = (value / max * 100) + '%';
    }
}



// Обработчики событий для существующих элементов ввода
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        updateProgressBar(this);
    });
});

// Функция для добавления новых полей ввода
function addNewInputs() {
    const container = document.getElementById('newInputsContainer');

    // Устанавливаем большие максимальные значения
    const newMaxDeadlift = 130; // Увеличено на 20
    const newMaxBenchPress = 100; // Увеличено на 20
    const newMaxBarbellSquat = 130; // Увеличено на 20
    const newMaxDaysGym = 40; // Увеличено на 10

    // Создаем новые элементы ввода и прогресс-бары с новыми максимальными значениями
    const newInputHTML = `
        <div class="input-container">
            <label for="newDeadlift">Deadlift (0-${newMaxDeadlift}):</label>
            <input type="number" id="newDeadlift" min="0" max="${newMaxDeadlift}" placeholder="0-${newMaxDeadlift}" required>
            <div class="progress-bar">
                <div class="fill" id="fillNewDeadlift"></div>
            </div>
        </div>
        <div class="input-container">
            <label for="newBenchPress">Bench press (0-${newMaxBenchPress}):</label>
            <input type="number" id="newBenchPress" min="0" max="${newMaxBenchPress}" placeholder="0-${newMaxBenchPress}" required>
            <div class="progress-bar">
                <div class="fill" id="fillNewBenchPress"></div>
            </div>
        </div>
        <div class="input-container">
            <label for="newBarbellSquat">Barbell squat (0-${newMaxBarbellSquat}):</label>
            <input type="number" id="newBarbellSquat" min="0" max="${newMaxBarbellSquat}" placeholder="0-${newMaxBarbellSquat}" required>
            <div class="progress-bar">
                <div class="fill" id="fillNewBarbellSquat"></div>
            </div>
        </div>
        <div class="input-container">
            <label for="newDaysGym">Days in the gym (0-${newMaxDaysGym}):</label>
            <input type="number" id="newDaysGym" min="0" max="${newMaxDaysGym}" placeholder="0-${newMaxDaysGym}" required>
            <div class="progress-bar">
                <div class="fill" id="fillNewDaysGym"></div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', newInputHTML);

    // Добавляем обработчики событий для новых элементов ввода
    const newInputs = container.querySelectorAll('input[type="number"]');
    newInputs.forEach(input => {
        input.addEventListener('input', function() {
            updateProgressBar(this);
        });
    });
}

// Обработчик нажатия на кнопку добавления новых полей
document.getElementById('addNewInputsButton').addEventListener('click', addNewInputs);