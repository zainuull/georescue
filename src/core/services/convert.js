import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/id'; // Gunakan locale Indonesia

dayjs.extend(utc);
dayjs.extend(timezone);

const transformData = (data, keyPrefix, fieldsToInclude) => {
  let result = {};
  data.forEach((item, index) => {
    fieldsToInclude.forEach((field) => {
      if (field === 'file_foto' && item[field]) {
        // Convert file_foto to binary format
        result[`${keyPrefix}[${index}][${field}]`] = item[field] instanceof File ? item[field] : {};
      } else if (item[field] !== undefined) {
        result[`${keyPrefix}[${index}][${field}]`] = item[field];
      }
    });
  });
  return result;
};

const parseToNumber = (data) => {
  if (!data) return 0; // Pastikan tidak null atau undefined
  return Number(data.replace(/\./g, ''));
};

const formatDateIndo = (dateString, timeZone = 'Asia/Jakarta') => {
  return dayjs.tz(dateString, timeZone).locale('id').format('DD MMMM YYYY HH:mm [WIB]'); // WIB bisa diganti dengan WITA/WIT sesuai kebutuhan
};

const convertHexToRGB = (hex) => {
  // Hapus karakter hash (#) jika ada
  hex = hex.replace(/^#/, '');

  // Jika formatnya 3 karakter, ubah menjadi 6 karakter
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};

const formatNumber = (num) => {
  if (num === undefined || num === null || num === '') {
    return '';
  }
  const number = Number(num);

  if (isNaN(number)) {
    return '';
  }

  // Ensure number is a valid finite number
  if (!Number.isFinite(number)) {
    return '';
  }

  // Format the number with thousands separators
  return number.toLocaleString('id-ID');
};

const formatNumberWithComma = (value) => {
  if (value === null || value === undefined) return ''; // Default ke string kosong
  if (typeof value !== 'string') value = String(value); // Convert ke string jika bukan string

  // Hilangkan karakter selain angka dan titik
  value = value.replace(/[^0-9.]/g, '');

  // Jika angka diakhiri dengan titik, tandai bahwa desimal kosong
  const endsWithDot = value.endsWith('.');

  // Pisahkan angka sebelum dan setelah titik desimal
  let [integerPart, decimalPart] = value.split('.');

  // Tambahkan separator ribuan (titik)
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Gabungkan kembali angka
  if (endsWithDot) {
    return `${integerPart},`; // Pastikan desimal kosong tetap ada
  } else if (decimalPart !== undefined) {
    return `${integerPart},${decimalPart}`; // Jika ada angka desimal
  }

  return integerPart; // Jika tidak ada titik desimal
};

const formatNumberWith2NumberAfterComa = (value) => {
  if (value === null || value === undefined) return ''; // Default ke string kosong
  if (typeof value !== 'string') value = String(value); // Convert ke string jika bukan string

  // Hilangkan karakter selain angka dan titik
  value = value.replace(/[^0-9.]/g, '');

  // Jika angka diakhiri dengan titik, tandai bahwa desimal kosong
  const endsWithDot = value.endsWith('.');

  // Pisahkan angka sebelum dan setelah titik desimal
  let [integerPart, decimalPart] = value.split('.');

  // Tambahkan separator ribuan (titik)
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Jika ada desimal, pastikan hanya 2 angka di belakang koma
  if (decimalPart !== undefined) {
    decimalPart = decimalPart.slice(0, 2); // Batasi maksimal 2 angka desimal
    return `${integerPart},${decimalPart}`;
  }

  // Jika angka berakhir dengan titik, pastikan tetap ada koma
  if (endsWithDot) {
    return `${integerPart},`;
  }

  return integerPart;
};

function removeDots(value) {
  return value.replace(/\./g, '');
}

const parseAndFormatNumber = (value) => {
  // Clean the value and replace comma with dot for decimal
  const cleanedValue = value
    .replace(/\./g, '') // Remove all existing thousand separators (dots in this case)
    .replace(/,/g, '.') // Replace decimgaal commas with dots
    .replace(/[^0-9.]/g, ''); // Remove any non-numeric characters except dots

  // Convert to number and format
  const numericValue = parseFloat(cleanedValue);
  if (isNaN(numericValue)) {
    return value; // If conversion fails, return the original value
  }

  // Format using dot as decimal separator and comma as thousand separator
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const convertToIndonesianFormat = (number) => {
  const hasDecimal = number % 1 !== 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  }).format(number);
};

