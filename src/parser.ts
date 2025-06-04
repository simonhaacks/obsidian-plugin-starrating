import { StarRatingData } from './types';

export class StarRatingParser {
    private static readonly STAR_REGEX = /\{\{stars:([a-zA-Z_][a-zA-Z0-9_]*):(\d+)\}\}/g;
    private static readonly ATTRIBUTE_MAX_LENGTH = 50;

    public parseStarRatings(text: string): StarRatingData[] {
        const matches: StarRatingData[] = [];
        let match: RegExpExecArray | null;

        // Reset regex state
        StarRatingParser.STAR_REGEX.lastIndex = 0;

        while ((match = StarRatingParser.STAR_REGEX.exec(text)) !== null) {
            const attribute = this.validateAttribute(match[1]);
            const rating = this.validateRating(parseInt(match[2]));

            if (attribute) {
                matches.push({
                    attribute,
                    rating,
                    rawText: match[0],
                    startPos: match.index,
                    endPos: match.index + match[0].length
                });
            }
        }

        return matches;
    }

    private validateAttribute(attribute: string): string | null {
        if (!attribute || attribute.length > StarRatingParser.ATTRIBUTE_MAX_LENGTH) {
            return null;
        }

        // Only allow alphanumeric and underscore
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(attribute)) {
            return null;
        }

        return attribute;
    }

    private validateRating(rating: number): number {
        // Clamp rating to valid range 0-5
        return Math.max(0, Math.min(5, rating || 0));
    }

    public createStarRatingSyntax(attribute: string, rating: number): string {
        const validAttribute = this.validateAttribute(attribute);
        const validRating = this.validateRating(rating);
        
        if (!validAttribute) {
            throw new Error(`Invalid attribute name: ${attribute}`);
        }

        return `{{stars:${validAttribute}:${validRating}}}`;
    }
}