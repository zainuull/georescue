import React, { forwardRef, useImperativeHandle } from 'react';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

const ExportExcelDatis = forwardRef((props, ref) => {
  const {
    name,
    header,
    setFile,
    isHide,
    data,
    format_excel = 'xlsx',
    customText = 'Eksport Excel',
    hideLastUpdate,
  } = props;

  //Dinamis Column Name
  const getExcelColumnName = (colIndex) => {
    let columnName = '';
    let dividend = colIndex;
    let modulo;

    while (dividend > 0) {
      modulo = (dividend - 1) % 26;
      columnName = String.fromCharCode(65 + modulo) + columnName;
      dividend = Math.floor((dividend - modulo) / 26);
    }

    return columnName;
  };

  const downloadExcel = async (datas) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    // Add dynamic headers

    header
      // .filter((o) => typeof o.name === 'string' && o.name.toLowerCase() !== 'aksi')
      .forEach((label, index) => {
        const startColIndex = 2 + index; // Increment by 1 to handle columns individually (start from column 'B')

        const startCol = getExcelColumnName(startColIndex); // Get the column name from the index
        const startCellRef = startCol + '8'; // Cell reference for the header (row 8)

        // Set a default min width (e.g., 20 characters width)
        worksheet.getColumn(startColIndex).width = 20;

        // Set value in the cell
        worksheet.getCell(startCellRef).value = label.name || label.label;

        const cell = worksheet.getCell(startCellRef);

        // Apply font styling
        cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };

        // Align the text to center
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        // Add thick border to the header cell
        cell.border = {
          top: { style: 'thick' },
          left: { style: 'thick' },
          bottom: { style: 'thick' },
          right: { style: 'thick' },
        };

        // Set background color for the cell
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF3B82F6' }, // Blue background color
        };
      });

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    // Common function to process data based on column references and value extractors
    const processData = (data, cellRefs, valueExtractor) => {
      const dataArray = Array.isArray(datas) ? datas : Array.isArray(data) ? data : [];
      dataArray?.forEach((rowData, rowIndex) => {
        //Check ada properties dan berbentuk array atau tidak
        const temp_data = rowData?.properties ? rowData?.properties : rowData;

        const values = valueExtractor(temp_data).map((value) => value);

        cellRefs.forEach((cellRef, cellIndex) => {
          const currentRowIndex = rowIndex + 9; // Start from row 10

          // Convert the initial cellRef to an index
          let startColIndex = cellRef.split('').reduce((acc, char) => {
            return acc * 26 + (char.charCodeAt(0) - 65 + 1);
          }, 0);

          // Adjust for zero-indexing
          startColIndex--;

          const startCol = getExcelColumnName(startColIndex + 1); // Get column name from index
          const currentCellRef = `${startCol}${currentRowIndex}`; // Calculate current cell reference

          // Set the cell value, checking if the value is numeric
          const cellValue = values[cellIndex];
          // Check if the value should be treated as a number
          if (!isNaN(cellValue) && !isNaN(parseFloat(cellValue))) {
            worksheet.getCell(currentCellRef).value = parseFloat(cellValue);
            if (Number.isInteger(parseFloat(cellValue))) {
              worksheet.getCell(currentCellRef).numFmt = '0'; // No decimal places
            } else {
              worksheet.getCell(currentCellRef).numFmt = '0.00'; // Show 2 decimal places for non-integers
            }
          } else {
            worksheet.getCell(currentCellRef).value = cellValue;
          }

          // Apply styles to the cell
          worksheet.getCell(currentCellRef).font = { name: 'Arial', size: 10 };
          worksheet.getCell(currentCellRef).alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
          };
          worksheet.getCell(currentCellRef).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
          worksheet.getRow(currentRowIndex).height = 20;
        });
      });
    };

    const getDataFromRow = (rowData) => {
      return header.map((h) => rowData[h.id ? h.id : h.propertyKey]);
    };
    const generateColumns = (headerLength) => {
      return Array.from({ length: headerLength }, (_, i) => String.fromCharCode(66 + i)); // 66 = 'B'
    };

    processData(datas || [], generateColumns(header.length), getDataFromRow);

    worksheet.getCell('B2').value = `${name}`;
    if (!hideLastUpdate) {
      worksheet.getCell('G2').value = `Terakhir update : ${formattedDate}`;
    }

    // Apply font styling to the about cells
    const about = ['B2', 'G2'];
    about.forEach((cellRef) => {
      const cell = worksheet.getCell(cellRef);
      cell.font = { name: 'Arial', size: 16, bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    });

    // Generate an XLSX file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    if (isHide) {
      // untuk data insight (dikirim ke email)
      const fileName = `${name}.${format_excel}`;
      const file = new File([blob], fileName, {
        type: blob.type,
        lastModified: new Date().getTime(),
      });
      setFile(file);
    } else {
      // Save the file using FileSaver
      FileSaver.saveAs(blob, `${name}.${format_excel}`);
    }
  };

  useImperativeHandle(ref, () => ({
    downloadExcel,
  }));

  return (
    <button onClick={() => downloadExcel(data)} className="btn btn-success">
      {customText}
    </button>
  );
});

export default ExportExcelDatis;
