export function openWhatsapp(message: string, phone: '9774888724') {
    const url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}