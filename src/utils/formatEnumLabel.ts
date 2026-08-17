import { MediumEnum, SupportMaterialEnum } from "../types/typesIndex";

export function formatEnumLabel<T extends Record<string, string>>(
    enumObject: T,
    value: string | T[keyof T]
): string {
    const stringValue = String(value);

    if (stringValue in enumObject) {
        return enumObject[stringValue as keyof T];
    }

    const entry = Object.entries(enumObject).find(([, enumValue]) => enumValue === stringValue);
    if (entry) {
        return entry[1];
    }

    return stringValue;
}

const MEDIUM_KEY_ALIASES: Record<string, string> = {
    ACRYLYC_PAINT: "ACRYLIC_PAINT",
};

export function formatMedium(medium: MediumEnum | string): string {
    const normalized = MEDIUM_KEY_ALIASES[String(medium)] ?? medium;
    return formatEnumLabel(MediumEnum, normalized);
}

export function formatSupportMaterial(supportMaterial: SupportMaterialEnum | string): string {
    return formatEnumLabel(SupportMaterialEnum, supportMaterial);
}
