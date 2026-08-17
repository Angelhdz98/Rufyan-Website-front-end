import React from "react";
import classNames from "classnames";
import { ProductDomainDetails } from "../types/typesIndex";
import { formatMedium, formatSupportMaterial } from "../utils/formatEnumLabel";

export interface DetailsTagProps extends React.HTMLAttributes<HTMLDivElement> {
    productDetails: ProductDomainDetails;
}

interface DetailItemProps {
    label: string;
    value: React.ReactNode;
}

function DetailItem({ label, value }: DetailItemProps) {
    return (
        <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">
                {label}
            </span>
            <span className="text-xs text-black">{value}</span>
        </div>
    );
}

function formatCreationDate(date: Date | string): string {
    const parsed = typeof date === "string" ? new Date(date) : date;
    if (Number.isNaN(parsed.getTime())) return String(date);
    return parsed.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function DetailsTag({ productDetails, className, ...rest }: DetailsTagProps) {
    let details: React.ReactNode;

    switch (productDetails.productTypeEnum) {
        case "PAINTING":
            details = (
                <>
                    <DetailItem label="Tipo" value="Pintura" />
                    <DetailItem label="Altura" value={`${productDetails.alturaCm} cm`} />
                    <DetailItem label="Largo" value={`${productDetails.largoCm} cm`} />
                    <DetailItem label="Medio" value={formatMedium(productDetails.medium)} />
                    <DetailItem label="Soporte" value={formatSupportMaterial(productDetails.supportMaterial)} />
                    <DetailItem
                        label="Creación"
                        value={formatCreationDate(productDetails.creationDate)}
                    />
                </>
            );
            break;
        case "CLOTHING":
            details = (
                <>
                    <DetailItem label="Tipo" value="Ropa" />
                    <DetailItem label="Material" value={productDetails.material} />
                    <DetailItem
                        label="Técnica de impresión"
                        value={productDetails.printingTechnique}
                    />
                </>
            );
            break;
        default:
            details = (
                <span className="col-span-2 text-xs text-gray-400">
                    Tipo de producto desconocido
                </span>
            );
    }

    return (
        <div
            className={classNames("grid grid-cols-2 gap-x-4 gap-y-3 py-1", className)}
            {...rest}
        >
            {details}
        </div>
    );
}

export default DetailsTag;
