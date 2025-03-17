import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const generatePdfReport = (initialData, environmentData, socialData, financeData) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("ESG Vastuullisuusraportti", 14, 20);

  let startY = 30;

  // Funktio, joka lisää yhden osion PDF:iin vain, jos osion datassa on kenttiä, joissa on arvoa
  const addSection = (title, data) => {
    const rows = Object.entries(data).filter(([key, value]) => value && value.trim() !== '');
    if (rows.length === 0) return; // Jos data on tyhjää, ohitetaan osio
    doc.setFontSize(16);
    doc.text(title, 14, startY);
    startY += 6;
    doc.setFontSize(12);
    autoTable(doc, {
      startY: startY,
      head: [['Kenttä', 'Arvo']],
      body: rows.map(([key, value]) => [key, value]),
      theme: 'striped',
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10 }
    });
    startY = doc.lastAutoTable.finalY + 10;
  };

  addSection("Yrityksen perustiedot", initialData);
  addSection("Ympäristö", environmentData);
  addSection("Sosiaalinen vastuu", socialData);
  addSection("Talous ja hallinto", financeData);

  doc.save("ESG_raportti.pdf");
};

export default generatePdfReport;
