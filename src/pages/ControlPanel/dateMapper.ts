export const toLocalDateString = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    // Obtener la fecha en formato local sin afectar por zona horaria
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const fromLocalDateString = (dateString: string): Date => {
    // Crear fecha desde string local (yyyy-MM-dd)
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date;
};