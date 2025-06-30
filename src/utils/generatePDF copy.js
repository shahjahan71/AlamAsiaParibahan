// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const convertTo12Hour = (time24) => {
//   const [hours, minutes] = time24.split(':');
//   const period = +hours >= 12 ? 'PM' : 'AM';
//   const hours12 = +hours % 12 || 12;
//   return `${hours12}:${minutes} ${period}`;
// };

// export const generatePDF = (date, runningBuses, offChartBuses) => {
//   // Initialize jsPDF
//   const doc = new jsPDF();
  
//   // Add logo/header
//   doc.setFillColor(30, 64, 175); // Blue-800
//   doc.rect(0, 0, 210, 30, 'F');
//   doc.setFontSize(20);
//   doc.setTextColor(255, 255, 255);
//   doc.text('DAILY BUS SCHEDULE', 105, 20, { align: 'center' });

//   // Add date information
//   doc.setFontSize(10);
//   doc.setTextColor(100, 100, 100);
//   doc.text(`Schedule Date: ${date.toLocaleDateString('en-US', { 
//     weekday: 'long', 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   })}`, 14, 40);
  
//   doc.text(`Generated: ${new Date().toLocaleString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   })}`, 14, 46);

//   // Running Buses Table
//   doc.setFontSize(14);
//   doc.setTextColor(0, 0, 0);
//   doc.text('RUNNING BUSES', 14, 60);
  
//   autoTable(doc, {
//     startY: 65,
//     head: [['Position', 'Bus Number', 'Departure Time']],
//     body: runningBuses.map(bus => [
//       bus.position,
//       bus.busNumber,
//       convertTo12Hour(bus.departureTime)
//     ]),
//     headStyles: {
//       fillColor: [34, 197, 94], // Green-500
//       textColor: [255, 255, 255],
//       fontStyle: 'bold'
//     },
//     alternateRowStyles: {
//       fillColor: [240, 253, 244] // Green-50
//     },
//     styles: {
//       cellPadding: 5,
//       fontSize: 10
//     },
//     columnStyles: {
//       0: { cellWidth: 25 }, // Position column
//       2: { cellWidth: 40 }  // Time column
//     }
//   });

//   // Off-Chart Buses Table
//   doc.setFontSize(14);
//   doc.text('OFF-CHART BUSES', 14, doc.lastAutoTable.finalY + 20);
  
//   autoTable(doc, {
//     startY: doc.lastAutoTable.finalY + 25,
//     head: [['Position', 'Bus Number', 'Status']],
//     body: offChartBuses.map((bus, index) => [
//       index + 1,
//       bus.busNumber || bus, // Handle both object and string formats
//       'Off-Chart'
//     ]),
//     headStyles: {
//       fillColor: [239, 68, 68], // Red-500
//       textColor: [255, 255, 255],
//       fontStyle: 'bold'
//     },
//     alternateRowStyles: {
//       fillColor: [254, 242, 242] // Red-50
//     },
//     styles: {
//       cellPadding: 5,
//       fontSize: 10
//     },
//     columnStyles: {
//       0: { cellWidth: 25 } // Position column
//     }
//   });

//   // Footer
//   doc.setFontSize(8);
//   doc.setTextColor(100, 100, 100);
//   doc.text('© 2025 Bus Management System', 105, doc.lastAutoTable.finalY + 10, { align: 'center' });

//   // Save the PDF
//   doc.save(`bus_schedule_${date.toISOString().split('T')[0]}.pdf`);
// };



























// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const convertTo12Hour = (time24) => {
//   const [hours, minutes] = time24.split(':');
//   const period = +hours >= 12 ? 'PM' : 'AM';
//   const hours12 = +hours % 12 || 12;
//   return `${hours12}:${minutes} ${period}`;
// };

// export const generatePDF = (date, runningBuses, offChartBuses) => {
//   const doc = new jsPDF({
//     orientation: 'landscape'
//   });

