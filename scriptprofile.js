// Загружаем программу тренировок из localStorage и отображаем на странице
const workoutProgram = localStorage.getItem('workoutProgram');
const profileWorkoutProgram = document.getElementById('profileWorkoutProgram');

if (workoutProgram) {
    profileWorkoutProgram.innerText = workoutProgram;
} else {
    profileWorkoutProgram.innerText = 'No workout program found.';
}