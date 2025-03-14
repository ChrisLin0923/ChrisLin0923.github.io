var animateHTML = function () {
	var elems;
	var windowHeight;
	var projectSections;
	var projectContents;
	var animationInProgress = false;
	var scrollTimeout;

	function init() {
		elems = document.querySelectorAll(".hidden");
		elems2 = document.querySelectorAll(".hidden2");
		elems3 = document.querySelectorAll(".hidden3");
		elems4 = document.querySelectorAll(".hidden_left");
		elems5 = document.querySelectorAll(".hidden_right");
		projectSections = document.querySelectorAll(".project-hidden");
		projectContents = document.querySelectorAll(".project-content-hidden");
		windowHeight = window.innerHeight;
		addEventHandlers();
		checkPosition();

		// Initialize card flip hover stability
		initCardFlip();
	}

	const mediaQuery = window.matchMedia("(min-width: 650px)");

	// Debounce function to prevent multiple rapid calls
	function debounce(func, wait) {
		return function () {
			const context = this;
			const args = arguments;
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				func.apply(context, args);
			}, wait);
		};
	}

	function addEventHandlers() {
		// Use debounced version of checkPosition for scroll events
		window.addEventListener("scroll", debounce(checkPosition, 100));

		// Initial check when page loads
		window.addEventListener("load", checkPosition);

		// Check again after a short delay to ensure everything is loaded
		setTimeout(checkPosition, 500);
	}

	function checkPosition() {
		// Prevent multiple animations from running at once
		if (animationInProgress) return;
		animationInProgress = true;

		// Process regular animations
		processRegularAnimations();

		// Process project section animations
		processProjectAnimations();

		// Reset animation flag after a short delay
		setTimeout(() => {
			animationInProgress = false;
		}, 100);
	}

	function processRegularAnimations() {
		for (var i = 0; i < elems.length; i++) {
			var positionFromTop = elems[i].getBoundingClientRect().top;
			var positionFromBottom = elems[i].getBoundingClientRect().bottom;

			// Only animate if element is entering the viewport
			if (positionFromTop - windowHeight <= 0 && positionFromBottom > 0) {
				elems[i].className = elems[i].className.replace(
					"hidden",
					"animate"
				);
			}
			// Only reset if element has completely left the viewport
			else if (
				positionFromBottom <= 0 ||
				positionFromTop >= windowHeight
			) {
				elems[i].className = elems[i].className.replace(
					"animate",
					"hidden"
				);
			}
		}

		for (var i = 0; i < elems2.length; i++) {
			var positionFromTop = elems2[i].getBoundingClientRect().top;
			var positionFromBottom = elems2[i].getBoundingClientRect().bottom;

			if (positionFromTop - windowHeight <= 0 && positionFromBottom > 0) {
				elems2[i].className = elems2[i].className.replace(
					"hidden2",
					"animate2"
				);
			} else if (
				positionFromBottom <= 0 ||
				positionFromTop >= windowHeight
			) {
				elems2[i].className = elems2[i].className.replace(
					"animate2",
					"hidden2"
				);
			}
		}

		for (var i = 0; i < elems3.length; i++) {
			var positionFromTop = elems3[i].getBoundingClientRect().top;
			var positionFromBottom = elems3[i].getBoundingClientRect().bottom;

			if (positionFromTop - windowHeight <= 0 && positionFromBottom > 0) {
				elems3[i].className = elems3[i].className.replace(
					"hidden3",
					"animate3"
				);
			} else if (
				positionFromBottom <= 0 ||
				positionFromTop >= windowHeight
			) {
				elems3[i].className = elems3[i].className.replace(
					"animate3",
					"hidden3"
				);
			}
		}

		for (var i = 0; i < elems4.length; i++) {
			var positionFromTop = elems4[i].getBoundingClientRect().top;
			var positionFromBottom = elems4[i].getBoundingClientRect().bottom;

			if (positionFromTop - windowHeight <= 0 && positionFromBottom > 0) {
				elems4[i].className = elems4[i].className.replace(
					"hidden_left",
					"animate4"
				);
			} else if (
				positionFromBottom <= 0 ||
				positionFromTop >= windowHeight
			) {
				elems4[i].className = elems4[i].className.replace(
					"animate4",
					"hidden_left"
				);
			}
		}

		for (var i = 0; i < elems5.length; i++) {
			var positionFromTop = elems5[i].getBoundingClientRect().top;
			var positionFromBottom = elems5[i].getBoundingClientRect().bottom;

			if (positionFromTop - windowHeight <= 0 && positionFromBottom > 0) {
				elems5[i].className = elems5[i].className.replace(
					"hidden_right",
					"animate5"
				);
			} else if (
				positionFromBottom <= 0 ||
				positionFromTop >= windowHeight
			) {
				elems5[i].className = elems5[i].className.replace(
					"animate5",
					"hidden_right"
				);
			}
		}
	}

	function processProjectAnimations() {
		// Store elements that need animation in arrays
		const sectionsToAnimate = [];
		const sectionsToReset = [];
		const contentsToAnimate = [];
		const contentsToReset = [];

		// Check project sections
		for (var i = 0; i < projectSections.length; i++) {
			var positionFromTop =
				projectSections[i].getBoundingClientRect().top;
			var positionFromBottom =
				projectSections[i].getBoundingClientRect().bottom;
			var isVisible =
				projectSections[i].classList.contains("project-animate");

			// Check if element is in viewport and not already animated
			if (
				positionFromTop - windowHeight <= 0 &&
				positionFromBottom > 0 &&
				!isVisible
			) {
				sectionsToAnimate.push(projectSections[i]);
			}
			// Check if element has left viewport completely and is currently animated
			// Add a larger buffer to prevent flashing during fast scrolling
			else if (
				(positionFromBottom <= -100 ||
					positionFromTop >= windowHeight + 100) &&
				isVisible
			) {
				sectionsToReset.push(projectSections[i]);
			}
		}

		// Check project contents
		for (var i = 0; i < projectContents.length; i++) {
			var positionFromTop =
				projectContents[i].getBoundingClientRect().top;
			var positionFromBottom =
				projectContents[i].getBoundingClientRect().bottom;
			var isHidden = projectContents[i].classList.contains(
				"project-content-hidden"
			);

			// Check if element is in viewport and currently hidden
			if (
				positionFromTop - windowHeight <= 0 &&
				positionFromBottom > 0 &&
				isHidden
			) {
				contentsToAnimate.push(projectContents[i]);
			}
			// Check if element has left viewport completely and is currently visible
			// Add a larger buffer to prevent flashing during fast scrolling
			else if (
				(positionFromBottom <= -100 ||
					positionFromTop >= windowHeight + 100) &&
				!isHidden
			) {
				contentsToReset.push(projectContents[i]);
			}
		}

		// Apply animations after collecting all elements
		sectionsToAnimate.forEach((section) => {
			section.classList.remove("project-hidden");
			section.classList.add("project-animate");
		});

		contentsToAnimate.forEach((content) => {
			const description = content.querySelector(".project-description");
			const image = content.querySelector(".project-image");
			const listItems = content.querySelectorAll("ul li");

			if (description) {
				description.classList.add("animate-left");
			}

			if (image) {
				image.classList.add("animate-right");
			}

			// Animate list items with a staggered delay
			if (listItems.length > 0) {
				listItems.forEach((item, idx) => {
					setTimeout(() => {
						item.classList.add("animate-item");
					}, 800 + idx * 150); // Increased delay to ensure main animations complete first
				});
			}

			content.classList.remove("project-content-hidden");
		});

		// Reset animations with a delay
		if (sectionsToReset.length > 0 || contentsToReset.length > 0) {
			setTimeout(() => {
				sectionsToReset.forEach((section) => {
					section.classList.remove("project-animate");
					section.classList.add("project-hidden");
				});

				contentsToReset.forEach((content) => {
					const description = content.querySelector(
						".project-description"
					);
					const image = content.querySelector(".project-image");
					const listItems = content.querySelectorAll("ul li");

					if (description) {
						description.classList.remove("animate-left");
					}

					if (image) {
						image.classList.remove("animate-right");
					}

					// Reset list item animations
					if (listItems.length > 0) {
						listItems.forEach((item) => {
							item.classList.remove("animate-item");
						});
					}

					content.classList.add("project-content-hidden");
				});
			}, 500); // Increased delay for smoother transitions
		}
	}

	// Function to improve card flip hover stability
	function initCardFlip() {
		const cards = document.querySelectorAll(".thecard");
		console.log(`Found ${cards.length} cards to initialize`);

		cards.forEach((card) => {
			let hoverTimeout;
			let isFlipped = false;

			// Use mouseenter/mouseleave instead of hover for better control
			card.addEventListener("mouseenter", function () {
				clearTimeout(hoverTimeout);
				// Small delay to prevent accidental triggers
				hoverTimeout = setTimeout(() => {
					card.classList.add("card-flipped");
					isFlipped = true;
				}, 50);
			});

			card.addEventListener("mouseleave", function () {
				clearTimeout(hoverTimeout);
				// Slightly longer delay before flipping back
				hoverTimeout = setTimeout(() => {
					card.classList.remove("card-flipped");
					isFlipped = false;
				}, 100);
			});

			// Add touch support for mobile
			card.addEventListener("touchstart", function (e) {
				e.preventDefault();
				if (isFlipped) {
					card.classList.remove("card-flipped");
					isFlipped = false;
				} else {
					card.classList.add("card-flipped");
					isFlipped = true;
				}
			});
		});
	}

	return {
		init: init,
	};
};