const convertDateYMD = (dt,useTimezoneOffset = true) => {
  if (!dt) return '';
  const date = new Date(dt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // padding untuk bulan
  const day = String(date.getDate()).padStart(2, '0');        // padding untuk tanggal
  return `${year}-${month}-${day}`;
};
const convertDateDMY = (dt, delimiter = '-', useTimezoneOffset = true) => {
  if (!dt) return '';
  const d = new Date(dt);
//   const timezoneOffset = d.getTimezoneOffset();
//   d.setMinutes(d.getMinutes() - useTimezoneOffset ? timezoneOffset : 0);
// console.log('timezoneOffset ', timezoneOffset);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi tambahkan 1
  const year = d.getFullYear();

  return `${day}${delimiter}${month}${delimiter}${year}`;
};

function convertIndonesianDayDDMMYYYY(strdate, hideDay) {
  if (!strdate) return '';

  // Jika input hanya YYYY-MM-DD, tambahkan jam default
  if (/^\d{4}-\d{2}-\d{2}$/.test(strdate)) {
    strdate += 'T00:00:00';
  }
  
  const timezoneOffset = new Date(strdate).getTimezoneOffset();

  const offsetMap = {
    '-420': 'Asia/Jakarta',    // WIB
    '-480': 'Asia/Makassar',   // WITA
    '-540': 'Asia/Jayapura'    // WIT
  };

  const zonaTime = offsetMap[timezoneOffset.toString()] || 'Asia/Jakarta';

  const date = dayjs.tz(strdate, zonaTime);
  if(hideDay){

    return date.format('D MMMM YYYY'); // e.g., "Selasa, 20 Mei 2025"
  }else{

    return date.format('dddd, D MMMM YYYY'); // e.g., "Selasa, 20 Mei 2025"
  }
}

const imageUrlToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // base64 string
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


function subtractDays(days) {
  const today = new Date();
  const newDate = new Date();
  newDate.setDate(today.getDate() - days);
  return newDate.toISOString();
}

const toLowerCapitalCase = (str) => {
  if(!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

function calculateThresholds(data, key_total = 'total_produksi') {
  // 1. Mengambil angka maksimal
  const maxProduksi = Math.max(
    ...data.map((item) => (item[`${key_total}`] !== null ? parseFloat(item[`${key_total}`]) : 0))
  );

  // Determine the divisor based on the maxProduksi value
  let pembagi;
  switch (true) {
    case maxProduksi > 6e8:
      pembagi = 1e8;
      break;
    case maxProduksi > 5e8:
      pembagi = 5e7;
      break;
    case maxProduksi > 1e8:
      pembagi = 1e7;
      break;
    case maxProduksi > 1e7:
      pembagi = 1e6;
      break;
    case maxProduksi > 4e6:
      pembagi = 4e5;
      break;
    case maxProduksi > 1e6:
      pembagi = 1e5;
      break;
    case maxProduksi > 1e5:
      pembagi = 1e4;
      break;
    case maxProduksi > 1e4:
      pembagi = 1e3;
      break;
    case maxProduksi > 1e3:
      pembagi = 10;
      break;
    default:
      pembagi = 0.1;
  }

  // 2. Pembulatan ke bawah
  const roundedMax = Math.floor(maxProduksi / pembagi) * pembagi; // Pembulatan ke bawah ke kelipatan pembagi

  // 3. Membagi menjadi 6 angka dengan pembulatan ke bawah
  const thresholds = Array.from({ length: 4 }, (_, idx) => {
    const step = roundedMax / 6;
    return Math.floor((step * (idx + 1)) / pembagi) * pembagi; // Pembulatan ke bawah ke kelipatan pembagi
  });

  // Tambahkan threshold paling bawah (< pembagi) dan paling atas (> roundedMax)
  const newThresholds = [pembagi / 10, ...thresholds, roundedMax];
  return newThresholds; // Return the calculated thresholds
}

const extractErrors = (errors) => {
  const errorMessages = [];

  const traverseErrors = (errorObj) => {
    if (typeof errorObj === 'string') {
      // Langsung tambahkan string tanpa pengecekan tambahan
      errorMessages.push(errorObj);
    } else if (Array.isArray(errorObj)) {
      errorObj.forEach((item) => traverseErrors(item));
    } else if (typeof errorObj === 'object' && errorObj !== null) {
      Object.values(errorObj).forEach(traverseErrors);
    }
  };

  traverseErrors(errors);
  return errorMessages.join('<br/>');
};

function filterEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
    )
  );
}

