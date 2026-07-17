import { AddBannerCommand, Banner } from "../../types/typesIndex";
import { api } from "./axios"


export const getBannersRequest = async (): Promise<Banner[]> => {

    const response = await api.get("/banners");

    if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = response.data as Banner[];
    return data;


}

export const addBannerRequest = async (addBannerCommand: AddBannerCommand, imageFile?: File): Promise<Banner[]> => {

    if (!imageFile) {
        throw new Error("Debes seleccionar una imagen para el banner");
    }

    const formData = new FormData();

    formData.append("imageFile", imageFile);
    formData.append("addBannerCommand", new Blob([JSON.stringify(addBannerCommand)], { type: "application/json" }));

    // new Blob([JSON.stringify(addBannerCommand)], { type: "application/json" } )

    const response = await api.post("/banners", formData);

    if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.data;
}


export const deleteBannerRequest = async (bannerId: number) => {

    const response = await api.delete("/banners/" + bannerId);

    if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
    }


}