import { IListConstructor, List } from "./List.class";
import { marked } from "marked";
import { toPascalCase, countWords } from "../utils";
import React from "react";
import { PDFSection } from "./PDFSection.class";
import { Styles } from "@react-pdf/renderer";

export interface IPDFList
{
    generateViews (styles: Styles): React.ReactNode;
    get structure (): PDFSection[];
}

export type PDFConfig = {

};

export type PDFListConstructor = IListConstructor<PDFSection>;

/**
 * PDFList class extends List and implements IPDFList interface.
 * It provides methods to generate views and convert objects to markdown and columns.
 */
export class PDFList extends List<PDFSection> implements IPDFList
{
    /**
     * Constructor for PDFList.
     * @param params - The constructor parameters for the list.
     */
    constructor(params: PDFListConstructor)
    {
        super(params);
    }

    /**
     * Getter for the structure of the PDF list.
     * @returns An array of PDFSection objects.
     */
    get structure (): PDFSection[]
    {
        return this.items.map(item => item.metadata);
    }

    /**
     * Generates React views for the PDF sections.
     * @param styles - The styles to apply to the sections.
     * @returns A React node containing the views.
     */
    public generateViews (styles: Styles): React.ReactNode
    {
        if (this.structure.length === 0) { return null; }

        return (
            <>
                {this.structure.map((section, index) => (
                    <React.Fragment key={index}>{
                        section.generate(styles)
                    }</React.Fragment>
                ))}
            </>
        );
    }

    /**
     * Converts an object to a markdown string.
     * @param data - The object to convert.
     * @param level - The indentation level.
     * @param options - Optional parameters for including keys, breaking lines, and customizing the body.
     * @returns A markdown string representation of the object.
     */
    public static objectToMarkdown (
        data: Record<string, any>,
        level: number = -1,
        options?: {
            includeKeys?: string[];
            breakLineThreshold?: (value: string) => string;
            body?: (key: string, value: string, conditionalBR: string) => string;
        }
    ): string
    {
        let markdown = "";
        const indent = "&nbsp;&nbsp;&nbsp;".repeat(level + 1);

        for (const [key, value] of Object.entries(data))
        {
            if (
                !(value === null ||
                    options?.includeKeys?.includes(key) ||
                    (typeof value === "string" && value.trim().length === 0) ||
                    (typeof value === "object" && (Array.isArray(value) ? value.length === 0 : Object.keys(value).length === 0)))
            )
            {
                continue;
            }

            if (typeof value === "object")
            {
                markdown += `${indent}**${toPascalCase(key)}:** <br/>`;
                markdown += this.objectToMarkdown(value, level + 1, options);
            } else
            {
                const conditionalBR = options?.breakLineThreshold?.(value) ?? (countWords(value) > 10 ? "<br/>" : "");
                if (options?.body)
                {
                    markdown += options.body(key, value, conditionalBR);
                } else
                {
                    markdown += `${indent}${conditionalBR}**${toPascalCase(key)}**&nbsp;&nbsp;${conditionalBR}${value}${conditionalBR}<br/>`;
                }
            }
        }
        return markdown;
    }

    /**
     * Converts an object to an array of HTML strings representing columns.
     * @param data - The object to convert.
     * @param level - The indentation level.
     * @param includeKeys - Keys to include in the conversion.
     * @returns An array of HTML strings.
     */
    public static objectToColumns (
        data: Record<string, any>,
        level: number = -1,
        includeKeys?: string[]
    ): string[]
    {
        let columns: string[] = [];

        for (const [key, value] of Object.entries(data))
        {
            if (
                !(value === null ||
                    (includeKeys?.includes(key)) ||
                    (typeof value === "string" && value.trim().length === 0) ||
                    (typeof value === "object" && (Array.isArray(value) ? value.length === 0 : Object.keys(value).length === 0)))
            )
            {
                continue;
            }

            const html = `${marked.parse(
                this.objectToMarkdown(value, level, {
                    includeKeys,
                    breakLineThreshold: (value: string) => (countWords(value) > 5 || value.length > 20 ? "<br/>" : ""),
                    body: (key: string, value: string, conditionalBR: string) => `**${toPascalCase(key)}** ${conditionalBR}_${value}_<br/>`,
                })
            )}`;

            columns.push(html);
        }

        return columns;
    }
}