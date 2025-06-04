import { StarRatingData, StarRatingConfig } from './types';

export class StarRatingRenderer {
    private config: StarRatingConfig = {
        maxStars: 5,
        filledIcon: '⭐',
        emptyIcon: '☆',
        showValue: true
    };

    public createStarElement(data: StarRatingData): HTMLElement {
        const container = document.createElement('span');
        container.className = 'star-rating-container';
        container.setAttribute('data-attribute', data.attribute);
        container.setAttribute('data-rating', data.rating.toString());

        // Create stars
        const starContainer = document.createElement('span');
        starContainer.className = 'star-rating-stars';
        
        for (let i = 1; i <= this.config.maxStars; i++) {
            const star = this.createStar(i, data.rating);
            starContainer.appendChild(star);
        }

        container.appendChild(starContainer);

        // Add rating display
        if (this.config.showValue) {
            const ratingDisplay = document.createElement('span');
            ratingDisplay.className = 'star-rating-value';
            ratingDisplay.textContent = ` ${data.rating}/5`;
            container.appendChild(ratingDisplay);
        }

        return container;
    }

    private createStar(position: number, currentRating: number): HTMLElement {
        const star = document.createElement('span');
        star.className = 'star-rating-star';
        star.setAttribute('data-position', position.toString());
        star.setAttribute('role', 'button');
        star.setAttribute('tabindex', '0');
        star.setAttribute('aria-label', `Rate ${position} out of 5 stars`);

        this.updateStarState(star, position, currentRating);

        return star;
    }

    public updateStarState(star: HTMLElement, position: number, rating: number): void {
        const isFilled = position <= rating;
        star.textContent = isFilled ? this.config.filledIcon : this.config.emptyIcon;
        star.className = `star-rating-star ${isFilled ? 'filled' : 'empty'}`;
    }

    public updateRatingDisplay(container: HTMLElement, newRating: number): void {
        // Update stars
        const stars = container.querySelectorAll('.star-rating-star');
        stars.forEach((star, index) => {
            this.updateStarState(star as HTMLElement, index + 1, newRating);
        });

        // Update value display
        const valueDisplay = container.querySelector('.star-rating-value');
        if (valueDisplay) {
            valueDisplay.textContent = ` ${newRating}/5`;
        }

        // Update container data
        container.setAttribute('data-rating', newRating.toString());
    }

    public addHoverEffects(container: HTMLElement): void {
        const stars = container.querySelectorAll('.star-rating-star');
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                this.previewRating(container, index + 1);
            });
            
            star.addEventListener('mouseleave', () => {
                this.resetPreview(container);
            });
        });
    }

    private previewRating(container: HTMLElement, hoverRating: number): void {
        const stars = container.querySelectorAll('.star-rating-star');
        stars.forEach((star, index) => {
            const position = index + 1;
            const starElement = star as HTMLElement;
            
            if (position <= hoverRating) {
                starElement.style.color = '#ffd700';
                starElement.style.filter = 'brightness(1.2)';
            } else {
                starElement.style.color = '#718096';
                starElement.style.filter = 'none';
            }
        });
    }

    private resetPreview(container: HTMLElement): void {
        const stars = container.querySelectorAll('.star-rating-star');
        stars.forEach((star) => {
            const starElement = star as HTMLElement;
            starElement.style.color = '';
            starElement.style.filter = '';
        });
    }
}