//   // Date information (more compact)
//   doc.setFontSize(10);
//   doc.setTextColor(0, 0, 0); // Black for better printing
//   doc.text(`Schedule Date: ${date.toLocaleDateString('en-US', { 
//     weekday: 'short', 
//     year: 'numeric', 
//     month: 'short', 
//     day: 'numeric' 
//   })}`, 14, 10);
  
//   doc.text(`Generated: ${new Date().toLocaleString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   })}`, 14, 16);

//   // Configure table styles (print-friendly colors)
//   const tableStyles = {
//     headStyles: {
//       fillColor: [220, 220, 220], // Light gray for headers (better for printing)
//       textColor: [0, 0, 0],       // Black text
//       fontStyle: 'bold',
//       fontSize: 10,
//       lineWidth: 0.1              // Thin borders
//     },
//     bodyStyles: {
//       textColor: [0, 0, 0],       // Black text
//       fontSize: 9,
//       lineWidth: 0.1              // Thin borders
//     },
//     alternateRowStyles: {
//       fillColor: [245, 245, 245]  // Very light gray for alternate rows
//     },
//     margin: { top: 20 },
//     styles: {
//       cellPadding: 2,             // Reduced padding
//       fontSize: 8,               // Smaller font
//       halign: 'center',
//       lineWidth: 0.1              // Thin borders
//     },
//     columnStyles: {
//       0: { cellWidth: 15 },      // Position column
//       2: { cellWidth: 20 }       // Time/Status column
//     }
//   };

//   // Running Buses - 3 columns per page
//   const runningColumns = [
//     { title: 'Pos', dataKey: 'position' },
//     { title: 'Bus #', dataKey: 'busNumber' },
//     { title: 'Time', dataKey: 'time' },
//     { title: 'Pos', dataKey: 'position2' },
//     { title: 'Bus #', dataKey: 'busNumber2' },
//     { title: 'Time', dataKey: 'time2' },
//     { title: 'Pos', dataKey: 'position3' },
//     { title: 'Bus #', dataKey: 'busNumber3' },
//     { title: 'Time', dataKey: 'time3' }
//   ];

//   // Split running buses into chunks for 3-column layout
//   const runningChunks = [];
//   for (let i = 0; i < runningBuses.length; i += 3) {
//     const bus1 = runningBuses[i];
//     const bus2 = runningBuses[i + 1];
//     const bus3 = runningBuses[i + 2];
//     runningChunks.push({
//       position: bus1.position,
//       busNumber: bus1.busNumber,
//       time: convertTo12Hour(bus1.departureTime),
//       position2: bus2?.position || '',
//       busNumber2: bus2?.busNumber || '',
//       time2: bus2 ? convertTo12Hour(bus2.departureTime) : '',
//       position3: bus3?.position || '',
//       busNumber3: bus3?.busNumber || '',
//       time3: bus3 ? convertTo12Hour(bus3.departureTime) : ''
//     });
//   }

//   autoTable(doc, {
//     ...tableStyles,
//     head: [['Running Buses', '', '', '', '', '', '', '', '']],
//     body: runningChunks,
//     columns: runningColumns
//   });

//   // Off-Chart Buses - 3 columns per page
//   const offChartColumns = [
//     { title: 'Pos', dataKey: 'position' },
//     { title: 'Bus #', dataKey: 'busNumber' },
//     { title: 'Pos', dataKey: 'position2' },
//     { title: 'Bus #', dataKey: 'busNumber2' },
//     { title: 'Pos', dataKey: 'position3' },
//     { title: 'Bus #', dataKey: 'busNumber3' }
//   ];

