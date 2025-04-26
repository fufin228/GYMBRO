document.getElementById('submitButton').addEventListener('click', generateWorkout);

function generateWorkout() {
    const goal = document.getElementById('goal').value;
    const level = document.getElementById('level').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const time = document.getElementById('time').value;
    const place = document.getElementById('place').value;
    const numberOfExercises = parseInt(document.getElementById('numberOfExercises').value);

    if (!goal || !level || !height || !weight || !age || !gender || !time || !place || !numberOfExercises) {
        alert("Please fill out all fields!");
        return;
    }

    const days = parseInt(time);

    const exercises = {
        "Weight Loss": {
            "Beginner": [
                "Walking",
                "Bodyweight Squats",
                "Push-Ups",
                "Lunges",
                "Mountain Climbers",
                "Jumping Jacks",
                "Crunches",
                "Plank",
                "High Knees",
                "Step-Ups",
                "Squat Jumps",
                "Jump Rope",
                "Glute Bridges",
                "Leg Raises"
            ],
            "Intermediate": [
                "Burpees",
                "Jump Squats",
                "High Knees",
                "Push-Ups",
                "Bodyweight Rows",
                "Plank",
                "Lateral Raises with Dumbbells",
                "Leg Raises",
                "Kettlebell Swings",
                "Mountain Climbers with Twist",
                "Alternating Lunges",
                "Skater Jumps",
                "Box Jumps",
                "Jumping Lunges"
            ],
            "Advanced": [
                "Sprints",
                "Jumping Lunges",
                "Box Jumps",
                "Burpees with Push-Up",
                "Mountain Climbers with Twist",
                "Plank to Push-Up",
                "Jump Rope",
                "Tuck Jumps",
                "Medicine Ball Slams",
                "Kettlebell Snatches",
                "Battle Ropes",
                "Barbell Thrusters",
                "Wall Balls",
                "Clapping Push-Ups"
            ]
        },
        "Muscle Gain": {
            "Beginner": [
                "Bodyweight Squats",
                "Push-Ups",
                "Dumbbell Rows",
                "Lunges",
                "Tricep Dips",
                "Glute Bridges",
                "Plank",
                "Superman Hold",
                "Dumbbell Chest Press",
                "Dumbbell Shoulder Press",
                "Bicep Curls with Dumbbells",
                "Tricep Kickbacks"
            ],
            "Intermediate": [
                "Deadlifts",
                "Barbell Squats",
                "Barbell Bench Press",
                "Pull-Ups",
                "Overhead Dumbbell Press",
                "Barbell Rows",
                "Leg Press",
                "Incline Bench Press",
                "Dumbbell Lateral Raises",
                "Bulgarian Split Squats",
                "Barbell Bicep Curls",
                "Skull Crushers",
                "Barbell Hip Thrusts",
                "Hammer Curls"
            ],
            "Advanced": [
                "Deadlifts (Heavy)",
                "Barbell Squats (Heavy)",
                "Muscle-Ups",
                "Weighted Pull-Ups",
                "Incline Bench Press",
                "Barbell Lunges",
                "Tire Flips",
                "Barbell Shrugs",
                "Snatch",
                "Clean and Jerk",
                "Kettlebell Swings (Heavy)",
                "Overhead Squats",
                "Pull-Up with Weighted Vest",
                "Barbell Clean"
            ]
        },
        "Endurance Improvement": {
            "Beginner": [
                "Jogging",
                "Cycling",
                "Walking Lunges",
                "Push-Ups",
                "Plank",
                "Jump Rope",
                "Step-Ups",
                "Squat Jumps",
                "Burpees",
                "Russian Twists",
                "Mountain Climbers",
                "Side Planks",
                "Glute Kickbacks",
                "Triceps Dips"
            ],
            "Intermediate": [
                "Running Intervals",
                "Burpees",
                "Mountain Climbers",
                "Jumping Jacks",
                "Kettlebell Swings",
                "Push-Ups",
                "Plank",
                "Box Jumps",
                "Knee Tuck Jumps",
                "Alternating Leg Raises",
                "Dumbbell Snatches",
                "Jump Rope",
                "Step-Ups with Weights",
                "Flutter Kicks"
            ],
            "Advanced": [
                "HIIT Circuit",
                "Sprints with Burpees",
                "Plyometric Jumps",
                "Pull-Ups",
                "Push-Ups with Clap",
                "Mountain Climbers with Twist",
                "Jump Rope",
                "Jumping Lunges",
                "Wall Climbers",
                "Kettlebell Thrusters",
                "Tuck Jumps",
                "Lateral Box Jumps",
                "Burpee Box Jumps",
                "Long Jump Sprints"
            ]
        }
    };

    let selectedExercises = [];

    // Выбираем упражнения в зависимости от цели и уровня
    if (goal === "Weight Loss") {
        selectedExercises = exercises["Weight Loss"][level];
    } else if (goal === "Muscle Gain") {
        selectedExercises = exercises["Muscle Gain"][level];
    } else if (goal === "Endurance Improvement") {
        selectedExercises = exercises["Endurance Improvement"][level];
    } else {
        alert("Invalid goal selected!");
        return;
    }

    let workoutPlan = "";

    // Генерация плана на выбранное количество дней
    for (let day = 1; day <= days; day++) {
        workoutPlan += `<h3>Day ${day}</h3><ul>`;
        let dayExercises = [];

        for (let i = 0; i < numberOfExercises; i++) {
            const randomExercise = selectedExercises[Math.floor(Math.random() * selectedExercises.length)];
            dayExercises.push(randomExercise);
        }

        // Убираем дублирующиеся упражнения
        const uniqueExercises = [...new Set(dayExercises)].slice(0, numberOfExercises);

        uniqueExercises.forEach(exercise => {
            workoutPlan += `<li>${exercise} — 4 sets of 8–12 reps</li>`;
        });

        workoutPlan += `</ul>`;
    }

    document.getElementById('workoutProgram').innerHTML = workoutPlan;
}
