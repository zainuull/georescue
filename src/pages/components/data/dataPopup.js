const generateDynamicTable = (result, fields) => {
  if (!result) return '<div>Tidak ada data</div>';

  let rows = fields.map((field, index) => {
    const backgroundColor = index % 2 === 0 ? '#f0f0f0' : '#ffffff';
    return `
      <tr style="background-color: ${backgroundColor};">
        <td style="padding: 6px; border: 1px solid #ccc;">${field.label}</td>
        <td style="padding: 6px; border: 1px solid #ccc;">${result[field.key] || 'N/A'}</td>
      </tr>
    `;
  });

  return `
    <table style="border-collapse: collapse; width: 100%;">
      ${rows.join('')}
    </table>
  `;
};

const formatCurrency = (amount) => {
  return `${Number(amount || 0).toLocaleString('id-ID', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })}`;
};

export const dataPopup = {
  // ADMINISTRASI WILAYAH
  Provinsi_Indonesia: (result) => generateDynamicTable(result, [{ label: 'Nama', key: 'nama' }]),

  RTRWP: (result) =>
    generateDynamicTable(result, [
      { label: 'Nama Objek', key: 'Nama_Objek' },
      { label: 'Metadata', key: 'metadata' },
      { label: 'Wilayah Administrasi Provinsi', key: 'Wilayah_Administrasi_Provinsi' },
      { label: 'Rencana Tata Ruang Kawasan', key: 'Rencana_Tata_Ruang_Kawasan' },
      { label: 'RTRPPR', key: 'RTRPPR' },
      { label: 'Peraturan Daerah', key: 'Peraturan_Daerah' },
      { label: 'RTRSYS', key: 'rtrsys' },
    ]),
  Batas_Kabupaten_Kota_2023: (result) =>
    generateDynamicTable(result, [
      { label: 'Kode Kabupaten Kota', key: 'Kode_Kabupaten' },
      { label: 'Nama Kabupaten Kota', key: 'Nama_Objek' },
    ]),

  //.......................................................
  // PERIKANAN TANGKAP
  PELABUHAN_PERIKANAN_PT_50K: (result) =>
    generateDynamicTable(result, [
      { label: 'Nama Objek', key: 'Nama_Objek' },
      { label: 'Kelas', key: 'KELAS' },
      { label: 'Pengelola', key: 'PENGELOLA' },
      { label: 'Status', key: 'STATUS' },
    ]),

  WKOPP_INDONESIA_AR: (result) =>
    generateDynamicTable(result, [
      { label: 'Nomor Wilayah Kerja', key: 'No_Wilayah_Kerja' },
      { label: 'ID Pelabuhan', key: 'ID_Pelabuhan' },
      { label: 'Pelabuhan', key: 'Pelabuhan' },
      { label: 'Nama Pengelola', key: 'Nama_Pengelola' },
      { label: 'Kode Pelabuhan', key: 'Kode_Pelabuhan' },
      { label: 'Tahun', key: 'TAHUN' },
      { label: 'Nama Objek', key: 'Nama_Objek' },
      { label: 'Luas', key: 'LUAS_HA' },
      { label: 'Provinsi', key: 'PROVINSI' },
      { label: 'Kabupaten', key: 'KABUPATEN' },
      { label: 'Kecamatan', key: 'KECAMATAN' },
      { label: 'Wilayah Kerja', key: 'Wilayah_Kerja' },
      { label: 'Kategori', key: 'ID_Kategori' },
      { label: 'Kelas Pelabuhan', key: 'Kelas_Pelabuhan' },
    ]),

  //>>WILAYAH PENGELOLAAN PERIKANAN NEGARA REPUBLIK INDONESIA
  WPPNRI_250K: (result) =>
    generateDynamicTable(result, [
      { label: 'Nama Objek', key: 'Nama_Objek' },
      { label: 'Perairan', key: 'PERAIRAN' },
    ]),

  JENIS_KEKAYAAN_PT_WPPNRI_50K_AR: (result) =>
    generateDynamicTable(result, [
      { label: 'Nama Objek', key: 'Nama_Objek' },
      { label: 'Jumlah Potensi Ikan Pelagis Kecil', key: 'Jumlah_Potensi_Ikan_Pelagis_Kecil' },
      {
        label: 'Jumlah Tangkapan Ikan Pelagis Kecil Yang Diperbolehkan',
        key: 'Jumlah_Tangkapan_Ikan_Pelagis_Kecil_Yang_Diperbolehkan',
      },
      {
        label: 'Tingkat Pemanfaatan Ikan Pelagis Kecil',
        key: 'Tingkat_Pemanfaatan_Ikan_Pelagis_Kecil',
      },
      {
        label: 'Status Pemanfaatan Ikan Pelagis Kecil',
        key: 'Status_Pemanfaatan_Ikan_Pelagis_Kecil',
      },
      { label: 'Jumlah Potensi Ikan Pelagis Besar', key: 'Jumlah_Potensi_Ikan_Pelagis_Besar' },
      {
        label: 'Jumlah Tangkapan Ikan Pelagis Besar Yang Diperbolehkan',
        key: 'Jumlah_Tangkapan_Ikan_Pelagis_Besar_Yang_Diperbolehkan',
      },
      {
        label: 'Tingkat Pemanfaatan Ikan Pelagis Besar',
        key: 'Tingkat_Pemanfaatan_Ikan_Pelagis_Besar',
      },
      {
        label: 'Status Pemanfaatan Ikan Pelagis Besar',
        key: 'Status_Pemanfaatan_Ikan_Pelagis_Besar',
      },
      { label: 'Jumlah Potensi Ikan Demersal', key: 'Jumlah_Potensi_Ikan_Demersal' },
      {
        label: 'Jumlah Tangkapan Ikan Demersal Yang Diperbolehkan',
        key: 'Jumlah_Tangkapan_Ikan_Demersal_Yang_Diperboleh',
      },
      { label: 'Tingkat Pemanfaatan Ikan Demersal', key: 'Tingkat_Pemanfaatan_Ikan_Demersal' },
      { label: 'Status Pemanfaatan Ikan Demersal', key: 'Status_Pemanfaatan_Ikan_Demersal' },
      { label: 'Jumlah Potensi Ikan Karang', key: 'Jumlah_Potensi_Ikan_Karang' },
      {
        label: 'Jumlah Tangkapan Ikan Karang Yang Diperbolehkan',
        key: 'Jumlah_Tangkapan_Ikan_Karang_Yang_Diperbolehkan',
      },
      { label: 'Tingkat Pemanfaatan Ikan Karang', key: 'Tingkat_Pemanfaatan_Ikan_Karang' },
      { label: 'Status Pemanfaatan Ikan Karang', key: 'Status_Pemanfaatan_Ikan_Karang' },
      { label: 'Jumlah Potensi Udang Penaeid', key: 'Jumlah_Potensi_Udang_Penaeid' },
      {
        label: 'Jumlah Tangkapan Udang Penaeid Yang Diperbolehkan',
        key: 'Jumlah_Tangkapan_Udang_Penaeid_Yang_Diperbolehkan',
      },
      { label: 'Tingkat Pemanfaatan Udang Penaeid', key: 'Tingkat_Pemanfaatan_Udang_Penaeid' },
      { label: 'Status Pemanfaatan Udang Penaeid', key: 'Status_Pemanfaatan_Udang_Penaeid' },
      { label: 'Jumlah Potensi Lobster', key: 'Jumlah_Potensi_Lobster' },
      {
        label: 'Jumlah Tangkapan Lobster Yang Diperbolehkan',
        key: 'Jumlah_Tangkapan_Lobster_Yang_Diperbolehkan',
      },
      { label: 'Tingkat Pemanfaatan Lobster', key: 'Tingkat_Pemanfaatan_Lobster' },
      { label: 'Status Pemanfaatan Lobster', key: 'Status_Pemanfaatan_Lobster' },
      { label: 'Jumlah Potensi Kepiting', key: 'Jumlah_Potensi_Kepiting' },
      {
        label: 'Jumlah Tangkapan Kepiting Yang Diperbolehkan',
        key: 'Jumlah_Tangkapan_Kepiting_Yang_Diperbolehkan',
      },
      { label: 'Tingkat Pemanfaatan Kepiting', key: 'Tingkat_Pemanfaatan_Kepiting' },
      { label: 'Status Pemanfaatan Kepiting', key: 'Status_Pemanfaatan_Kepiting' },
      { label: 'Jumlah Potensi Rajungan', key: 'Jumlah_Potensi_Rajungan' },
      {
        label: 'Jumlah Tangkapan Rajungan Yang Diperbolehkan',
        key: 'Jumlah_Tangkapan_Rajungan_Yang_Diperbolehkan',
      },
      { label: 'Tingkat Pemanfaatan Rajungan', key: 'Tingkat_Pemanfaatan_Rajungan' },
      { label: 'Status Pemanfaatan Rajungan', key: 'Status_Pemanfaatan_Rajungan' },
      { label: 'Jumlah Potensi Cumi-Cumi', key: 'Jumlah_Potensi_Cumi' },
      {
        label: 'Jumlah Tangkapan Cumi-Cumi Yang Diperbolehkan',
        key: 'Jumlah_Tangkapan_Cumi_Yang_Diperbolehkan',
      },
      { label: 'Tingkat Pemanfaatan Cumi-Cumi', key: 'Tingkat_Pemanfaatan_Cumi' },
      { label: 'Status Pemanfaatan Cumi-Cumi', key: 'Status_Pemanfaatan_Cumi' },
      { label: 'Jumlah Potensi Di WPPNRI', key: 'Jumlah_Potensi_Di_WPPNRI' },
    ]),

  ZonaPIT_WPPNRI: (result) =>
    generateDynamicTable(result, [
      { label: 'Nama Objek', key: 'Nama_Objek' },
      { label: 'Perairan', key: 'PERAIRAN' },
      { label: 'Zona Penangkapan Ikan Terukur', key: 'Zona_Penangkapan_Ikan_Terukur' },
      { label: 'Pembagian Zona', key: 'Pembagian_Zona' },
    ]),

  jalur_penangkapan_dan_penempatan_api__jp2api_ar_50k_07122022: (result) =>
    generateDynamicTable(result, [
      { label: 'Nama Jalur Penangkapan Ikan', key: 'Nama_Jalur_Penangkapan_Ikan' },
      { label: 'Zona WPPNRI', key: 'Nama_WPPNRI' },
      { label: 'Perairan', key: 'PERAIRAN' },
      { label: 'Zona Penangkapan Ikan Terukur', key: 'Zona_Penangkapan_Ikan_Terukur' },
    ]),

  //...............................................................
  // PERIKANAN BUDIDAYA
  UPT_DJPB1: (result) => `
      <div>Nama Unit Pelaksana Teknis: ${result.NAMA_UPT || 'N/A'}</div>
    `,

  //>>PRODUSEN OBAT IKAN
  IG_Produsen_Obat_Ikan_50K_PT: (result) => `
      <div>Nama Perusahaan: ${result.Perusahaan || 'N/A'}</div>
      <div>Nama Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Alamat Kantor: ${result.Alamat_Kantor || 'N/A'}</div>
      <div>Alamat Pabrik: ${result.Alamat_Pabrik || 'N/A'}</div>
    `,

  //>>PRODUSEN PAKAN
  IG_Produsen_Pakan_Ikan_50K_PT: (result) => `
      <div>Nama Perusahaan: ${result.Perusahaan || 'N/A'}</div>
      <div>Nama Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Alamat Kantor: ${result.Alamat_Kantor || 'N/A'}</div>
      <div>Alamat Pabrik: ${result.Alamat_Pabrik || 'N/A'}</div>
    `,

  IGT_SEBARAN_KAMPUNG_PEMBUDIDAYAAN_IKAN_PT50K_2023: (result) => `
      <div>Nama Kampung: ${result.Nama_Kampung || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kabupaten Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Kecamatan: ${result.Kecamatan || 'N/A'}</div>
      <div>Desa: ${result.Desa || 'N/A'}</div>
      <div>Komoditas: ${result.Komoditas || 'N/A'}</div>
    `,
  Lokasi_Posikandu: (result) => `
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kepemilikan: ${result.Kepemilikan || 'N/A'}</div>
    `,

  //>>LAHAN PEMBUDIDAYAAN

  LAHAN_PEMBUDIDAYAAN_AR25K_ACEH: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Sumber Data: ${result.Sumber_Data || 'N/A'}</div>
      <div>Tahun Sumber: ${result.Tahun_Sumber || 'N/A'}</div>
      <div>Luas_Ha: ${result.LUAS_HA || 'N/A'}</div>
    `,
  LAHAN_PEMBUDIDAYAAN_AR25K_JATIM: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Tipe Perairan: ${result.Tipe_Perairan || 'N/A'}</div>
      <div>Jenis Budidaya: ${result.Jenis_Budidaya || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Sumber Data: ${result.SUMBER_DATA || 'N/A'}</div>
      <div>Luas_Ha: ${result.LUAS_HA || 'N/A'}</div>
      <div>Luas_M2: ${result.LUAS_M2 || 'N/A'}</div>
    `,
  LAHAN_PEMBUDIDAYAAN_AR25K_JABAR: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Luas Ha: ${result.LUAS_HA || 'N/A'}</div>
      <div>Luas M2: ${result.LUAS_M2 || 'N/A'}</div>
      <div>Sumber Data: ${result.SUMBER_DATA || 'N/A'}</div>
      <div>Tahun Sumber: ${result.Tahun_Sumber || 'N/A'}</div>
      <div>Tipe Perairan: ${result.Tipe_Perairan || 'N/A'}</div>
      <div>Jenis Budidaya: ${result.Jenis_Budidaya || 'N/A'}</div>
    `,
  LAHAN_PEMBUDIDAYAAN_AR25K_DKI_JAKARTA: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Luas Ha: ${result.LUAS_HA || 'N/A'}</div>
      <div>Luas M2: ${result.LUAS_M2 || 'N/A'}</div>
      <div>Sumber Data: ${result.SUMBER_DATA || 'N/A'}</div>
      <div>Tahun Sumber: ${result.Tahun_Sumber || 'N/A'}</div>
      <div>Tipe Perairan: ${result.Tipe_Perairan || 'N/A'}</div>
      <div>Jenis Budidaya: ${result.Jenis_Budidaya || 'N/A'}</div>
    `,

  //......................................................................
  // PENGELOLAAN KELAUTAN DAN RUANG LAUT
  UPT_PRL: (result) => `
      <div>Nama UPT: ${result.Nama_UPT || 'N/A'}</div>
    `,
  GAZETIR_16771: (result) => `
      <div>Nama Unsur: ${result.NAMA_UNSUR || 'N/A'}</div>
      <div>Kode Unsur: ${result.KODE_UNSUR || 'N/A'}</div>
      <div>Nama Lokal: ${result.NAMA_LOKAL || 'N/A'}</div>
      <div>Nama Geografis I: ${result.NAMA_GEOGRAFIS1 || 'N/A'}</div>
      <div>Nama Geografis II: ${result.NAMA_GEOGRAFIS2 || 'N/A'}</div>
      <div>Nama Geografis III: ${result.NAMA_GEOGRAFIS3 || 'N/A'}</div>
      <div>Kabupeten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
      <div>Verifikasi: ${result.VERIFIKASI || 'N/A'}</div>
      <div>Kode: ${result.KODE || 'N/A'}</div>
      <div>Status: ${result.STATUS || 'N/A'}</div>
    `,
  Sebaran_Biota_Laut_Dilindungi: (result) => `
      <div>Jenis Biota: ${result.Biota || 'N/A'}</div>
      <div>Nama Lokal: ${result.Nama_Lokal || 'N/A'}</div>
      <div>Nama Inggris: ${result.Nama_Inggris || 'N/A'}</div>
      <div>Nama Spesies: ${result.Nama_Spesies || 'N/A'}</div>
      <div>Status Lindung: ${result.Status_Lindung || 'N/A'}</div>
      <div>Status IUCN: ${result.Status_IUCN || 'N/A'}</div>
      <div>Status Cities: ${result.Status_CITES || 'N/A'}</div>
      <div>Sumber Data: ${result.Sumber_Data || 'N/A'}</div>
      <div>Kejadian: ${result.Kejadian || 'N/A'}</div>
      <div>Lokasi: ${result.Lokasi || 'N/A'}</div>
      <div>Kabupaten Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Tanggal: ${result.Tanggal || 'N/A'}</div>
    `,
  POTENSISUMBERDAYAARKEOLOGIMARITIM: (result) => `
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Sumber: ${result.Sumber_Data || 'N/A'}</div>
      <div>Lokasi: ${result.Lokasi || 'N/A'}</div>
      <div>Potensi: ${result.Potensi || 'N/A'}</div>
      <div>Model: ${result.Model || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Jenis: ${result.Jenis || 'N/A'}</div>
      <div>Kedalaman: ${result.Kedalaman || 'N/A'}</div>
    `,
  ZonasiKawasanKonservasi_AR_50K_2021_Rev2022: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Zonasi Kawasan Konservasi: ${result.Zona_Kawasan_Konservasi || 'N/A'}</div>
      <div>Sub Zona Kawasan Konservasi: ${result.Sub_Zona_Kawasan_Konservasi || 'N/A'}</div>
      <div>Nomor SK Kawasan Konservasi: ${result.No_SK_Kawasan_Konservasi || 'N/A'}</div>
      <div>Tahun SK Kawasan Konservasi: ${result.Tahun_SK_Kawasan_Konservasi || 'N/A'}</div>
      <div>Kewenangan Pengelolaan Kawasan Konservasi: ${
        result.Kewenangan_Pengelolaan_Kawasan_Konservasi || 'N/A'
      }</div>
      <div>Remark: ${result.REMARK || 'N/A'}</div>
    `,
  TERUMBUKARANG: (result) => `
      <div>Wilayah: ${result.Wilayah || 'N/A'}</div>
      <div>Habitat: ${result.habitat || 'N/A'}</div>
      <div>Institusi: ${result.Institusi || 'N/A'}</div>
      <div>Sumber Data: ${result.Sumber_Data || 'N/A'}</div>
      <div>Tahun: ${result.tahun || 'N/A'}</div>
      <div>Luas Ha: ${result.Luas_Ha || 'N/A'}</div>
      <div>NLP: ${result.NLP || 'N/A'}</div>
    `,
  MANGROVE: (result) => `
      <div>Kondisi Tutupan Terumbu Karang: ${result.Kondisi_Tutupan_Terumbu_Karang || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Institusi: ${result.Institusi || 'N/A'}</div>
      <div>Balai Pengelola DAS dan Hutan Lindung: ${
        result.Balai_Pengelola_DAS_dan_Hutan_Lindung || 'N/A'
      }</div>
      <div>Kabupaten Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Luas Mangrove: ${result.Luas_Mangrove || 'N/A'}</div>
      <div>Sumber Data: ${result.Sumber_Data || 'N/A'}</div>
      <div>FGSFRF: ${result.FGSFRF || 'N/A'}</div>
      <div>Luas Ha: ${result.Luas_Ha || 'N/A'}</div>
    `,
  TERUMBUKARANG_AR_50K: (result) => `
      <div>Lokasi: ${result.LOKASI || 'N/A'}</div>
      <div>Remark: ${result.REMARK || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>TPTKR: ${result.TPTKR || 'N/A'}</div>
      <div>TTPN: ${result.TTPN || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Instansi: ${result.INSTANSI || 'N/A'}</div>
    `,
  KERENTANAN_PESISIR_50K_LN: (result) => `
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Remark: ${result.Remark || 'N/A'}</div>
      <div>Status: ${result.STATUS || 'N/A'}</div>
      <div>Produksi: ${result.PRODUKSI || 'N/A'}</div>
    `,
  Wilayah_Kelola_MHA_AR_50K: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Desa: ${result.DESA || 'N/A'}</div>
      <div>Nama Masyarakat Hukum Adat: ${result.Nama_Masyarakat_Hukum_Adat || 'N/A'}</div>
      <div>Kategori: ${result.KATEGORI || 'N/A'}</div>
      <div>Luas: ${result.LUAS_HA || 'N/A'}</div>
      <div>WPPNRI: ${result.WPPNRI || 'N/A'}</div>
      <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  GUDANG_GARAM_SULAWESI: (result) => `
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Kode Tipe Gudang: ${result.Kode_Tipe_Gudang || 'N/A'}</div>
      <div>Tipe Gudang: ${result.Tipe_Gudang || 'N/A'}</div>
      <div>Kode Status Gudang: ${result.Kode_Status_Gudang || 'N/A'}</div>
      <div>Status Gudang: ${result.Status_Gudang || 'N/A'}</div>
      <div>Kapasitas Gudang: ${result.Kapasitas_Gudang || 'N/A'}</div>
      <div>Remark: ${result.REMARK || 'N/A'}</div>
      `,
  IG_LAHAN_GARAM_25K_AR: (result) => `
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Fungsi: ${result.Fungsi || 'N/A'}</div>
      <div>Media: ${result.Media || 'N/A'}</div>
      <div>Jenis: ${result.Jenis_Lahan || 'N/A'}</div>
      <div>Teknik: ${result.Teknologi || 'N/A'}</div>
      <div>Pola: ${result.Pola || 'N/A'}</div>
    `,
  Gudang_Garam_Pohuwato: (result) => `
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Tipe Gudang: ${result.Tipe_Gudang || 'N/A'}</div>
      <div>Status Kepemilikan Gudang: ${result.Status_Gudang || 'N/A'}</div>
      <div>Kapasitas Gudang: ${result.Kapasitas_Gudang || 'N/A'}</div>
      <div>Catatan: ${result.REMARK || 'N/A'}</div>
      <div>Metadata: ${result.METADATA || 'N/A'}</div>
      `,
  Lahan_Garam_Pohuwato: (result) => `
      <div>Status Kepemilikan Lahan Garam: ${result.Status || 'N/A'}</div>
      <div>Fungsi Petak Lahan Garam: ${result.Fungsi || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Metadata: ${result.METADATA || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Jenis Lahan: ${result.Jenis_Lahan || 'N/A'}</div>
      <div>Teknologi yang digunakan: ${result.Teknologi || 'N/A'}</div>
      <div>Pola Usaha: ${result.Pola || 'N/A'}</div>
      `,
  Gudang_Garam_Selayar: (result) => `
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Tipe Gudang: ${result.Tipe_Gudang || 'N/A'}</div>
      <div>Status Kepemilikan Gudang: ${result.Status_Gudang || 'N/A'}</div>
      <div>Kapasitas Gudang (Ton): ${result.Kapasitas_Gudang || 'N/A'}</div>
      <div>Catatan: ${result.REMARK || 'N/A'}</div>
      <div>Metadata: ${result.METADATA || 'N/A'}</div>
      `,
  Lahan_Garam_Selayar: (result) => `
      <div>Status Kepemilikan Lahan Garam: ${result.Status || 'N/A'}</div>
      <div>Fungsi Petak Lahan Garam: ${result.Fungsi || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Metadata: ${result.METADATA || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Jenis Lahan: ${result.Jenis_Lahan || 'N/A'}</div>
      <div>Teknologi yang digunakan: ${result.Teknologi || 'N/A'}</div>
      <div>Pola Usaha: ${result.Pola || 'N/A'}</div>
      `,
  Lahan_Garam_Kota_Palu: (result) => `
      <div>Status Kepemilikan Lahan Garam: ${result.Status || 'N/A'}</div>
      <div>Fungsi Petak Lahan Garam: ${result.Fungsi || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Metadata: ${result.METADATA || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Jenis Lahan: ${result.Jenis_Lahan || 'N/A'}</div>
      <div>Teknologi yang digunakan: ${result.Teknologi || 'N/A'}</div>
      <div>Pola Usaha: ${result.Pola || 'N/A'}</div>
      `,
  Lahan_Garam_Pangkep: (result) => `
      <div>Status Kepemilikan Lahan Garam: ${result.Status || 'N/A'}</div>
      <div>Fungsi Petak Lahan Garam: ${result.Fungsi || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Metadata: ${result.METADATA || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Jenis Lahan: ${result.Jenis_Lahan || 'N/A'}</div>
      <div>Teknologi yang digunakan: ${result.Teknologi || 'N/A'}</div>
      <div>Pola Usaha: ${result.Pola || 'N/A'}</div>
      `,
  Lahan_Garam_Maros: (result) => `
      <div>Status Kepemilikan Lahan Garam: ${result.Status || 'N/A'}</div>
      <div>Fungsi Petak Lahan Garam: ${result.Fungsi || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Metadata: ${result.METADATA || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Jenis Lahan: ${result.Jenis_Lahan || 'N/A'}</div>
      <div>Teknologi yang digunakan: ${result.Teknologi || 'N/A'}</div>
      <div>Pola Usaha: ${result.Pola || 'N/A'}</div>
      `,
  Lahan_Garam_Takalar: (result) => `
      <div>Status Kepemilikan Lahan Garam: ${result.Status || 'N/A'}</div>
      <div>Fungsi Petak Lahan Garam: ${result.Fungsi || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Metadata: ${result.METADATA || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Jenis Lahan: ${result.Jenis_Lahan || 'N/A'}</div>
      <div>Teknologi yang digunakan: ${result.Teknologi || 'N/A'}</div>
      <div>Pola Usaha: ${result.Pola || 'N/A'}</div>
      `,
  Lahan_Garam_Jeneponto: (result) => `
      <div>Status Kepemilikan Lahan Garam: ${result.Status || 'N/A'}</div>
      <div>Fungsi Petak Lahan Garam: ${result.Fungsi || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten: ${result.KABUPATEN || 'N/A'}</div>
      <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
      <div>Metadata: ${result.METADATA || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Referensi: ${result.REFERENSI || 'N/A'}</div>
      <div>Jenis Lahan: ${result.Jenis_Lahan || 'N/A'}</div>
      <div>Teknologi yang digunakan: ${result.Teknologi || 'N/A'}</div>
      <div>Pola Usaha: ${result.Pola || 'N/A'}</div>
      `,
  KKPRL_LN: (result) => `
      <div>Jenis: ${result.JENIS || 'N/A'}</div>
      <div>Kategori: ${result.KATEGORI || 'N/A'}</div>
      <div>No Peta: ${result.NO_PETA || 'N/A'}</div>
      <div>Kategori: ${result.KATEGORI || 'N/A'}</div>
      <div>No KKPRL: ${result.NO_KKPRL || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Kegiatan: ${result.KEGIATAN || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Perairan: ${result.PERAIRAN || 'N/A'}</div>
      <div>Panjang: ${result.PANJANG_KM || 'N/A'}</div>
      <div>Kedalaman: ${result.KEDALAMAN || 'N/A'}</div>
    `,
  KKPRL_AR: (result) => `
      <div>Jenis: ${result.JENIS || 'N/A'}</div>
      <div>Kategori: ${result.KATEGORI || 'N/A'}</div>
      <div>Nomor KKPRL: ${result.NO_KKPRL || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Kegiatan: ${result.KEGIATAN || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Perairan: ${result.PERAIRAN || 'N/A'}</div>
      <div>Luas: ${result.LUAS_HA || 'N/A'}</div>
      <div>Luas (Ha): ${result.LUAS_HA || 'N/A'}</div>
    `,
  IG_KKPRL_WP3K_LN: (result) => `
      <div>Jenis: ${result.JENIS || 'N/A'}</div>
      <div>Kegiatan: ${result.KEGIATAN || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Perairan: ${result.PERAIRAN || 'N/A'}</div>
      <div>Nomor KKPRL: ${result.NOMOR || 'N/A'}</div>
    `,
  IG_KKPRL_WP3K_AR: (result) => `
      <div>Jenis: ${result.JENIS || 'N/A'}</div>
      <div>Nomor KKPRL: ${result.NOMOR || 'N/A'}</div>
      <div>Nama: ${result.NAMA || 'N/A'}</div>
      <div>Alamat: ${result.ALAMAT || 'N/A'}</div>
      <div>Kegiatan: ${result.KEGIATAN || 'N/A'}</div>
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Perairan: ${result.PERAIRAN || 'N/A'}</div>
      <div>Luas: ${result.LUAS || 'N/A'}</div>
      <div>Terbit: ${result.TERBIT || 'N/A'}</div>
      <div>Berlaku: ${result.BERLAKU || 'N/A'}</div>
      <div>Pejabat: ${result.PEJABAT || 'N/A'}</div>
    `,
  //Rencana Zonasi Kawasan Antar Wilayah
  STRUKTUR_RUANG_PT: (result) => `
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Orde I: ${result.ORDE1 || 'N/A'}</div>
      <div>Orde II: ${result.ORDE2 || 'N/A'}</div>
      <div>Orde III: ${result.ORDE3 || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Nama Lokasi: ${result.Nama_Lokasi || 'N/A'}</div>
    `,
  POLA_RUANG_LN: (result) => `
      <div>Nama Kawasan: ${result.Nama_Kawasan || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Keterangan : ${result.Keterangan || 'N/A'}</div>
      <div>Kode Zona: ${result.Kode_Zona || 'N/A'}</div>
      <div>Nama Zona: ${result.Nama_Zona || 'N/A'}</div>
    `,
  POLA_RUANG_AR: (result) => `
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Nama Kawasan: ${result.Nama_Kawasan || 'N/A'}</div>
      <div>Nama Zona: ${result.Nama_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Sumber Data: ${result.Sumber_Data || 'N/A'}</div>
      <div>Dasar Hukum: ${result.Dasar_Hukum || 'N/A'}</div>
      <div>Kode Zona: ${result.Kode_Zona || 'N/A'}</div>
    `,
  BATAS_LN: (result) => `
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    `,

  //KSNT Kluster Anambas (Kawasan Strategis Nasional Tertentu)
  Batas_TWP_Kepulauan_Anambas_dan_Laut_Sekitarnya: (result) => `
      <div>Kode Kabupaten Kota: ${result.ID_Kabupaten_Kota || 'N/A'}</div>
      <div>Kabupaten: ${result.Kabupaten || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Nama Kawasan: ${result.Nama_Kawasan || 'N/A'}</div>
      <div>Dasar Hukum: ${result.Dasar_Hukum || 'N/A'}</div>
      <div>Jenis Kawasan: ${result.Jenis_Kawasan || 'N/A'}</div>
      <div>Luas: ${result.Luasan || 'N/A'}</div>
      <div>EKP3K: ${result.EKP3K || 'N/A'}</div>
      <div>Pengelola: ${result.Pengelola || 'N/A'}</div>
      <div>Rencana Kelola: ${result.Rencana_Kelola || 'N/A'}</div>
    `,
  Daerah_Latihan_Militer: (result) => `
      <div>Nama Daerah Latihan Militer: ${result.Nama_Daerah_Latihan_Militer || 'N/A'}</div>
      <div>Wilayah Latihan: ${result.Wilayah_Latihan || 'N/A'}</div>
      <div>Kabupaten: ${result.Kabupaten || 'N/A'}</div>
      <div>Kemampuan: ${result.Kemampuan || 'N/A'}</div>
      <div>Macam Latihan: ${result.Macam_Latihan || 'N/A'}</div>
      <div>Kepemilikan: ${result.Kepemilikan || 'N/A'}</div>
      <div>Luas Ha: ${result.Luas_Ha || 'N/A'}</div>
      <div>Kedalaman: ${result.Kedalaman || 'N/A'}</div>
      <div>No Peta Lahan: ${result.No_Peta_Lahan || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tipe Pasut: ${result.Tipe_Pasut || 'N/A'}</div>
      <div>Luas km: ${result.Luas_Km || 'N/A'}</div>
    `,
  Koordidor_Pelayaran_Trandisional_Malaysia: (result) => `
      <div>Jarak Buffer: ${result.Jarak_Buffer || 'N/A'}</div>
    `,
  SRL_PN_ANAMBAS: (result) => `
      <div>Struktur: ${result.Struktur || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Jenis Struktur Ruang: ${result.Jenis_Struktur_Ruang || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Sumber: ${result.Sumber_Data || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  PRL_LN_ANAMBAS: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Sumber: ${result.Sumber || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  PRL_AR_ANAMBAS: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Sumber: ${result.Sumber || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,

  //KSNT Pulau Berhala
  TIDAK_MASUK_DALAM_KAWASAN_ZONA: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Sumber: ${result.Sumber_Data || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
    `,
  SR_PN_BERHALA: (result) => `
      <div>Struktur: ${result.Struktur || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Jenis Struktur Ruang: ${result.Jenis_Struktur_Ruang || 'N/A'}</div>
    `,
  SR_LN_BERHALA: (result) => `
      <div>Struktur: ${result.Struktur || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Jenis Struktur Ruang Laut: ${result.Jenis_Struktur_Ruang_Laut || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      
    `,
  PRL_LN_BERHALA: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Sumber: ${result.Sumber || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
    `,
  PRL_AR_BERHALA: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sumber: ${result.Sumber || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,

  //KSNT Pulau Maratua dan Pulau Sambit
  ARAHAN_PRL_MARATUA: (result) => `
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
    `,
  PRL_LN_MARATUA_SAMBIT: (result) => `
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
    `,
  PRL_AR_MARATUA_SAMBIT: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  SRL_PN_MARATUA: (result) => `
      <div>Struktur: ${result.Struktur || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Jenis Struktur Ruang: ${result.Jenis_Struktur_Ruang || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    `,
  SRL_PN_SAMBIT: (result) => `
      <div>Struktur: ${result.Struktur || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Jenis Struktur Ruang: ${result.Jenis_Struktur_Ruang || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    `,

  //KSNT Pulau Nipa
  PRL_LN_NIPA: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Sumber: ${result.Sumber || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
    `,
  SRL_PN_NIPA: (result) => `
      <div>Struktur: ${result.Struktur || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Jenis Struktur Ruang: ${result.Jenis_Struktur_Ruang || 'N/A'}</div>
    `,
  T01_DLKp_Wilayah_Perairan_Pulau_Sambu: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T02_Daerah_Terlarang_Kabel_Bawah_Laut: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T03_Daerah_Terbatas_Kabel_Bawah_Laut: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T04_Daerah_Labuh_Jangkar: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
    `,
  T05_Alur_Pelayaran_Nasional: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T06_Zona_Hutan_Mangrove: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T07_DLKr_Wilayah_Perairan_Pulau_Nipa: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T08_DLKp_Wilayah_Perairan_Pulau_Nipa: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T09_Alur_Pelayaran_Internasional: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T10_Cross_Traffic: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T11_Kawasan_Pertahanan: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  T12_Tata_Pemisah_Lalu_Lintas_Pelayaran: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Sub Zona: ${result.Sub_Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,

  // KSNT Pulau Rusa dan Pulau Raya
  WILAYAH_KELOLA_PANGLIMA_LAUT_RAYA: (result) => `
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Sumber Data: ${result.Sumber || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  WILAYAH_KELOLA_PANGLIMA_LAUT_RUSA: (result) => `
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Sumber Data: ${result.Sumber || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  PRL_LN_RAYA: (result) => `
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
    `,
  PRL_LN_RUSA: (result) => `
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
    `,
  PRL_AR_RAYA: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  PRL_AR_RUSA: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Luas: ${result.Luas || 'N/A'}</div>
    `,

  //KSNT Pulau Senua
  PRL_LN_SENUA: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
    `,
  PRL_AR_SENUA: (result) => `
      <div>Pola Ruang: ${result.Pola_Ruang || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
      <div>Zona: ${result.Zona || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Sumber: ${result.Sumber || 'N/A'}</div>
      <div>Tahun: ${result.Tahun || 'N/A'}</div>
      <div>Status: ${result.Status || 'N/A'}</div>
      div>Luas: ${result.Luas || 'N/A'}</div>
    `,
  SRL_SENUA: (result) => `
      <div>Struktur: ${result.Struktur || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Kode: ${result.Kode || 'N/A'}</div>
      <div>Jenis Struktur Ruang: ${result.Jenis_Struktur_Ruang || 'N/A'}</div>
    `,

  //RENCANA TATA RUANG LAUT (RTRL)
  STRUKTUR_PT: (result) => `
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      <div>Orde I: ${result.ORDE1 || 'N/A'}</div>
      <div>Orde II: ${result.ORDE2 || 'N/A'}</div>
      <div>Orde III: ${result.ORDE3 || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Nama Lokasi: ${result.Nama_Lokasi || 'N/A'}</div>
      `,
  POLA_PT: (result) => `
      <div>Nama Kawasan: ${result.Nama_Kawasan || 'N/A'}</div>
      <div>Nama Jenis: ${result.Nama_Jenis || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      `,
  POLA_LN: (result) => `
      <div>Nama Kawasan: ${result.Nama_Kawasan || 'N/A'}</div>
      <div>Nama Jenis: ${result.Nama_Jenis || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      `,
  KSNT_LH_AR: (result) => `
      <div>Nama Kawasan: ${result.Nama_Kawasan || 'N/A'}</div>
      <div>Nama Jenis: ${result.Nama_Jenis || 'N/A'}</div>
      <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
      <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
      `,

  //RZWP3K
  //ACEH
  MIGAS_ACEH: (result) => `
    <div>Nama Block: ${result.BLOCK_NAME || 'N/A'}</div>
    <div>Status: ${result.STATUS || 'N/A'}</div>
    <div>Pesisir Laut: ${result.Pesisir_La || 'N/A'}</div>
    `,
  RZWP3K_AR_ACEH_PANGLIMA_LAOT: (result) => `
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.SUB_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.Jenis || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  RZWP3K_AR_ACEH_KSN: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.SUB_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Status: ${result.STATUS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  RZWP3K_AR_ACEH_KSNT: (result) => `
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.SUB_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Status: ${result.STATUS || 'N/A'}</div>
    `,
  RZWP3K_AR_ACEH_ALUR_LAUT: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Status: ${result.STATUS || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  RZWP3K_AR_ACEH_ALUR_LAUT: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Subzona: ${result.SUBZONA || 'N/A'}</div>
    <div>Status: ${result.STATUS || 'N/A'}</div>
    `,
  RZWP3K_AR_ACEH_ALUR_LAUT_POLY: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  RZWP3K_AR_ACEH_KONSERVASI: (result) => `
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    `,
  RZWP3K_AR_ACEH_KPU: (result) => `
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Kode Subzona: ${result.KODE_SZ || 'N/A'}</div>
    `,
  //Sumatera Barat
  Peta_RZWP3K_Provinsi_Sumatera_Barat_Alur_Laut: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Subzona: ${result.KODE_SZ || 'N/A'}</div>
    <div>Subzona: ${result.SUBZONA || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Sumatera_Barat_Kawasan_Strategis: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Status: ${result.STATUS || 'N/A'}</div>
    <div>Periode: ${result.PERIODE || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Sumatera_Barat_Kawasan_Strategis_Tertentu: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Sumatera_Barat_Zonasi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    `,
  //Provinsi Jambi
  Pelabuhan_Rencana_Jambi: (result) => `
    <div>Nama Objek: ${result.NAMOBJ || 'N/A'}</div>
    `,
  Platform_Minyak_dan_Gas_Bumi_Jambi: (result) => `
    <div>Nama Objek: ${result.Name || 'N/A'}</div>
    `,
  Alur_Laut_Jambi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.SUBZONA || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  Alur_Pipa_Kabel_Bawah_Laut_Jambi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.SUBZONA || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  Kawasan_Strategis_Nasional_Jambi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  Kawasan_Pemanfaatan_Umum_Jambi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.SUBZONA || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  Kawasan_Konservasi_Jambi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  //SUMATERA SELATAN
  RZWP3K_SUMSEL_50K_LN: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.SUBZONA || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  RZWP3K_SUMSEL_50K_AREA: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.SUBZONA || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  //BENGKULU
  Alur_Laut_RZ_LN_Bengkulu: (result) => `
    <div>Nama Objek: ${result.Nama_Objek || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    `,
  RZWP3K_50_Bengkulu: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.SUB_ZONA || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  Kawasan_Strategis_KSNT_Bengkulu: (result) => `
    <div>WP Pulau: ${result.WP_Pulau || 'N/A'}</div>
    `,
  //LAMPUNG
  Peta_RZWP3K_Provinsi_Lampung_Alur_Laut: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.SUBZONA || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Lampung_Kawasan_Strategis: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Status:${result.STATUS || 'N/A'}</div>
    <div>Keterangan:${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis:${result.JENIS || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  //BANGKA BELITUNG
  Alur_Zona_Bangka_Belitung: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.SUBZONA || 'N/A'}</div>
    <div>Rute:${result.Rute || 'N/A'}</div>
    `,
  Alur_Sub_Zona_Bangka_Belitung: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.SUBZONA || 'N/A'}</div>
    <div>Rute:${result.Rute || 'N/A'}</div>
    `,
  Zona_Bangka_Belitung: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  Sub_Zona_Bangka_Belitung: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona:${result.ZONA || 'N/A'}</div>
    <div>Subzona:${result.Subzona || 'N/A'}</div>
    <div>Tahun:${result.TAHUN || 'N/A'}</div>
    `,
  //Jawa Barat
  Alur_Pelayaran_Jawa_Barat: (result) => `
    <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    `,
  Kabel_Bawah_Laut_Jawa_Barat: (result) => `
    <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    `,
  Pipa_Minyak_dan_Gas_Jawa_Barat: (result) => `
    <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    `,
  ALOKASI_PERBAIKAN_KKP_Jawa_Barat: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Subzona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    `,
  //JAWA TENGAH
  RZWP3K_LN_2017_Jawa_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Subzona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  NLYN_TR_LN: (result) => `
    <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    `,
  RZWP3K_AR_KSN_Jawa_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Subzona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  RZWP3K_AR_ZONA_Jawa_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Subzona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  RZWP3K_AR_SUBZONA_Jawa_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Subzona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  //JAWA TIMUR
  Peta_RZWP3K_Provinsi_Jawa_Timur_Alur_Laut: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Jawa_Timur_Kawasan_Strategis: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Kode Zona: ${result.K0DE || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Periode: ${result.PERIODE || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Jawa_Timur_Zonasi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    `,
  //NTB
  Peta_RZWP3K_Provinsi_Nusa_Tenggara_Barat_Alur_Laut: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Nusa_Tenggara_Barat_Kawasan_Strategis: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Nusa_Tenggara_Barat_Zonasi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    `,
  //NTT
  Peta_RZWP3K_Provinsi_Nusa_Tenggara_Timur_Alur_Laut: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Nusa_Tenggara_Timur_Kawasan_Strategis: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Nusa_Tenggara_Timur_Zonasi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    `,
  //KALBAR
  Pelabuhan_PT_Kalimantan_Barat: (result) => `
    <div>Nama Pelabuhan: ${result.Nama_Pelab || 'N/A'}</div>
    <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    <div>Pelabuhan: ${result.Pelabuhan || 'N/A'}</div>
    `,
  Wisata_Point_Kalimantan_Barat: (result) => `
    <div>Keterangan: ${result.KET || 'N/A'}</div>
    `,
  Alur_Pelayaran_Kalimantan_Barat: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>SubZona: ${result.SUB_ZONA || 'N/A'}</div>
    `,
  Pertahanan_dan_Keamanan_Kalimantan_Barat: (result) => `
    <div>Kode: ${result.Kode || 'N/A'}</div>
    `,
  Pantai_LN_Kalimantan_Barat: (result) => `
    <div>Nama Objek: ${result.NAMOBJ || 'N/A'}</div>
    <div>Namlin: ${result.NAMLIN || 'N/A'}</div>
    <div>JNBTGP: ${result.JNBTGP || 'N/A'}</div>
    <div>Region: ${result.REGION || 'N/A'}</div>
    `,
  RZWP3K_AR_Kalimantan_Barat: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    `,
  //KALTENG
  Zona_Pertambangan_Subzona_Kalimantan_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Subzona: ${result.SUBZONA || 'N/A'}</div>
    `,
  KSN_Kalimantan_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Subzona: ${result.SUBZONA || 'N/A'}</div>
    `,
  Pembangkit_Listrik_Kalimantan_Tengah: (result) => `
    <div>Nama Objek: ${result.NAMOBJ || 'N/A'}</div>
    `,
  Migrasi_Biota_Subzona_Kalimantan_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Kode Subzona: ${result.KODE_SZ || 'N/A'}</div>
    `,
  Alur_Pelayaran_Subzona_Kalimantan_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Kode Subzona: ${result.KODE_SZ || 'N/A'}</div>
    `,
  Alur_Buff_Kalimantan_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Kode Subzona: ${result.KODE_SZ || 'N/A'}</div>
    `,
  Alokasi_Ruang_Laut_Subzona_Kalimantan_Tengah: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Kode Subzona: ${result.KODE_SZ || 'N/A'}</div>
    `,
  Sungai_Kalimantan_Tengah: (result) => `
    <div>Nama Objek: ${result.NAMOBJ || 'N/A'}</div>
    `,
  Sungai_Garis_Kalimantan_Tengah: (result) => `
    <div>Remark: ${result.REMARK || 'N/A'}</div>
    `,
  //KALTIM
  RZ50K_LN_Kalimantan_Timur: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Kode Subzona: ${result.KODE_SZ || 'N/A'}</div>
    `,
  Kawasan_Strategis_Kalimantan_Timur: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Kode Subzona: ${result.KODE_SZ || 'N/A'}</div>
    `,
  Blok_Pertambangan_Migas_Kalimantan_Timur: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Kode Subzona: ${result.KODE_SZ || 'N/A'}</div>
    `,
  RZ250K_AR_Kalimantan_Timur: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  //SULUT
  Peta_RZWP3K_Provinsi_Sulawesi_Utara_Alur_Laut: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Sulawesi_Utara_Kawasan_Strategis: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Sulawesi_Utara_Zonasi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  //SULTENG
  Peta_RZWP3K_Provinsi_Sulawesi_Tengah_Alur_Laut: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Sulawesi_Tengah_Kawasan_Strategis: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Sulawesi_Tengah_Zonasi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  //SULSEL
  BLOK_MIGAS_AR_Sulawesi_Selatan: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>SubZona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  RZWP3K_LN_Sulawesi_Selatan: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Subzona: ${result.SZONA || 'N/A'}</div>
    `,
  RZWP3K_AR_Sulawesi_Selatan: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  //SULTRA
  RZWP3K_SULTRA_BLOK_MIGAS_PERDA_SULAWESI_SELATAN: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Subzona: ${result.SUB_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  RZWP3K_SULTRA_ALUR_LINE_PERDA_SULAWESI_SELATAN: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    `,
  RZWP3K_SULTRA_ALUR_POLYGON_PERDA_SULAWESI_SELATAN: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    `,
  RZWP3K_SULTRA_KSN_PERDA_SULAWESI_SELATAN: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    `,
  RZWP3K_SULTRA_ADAT_PERDA_SULAWESI_SELATAN: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  RZWP3K_SULTRA_KPU_PERDA_SULAWESI_SELATAN: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.SUB_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    `,
  RZWP3K_SULTRA_KONSERVASI_PERDA_SULAWESI_SELATAN: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.SUB_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  //SULBAR
  Peta_RZWP3K_Provinsi_Sulawesi_Barat_Alur_Laut: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  Peta_RZWP3K_Provinsi_Sulawesi_Barat_Zonasi: (result) => `
    <div>Kawasan: ${result.KAWASAN || 'N/A'}</div>
    <div>Zona: ${result.ZONA || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  //PAPUA BARAT
  Alur_laut_Papua_Barat: (result) => `
    <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
    <div>Zona: ${result.Zona || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.Subzona || 'N/A'}</div>
    <div>Jenis: ${result.Jenis || 'N/A'}</div>
    <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  Pipa_Kabel_Bawah_Laut_Papua_Barat: (result) => `
    <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
    <div>Zona: ${result.Zona || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  Kawasan_Strategis_Nasional_Tertentu_Papua_Barat: (result) => `
    <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
    <div>Zona: ${result.Zona || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  Kawasan_Strategis_Nasional_Papua_Barat: (result) => `
    <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
    <div>Kode Zona: ${result.Kode || 'N/A'}</div>
    <div>Jenis: ${result.JENIS || 'N/A'}</div>
    <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  Wilayah_Pesisir_Berbasis_Adat_proses_penetapan_Papua_Barat: (result) => `
    <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
    <div>Zona: ${result.Zona || 'N/A'}</div>
    <div>Kode Zona: ${result.Kode_zona || 'N/A'}</div>
    <div>Sub Zona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.Keterangan || 'N/A'}</div>
    <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  Zonasi_Kawasan_Konservasi_Papua_Barat: (result) => `
    <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
    <div>Zona: ${result.Zona || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  Pemanfaatan_Umum_Papua_Barat: (result) => `
    <div>Kawasan: ${result.Kawasan || 'N/A'}</div>
    <div>Zona: ${result.Zona || 'N/A'}</div>
    <div>Kode Zona: ${result.KODE_ZONA || 'N/A'}</div>
    <div>Sub Zona: ${result.SUBZONA || 'N/A'}</div>
    <div>Keterangan: ${result.KETERANGAN || 'N/A'}</div>
    <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  WK_Migas_Papua_Barat: (result) => `
    <div>Block Name: ${result.BLOCK_NAME || 'N/A'}</div>
    `,

  //......................................................................
  //BADAN PENYULUHAN DAN PENGEMBANGAN SDMKP
  UPT_BRSDM: (result) => `
      <div>Nama UPT: ${result.Nama_UPT || 'N/A'}</div>
    `,

  //......................................................................
  //PENGAWASAN SUMBER DAYA KELAUTAN DAN PERIKANAN
  UPT_PSDKP: (result) => `
      <div>Nama I: ${result.nama_1 || 'N/A'}</div>
      <div>Urutan I: ${result.urutan_1 || 'N/A'}</div>
      <div>Kode I: ${result.kode_1 || 'N/A'}</div>
      <div>Kategori II: ${result.kategori_2 || 'N/A'}</div>
      <div>Nama II: ${result.nama_2 || 'N/A'}</div>
      <div>Urutan II: ${result.urutan_2 || 'N/A'}</div>
      <div>Kode II: ${result.kode_2 || 'N/A'}</div>
      <div>Status: ${result.nama_3 || 'N/A'}</div>
    `,
  Peta_IUUF2014: (result) => `
    <div>Nama Kapal: ${result.Nama_Kapal || 'N/A'}</div>
    <div>Tahun: ${result.tahun || 'N/A'}</div>
    `,
  Peta_IUUF2015: (result) => `
    <div>Nama Kapal: ${result.Nama_Kapal || 'N/A'}</div>
    <div>Tahun: ${result.tahun || 'N/A'}</div>
    `,
  Peta_IUUF2016: (result) => `
    <div>Nama Kapal: ${result.Nama_Kapal || 'N/A'}</div>
    <div>Tahun: ${result.tahun || 'N/A'}</div>
    `,
  Peta_IUUF2017: (result) => `
    <div>Nama Kapal: ${result.Nama_Kapal || 'N/A'}</div>
    <div>Tahun: ${result.tahun || 'N/A'}</div>
    `,
  Peta_IUUF2018: (result) => `
    <div>Nama Kapal: ${result.Nama_Kapal || 'N/A'}</div>
    <div>Tahun: ${result.tahun || 'N/A'}</div>
    `,

  //......................................................................
  //PENGUATAN DAYA SAING PRODUK KELAUTAN DAN PERIKANAN
  PDS: (result) => `
      <div>Nama UPT: ${result.Nama_UPT || 'N/A'}</div>
      <div>Kode Satker: ${result.Kode_Satker || 'N/A'}</div>
    `,
  Sebaran_UPI_MB: (result) => `
      <div>Nama Unit Pengolahan Ikan: ${result.Nama_Objek || 'N/A'}</div>
    `,
  PASR: (result) => `
      <div>Nama Pasar: ${result.Nama_Objek || 'N/A'}</div>
      <div>Longitude: ${result.Longitude || 'N/A'}</div>
      <div>Latitude: ${result.Latitude || 'N/A'}</div>

    `,
  Sebaran_UPI_MB: (result) => `
      <div>Provinsi: ${result.provinsi || 'N/A'}</div>
      <div>Kabupaten Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Kecamatan: ${result.Kecamatan || 'N/A'}</div>
      <div>Desa: ${result.Desa || 'N/A'}</div>
      <div>Entitas UPI: ${result.Entitas_UPI || 'N/A'}</div>
      <div>Tahun Berdiri: ${result.Tahun_Berdiri || 'N/A'}</div>
      <div>Omzet UPI: ${result.Omzet_UPI || 'N/A'}</div>
      <div>Gudang Beku: ${result.Gudang_Beku || 'N/A'}</div>
      <div>Gudang Dingin: ${result.Gudang_Dingin || 'N/A'}</div>
      <div>Gudang Kering: ${result.Gudang_Kering || 'N/A'}</div>
      <div>Kapasitas Terpasang: ${result.Kapasitas_Terpasang || 'N/A'}</div>
      <div>Jumlah Hari Kerja: ${result.Jumlah_Hari_Kerja || 'N/A'}</div>
      <div>Jumlah Shift: ${result.Jumlah_shift || 'N/A'}</div>
      <div>Produk: ${result.produk || 'N/A'}</div>
      <div>Flag Komoditas: ${result.flag_Komoditas || 'N/A'}</div>
      <div>Volume Produksi: ${result.volume_produksi || 'N/A'}</div>
      <div>Tujuan Pemasaran: ${result.tujuan_pemasaran || 'N/A'}</div>
      <div>Jenis Kegiatan: ${result.jenis_kegiatan || 'N/A'}</div>
    `,

  //.......................................................................
  //BADAN PENGENDALIAN DAN PENGAWASAN MUTU HASIL KELAUTAN DAN PERIKANAN
  UPT_BKIPM_KKP: (result) => `
      <div>Nama UPT: ${result.Nama_UPT || 'N/A'}</div>
      <div>Longitude: ${result.Longitude || 'N/A'}</div>
      <div>Latitude: ${result.Latitude || 'N/A'}</div>
    `,
  WSD: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  TS: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  RSD: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  RSIVD: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  PERKIN: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  VER: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  KHD: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  IM: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  IHHN: (result) => `
      div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  FCE: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,
  ESC: (result) => `
      <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
      <div>Kabupaten/Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Penyakit: ${result.PENYAKIT || 'N/A'}</div>
      <div>Golongan Hama Penyakit Ikan Karantina: ${result.GOL_HPIK || 'N/A'}</div>
      <div>Organisme: ${result.ORGANISME || 'N/A'}</div>
      <div>Komoditi: ${result.KOMODITI || 'N/A'}</div>
      <div>Kelompok: ${result.KELOMPOK || 'N/A'}</div>
      `,

  //......................................................................
  // BANTUAN PEMERINTAH
  IGT_Bantuan_Pemerintah_2023_1: (result) => `
      <div>Nama Anggota: ${result.Nama_Anggota || 'N/A'}</div>
      <div>Jenis Bantuan: ${result.Jenis_Bantuan || 'N/A'}</div>
      <div>Nama Kelompok: ${result.Nama_Kelompok || 'N/A'}</div>
      <div>Nama Ketua: ${result.Nama_Ketua || 'N/A'}</div>
      <div>Nomor KUSUKA: ${result.No_Kusuka || 'N/A'}</div>
      <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
      <div>Kabupaten Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Kecamatan: ${result.Kecamatan || 'N/A'}</div>
      <div>Desa: ${result.Desa || 'N/A'}</div>
      <div>Komoditas: ${result.Komoditas || 'N/A'}</div>
      <div>Jumlah: ${result.Jumlah__ek || 'N/A'}</div>
      <div>Nilai Satuan: ${result.Nilai_Satuan || 'N/A'}</div>
      <div>Total Nilai: ${result.Total_Nilai || 'N/A'}</div>
      <div>Nama UPT: ${result.UPT || 'N/A'}</div>
      `,
  Data_Bantuan_Mesin_Pakan_2019_2021: (result) => `
        <div>Provinsi: ${result.Provinsi || 'N/A'}</div>
        <div>Kabupaten Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
        <div>Kecamatan: ${result.Kecamatan || 'N/A'}</div>
        <div>Desa: ${result.Desa || 'N/A'}</div>
        <div>Jenis Bantuan: ${result.Jenis_Bantuan || 'N/A'}</div>
        <div>Jumlah Bantuan: ${result.Jumlah || 'N/A'}</div>
        <div>Longitude: ${result.Longitude || 'N/A'}</div>s
        <div>Latitude: ${result.Latitude || 'N/A'}</div>
        <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  BANTUAN_PEMERINTAH_DJPRL_PT: (result) => `
        <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
        <div>Kabupaten/Kota: ${result.KABUPATEN || 'N/A'}</div>
        <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
        <div>Desa: ${result.DESA || 'N/A'}</div>
        <div>Jenis Bantuan: ${result.Nama_Bantuan || 'N/A'}</div>
        <div>Kategori Bantuan: ${result.Kategori_Bantuan || 'N/A'}</div>
        <div>Volume: ${result.VOLUME || 'N/A'}</div>
        <div>Satuan: ${result.SATUAN || 'N/A'}</div>
        <div>Satker Pemberi Bantuan: ${result.Satker_Pemberi_Bantuan || 'N/A'}</div>
        <div>Tahun: ${result.TAHUN || 'N/A'}</div>
    `,
  BANTUAN_PEMERINTAH_DJPRL_LN: (result) => `
        <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
        <div>Kabupaten/Kota: ${result.KABUPATEN || 'N/A'}</div>
        <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
        <div>Desa: ${result.DESA || 'N/A'}</div>
        <div>Jenis Bantuan: ${result.Nama_Bantuan || 'N/A'}</div>
        <div>Kategori Bantuan: ${result.Kategori_Bantuan || 'N/A'}</div>
        <div>Volume: ${result.VOLUME || 'N/A'}</div>
        <div>Satuan: ${result.SATUAN || 'N/A'}</div>
        <div>Satker Pemberi Bantuan: ${result.Satker_Pemberi_Bantuan || 'N/A'}</div>
        <div>Tahun: ${result.Tahun || 'N/A'}</div>
    `,
  BANTUAN_PEMERINTAH_DJPRL_AR: (result) => `
        <div>Provinsi: ${result.PROVINSI || 'N/A'}</div>
        <div>Kabupaten/Kota: ${result.KABUPATEN || 'N/A'}</div>
        <div>Kecamatan: ${result.KECAMATAN || 'N/A'}</div>
        <div>Desa: ${result.DESA || 'N/A'}</div>
        <div>Jenis Bantuan: ${result.Nama_Bantuan || 'N/A'}</div>
        <div>Kategori Bantuan: ${result.Kategori_Bantuan || 'N/A'}</div>
        <div>Volume: ${result.VOLUME || 'N/A'}</div>
        <div>Satuan: ${result.SATUAN || 'N/A'}</div>
        <div>Satker Pemberi Bantuan: ${result.Satker_Pemberi_Bantuan || 'N/A'}</div>
    `,

  //STATISTIK SPASIAL
  KUSUKA: (result) => `
    <div>Kode Provinsi: ${result.KDPPUM || 'N/A'}</div>
    `,
  Data_Kusuka_Provinsi: (result) => `
    <div>Kode Provinsi: ${result.KDPPUM || 'N/A'}</div>
    `,
  Data_KUSUKA_Kabupaten_Kota: (result) => `
    <div>Kode Provinsi: ${result.KDPPUM || 'N/A'}</div>
    `,
  Data_KUSUKA_Kecamatan: (result) => `
    <div>Kode Kabupaten: ${result.KDPKAB || 'N/A'}</div>
    `,

  RTP_2017: (result) => `
      <div>Kategori RTP: ${result.Kategori_RTP || 'N/A'}</div>
      <div>Kategori RTP II: ${result.Kategori_RTP2 || 'N/A'}</div>
      <div>Nama: ${result.NAMA || 'N/A'}</div>
      <div>Kabupaten Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Remark: ${result.REMARK || 'N/A'}</div>
      <div>Tanggal Survey: ${result.Tanggal_Survey || 'N/A'}</div>
      <div>Longitude: ${result.Longitude || 'N/A'}</div>
      <div>Latitude: ${result.Latitude || 'N/A'}</div>
      `,
  RTP_2018: (result) => `
      <div>Kategori RTP: ${result.Kategori_RTP || 'N/A'}</div>
      <div>Kategori RTP II: ${result.Kategori_RTP2 || 'N/A'}</div>
      <div>Nama: ${result.NAMA || 'N/A'}</div>
      <div>Jenis: ${result.Jenis || 'N/A'}</div>
      <div>Kabupaten Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Remark: ${result.REMARK || 'N/A'}</div>
      <div>Tanggal Survey: ${result.Tanggal_Survey || 'N/A'}</div>
      <div>Longitude: ${result.Longitude || 'N/A'}</div>
      <div>Latitude: ${result.Latitude || 'N/A'}</div>
      `,
  RTP_2019: (result) => `
     <div>Kategori RTP: ${result.Kategori_RTP || 'N/A'}</div>
      <div>Kategori RTP II: ${result.Kategori_RTP2 || 'N/A'}</div>
      <div>Nama: ${result.NAMA || 'N/A'}</div>
      <div>Jenis: ${result.Jenis || 'N/A'}</div>
      <div>Kabupaten Kota: ${result.Kabupaten_Kota || 'N/A'}</div>
      <div>Remark: ${result.REMARK || 'N/A'}</div>
      <div>Tanggal Survey: ${result.Tanggal_Survey || 'N/A'}</div>
      <div>Longitude: ${result.Longitude || 'N/A'}</div>
      <div>Latitude: ${result.Latitude || 'N/A'}</div>
      `,
  //PRODUKSI
  Jumlah_Perikanan_Tangkap_Provinsi: (result) => `
      <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Produksi Tangkap Tahun 2019: ${
         formatCurrency(result.Produksi_Tangkap_2019) || 'N/A'
       }</div>
       <div>Jumlah Produksi Tangkap Tahun 2020: ${
         formatCurrency(result.Produksi_Tangkap_2020) || 'N/A'
       }</div>
       <div>Jumlah Produksi Tangkap Tahun 2021: ${
         formatCurrency(result.Produksi_Tangkap_2021) || 'N/A'
       }</div>
       <div>Jumlah Produksi Tangkap Tahun 2022: ${
         formatCurrency(result.Produksi_Tangkap_2022) || 'N/A'
       }</div>
       <div>Jumlah Produksi Tangkap Tahun 2023: ${
         formatCurrency(result.Produksi_Tangkap_2023) || 'N/A'
       }</div>
       `,
  Jumlah_Perikanan_Tangkap_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Jumlah Produksi Tangkap Tahun 2019: ${
         formatCurrency(result.Produksi_Tangkap_2019) || 'N/A'
       }</div>
       <div>Jumlah Produksi Tangkap Tahun 2020: ${
         formatCurrency(result.Produksi_Tangkap_2020) || 'N/A'
       }</div>
       <div>Jumlah Produksi Tangkap Tahun 2021: ${
         formatCurrency(result.Produksi_Tangkap_2021) || 'N/A'
       }</div>
       <div>Jumlah Produksi Tangkap Tahun 2022: ${
         formatCurrency(result.Produksi_Tangkap_2022) || 'N/A'
       }</div>
       <div>Jumlah Produksi Tangkap Tahun 2023: ${
         formatCurrency(result.Produksi_Tangkap_2023) || 'N/A'
       }</div>
       `,
  Jumlah_Produksi_Pembesaran_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2019: ${
         result.Budidaya_Pembesaran_2019 || 'N/A'
       }</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2020: ${
         result.Budidaya_Pembesaran_2020 || 'N/A'
       }</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2021: ${
         result.Budidaya_Pembesaran_2021 || 'N/A'
       }</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2022: ${
         result.Budidaya_Pembesaran_2022 || 'N/A'
       }</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2023: ${
         result.Budidaya_Pembesaran_2023 || 'N/A'
       }</div>
       `,
  Jumlah_Produksi_Pembesaran_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2019: ${
         result.Budidaya_Pembesaran_2019 || 'N/A'
       }</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2020: ${
         result.Budidaya_Pembesaran_2020 || 'N/A'
       }</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2021: ${
         result.Budidaya_Pembesaran_2021 || 'N/A'
       }</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2022: ${
         result.Budidaya_Pembesaran_2022 || 'N/A'
       }</div>
       <div>Jumlah Budi Daya Pembesaran Tahun 2023: ${
         result.Budidaya_Pembesaran_2023 || 'N/A'
       }</div>
       `,
  Jumlah_Budidaya_Pembenihan_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2019: ${result.Pembenihan_2019 || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2020: ${result.Pembenihan_2020 || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2021: ${result.Pembenihan_2021 || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2022: ${result.Pembenihan_2022 || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2023: ${result.Pembenihan_2023 || 'N/A'}</div>
       `,
  Jumlah_Budidaya_Pembenihan_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2019: ${result.Pembenihan_2019 || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2020: ${result.Pembenihan_2020 || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2021: ${result.Pembenihan_2021 || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2022: ${result.Pembenihan_2022 || 'N/A'}</div>
       <div>Jumlah Budi Daya Pembenihan Tahun 2023: ${result.Pembenihan_2023 || 'N/A'}</div>
       `,
  Jumlah_Budidaya_IkanHias_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2019: ${result.Budidaya_Ikan_Hias_2019 || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2020: ${result.Budidaya_Ikan_Hias_2020 || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2021: ${result.Budidaya_Ikan_Hias_2021 || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2022: ${result.Budidaya_Ikan_Hias_2022 || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2023: ${result.Budidaya_Ikan_Hias_2023 || 'N/A'}</div>
       `,
  Jumlah_Budidaya_IkanHias_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2019: ${result.Budidaya_Ikan_Hias_2019 || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2020: ${result.Budidaya_Ikan_Hias_2020 || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2021: ${result.Budidaya_Ikan_Hias_2021 || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2022: ${result.Budidaya_Ikan_Hias_2022 || 'N/A'}</div>
       <div>Jumlah Budi Daya Ikan Hias Tahun 2023: ${result.Budidaya_Ikan_Hias_2023 || 'N/A'}</div>
       `,
  Jumlah_Garam_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2019: ${result.Jumlah_Garam_2019 || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2020: ${result.Jumlah_Garam_2020 || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2021: ${result.Jumlah_Garam_2021 || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2022: ${result.Jumlah_Garam_2022 || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2023: ${result.Jumlah_Garam_2023 || 'N/A'}</div>
       `,
  Jumlah_Garam_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2019: ${result.Jumlah_Garam_2019 || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2020: ${result.Jumlah_Garam_2020 || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2021: ${result.Jumlah_Garam_2021 || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2022: ${result.Jumlah_Garam_2022 || 'N/A'}</div>
       <div>Jumlah Produksi Garam Tahun 2023: ${result.Jumlah_Garam_2023 || 'N/A'}</div>
       `,
  //VPO
  Volume_Produksi_Olahan_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Volume Produksi Olahan Tahun 2022: ${result.VPO_2022 || 'N/A'}</div>
       <div>Volume Produksi Olahan Tahun 2022: ${result.VPO_2023 || 'N/A'}</div>
       `,
  //KAPAL
  Jumlah_Kapal_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2019: ${result.Jumlah_Kapal_2019 || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2020: ${result.Jumlah_Kapal_2020 || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2021: ${result.Jumlah_Kapal_2021 || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2022: ${result.Jumlah_Kapal_2022 || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2023: ${result.Jumlah_Kapal_2023 || 'N/A'}</div>
       `,
  Jumlah_Kapal_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2019: ${result.Jumlah_Kapal_2019 || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2020: ${result.Jumlah_Kapal_2020 || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2021: ${result.Jumlah_Kapal_2021 || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2022: ${result.Jumlah_Kapal_2022 || 'N/A'}</div>
       <div>Jumlah Kapal Tahun 2023: ${result.Jumlah_Kapal_2023 || 'N/A'}</div>
       `,
  //AKI
  Angka_Konsumsi_Ikan_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2019: ${result.Angka_Konsumsi_Ikan_2019 || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2020: ${result.Angka_Konsumsi_Ikan_2020 || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2021: ${result.Angka_Konsumsi_Ikan_2021 || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2022: ${result.Angka_Konsumsi_Ikan_2022 || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2023: ${result.Angka_Konsumsi_Ikan_2023 || 'N/A'}</div>
       `,
  Angka_Konsumsi_Ikan_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2019: ${result.Angka_Konsumsi_Ikan_2019 || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2020: ${result.Angka_Konsumsi_Ikan_2020 || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2021: ${result.Angka_Konsumsi_Ikan_2021 || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2022: ${result.Angka_Konsumsi_Ikan_2022 || 'N/A'}</div>
       <div>Jumlah Angka Konsumsi Ikan Tahun 2023: ${result.Angka_Konsumsi_Ikan_2023 || 'N/A'}</div>
       `,
  //KIRT
  Serapan_Ikan_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2019: ${
         result.Jumlah_Serapan_2019 || 'N/A'
       }</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2020: ${
         result.Jumlah_Serapan_2020 || 'N/A'
       }</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2021: ${
         result.Jumlah_Serapan_2021 || 'N/A'
       }</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2022: ${
         result.Jumlah_Serapan_2022 || 'N/A'
       }</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2023: ${
         result.Jumlah_Serapan_2023 || 'N/A'
       }</div>
       `,
  Serapan_Ikan_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2019: ${
         result.Jumlah_Serapan_2019 || 'N/A'
       }</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2020: ${
         result.Jumlah_Serapan_2020 || 'N/A'
       }</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2021: ${
         result.Jumlah_Serapan_2021 || 'N/A'
       }</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2022: ${
         result.Jumlah_Serapan_2022 || 'N/A'
       }</div>
       <div>Jumlah Konsumsi Ikan Dalam Rumah Tangga Tahun 2023: ${
         result.Jumlah_Serapan_2023 || 'N/A'
       }</div>
       `,
  //NELAYAN DAN PEMBUDIDAYA
  Jumlah_Nelayan_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2019: ${result.Jumlah_Nelayan_2019 || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2020: ${result.Jumlah_Nelayan_2020 || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2021: ${result.Jumlah_Nelayan_2021 || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2022: ${result.Jumlah_Nelayan_2022 || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2023: ${result.Jumlah_Nelayan_2023 || 'N/A'}</div>
       `,
  Jumlah_Nelayan_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2019: ${result.Jumlah_Nelayan_2019 || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2020: ${result.Jumlah_Nelayan_2020 || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2021: ${result.Jumlah_Nelayan_2021 || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2022: ${result.Jumlah_Nelayan_2022 || 'N/A'}</div>
       <div>Jumlah Nelayan Tahun 2023: ${result.Jumlah_Nelayan_2023 || 'N/A'}</div>
       `,
  Jumlah_Pembudidaya_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2019: ${result.Jumlah_Pembudidaya_2019 || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2020: ${result.Jumlah_Pembudidaya_2020 || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2021: ${result.Jumlah_Pembudidaya_2021 || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2022: ${result.Jumlah_Pembudidaya_2022 || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2023: ${result.Jumlah_Pembudidaya_2023 || 'N/A'}</div>
       `,
  Jumlah_Pembudidaya_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2019: ${result.Jumlah_Pembudidaya_2019 || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2020: ${result.Jumlah_Pembudidaya_2020 || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2021: ${result.Jumlah_Pembudidaya_2021 || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2022: ${result.Jumlah_Pembudidaya_2022 || 'N/A'}</div>
       <div>Jumlah Pembudidaya Tahun 2023: ${result.Jumlah_Pembudidaya_2023 || 'N/A'}</div>
       `,
  //RTP TANGKAP
  RTP_Tangkap_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2019: ${
         result.RTP_Tangkap_2019 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2020: ${
         result.RTP_Tangkap_2020 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2021: ${
         result.RTP_Tangkap_2021 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2022: ${
         result.RTP_Tangkap_2022 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2023: ${
         result.RTP_Tangkap_2023 || 'N/A'
       }</div>
       `,
  RTP_Tangkap_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2019: ${
         result.RTP_Tangkap_2019 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2020: ${
         result.RTP_Tangkap_2020 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2021: ${
         result.RTP_Tangkap_2021 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2022: ${
         result.RTP_Tangkap_2022 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Tangkap Tahun 2023: ${
         result.RTP_Tangkap_2023 || 'N/A'
       }</div>
       `,
  //RTP BUDIDAYA
  RTP_Budidaya_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2019: ${
         result.RTP_Budidaya_2019 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2020: ${
         result.RTP_Budidaya_2020 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2021: ${
         result.RTP_Budidaya_2021 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2022: ${
         result.RTP_Budidaya_2022 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2023: ${
         result.RTP_Budidaya_2023 || 'N/A'
       }</div>
       `,
  RTP_Budidaya_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2019 : ${
         result.RTP_Budidaya_2019 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2020: ${
         result.RTP_Budidaya_2020 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2021: ${
         result.RTP_Budidaya_2021 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2022: ${
         result.RTP_Budidaya_2022 || 'N/A'
       }</div>
       <div>Jumlah Rumah Tangga Perikanan Budidaya Tahun 2023: ${
         result.RTP_Budidaya_2023 || 'N/A'
       }</div>
       `,
  //DEMOGRAFIS
  Jumlah_Penduduk_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Jumlah Penduduk Tahun 2023: ${result.Jumlah_Penduduk || 'N/A'}</div>
    `,
  Jumlah_Penduduk_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Jumlah Penduduk Tahun 2023: ${result.Jumlah_Penduduk || 'N/A'}</div>
    `,
  Jumlah_Luhkan_PNS_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah PNS : ${result.PNS || 'N/A'}</div>
        `,
  Jumlah_Luhkan_PNS_Kabupaten_Kota: (result) => `
      <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
      <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
      <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
      <div>Jumlah PNS : ${result.PNS || 'N/A'}</div>
      `,
  Jumlah_Luhkan_P3K_Provinsi: (result) => `
      <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
      <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
      <div>Jumlah PPPK: ${result.P3K || 'N/A'}</div>
      `,
  Jumlah_Luhkan_P3K_Kabupaten_Kota: (result) => `
      <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
      <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
      <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
      <div>Jumlah PPPK: ${result.P3K || 'N/A'}</div>
      `,
  Jumlah_Luhkan_PPB_Provinsi: (result) => `
      <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
      <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
      <div>Jumlah PPB: ${result.PPB || 'N/A'}</div>
       `,
  Jumlah_Luhkan_PPB_Kabupaten_Kota: (result) => `
      <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
      <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
      <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
      <div>Jumlah PPB: ${result.PPB || 'N/A'}</div>
      `,
  Jumlah_Luhkan_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah PNS : ${result.PNS || 'N/A'}</div>
       <div>Jumlah PPPK: ${result.P3K || 'N/A'}</div>
       <div>Jumlah PPB: ${result.PPB || 'N/A'}</div>
       <div>Total Penyuluh Perikanan: ${result.Jumlah_Penyuluh_Perikanan || 'N/A'}</div>
       `,
  Jumlah_Luhkan_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Jumlah PNS : ${result.PNS || 'N/A'}</div>
       <div>Jumlah PPPK: ${result.P3K || 'N/A'}</div>
       <div>Jumlah PPB: ${result.PPB || 'N/A'}</div>
       <div>Total Penyuluh Perikanan: ${result.Jumlah_Penyuluh_Perikanan || 'N/A'}</div>
       `,
  Jumlah_Kemiskinan_Desil1_Kabupaten_Kota: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Desil I : ${result.Desil1 || 'N/A'}</div>
       `,
  Jumlah_Kemiskinan_Desil1_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Desil I : ${result.Desil1 || 'N/A'}</div>
       `,
  Jumlah_Kemiskinan_Desil2_Kabupaten_Kota: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Desil II : ${result.Desil2 || 'N/A'}</div>
       `,
  Jumlah_Kemiskinan_Desil2_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Desil II : ${result.Desil2 || 'N/A'}</div>
       `,
  Jumlah_Kemiskinan_Desil3_Kabupaten_Kota: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Desil III : ${result.Desil3 || 'N/A'}</div>
       `,
  Jumlah_Kemiskinan_Desil3_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Desil III : ${result.Desil3 || 'N/A'}</div>
       `,
  Jumlah_Kemiskinan_Desil4_Kabupaten_Kota: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Desil IV : ${result.Desil4 || 'N/A'}</div>
       `,
  Jumlah_Kemiskinan_Desil4_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Desil IV : ${result.Desil4 || 'N/A'}</div>
       `,
  Jumlah_Stunting_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Stunting (%) : ${result.Stunting || 'N/A'}</div>
       <div>N Tertimbang: ${result.N_tertimbang || 'N/A'}</div>
       <div>Jumlah Stunting: ${result.Jumlah_Stunting || 'N/A'}</div>
       `,
  Jumlah_Stunting_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Stunting (%) : ${result.Stunting || 'N/A'}</div>
       <div>N Tertimbang: ${result.N_tertimbang || 'N/A'}</div>
       <div>Jumlah Stunting: ${result.Jumlah_Stunting || 'N/A'}</div>
       `,
  //PDS
  Jumlah_UPI_MB_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Jumlah UPI (unit) : ${result.Jumlah_UPI || 'N/A'}</div>
       `,
  Jumlah_UPI_MB_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Jumlah UPI (unit) : ${result.Jumlah_UPI || 'N/A'}</div>
       `,
  Cold_Storage_Point: (result) => `
       <div>ID Cold Storage: ${result.ID_Cold_Storage || 'N/A'}</div>
       <div>ID Provinsi: ${result.ID_Provinsi || 'N/A'}</div>
       <div>ID Kabupaten : ${result.ID_Kabupaten || 'N/A'}</div>
       <div>WPPNRI : ${result.WPPNRI || 'N/A'}</div>
       <div>Zona: ${result.Zona || 'N/A'}</div>
       <div>Lokasi: ${result.Lokasi || 'N/A'}</div>
       <div>Jenis Cold Storage : ${result.Jenis_Cold_Storage || 'N/A'}</div>
       <div>Sumber Dana: ${result.Sumber_Dana || 'N/A'}</div>
       <div>Kapasitas (ton): ${result.Kapasitas || 'N/A'}</div>
       <div>Status Pemanfaatan: ${result.Status_Pemanfaatan || 'N/A'}</div>
       `,
  Asupan_Protein_Campuran_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Tahun : ${result.tahun || 'N/A'}</div>
       <div>Jumlah Asupan Protein Campuran : ${result.Campuran || 'N/A'}</div>
       `,
  Asupan_Protein_Hewani_Protein_Ikan_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Tahun : ${result.tahun || 'N/A'}</div>
       <div>Jumlah Asupan Hewani Protein Ikan : ${result.Hewani_Protein_Ikan || 'N/A'}</div>
       `,
  Asupan_Protein_Hewani_Protein_Non_Ikan_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Tahun : ${result.tahun || 'N/A'}</div>
       <div>Jumlah Asupan Hewani Protein Non-Ikan: ${result.Hewani_Protein_Non_Ikan || 'N/A'}</div>
       `,
  Asupan_Protein_Nabati_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Tahun : ${result.tahun || 'N/A'}</div>
       <div>Jumlah Asupan Protein Nabati : ${result.Nabati || 'N/A'}</div>
       `,
  Realisasi_Investasi_KP_Provinsi: (result) => `
       <div>Kode Provinsi: ${result.Kode_Provinsi || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Provinsi || 'N/A'}</div>
       <div>Realisasi Investasi Kelautan Perikanan Tahun 2022 : ${
         result.Realisasi_KP_2022 || 'N/A'
       }</div>
       <div>Realisasi Investasi Kelautan Perikanan Tahun 2022 : ${
         result.Realisasi_KP_2023 || 'N/A'
       }</div>
       `,
  Realisasi_Investasi_KP_Kabupaten_Kota: (result) => `
       <div>Kode Kabupaten/Kota: ${result.Kode_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Kabupaten/Kota: ${result.Nama_Kabupaten_Kota || 'N/A'}</div>
       <div>Nama Provinsi: ${result.Wilayah_Administrasi_Wilayah || 'N/A'}</div>
       <div>Realisasi Investasi Kelautan Perikanan Tahun 2022 : ${
         result.Realisasi_KP_2022 || 'N/A'
       }</div>
       <div>Realisasi Investasi Kelautan Perikanan Tahun 2022 : ${
         result.Realisasi_KP_2023 || 'N/A'
       }</div>
       `,
};