//   // Split off-chart buses into chunks for 3-column layout
//   const offChartChunks = [];
//   for (let i = 0; i < offChartBuses.length; i += 3) {
//     offChartChunks.push({
//       position: i + 1,
//       busNumber: offChartBuses[i].busNumber || offChartBuses[i],
//       position2: i + 2 <= offChartBuses.length ? i + 2 : '',
//       busNumber2: i + 1 < offChartBuses.length ? (offChartBuses[i + 1].busNumber || offChartBuses[i + 1]) : '',
//       position3: i + 3 <= offChartBuses.length ? i + 3 : '',
//       busNumber3: i + 2 < offChartBuses.length ? (offChartBuses[i + 2].busNumber || offChartBuses[i + 2]) : ''
//     });
//   }

//   autoTable(doc, {
//     ...tableStyles,
//     head: [['Off-Chart Buses', '', '', '', '', '']],
//     body: offChartChunks,
//     columns: offChartColumns,
//     startY: doc.lastAutoTable.finalY + 10
//   });

//   // Compact footer
//   doc.setFontSize(7);
//   doc.setTextColor(100, 100, 100);
//   doc.text('© 2025 Bus Management System', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 5, { align: 'center' });

//   // Save the PDF
//   doc.save(`bus_schedule_${date.toISOString().split('T')[0]}.pdf`);
// };






















// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const convertTo12Hour = (time24) => {
//   const [hours, minutes] = time24.split(':');
//   const period = +hours >= 12 ? 'PM' : 'AM';
//   const hours12 = +hours % 12 || 12;
//   return `${hours12}:${minutes} ${period}`;
// };

// export const generatePDF = (date, runningBuses, offChartBuses) => {
//   const doc = new jsPDF({
//     orientation: 'landscape'
//   });

//   // Add page number handler
//   const addPageNumber = (doc) => {
//     const pageCount = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= pageCount; i++) {
//       doc.setPage(i);
//       doc.setFontSize(8);
//       doc.setTextColor(100, 100, 100);
//       doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
//     }
//   };

//   // Configure table styles (no background colors, all bold text)
//   const tableStyles = {
//     headStyles: {
//       fillColor: false, // No background
//       textColor: [0, 0, 0],
//       fontStyle: 'bold', // Bold headers
//       fontSize: 10,
//       lineWidth: 0.1,
//       lineColor: [0, 0, 0] // Black borders
//     },
//     bodyStyles: {
//       fillColor: false, // No background
//       textColor: [0, 0, 0],
//       fontStyle: 'bold', // Bold body text
//       fontSize: 10,
//       lineWidth: 0.1,
//       lineColor: [0, 0, 0] // Black borders
//     },
//     alternateRowStyles: {
//       fillColor: false // No alternating row colors
//     },
//     margin: { top: 30 },
//     styles: {
//       cellPadding: 2,
//       fontSize: 10,
//       fontStyle: 'bold', // All text bold
//       halign: 'center',
//       lineWidth: 0.1,
//       lineColor: [0, 0, 0], // Black borders
//       fillColor: false // No cell backgrounds
//     },
//     columnStyles: {
//       0: { cellWidth: 'auto' },
//       1: { cellWidth: 'auto' },
//       2: { cellWidth: 'auto' },
//       3: { cellWidth: 'auto' },
//       4: { cellWidth: 'auto' },
//       5: { cellWidth: 'auto' },
//       6: { cellWidth: 'auto' },
//       7: { cellWidth: 'auto' },
//       8: { cellWidth: 'auto' }
//     }
//   };

//   // Add company header to each page (bold text)
//   const addPageHeader = (doc) => {
//     const pageCount = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= pageCount; i++) {
//       doc.setPage(i);
//       doc.setFontSize(12);
//       doc.setTextColor(0, 0, 0);
//       doc.setFont(undefined, 'bold');
//       doc.text('Alam Asia Paribahan (Pvt) LTD', 14, 10);
//       doc.setFontSize(10);
//       doc.text('Fulbaria, Mymensingh', 14, 16);
      
//       doc.setFontSize(9);
//       doc.text(`Schedule Date: ${date.toLocaleDateString('en-US', { 
//         weekday: 'short', 
//         year: 'numeric', 
//         month: 'short', 
//         day: 'numeric' 
//       })}`, doc.internal.pageSize.width - 60, 10);
      
