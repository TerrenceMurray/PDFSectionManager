import { Header1, Header2, Section } from "./Generators";
import { PDFGenerator } from "./PDFSection.class";

export default {
    "Header1": Header1,
    "Header2": Header2,
    "DataSection": Section,
    "TitleSection": Section
} as Record<string, PDFGenerator>;