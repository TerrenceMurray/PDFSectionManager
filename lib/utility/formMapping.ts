import DataForm from "@/components/forms/DataForm";
import HeaderForm from "@/components/forms/HeaderForm";
import TitleForm from "@/components/forms/TitleForm";

// Map of form types to components
export default {
    Header1: HeaderForm,
    Header2: HeaderForm,
    DataSection: DataForm,
    TitleSection: TitleForm,
} as Record<string, React.ComponentType<any>>;