import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const convertTo12Hour = (time24) => {
  const [hours, minutes] = time24.split(':');
  const period = +hours >= 12 ? 'PM' : 'AM';
  const hours12 = +hours % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
};

export const generatePDF = (date, runningBuses, offChartBuses) => {
  const doc = new jsPDF({
    orientation: 'landscape'
  });

  // Add page number handler
  const addPageNumber = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
    }
  };

  // Configure table styles (no background colors, all bold text)
  const tableStyles = {
    headStyles: {
      fillColor: false, // No background
      textColor: [0, 0, 0],
      fontStyle: 'bold', // Bold headers
      fontSize: 10, // Increased from 10
      lineWidth: 0.1,
      lineColor: [0, 0, 0] // Black borders
    },
    bodyStyles: {
      fillColor: false, // No background
      textColor: [0, 0, 0],
      fontStyle: 'bold', // Bold body text
      fontSize: 10, // Increased from 10
      lineWidth: 0.1,
      lineColor: [0, 0, 0] // Black borders
    },
    alternateRowStyles: {
      fillColor: false // No alternating row colors
    },
    margin: { top: 30 },
    styles: {
      cellPadding: 2,
      fontSize: 10, // Increased from 10
      fontStyle: 'bold', // All text bold
      halign: 'center',
      lineWidth: 0.1,
      lineColor: [0, 0, 0], // Black borders
      fillColor: false // No cell backgrounds
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' },
      5: { cellWidth: 'auto' },
      6: { cellWidth: 'auto' },
      7: { cellWidth: 'auto' },
      8: { cellWidth: 'auto' }
    }
  };

  // Add company header to each page (bold text)
  const addPageHeader = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'bold');
      doc.text('Alam Asia Paribahan (Pvt) LTD', 14, 10);
      doc.setFontSize(10);
      doc.text('Fulbaria, Mymensingh', 14, 16);
      
      doc.setFontSize(9);
      doc.text(`Schedule Date: ${date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })}`, doc.internal.pageSize.width - 60, 10);
      
      doc.text(`Generated: ${new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`, doc.internal.pageSize.width - 60, 16);
    }
  };

  // Function to create 3-column layout data
  const createThreeColumnData = (data, hasTime = false) => {
    const rows = [];
    const itemsPerColumn = Math.ceil(data.length / 3);
    
    for (let i = 0; i < itemsPerColumn; i++) {
      const row = [];
      
      // First column
      if (data[i]) {
        row.push(
          data[i].position,
          data[i].busNumber || data[i],
          hasTime ? convertTo12Hour(data[i].departureTime) : ''
        );
      } else {
        row.push('', '', '');
      }
      
      // Second column
      if (data[i + itemsPerColumn]) {
        row.push(
          data[i + itemsPerColumn].position,
          data[i + itemsPerColumn].busNumber || data[i + itemsPerColumn],
          hasTime ? convertTo12Hour(data[i + itemsPerColumn].departureTime) : ''
        );
      } else {
        row.push('', '', '');
      }
      
      // Third column
      if (data[i + itemsPerColumn * 2]) {
        row.push(
          data[i + itemsPerColumn * 2].position,
          data[i + itemsPerColumn * 2].busNumber || data[i + itemsPerColumn * 2],
          hasTime ? convertTo12Hour(data[i + itemsPerColumn * 2].departureTime) : ''
        );
      } else {
        row.push('', '', '');
      }
      
      rows.push(row);
    }
    
    return rows;
  };

  // Prepare Running Buses data
  const runningHeaders = [
    [
      'Position', 'Bus Number', 'Departure Time',
      'Position', 'Bus Number', 'Departure Time', 
      'Position', 'Bus Number', 'Departure Time'
    ]
  ];

  const runningData = createThreeColumnData(runningBuses, true);

  // Add Running Buses section (bold text)
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Running Buses', 14, 25);
  doc.setFont(undefined, 'normal');

  autoTable(doc, {
    ...tableStyles,
    head: runningHeaders,
    body: runningData,
    startY: 30,
    columnStyles: {
      0: { fillColor: [220, 220, 220] }, // Soft black (gray) background for position columns
      3: { fillColor: [220, 220, 220] }, // Soft black (gray) background for position columns
      6: { fillColor: [220, 220, 220] }  // Soft black (gray) background for position columns
    },
    didDrawPage: function(data) {
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
    }
  });

  // Add page headers and numbers for first page
  addPageHeader(doc);
  addPageNumber(doc);

  // Create new page for Off-Chart Buses
  doc.addPage('landscape');

  // Prepare Off-Chart Buses data
  const offChartHeaders = [
    [
      'Position', 'Bus Number', '',
      'Position', 'Bus Number', '',
      'Position', 'Bus Number', ''
    ]
  ];

  const offChartData = createThreeColumnData(offChartBuses.map((bus, index) => ({
    position: index + 1,
    busNumber: bus.busNumber || bus
  })));

  // Add Off-Chart Buses section on new page (bold text)
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Off-Chart Buses', 14, 25);
  doc.setFont(undefined, 'normal');

  autoTable(doc, {
    ...tableStyles,
    head: offChartHeaders,
    body: offChartData,
    startY: 30,
    columnStyles: {
      0: { fillColor: [220, 220, 220] }, // Soft black (gray) background for position columns
      3: { fillColor: [220, 220, 220] }, // Soft black (gray) background for position columns
      6: { fillColor: [220, 220, 220] }, // Soft black (gray) background for position columns
      2: { cellWidth: 30 }, // Wider empty column for writing
      5: { cellWidth: 30 }, // Wider empty column for writing
      8: { cellWidth: 30 }  // Wider empty column for writing
    }
  });

  // Add page headers and numbers for second page
  addPageHeader(doc);
  addPageNumber(doc);

  // Save the PDF
  doc.save(`bus_schedule_${date.toISOString().split('T')[0]}.pdf`);
};
