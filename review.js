let selectedRating = 0;
        const stars = document.querySelectorAll('.star');

        stars.forEach(star => {
            star.addEventListener('click', function () {
                selectedRating = this.getAttribute('data-value');
                updateStars(selectedRating);
            });
            star.addEventListener('mouseover', function () {
                updateStars(this.getAttribute('data-value'));
            });
            star.addEventListener('mouseleave', function () {
                updateStars(selectedRating);
            });
        });

        function updateStars(value) {
            stars.forEach(star => {
                star.classList.remove('selected', 'hovered');
                if (star.getAttribute('data-value') <= value) {
                    star.classList.add('hovered');
                }
            });
        }

        function submitReview() {
            let reviewText = document.getElementById('reviewText').value;
            if (selectedRating === 0) {
                alert('Please select a rating.');
                return;
            }
            alert(`Thank you for your ${selectedRating}-star review!\nYour feedback: "${reviewText}"`);
            document.getElementById('reviewText').value = '';
            updateStars(0);
            selectedRating = 0;
        }