document.addEventListener("DOMContentLoaded", function () {
	console.log("Card flip script initialized");

	// Initialize the animation script
	if (typeof animateHTML === "function") {
		animateHTML().init();
	}

	// Initialize project image gallery
	initProjectGallery();

	// Get all card containers
	const cardContainers = document.querySelectorAll(".card-container");
	console.log(`Found ${cardContainers.length} card containers`);

	// Add event listeners to each card container
	cardContainers.forEach((container) => {
		let hoverTimeout;
		let leaveTimeout;

		// Add mouseenter event with delay
		container.addEventListener("mouseenter", function () {
			clearTimeout(leaveTimeout);
			hoverTimeout = setTimeout(() => {
				container.classList.add("card-flipped");
			}, 50); // Small delay to prevent accidental triggers
		});

		// Add mouseleave event with delay
		container.addEventListener("mouseleave", function () {
			clearTimeout(hoverTimeout);
			leaveTimeout = setTimeout(() => {
				container.classList.remove("card-flipped");
			}, 100); // Slightly longer delay before flipping back
		});

		// Add click event for mobile and better control
		container.addEventListener("click", function (e) {
			// Prevent click from propagating to parent elements
			e.stopPropagation();
			container.classList.toggle("card-flipped");
		});
	});
});

// Function to initialize project image gallery
function initProjectGallery() {
	const galleries = document.querySelectorAll(".project-gallery");

	galleries.forEach((gallery) => {
		const container = gallery.querySelector(".gallery-container");
		const items = gallery.querySelectorAll(".gallery-item");
		const dots = gallery.querySelectorAll(".gallery-dot");
		const prevBtn = gallery.querySelector(".gallery-prev");
		const nextBtn = gallery.querySelector(".gallery-next");
		const captions = gallery.querySelectorAll(".gallery-caption");

		let currentIndex = 0;
		let isAnimating = false;
		const itemCount = items.length;

		// Function to update gallery position with animation
		function updateGallery(newIndex, direction = "next") {
			if (isAnimating) return;
			isAnimating = true;

			// Add transition class for animation
			container.style.transition =
				"transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)";
			container.style.transform = `translateX(-${newIndex * 100}%)`;

			// Update active dot
			dots.forEach((dot, index) => {
				if (index === newIndex) {
					dot.classList.add("active");
				} else {
					dot.classList.remove("active");
				}
			});

			// Reset animation state after transition completes
			setTimeout(() => {
				isAnimating = false;
			}, 600);

			currentIndex = newIndex;
		}

		// Add click events to dots
		dots.forEach((dot, index) => {
			dot.addEventListener("click", () => {
				if (index !== currentIndex) {
					const direction = index > currentIndex ? "next" : "prev";
					updateGallery(index, direction);
				}
			});
		});

		// Add click events to arrows
		if (prevBtn) {
			prevBtn.addEventListener("click", () => {
				const newIndex = (currentIndex - 1 + itemCount) % itemCount;
				updateGallery(newIndex, "prev");
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener("click", () => {
				const newIndex = (currentIndex + 1) % itemCount;
				updateGallery(newIndex, "next");
			});
		}

		// Add swipe support for mobile
		let touchStartX = 0;
		let touchEndX = 0;

		gallery.addEventListener(
			"touchstart",
			(e) => {
				touchStartX = e.changedTouches[0].screenX;
			},
			false
		);

		gallery.addEventListener(
			"touchend",
			(e) => {
				touchEndX = e.changedTouches[0].screenX;
				handleSwipe();
			},
			false
		);

		function handleSwipe() {
			if (touchEndX < touchStartX - 50) {
				// Swipe left, go to next
				const newIndex = (currentIndex + 1) % itemCount;
				updateGallery(newIndex, "next");
			} else if (touchEndX > touchStartX + 50) {
				// Swipe right, go to previous
				const newIndex = (currentIndex - 1 + itemCount) % itemCount;
				updateGallery(newIndex, "prev");
			}
		}

		// Auto-advance the gallery every 5 seconds
		let galleryInterval = setInterval(() => {
			const newIndex = (currentIndex + 1) % itemCount;
			updateGallery(newIndex, "next");
		}, 5000);

		// Pause auto-advance on hover
		gallery.addEventListener("mouseenter", () => {
			clearInterval(galleryInterval);
		});

		gallery.addEventListener("mouseleave", () => {
			galleryInterval = setInterval(() => {
				const newIndex = (currentIndex + 1) % itemCount;
				updateGallery(newIndex, "next");
			}, 5000);
		});

		// Initial update to set the first slide
		updateGallery(0);
	});
}

// Fix the event listener for the sidebar toggle
document.addEventListener("DOMContentLoaded", function () {
	const openBtn = document.querySelector(".openbtn");
	if (openBtn) {
		openBtn.addEventListener("click", toggleNav);
	}
});

function toggleNav() {
	navSize = document.getElementById("mySidebar").style.width;
	if (navSize == 170) {
		return closeNav();
	} else {
		return openNav();
	}
}

function openNav() {
	document.getElementById("mySidebar").style.width = "170px";
	document.getElementById("main").style.marginLeft = "180px";
}

function closeNav() {
	document.getElementById("mySidebar").style.width = "0";
	document.getElementById("main").style.marginLeft = "0";
}
