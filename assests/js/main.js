// ========================== Loader Section Start ========================

const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
	loader.style.display = "none"
})

// ========================== Loader Section End ========================


// ========================== Circle Progressbar Start ==========================

const circles = document.querySelectorAll('.circle');
circles.forEach(elem =>{
		let dots = elem.getAttribute('data-dots')
		let marked = elem.getAttribute('data-percent');
		let percent = Math.floor(dots*marked/100);
		let rotate = 360/dots;
		let points = "";
		for (let i = 0; i < dots; i++) {
				 points += `<div class="points" style="--i: ${i}; --rot: ${rotate}deg"></div>`;
		}
		elem.innerHTML = points;

		const pointsMarked = elem.querySelectorAll('.points');
		for (let i = 0; i < percent; i++) {
				pointsMarked[i].classList.add('marked')
		}
})

// ========================== Circle Progressbar End ==========================


// ======================== Typing Animation Start ==========================

const typed = new Typed(".typing", {
		strings:['Web Developer<span class="skin-color">.</span> ', 'Programmer<span class="skin-color">.</span> ', 'Web Designer<span class="skin-color">.</span> ', 'Freelancer<span class="skin-color">.</span> '],
		typeSpeed: 100,
		backSpeed: 60,
		loop: true,
		fade: true,
})


// ======================== Typing Animation End ==========================


// ========================= Swiper Slider Start =================================


const swiper = new Swiper(".slide-content", {
		slidesPerView: 3,
		spaceBetween: 25,
		loop: true,
		centerSlide: true,
		fade: true,
		grabCursor: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		},
		autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
				0: {
						slidesPerView: 1,
				},
				768: {
						slidesPerView: 2,
				},
				992: {
						slidesPerView: 3,
				}
		}
	});


// ========================= Swiper Slider End =================================


// ========================== Back To Top Scroller Start ==========================

const TopScroller = () => {
	let BackToTop = document.querySelector(".fa-arrow-up");

	BackToTop.addEventListener("click", () => {
		document.documentElement.scrollTop = 0;
	})

}
window.onscroll = TopScroller;

// ========================== Back To Top Scroller End ==========================

// ========================== Chatbot Section Start ============================

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "sk-proj-GAQKQWheCR0OncgBW7DBT3BlbkFJNCwWytVu8wwN612p4ylV";        // =========== Paste your API key here ============
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});



sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.querySelector(".bot").classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.querySelector(".bot").classList.toggle("show-chatbot"));


// ========================== Chatbot Section End ============================


// ========================== Scroll Animation Sectiosn Start =========================

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show-items");
		} else {
			entry.target.classList.remove("show-items");
		}
	});
});

const scrollScale = document.querySelectorAll(".scorll-scale");
scrollScale.forEach((el) => observer.observe(el));

const scrollBottom = document.querySelectorAll(".scorll-bottom");
scrollBottom.forEach((el) => observer.observe(el));

const scrollTop = document.querySelectorAll(".scorll-top");
scrollTop.forEach((el) => observer.observe(el));

// ========================== Scroll Animation Sectiosn End =========================

// =========================== Scroll Active Nav Section Start =============================

let section = document.querySelectorAll("section")
let nav_link = document.querySelectorAll(".nav-item .nav-link")

function activeMunu() {
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){};
    nav_link.forEach(sec => sec.classList.remove("active"));
    nav_link[len].classList.add("active");
}

activeMunu();

window.addEventListener("scroll", activeMunu);

// =========================== Scroll Active Nav Section End =============================