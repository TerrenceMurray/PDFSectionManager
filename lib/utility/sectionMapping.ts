import { Section } from "@/components/PDFSectionManager";

const headerTestData: Record<string, any> = {
    patient: {
        id: "A0154C3PY, HRI 305-6547",
        sex: "Unknown",
        age: {
            value: 124,
            birthdate: "01/01/1900"
        },
        medRec: "305-6547 HRI"
    },
    sponsor: {
        name: "Noureddin, Mazen",
        organization: "Houston Research Institute",
        address: {
            street: "1155 Dairy Ashford Rd, Ste 200",
            city: "Houston",
            state: "TX",
            zip: "77079"
        }
    },
    pathologyInstitute: {
        name: "Pathology Institute PLLC",
        medicalDirector: {
            name: "Mark A. Valasek, M.D., Ph.D.",
            title: "Medical Director"
        },
        address: {
            street: "3201 University Drive East, Suite 330",
            city: "Bryan",
            state: "TX",
            zip: "77802"
        }
    },
    specimen: {
        accession: "# PP24-1011",
        collectedDate: "11/27/2024",
        receivedDate: "12/04/2024",
        reportedDate: "12/05/2024 05:00 PM"
    }
};

const sectionTestData: Record<string, any> = {
    "case_notes": "",
    "confidence": "H = high",
    "nas_fibrosis": "F3",
    "bile_reaction": "2 = 3-5 ductules, single layer of ducts around interface",
    "biopsy_length": 35,
    "nas_steatosis": "2",
    "portal_tracts": 36,
    "ishak_fibrosis": "Stage 4",
    "nas_ballooning": "2",
    "specimen_issue": [],
    "fat_droplet_size": "Mostly large",
    "nas_inflammation": "2",
    "specimen_quality": "Optimal",
    "fibrosis_comments": "",
    "interface_activity": "1 = 1-2 foci"
};

const sectionMapping = async (): Promise<Section[]> =>
{
    const headerData = await (async (): Promise<Record<string, any>> =>
    {
        return headerTestData;
    })();

    const sectionData = await (async (): Promise<Record<string, any>> =>
    {
        return sectionTestData;
    })();

    return [
        {
            title: "Headers",
            body: [
                {
                    type: "Header1",
                    title: "Header 1",
                    alt: "Header Preset 1",
                    imageURL: "/HeaderPreset1.png",
                    keys: headerData
                },
                {
                    type: "Header2",
                    title: "Header 2",
                    alt: "Header Preset 2",
                    imageURL: "/HeaderPreset2.png",
                    keys: headerData
                }
            ]
        },
        {
            title: "Sections",
            body: [
                {
                    type: "DataSection",
                    title: "Section 1",
                    alt: "Section Preset 1",
                    imageURL: "/SectionPreset1.png",
                    keys: sectionData
                },
                {
                    type: "TitleSection",
                    title: "Title",
                    alt: "Title",
                    imageURL: "/Title.png"
                }
            ]
        }
    ];
};

export default sectionMapping;

