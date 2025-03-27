import React from "react";
import { Styles } from "@react-pdf/renderer";

/**
 * Interface for a PDF section.
 */
export interface IPDFSection
{
    /**
     * Generates a React node for the section.
     * @param styles - The styles to apply to the section.
     * @returns A React node.
     */
    generate (styles: Styles): React.ReactNode;
}

/**
 * Type for a PDF generator function.
 * @param section - The PDF section.
 * @param styles - The styles to apply to the section.
 * @returns A React node.
 */
export type PDFGenerator = (section: PDFSection, styles: Styles) => React.ReactNode;

/**
 * Interface for a PDF header section.
 */
export interface IPDFHeader extends IPDFSection
{
    imageURL?: string;
}

/**
 * Class representing a PDF section.
 */
export class PDFSection implements IPDFSection
{
    /**
     * Constructor for the PDFSection class.
     * @param generator - The generator function for the section.
     * @param options - Optional parameters for the section.
     */
    constructor(public generator: PDFGenerator, public options?: {
        title?: string;
        data?: Record<string, any>;
        displayTitle: string;
        includeKeys?: string[];
    })
    {
        this.generator = generator;
    }

    /**
     * Generates a React node for the section.
     * @param styles - The styles to apply to the section.
     * @returns A React node.
     */
    public generate (styles: Styles): React.ReactNode
    {
        return this.generator(this, styles);
    }
}

/**
 * Class representing a PDF header section.
 */
export class PDFHeader extends PDFSection implements IPDFHeader
{
    /**
     * Constructor for the PDFHeader class.
     * @param generator - The generator function for the header.
     * @param options - Optional parameters for the header.
     */
    constructor(public generator: PDFGenerator, public options?: {
        title?: string;
        data?: Record<string, any>;
        displayTitle: string;
        includeKeys?: string[];
        imageURL?: string;
    })
    {
        super(generator, options);
    }
}