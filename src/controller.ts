import { App, TFile, Notice } from 'obsidian';
import { StarRatingData } from './types';
import { StarRatingParser } from './parser';
import { StarRatingRenderer } from './renderer';
import { MetadataManager } from './metadata';

export class StarRatingController {
    constructor(
        private app: App,
        private parser: StarRatingParser,
        private renderer: StarRatingRenderer,
        private metadataManager: MetadataManager
    ) {}

    public attachEventListeners(container: HTMLElement, data: StarRatingData): void {
        const stars = container.querySelectorAll('.star-rating-star');
        
        stars.forEach((star, index) => {
            const starElement = star as HTMLElement;
            const position = index + 1;

            // Click handler
            starElement.addEventListener('click', async () => {
                await this.handleStarClick(container, data, position);
            });

            // Keyboard handler
            starElement.addEventListener('keydown', async (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    await this.handleStarClick(container, data, position);
                }
            });
        });

        // Add hover effects
        this.renderer.addHoverEffects(container);
    }

    private async handleStarClick(
        container: HTMLElement, 
        data: StarRatingData, 
        newRating: number
    ): Promise<void> {
        try {
            console.log(`⭐ Clicked star ${newRating} for ${data.attribute}`);
            
            // Update visual state immediately for responsiveness
            this.renderer.updateRatingDisplay(container, newRating);
            
            // Update the markdown source
            await this.updateMarkdownSource(data, newRating);
            
            // Update metadata for dataview
            await this.updateMetadata(data.attribute, newRating);
            
            new Notice(`${data.attribute}: ${newRating}/5`);
            
        } catch (error) {
            console.error('Failed to update star rating:', error);
            new Notice('Failed to save rating. Please try again.');
            
            // Revert visual state on error
            this.renderer.updateRatingDisplay(container, data.rating);
        }
    }

    private async updateMarkdownSource(data: StarRatingData, newRating: number): Promise<void> {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
            throw new Error('No active file');
        }

        const content = await this.app.vault.read(activeFile);
        const newSyntax = this.parser.createStarRatingSyntax(data.attribute, newRating);
        const updatedContent = content.replace(data.rawText, newSyntax);
        
        await this.app.vault.modify(activeFile, updatedContent);
        
        // Update data object for future updates
        data.rating = newRating;
        data.rawText = newSyntax;
        
        console.log(`📝 Updated ${data.attribute} to ${newRating}/5`);
    }

    private async updateMetadata(attribute: string, rating: number): Promise<void> {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) return;

        const content = await this.app.vault.read(activeFile);
        const updatedContent = this.metadataManager.updateInlineMetadata(
            content, 
            attribute, 
            rating
        );
        
        if (content !== updatedContent) {
            await this.app.vault.modify(activeFile, updatedContent);
            console.log(`🏷️ Updated metadata: (${attribute}:: ${rating})`);
        }
    }
}