function splitName(fullName) {
  const nameParts = fullName.split(' '); // Memecah nama berdasarkan spasi

  let firstName = '';
  let middleName = '';
  let lastName = '';

  if (nameParts.length === 1) {
    firstName = nameParts[0]; // Hanya satu kata
  } else if (nameParts.length === 2) {
    firstName = nameParts[0]; // Dua kata
    lastName = nameParts[1];
  } else {
    firstName = nameParts[0]; // Lebih dari dua kata
    middleName = nameParts.slice(1, -1).join(' '); // Mengambil nama tengah
    lastName = nameParts[nameParts.length - 1]; // Nama belakang
  }

  return {
    firstName,
    middleName,
    lastName,
  };
}

const convertToMB = (size) => {
  if (!size || size <= 0) return null; // Jangan tampilkan jika size 0, null, atau undefined

  return (size / (1024 * 1024)).toFixed(1) + ' MB'; // Konversi ke MB dengan 1 desimal
};

const checkNumeric = (value) => {
  return /^-?\d+(\.\d+)?$/.test(value);
};

const formatUnderscore = (str) => {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const convertAddonsDownloadExcel = (filter) => {
  const result = [];
  const entries = Object.entries(filter);
  const lastIndex = entries.length - 1; // Dapatkan index terakhir

  entries.forEach(([key, value], index) => {
    // Convert underscore to space and capitalize each word
    const formattedKey = key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

    result.push({ text: `${formattedKey}:`, font: { size: 14, italic: true } }); // Add formatted key

    // Tambahkan "\n" hanya jika bukan elemen terakhir
    result.push({
      text: value + (index !== lastIndex ? '\n' : ''),
      font: { size: 14, bold: true },
    });
  });

  return result;
};

const sortByDateField = (data = [], field = 'created_on', order = 'desc') => {
  if (!Array.isArray(data)) return [];

  return [...data].sort((a, b) => {
    const dateA = new Date(a[field]);
    const dateB = new Date(b[field]);

    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

const getUniqueByKey = (data, key)=> {
  return data.reduce((acc, item) => {
    if (!acc.map.has(item[key])) {
      acc.map.set(item[key], true);
      acc.result.push(item);
    }
    return acc;
  }, { map: new Map(), result: [] }).result;
}

const statusValidation = [
  { label: 'Draf', value: 1 },
  { label: 'Submit', value: 2 },
  { label: 'Valid', value: 3 },
  { label: 'Pemutakhiran', value: 4 },
  { label: 'Invalid', value: 5 }
];
const generateStatusValidasi = (status) => {
  return statusValidation.find((item) => item.value == status)?.label || '';
};

const capitalizeTheFirstLetterOfEachWord = (words) => {
  if (typeof words !== "string") return ""; // Tangani jika words bukan string

  return words
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
};



export {
  capitalizeTheFirstLetterOfEachWord,
  convertAddonsDownloadExcel,
  formatUnderscore,
  checkNumeric,
  convertToMB,
  calculateThresholds,
  convertToIndonesianFormat,
  convertHexToRGB,
  formatNumber,
  formatNumberWithComma,
  formatNumberWith2NumberAfterComa,
  removeDots,
  convertDateYMD,
  convertDateDMY,
  parseAndFormatNumber,
  extractErrors,
  toLowerCapitalCase,
  filterEmptyValues,
  splitName,
  formatDateIndo,
  parseToNumber,
  transformData,
  subtractDays,
  sortByDateField,
  convertIndonesianDayDDMMYYYY,
  imageUrlToBase64,
  getUniqueByKey,
  generateStatusValidasi
};
