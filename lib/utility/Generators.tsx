import { View, Text, Image } from "@react-pdf/renderer";
import { PDFGenerator, PDFHeader } from "./PDFSection.class";
import Html from "react-pdf-html";
import { PDFList } from "./PDFList.class";
import { marked } from "marked";

export const Section: PDFGenerator = (section, styles) =>
{
    if (!section.options) { return null; }

    if (section.options.title && !section.options.data)
    {
        return <View style={styles.sectionPrimaryContainer}>
            <Text style={styles.sectionPrimaryTitle}>{section.options.title}</Text>
        </View>;
    }

    return (
        <View>
            {section.options?.title && <View style={styles.container}>
                <Text style={styles.title}>{section.options.title}</Text>
            </View>}
            {section.options?.data && <Html style={styles.paragraph}>
                {marked(PDFList.objectToMarkdown(section.options.data, -1, {
                    includeKeys: section.options.includeKeys
                })).toString()}
            </Html>}
        </View>
    );
};

export const Header1: PDFGenerator = (section, styles) =>
{
    if (!section.options || !section.options.data) { return null; }

    if (!(section instanceof PDFHeader)) throw new Error("Invalid section type");

    const length = Object.entries(section.options.data).length;

    return (
        <View style={styles.headerContainer}>
            {(section as PDFHeader).options?.imageURL &&
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image src={(section as PDFHeader).options!.imageURL} style={{ width: "160px", height: "100px", marginRight: "30%" }} />}

            {Object.entries(section.options.data).map(([key, value], index) => (
                <Html key={index} style={{ ...styles.headerBody, width: `${Math.max(Math.floor(100 / length) - 1, 32)}%`, }}>
                    {(PDFList
                        .objectToColumns({ [key]: value }, -1, section?.options?.includeKeys)
                        .toString()
                    )}
                </Html>
            ))}
        </View>
    );
};

export const Header2: PDFGenerator = (section, styles) =>
{
    if (!section.options || !section.options.data) { return null; }

    if (!(section instanceof PDFHeader)) throw new Error("Invalid section type");

    const length = Object.entries(section.options.data).length;

    return (
        <View style={styles.headerContainer}>
            {(section as PDFHeader).options?.imageURL &&
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image src={(section as PDFHeader).options!.imageURL} style={{ width: "160px", height: "100px", marginRight: "30%" }} />}

            {Object.entries(section.options.data).map(([key, value], index) => (
                <Html key={index} style={{ ...styles.headerBody, width: `${Math.max(Math.floor(100 / length) - 1, 32)}%`, }}>
                    {(PDFList
                        .objectToColumns({ [key]: value }, -1, section?.options?.includeKeys)
                        .toString()
                    )}
                </Html>
            ))}
        </View>
    );
};