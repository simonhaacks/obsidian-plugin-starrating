import { MetadataEntry } from './types';

export class MetadataManager {
    public updateInlineMetadata(content: string, attribute: string, rating: number): string {
        const metadataPattern = new RegExp(`\\(${this.escapeRegex(attribute)}::\\s*\\d+\\)`, 'g');
        const newMetadata = `(${attribute}:: ${rating})`;
        
        if (metadataPattern.test(content)) {
            // Update existing metadata
            return content.replace(metadataPattern, newMetadata);
        } else {
            // Add new metadata after the star rating
            const starPattern = new RegExp(
                `\\{\\{stars:${this.escapeRegex(attribute)}:\\d+\\}\\}`,
                'g'
            );
            
            return content.replace(starPattern, (match) => {
                return `${match} ${newMetadata}`;
            });
        }
    }

    public extractMetadata(content: string): MetadataEntry[] {
        const metadataPattern = /\(([a-zA-Z_][a-zA-Z0-9_]*)::\s*(\d+)\)/g;
        const metadata: MetadataEntry[] = [];
        const lines = content.split('\n');
        
        lines.forEach((line, lineIndex) => {
            let match;
            while ((match = metadataPattern.exec(line)) !== null) {
                metadata.push({
                    attribute: match[1],
                    value: parseInt(match[2]),
                    line: lineIndex,
                    text: match[0]
                });
            }
        });
        
        return metadata;
    }

    public cleanupOrphanedMetadata(content: string): string {
        const metadata = this.extractMetadata(content);
        const starRatings = this.extractStarRatingAttributes(content);
        
        // Find metadata entries without corresponding star ratings
        const orphanedMetadata = metadata.filter(meta => 
            !starRatings.includes(meta.attribute)
        );
        
        // Remove orphaned metadata
        let cleanedContent = content;
        orphanedMetadata.forEach(meta => {
            cleanedContent = cleanedContent.replace(meta.text, '');
        });
        
        return cleanedContent;
    }

    private extractStarRatingAttributes(content: string): string[] {
        const starPattern = /\{\{stars:([a-zA-Z_][a-zA-Z0-9_]*):\d+\}\}/g;
        const attributes: string[] = [];
        let match;
        
        while ((match = starPattern.exec(content)) !== null) {
            if (!attributes.includes(match[1])) {
                attributes.push(match[1]);
            }
        }
        
        return attributes;
    }

    private escapeRegex(str: string): string {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}