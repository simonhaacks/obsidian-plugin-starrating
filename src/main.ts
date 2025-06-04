import { Plugin, MarkdownPostProcessorContext } from 'obsidian';
import { StarRatingParser } from './parser';
import { StarRatingRenderer } from './renderer';
import { StarRatingController } from './controller';
import { MetadataManager } from './metadata';
import { StarRatingData } from './types';
import { createStarRatingEditorExtension } from './editor-extension';

export default class StarRatingPlugin extends Plugin {
    private parser: StarRatingParser;
    private renderer: StarRatingRenderer;
    private controller: StarRatingController;
    private metadataManager: MetadataManager;

    async onload() {
        console.log('🌟 Loading Star Rating Plugin');

        // Initialize components
        this.parser = new StarRatingParser();
        this.renderer = new StarRatingRenderer();
        this.metadataManager = new MetadataManager();
        this.controller = new StarRatingController(
            this.app,
            this.parser,
            this.renderer,
            this.metadataManager
        );

        // Register markdown post processor (for reading view)
        console.log('📋 Registering markdown post processor');
        this.registerMarkdownPostProcessor(this.processStarRatings.bind(this));
        console.log('✅ Markdown post processor registered');

        // Register editor extension (for Live Preview editing)
        console.log('🔊 Registering editor extension');
        const editorExtension = createStarRatingEditorExtension(
            this.parser,
            this.renderer,
            this.controller
        );
        this.registerEditorExtension(editorExtension);
        console.log('✅ Editor extension registered');

        // Add CSS styles
        this.addStyles();

        // Register command to insert star rating
        this.addCommand({
            id: 'insert-star-rating',
            name: 'Insert Star Rating',
            editorCallback: (editor) => {
                const cursor = editor.getCursor();
                const template = '{{stars:attribute_name:0}}';
                editor.replaceRange(template, cursor);
                
                // Select the attribute name for easy editing
                const start = { line: cursor.line, ch: cursor.ch + 8 };
                const end = { line: cursor.line, ch: cursor.ch + 22 };
                editor.setSelection(start, end);
            }
        });
    }

    onunload() {
        console.log('⭐ Unloading Star Rating Plugin');
    }

    private processStarRatings(element: HTMLElement, context: MarkdownPostProcessorContext): void {
        const textNodes = this.getTextNodes(element);
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent || '';
            
            if (text.includes('{{stars:')) {
                const parent = textNode.parentElement;
                if (!parent) return;

                const starRatings = this.parser.parseStarRatings(text);
                
                if (starRatings.length > 0) {
                    this.replaceWithStarComponents(parent, textNode, text, starRatings);
                }
            }
        });
    }

    private getTextNodes(element: HTMLElement): Text[] {
        const textNodes: Text[] = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent?.includes('{{stars:')) {
                textNodes.push(node as Text);
            }
        }

        return textNodes;
    }

    private replaceWithStarComponents(
        parent: HTMLElement,
        textNode: Text,
        text: string,
        starRatings: StarRatingData[]
    ): void {
        let currentText = text;
        let lastIndex = 0;

        const fragment = document.createDocumentFragment();

        starRatings.forEach(rating => {
            // Add text before the star rating
            if (rating.startPos > lastIndex) {
                const beforeText = currentText.slice(lastIndex, rating.startPos);
                fragment.appendChild(document.createTextNode(beforeText));
            }

            // Create and add star component
            const starElement = this.renderer.createStarElement(rating);
            this.controller.attachEventListeners(starElement, rating);
            fragment.appendChild(starElement);

            lastIndex = rating.endPos;
        });

        // Add remaining text
        if (lastIndex < currentText.length) {
            const afterText = currentText.slice(lastIndex);
            fragment.appendChild(document.createTextNode(afterText));
        }

        // Replace the text node with the fragment
        parent.replaceChild(fragment, textNode);
    }

    private addStyles(): void {
        const css = `
        .star-rating-container {
            display: inline-flex;
            align-items: center;
            gap: 2px;
            margin: 0 4px;
        }

        .star-rating-stars {
            display: inline-flex;
            gap: 1px;
        }

        .star-rating-star {
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
            padding: 2px;
            border-radius: 2px;
        }

        .star-rating-star:hover {
            transform: scale(1.1);
        }

        .star-rating-star:focus {
            outline: 2px solid var(--interactive-accent);
            outline-offset: 1px;
        }

        .star-rating-star.filled {
            color: #ffd700;
        }

        .star-rating-star.empty {
            color: var(--text-muted);
        }

        .star-rating-value {
            font-size: 0.9em;
            color: var(--text-muted);
            font-weight: 500;
            margin-left: 4px;
        }

        /* Dark theme adjustments */
        .theme-dark .star-rating-star.empty {
            color: #718096;
        }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
}