//       doc.text(`Generated: ${new Date().toLocaleString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       })}`, doc.internal.pageSize.width - 60, 16);
//     }
//   };

//   // Function to create 3-column layout data
//   const createThreeColumnData = (data, hasTime = false) => {
//     const rows = [];
//     const itemsPerColumn = Math.ceil(data.length / 3);
    
//     for (let i = 0; i < itemsPerColumn; i++) {
//       const row = [];
      
//       // First column
//       if (data[i]) {
//         row.push(
//           data[i].position,
//           data[i].busNumber || data[i],
//           hasTime ? convertTo12Hour(data[i].departureTime) : ''
//         );
//       } else {
//         row.push('', '', '');
//       }
      
//       // Second column
//       if (data[i + itemsPerColumn]) {
//         row.push(
//           data[i + itemsPerColumn].position,
//           data[i + itemsPerColumn].busNumber || data[i + itemsPerColumn],
//           hasTime ? convertTo12Hour(data[i + itemsPerColumn].departureTime) : ''
//         );
//       } else {
//         row.push('', '', '');
//       }
      
//       // Third column
//       if (data[i + itemsPerColumn * 2]) {
//         row.push(
//           data[i + itemsPerColumn * 2].position,
//           data[i + itemsPerColumn * 2].busNumber || data[i + itemsPerColumn * 2],
//           hasTime ? convertTo12Hour(data[i + itemsPerColumn * 2].departureTime) : ''
//         );
//       } else {
//         row.push('', '', '');
//       }
      
//       rows.push(row);
//     }
    
//     return rows;
//   };

//   // Prepare Running Buses data
//   const runningHeaders = [
//     [
//       'Position', 'Bus Number', 'Departure Time',
//       'Position', 'Bus Number', 'Departure Time', 
//       'Position', 'Bus Number', 'Departure Time'
//     ]
//   ];

//   const runningData = createThreeColumnData(runningBuses, true);

//   // Add Running Buses section (bold text)
//   doc.setFontSize(12);
//   doc.setFont(undefined, 'bold');
//   doc.text('Running Buses', 14, 25);
//   doc.setFont(undefined, 'normal');

//   autoTable(doc, {
//     ...tableStyles,
//     head: runningHeaders,
//     body: runningData,
//     startY: 30,
//     didDrawPage: function(data) {
//       doc.setFontSize(10);
//       doc.setTextColor(0, 0, 0);
//     }
//   });

//   // Add page headers and numbers for first page
//   addPageHeader(doc);
//   addPageNumber(doc);

//   // Create new page for Off-Chart Buses
//   doc.addPage('landscape');

//   // Prepare Off-Chart Buses data
//   const offChartHeaders = [
//     [
//       'Position', 'Bus Number', '',
//       'Position', 'Bus Number', '',
//       'Position', 'Bus Number', ''
//     ]
//   ];

//   const offChartData = createThreeColumnData(offChartBuses.map((bus, index) => ({
//     position: index + 1,
//     busNumber: bus.busNumber || bus
//   })));

//   // Add Off-Chart Buses section on new page (bold text)
//   doc.setFontSize(12);
//   doc.setFont(undefined, 'bold');
//   doc.text('Off-Chart Buses', 14, 25);
//   doc.setFont(undefined, 'normal');

//   autoTable(doc, {
//     ...tableStyles,
//     head: offChartHeaders,
//     body: offChartData,
//     startY: 30,
//     columnStyles: {
//       2: { cellWidth: 10 },
//       5: { cellWidth: 10 },
//       8: { cellWidth: 10 }
//     }
//   });

//   // Add page headers and numbers for second page
//   addPageHeader(doc);
//   addPageNumber(doc);

//   // Save the PDF
//   doc.save(`bus_schedule_${date.toISOString().split('T')[0]}.pdf`);
// };
