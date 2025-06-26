// Index
function goToHomepage() {
    window.location.href = "homepage.html";
}

// Quiz
const questions = [
    {
      question: "What is the main goal of sustainable fashion?",
      options: [
        "To reduce costs for manufacturers",
        "To follow seasonal fashion trends",
        "To minimize environmental and social impact",
        "To use synthetic materials"
      ],
      answer: 2
    },
    {
      question: "Which fabric is considered the most sustainable?",
      options: [
        "Polyester",
        "Organic cotton",
        "Nylon",
        "Acrylic"
      ],
      answer: 1
    },
    {
      question: "What does 'slow fashion' emphasize?",
      options: [
        "Fast production",
        "Seasonal sales",
        "Durable, ethical clothing",
        "International shipping"
      ],
      answer: 2
    },
    {
      question: "Which of the following is a recycled material used in sustainable fashion?",
      options: [
        "Lycra",
        "Viscose",
        "Econyl",
        "Rayon"
      ],
      answer: 2
    },
    {
      question: "How much water does it take to produce one cotton T-shirt (approx.)?",
      options: [
        "500 liters",
        "1,000 liters",
        "2,700 liters",
        "5,000 liters"
      ],
      answer: 2
    },
    {
      question: "Which of these is a second-hand fashion platform?",
      options: [
        "FastCo",
        "Zara",
        "thredUP",
        "Vercel"
      ],
      answer: 2
    },
    {
      question: "What is upcycling in fashion?",
      options: [
        "Disposing unused clothes",
        "Reusing textiles for cleaning",
        "Turning old clothes into new fashion items",
        "Donating clothes"
      ],
      answer: 2
    },
    {
      question: "What type of dye is more eco-friendly?",
      options: [
        "Acid dye",
        "Synthetic dye",
        "Natural plant-based dye",
        "Neon dye"
      ],
      answer: 2
    },
    {
      question: "Which certification ensures ethical textile production?",
      options: [
        "ISO 2001",
        "FSC",
        "OEKO-TEX",
        "RAM"
      ],
      answer: 2
    },
    {
      question: "What percent of global carbon emissions comes from fashion?",
      options: [
        "2%",
        "5%",
        "10%",
        "15%"
      ],
      answer: 2
    },
    {
      question: "What’s the problem with fast fashion?",
      options: [
        "High prices",
        "Ethical labor practices",
        "Waste and pollution",
        "Minimal advertising"
      ],
      answer: 2
    },
    {
      question: "Which practice helps reduce textile waste?",
      options: [
        "Landfilling",
        "Frequent shopping",
        "Clothing swaps",
        "Incineration"
      ],
      answer: 2
    },
    {
      question: "Which brand is known for sustainability efforts?",
      options: [
        "Shein",
        "Patagonia",
        "Boohoo",
        "H&M (Conscious)"
      ],
      answer: 1
    },
    {
      question: "What is the purpose of a fashion footprint calculator?",
      options: [
        "Track fashion trends",
        "Estimate environmental impact of clothing",
        "Calculate taxes",
        "Choose outfit colors"
      ],
      answer: 1
    },
    {
      question: "What’s the benefit of buying second-hand clothes?",
      options: [
        "Low quality",
        "More waste",
        "Reduces resource consumption",
        "Increases production"
      ],
      answer: 2
    }
  ];

  while (questions.length < 15) {
    questions.push({
      question: `Dummy Question ${questions.length + 1}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: Math.floor(Math.random() * 4)
    });
  }
  
  let userAnswers = [];
  
  window.onload = function () {
    // Only show quiz modal if this is the quiz page
    if (document.body.classList.contains("quiz-page")) {
      document.getElementById("instructionModal").style.display = "flex";
    }
  };
  
  let currentPage = 1;
  let questionsPerPage = 5;
  
  function startQuiz() {
    document.getElementById("instructionModal").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    renderQuestions(currentPage);
    window.scrollTo(0, 0); // Scroll to top just in case
  }
  
  function renderQuestions(page) {
    const form = document.getElementById("quizForm");
    form.innerHTML = "";
  
    const start = (page - 1) * questionsPerPage;
    const end = Math.min(start + questionsPerPage, questions.length);
  
    for (let i = start; i < end; i++) {
      const q = questions[i];
      const qDiv = document.createElement("div");
      qDiv.className = "question";
      qDiv.id = `question-${i}`;
  
      qDiv.innerHTML = `<p><strong>Q${i + 1}:</strong> ${q.question}</p>`;
  
      q.options.forEach((opt, j) => {
        const optId = `q${i}-opt${j}`;
        const checked = userAnswers[i] === j ? "checked" : "";
      
        qDiv.innerHTML += `
          <div class="option-block">
            <input type="radio" name="q${i}" value="${j}" id="${optId}" ${checked}>
            <label for="${optId}">${opt}</label>
          </div>`;
      });      
  
      form.appendChild(qDiv);
    }
  
    // Navigation Buttons
    const navDiv = document.createElement("div");
    navDiv.style.textAlign = "center";
    navDiv.style.marginTop = "30px";
  
    if (page > 1) {
      navDiv.innerHTML += `<button onclick="goToPage(${page - 1})" class="start-btn">Previous</button> `;
    }
    if (page < Math.ceil(questions.length / questionsPerPage)) {
      navDiv.innerHTML += `<button onclick="goToPage(${page + 1})" class="start-btn">Next</button>`;
    } else {
        navDiv.innerHTML += `<button type="button" onclick="submitQuiz()" class="start-btn">Submit Quiz</button>`;

    }
  
    form.appendChild(navDiv);
  }
  
  function goToPage(page) {
    saveAnswers();
    currentPage = page;
    renderQuestions(page);
    window.scrollTo(0, 0);
  }
  
  function saveAnswers() {
    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected) {
        userAnswers[index] = parseInt(selected.value);
      }
    });
  }  
  
  function submitQuiz() {
    saveAnswers(); // Capture all user answers
    let score = 0;
    let allAnswered = true;
  
    // Loop to check answers
    for (let i = 0; i < questions.length; i++) {
      const selectedIndex = userAnswers[i];
      const questionDiv = document.getElementById(`question-${i}`);
      if (questionDiv) {
        questionDiv.classList.remove("correct", "wrong");
      }
  
      if (selectedIndex === undefined || selectedIndex === null) {
        allAnswered = false;
      } else if (selectedIndex === questions[i].answer) {
        score++;
      }
    }
  
    if (!allAnswered) {
      showUnansweredModal();
      return;
    }
  
    // Show result modal
    document.getElementById("scoreText").textContent = `You scored ${score} out of ${questions.length}.`;
    document.getElementById("resultModal").style.display = "flex";
  }
  
  function showUnansweredModal() {
    document.getElementById("unansweredModal").style.display = "flex";
  }
  
  function closeUnansweredModal() {
    document.getElementById("unansweredModal").style.display = "none";
  }
  
  
  function retryQuiz() {
    document.getElementById("resultModal").style.display = "none";
    document.getElementById("quizForm").innerHTML = "";
    userAnswers = [];
    startQuiz();
  }
  
  function reviewAnswers() {
    document.getElementById("resultModal").style.display = "none";
  
    const form = document.getElementById("quizForm");
    form.innerHTML = ""; // Clear previous form
  
    questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.id = `question-${index}`;
  
      questionDiv.innerHTML = `<p><strong>Q${index + 1}:</strong> ${q.question}</p>`;
  
      q.options.forEach((opt, i) => {
        const selected = userAnswers[index];
        const isChecked = selected === i ? "checked" : "";
  
        questionDiv.innerHTML += `
          <label>
            <input type="radio" name="q${index}" value="${i}" ${isChecked} disabled>
            ${opt}
          </label><br>`;
      });
  
      // Add correct/wrong styling
      if (userAnswers[index] === q.answer) {
        questionDiv.classList.add("correct");
      } else {
        questionDiv.classList.add("wrong");
      }
  
      form.appendChild(questionDiv);
    });
  
    // Add Try Again button
    const retryBtn = document.createElement("div");
    retryBtn.style.textAlign = "center";
    retryBtn.style.marginTop = "30px";
    retryBtn.innerHTML = `<button onclick="retryQuiz()" class="start-btn">Try Again</button>`;
    form.appendChild(retryBtn);
  
    window.scrollTo(0, 0);
  }

  //Calculator
  function startCalculator() {
    document.getElementById("calculatorModal").style.display = "none";
    document.getElementById("calculatorContainer").style.display = "block";
  }
  
  // Sync Q3 - purchase method
  function syncQ3() {
    const online = document.getElementById("q3-online");
    const onlineOutput = document.getElementById("q3-online-output");
    const instore = document.getElementById("q3-instore");
    const instoreOutput = document.getElementById("q3-instore-output");
  
    let val = parseInt(online.value);
    onlineOutput.textContent = `${val}%`;
    instore.value = 100 - val;
    instoreOutput.textContent = `${100 - val}%`;
  }
  
  // Sync Q10 - disposal method
  function syncQ10() {
    const trash = document.getElementById("q10-trash");
    const trashOutput = document.getElementById("q10-trash-output");
    const donate = document.getElementById("q10-donate");
    const donateOutput = document.getElementById("q10-donate-output");
  
    let val = parseInt(trash.value);
    trashOutput.textContent = `${val}%`;
    donate.value = 100 - val;
    donateOutput.textContent = `${100 - val}%`;
  }
  
  // Show "100+" on max values
  function updateOutputPlus(inputId) {
    const input = document.getElementById(inputId);
    const output = input.nextElementSibling;
    output.textContent = input.value == input.max ? `${input.value}+` : input.value;
  }
  
  
  function calculateFootprint() {
    const scoreMap = { low: 1, medium: 2, high: 3 };
    let scores = [];
  
    // Q1: Frequency
    const freq = document.querySelector('input[name="q1"]:checked')?.value;
    if (["very often", "often"].includes(freq)) scores.push("high");
    else if (freq === "moderate") scores.push("medium");
    else scores.push("low");
  
    // Q2: Items bought
    const q2 = parseInt(document.getElementById("q2").value);
    if (q2 <= 30) scores.push("low");
    else if (q2 <= 60) scores.push("medium");
    else scores.push("high");
    
  
    // Q3: Purchase method
    const online = parseInt(document.getElementById("q3-online").value);
    const inStore = 100 - online;
    if (inStore > online) scores.push("low");
    else if (online === inStore) scores.push("medium");
    else scores.push("high");
  
    // Q4: Returns
    const q4 = parseInt(document.getElementById("q4").value);
    if (q4 <= 30) scores.push("low");
    else if (q4 <= 60) scores.push("medium");
    else scores.push("high");
  
    // Q5: Second-hand %
    const q5 = parseInt(document.getElementById("q5").value);
    if (q5 <= 30) scores.push("high");
    else if (q5 <= 60) scores.push("medium");
    else scores.push("low");
  
    // Q6: Laundry loads
    const q6 = parseInt(document.getElementById("q6").value);
    if (q6 <= 4) scores.push("low");
    else if (q6 <= 7) scores.push("medium");
    else scores.push("high");
  
    // Q7: Washing + Drying
    const wash = document.querySelector('input[name="wash"]:checked')?.value;
    const dry = document.querySelector('input[name="dry"]:checked')?.value;
    scores.push(wash === "cold" ? "low" : wash === "both" ? "medium" : "high");
    scores.push(dry === "air" ? "low" : dry === "both" ? "medium" : "high");
  
    // Q8: Dry-clean
    const q8 = parseInt(document.getElementById("q8").value);
    if (q8 <= 4) scores.push("low");
    else if (q8 <= 7) scores.push("medium");
    else scores.push("high");
  
    // Q9: Repair
    const q9 = parseInt(document.getElementById("q9").value);
    if (q9 <= 4) scores.push("low");
    else if (q9 <= 7) scores.push("medium");
    else scores.push("high");
  
    // Q10: Disposal method
    const trash = parseInt(document.getElementById("q10-trash").value);
    const donate = 100 - trash;
    if (donate > trash) scores.push("low");
    else if (trash === donate) scores.push("medium");
    else scores.push("high");
  
    // Q11: Items disposed
    const q11 = parseInt(document.getElementById("q11").value);
    if (q11 <= 30) scores.push("low");
    else if (q11 <= 60) scores.push("medium");
    else scores.push("high");
      
// Calculate score

let total = scores.reduce((sum, s) => sum + scoreMap[s], 0);
let avg = total / scores.length;

let resultText, icon, description;

if (avg <= 1.5) {
  resultText = "Low Fashion Footprint 🌱";
  icon = "🌱";
  description = "You're doing great! Your fashion habits have a minimal impact on the environment.";
} else if (avg <= 2.2) {
  resultText = "Moderate Fashion Footprint 🌿";
  icon = "🌿";
  description = "You're on the right track, but there’s room for improvement in your fashion choices.";
} else {
  resultText = "High Fashion Footprint 🌍";
  icon = "🌍";
  description = "Your fashion habits have a big impact. Let’s find ways to reduce it together!";
}

document.getElementById("resultHeading").textContent = resultText;
document.getElementById("resultIcon").textContent = icon;
document.getElementById("resultDescription").textContent = description;
document.getElementById("resultModal").style.display = "flex";

  }  

  function retryCalculator() {
    document.getElementById("resultModal").style.display = "none";
    document.getElementById("calculatorForm").reset();
    document.getElementById("calculatorContainer").scrollIntoView({ behavior: "smooth" });
  }
  
  
  function closeResultModal() {
    document.getElementById("resultModal").style.display = "none";
  }

  //Inspiration Section
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 20; // card width + gap

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });






  
  
  





