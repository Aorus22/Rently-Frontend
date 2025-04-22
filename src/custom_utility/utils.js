export function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date) {
  return date ? new Date(date).toLocaleDateString("id-ID") : "-"
}

export function formatDateTime(dateTime) {
  return dateTime ? new Date(dateTime).toLocaleString("id-ID") : "-"
}

export async function downloadFile(url, filename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Gagal mengambil file');

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
}
