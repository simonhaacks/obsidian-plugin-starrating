import { EditorView, Decoration, DecorationSet, ViewPlugin, ViewUpdate, WidgetType } from '@codemirror/view';
import { RangeSetBuilder, StateField, StateEffect } from '@codemirror/state';
import { StarRatingData } from './types';
import { StarRatingParser } from './parser';
import { StarRatingRenderer } from './renderer';
import { StarRatingController } from './controller';

class StarRatingWidget extends WidgetType {
    constructor(
        private data: StarRatingData,
        private renderer: StarRatingRenderer,
        private controller: StarRatingController
    ) {
        super();
    }

    toDOM(): HTMLElement {
        const element = this.renderer.createStarElement(this.data);
        this.controller.attachEventListeners(element, this.data);
        return element;
    }

    eq(other: StarRatingWidget): boolean {
        return this.data.attribute === other.data.attribute && 
               this.data.rating === other.data.rating;
    }

    ignoreEvent(): boolean {
        return false;
    }
}

const updateDecorations = StateEffect.define<DecorationSet>();

let updateTimeout: number | null = null;
const DEBOUNCE_DELAY = 300; // Wait 300ms after user stops typing

export function createStarRatingEditorExtension(
    parser: StarRatingParser,
    renderer: StarRatingRenderer,
    controller: StarRatingController
) {
    const starRatingField = StateField.define<DecorationSet>({
        create() {
            return Decoration.none;
        },
        update(decorations, tr) {
            // Handle manual updates from effects
            for (let effect of tr.effects) {
                if (effect.is(updateDecorations)) {
                    return effect.value;
                }
            }

            // If no document changes, just map existing decorations
            if (!tr.docChanged) {
                return decorations.map(tr.changes);
            }

            // Quick check: only proceed if changes might involve star syntax
            let hasStarSyntax = false;
            tr.changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
                const insertedText = inserted.toString();
                if (insertedText.includes('{{stars:') || insertedText.includes('}}')) {
                    hasStarSyntax = true;
                }
            });

            // If no potential star syntax in changes, keep existing decorations
            if (!hasStarSyntax) {
                return decorations.map(tr.changes);
            }

            // Debounce the actual decoration update
            if (updateTimeout) {
                clearTimeout(updateTimeout);
            }

            // For now, map existing decorations and schedule update
            const mappedDecorations = decorations.map(tr.changes);
            
            updateTimeout = window.setTimeout(() => {
                // Trigger a new transaction with updated decorations
                const view = tr.state.field(EditorView.editorAttributes, false);
                if (view) {
                    const newDecorations = buildStarDecorations(tr.state.doc, parser, renderer, controller);
                    // This would need the view instance to dispatch the effect
                    // For now, we'll use a simpler approach
                }
                updateTimeout = null;
            }, DEBOUNCE_DELAY);

            return mappedDecorations;
        }
    });

    const starRatingPlugin = ViewPlugin.fromClass(class {
        decorations: DecorationSet;
        private updateTimeout: number | null = null;

        constructor(view: EditorView) {
            this.decorations = view.state.field(starRatingField);
            // Initial decoration build
            this.scheduleUpdate(view);
        }

        update(update: ViewUpdate) {
            this.decorations = update.state.field(starRatingField);
            
            // Only schedule updates if document changed and might contain star syntax
            if (update.docChanged) {
                let mightHaveStars = false;
                update.changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
                    const insertedText = inserted.toString();
                    const doc = update.state.doc;
                    const lineStart = doc.lineAt(fromB);
                    const lineEnd = doc.lineAt(toB);
                    
                    // Check if any affected lines might contain star syntax
                    for (let lineNum = lineStart.number; lineNum <= lineEnd.number; lineNum++) {
                        const line = doc.line(lineNum);
                        if (line.text.includes('{{stars:') || insertedText.includes('{{stars:')) {
                            mightHaveStars = true;
                            break;
                        }
                    }
                });

                if (mightHaveStars) {
                    this.scheduleUpdate(update.view);
                }
            }
        }

        private scheduleUpdate(view: EditorView) {
            if (this.updateTimeout) {
                clearTimeout(this.updateTimeout);
            }

            this.updateTimeout = window.setTimeout(() => {
                const newDecorations = buildStarDecorations(view.state.doc, parser, renderer, controller);
                view.dispatch({
                    effects: updateDecorations.of(newDecorations)
                });
                this.updateTimeout = null;
            }, DEBOUNCE_DELAY);
        }

        destroy() {
            if (this.updateTimeout) {
                clearTimeout(this.updateTimeout);
            }
        }
    }, {
        decorations: v => v.decorations
    });

    return [starRatingField, starRatingPlugin];
}

function buildStarDecorations(
    doc: any,
    parser: StarRatingParser,
    renderer: StarRatingRenderer,
    controller: StarRatingController
): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();
    
    // Only scan lines that contain potential star syntax
    for (let lineNum = 1; lineNum <= doc.lines; lineNum++) {
        const line = doc.line(lineNum);
        const lineText = line.text;
        
        if (lineText.includes('{{stars:')) {
            const starRatings = parser.parseStarRatings(lineText);
            
            starRatings.forEach(rating => {
                const from = line.from + rating.startPos;
                const to = line.from + rating.endPos;
                
                const widget = new StarRatingWidget(rating, renderer, controller);
                const decoration = Decoration.replace({
                    widget,
                    inclusive: false
                });
                
                builder.add(from, to, decoration);
            });
        }
    }
    
    return builder.finish();
}