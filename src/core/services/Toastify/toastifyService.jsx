import Swal from "sweetalert2";
import { toast } from "react-toastify";

const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export class ToastifyService {
  successPencarianKusuka = (data) => {
    const title =
      data.input?.length === 16
        ? "Anda Sudah Pernah Mendaftar Kusuka sebagai"
        : "NIB Sudah Pernah Mendaftar Kusuka sebagai";

    const statusList = data.status
      .map((el, idx) => {
        return `<li>${el.value} (${el.count})</li>`;
      })
      .join("");

    Swal.fire({
      icon: "success",
      title: title,
      html: `<ul style="text-align: left;">${statusList}</ul>`,
      showCancelButton: true,
      cancelButtonText: "Kembali",
      reverseButtons: true,
      customClass: {
        popup: "custom-swal-popup",
      },
    });
  };

  formRequired = () => {
    Swal.fire({
      icon: "warning",
      title: "Perhatian !!",
      text: "Terdapat Form Yang Belum Terisi/Tidak Sesuai",
    });
  };
  confirmSubmit = (text, cnfText = "Kirim") => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Perhatian !!",
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">${cnfText}</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  gagalPencarianKusuka = () => {
    Swal.fire({
      icon: "error",
      title: "NIK/NIB Tidak Ditemukan",
      text: "Coba Lagi atau Lanjut ke Halaman Pendaftaran",
      showCancelButton: true,
      cancelButtonText: "Kembali",
      confirmButtonText: "Daftar Kusuka",
      reverseButtons: true,
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1",
        confirmButton: "order-2",
        popup: "custom-swal-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(
          import.meta.env.VITE_APP_BASEURL_FE + "/register",
          "_blank"
        );
      }
    });
  };

  suksesPencarianNoKusuka = (msg = "Pencarian Berhasil") => {
    Swal.fire({
      icon: "success",
      title: "No Kusuka Ditemukan",
      text: msg,
      showCancelButton: false,
      // confirmButtonText: "Lanjutkan",
      customClass: {
        confirmButton: "order-1",
      },
    });
  };

  gagalPencarianNoKusuka = () => {
    Swal.fire({
      icon: "error",
      title: "No. Kusuka Tidak Ditemukan",
      text: "Silahkan Melakukan Pendaftaran Terlebih Dahulu",
      showCancelButton: true,
      // cancelButtonText: "Kembali",
      // confirmButtonText: "Daftar Kusuka",
      reverseButtons: true,
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1",
        confirmButton: "order-2",
      },
    });
  };

  gagalPencarianNIB = () => {
    Swal.fire({
      icon: "error",
      title: "NIB Tidak Ditemukan",
      text: "Silahkan Coba Lagi",
      showCancelButton: true,
      // cancelButtonText: 'Kembali',
      // confirmButtonText: 'Daftar Kusuka',
      reverseButtons: true,
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1",
        confirmButton: "order-2",
      },
    });
  };

  totalAnggaran = () => {
    Swal.fire({
      icon: "warning",
      title: "Gagal",
      html: "Total tidak boleh melebihi Pagu Anggaran",
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  totalSpesifikasi = () => {
    Swal.fire({
      icon: "warning",
      title: "Gagal",
      html: "Spesifikasi tidak boleh melebihi Total Spesifikasi",
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  notHaveNIB = () => {
    Swal.fire({
      icon: "warning",
      title: "Gagal",
      html: "Pelaku Usaha tidak memiliki NIB",
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  fieldNotEmpty = () => {
    Swal.fire({
      icon: "warning",
      title: "Gagal",
      html: "Semua Form Input Harus di Isi",
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  wrongPassword = () => {
    Swal.fire({
      icon: "warning",
      title: "Gagal",
      html: "Email atau Password yang anda masukkan salah",
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  emptyQrcField() {
    throw new Error("Method not implemented.");
  }

  closeSwal = () => {
    Swal.close();
  };

  showLoading = () => {
    Swal.fire({
      title: "Memuat",
      html: "Harap Tunggu...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };
  customShowLoading = (msg) => {
    Swal.fire({
      title: "Memuat",
      html: msg || "Harap Tunggu...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };
  loadingSendData = () => {
    Swal.fire({
      title: "Mengirim Data",
      html: "Harap Tunggu...",
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };
  redirectSSO = () => {
    Swal.fire({
      title: "Memuat",
      html: "Proses Data Akun....",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };
  loadingDownload = () => {
    Swal.fire({
      title: "Memuat",
      html: `
        <div class="swal2-loading-content">
          Data Sedang Disiapkan, Harap Tunggu...
          <div class="swal2-spinner" style="margin-top: 20px;">
            <i class="bx bx-loader-circle spin" style="font-size: 3rem;"></i>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Tutup",
    });
  };

  loadingDownloadInfo = (text) => {
    Swal.fire({
      title: "Memuat",
      html: `
        <div class="swal2-loading-content">
          ${text}
          <div class="swal2-spinner" style="margin-top: 20px;">
            <i class="bx bx-loader-circle spin" style="font-size: 3rem;"></i>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Tutup",
    });
  };

  loadingDownloadInfoNew = (page, totalPages, totalDataFetched, totalData) => {
    const progressPercentage = ((page / totalPages) * 100).toFixed(1); // Persentase dengan 1 desimal

    Swal.fire({
      title: "Memuat Data Kapal",
      html: `
      <div style="font-size: 1.1rem; margin-bottom: 10px;">
        🔄 Mengambil data... <b>Page ${page}/${totalPages}</b>
      </div>
      <div style="font-size: 0.9rem; color: gray;">
        📊 Total Data: <b>${totalDataFetched}/${totalData}</b>
      </div>
      <div class="swal2-progress-bar" style="position: relative; margin-top: 15px; width: 100%; background: #f3f3f3; border-radius: 5px;">
        <div style="height: 8px; width: ${progressPercentage}%; background: #007bff; transition: width 0.3s ease-in-out; border-radius: 5px;"></div>
        <div style="position: absolute; width: 100%; top: -20px; text-align: center; font-size: 0.9rem; font-weight: bold; color: #007bff;">
          ${progressPercentage}%
        </div>
      </div>
    `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Tutup",
    });
  };

  loadingDownloadInfoExcel = (
    teks = "Memuat Data",
    page,
    totalPages,
    totalDataFetched,
    totalData,
    jumlahData
  ) => {
    const progressPercentage = ((page / totalPages) * 100).toFixed(1); // Persentase dengan 1 desimal

    Swal.fire({
      title: teks,
      html: `
      <div style="font-size: 1.1rem; margin-bottom: 10px;">
        🔄 Mengambil data sebanyak: <b>${jumlahData}</b>
      </div>
      <div style="font-size: 0.9rem; color: gray;">
        📊 Total Data: <b>${totalDataFetched}/${totalData}</b>
      </div>
      <div class="swal2-progress-bar" style="position: relative; margin-top: 15px; width: 100%; background: #f3f3f3; border-radius: 5px;">
        <div style="height: 8px; width: ${progressPercentage}%; background: #007bff; transition: width 0.3s ease-in-out; border-radius: 5px;"></div>
        <div style="position: absolute; width: 100%; top: -20px; text-align: center; font-size: 0.9rem; font-weight: bold; color: #007bff;">
          ${progressPercentage}%
        </div>
      </div>
    `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Tutup",
    });
  };

  close = () => Swal.close();

  loadingUpload = () => {
    Swal.fire({
      title: "Mengunggah File",
      html: "Harap Tunggu...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  beValidNumber = () => {
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      html: "Nomor SIM harus berupa angka",
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  emptyInputField = (teks) => {
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      html: `Harap Lengkapi Data Yang Wajib Diisi ${teks}`,
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  required = (teks) => {
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      html: `${teks}`,
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  kusukaNoRegister = () => {
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      html: "No Kusuka tidak terdaftar, Harap Daftar Kusuka Terlebih Dahulu",
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  notHaveProofPayment = () => {
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      html: "Bukti Pembayaran Tidak Tersedia",
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  tpsVerified = () => {
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      html: "TPS Sudah Terverifikasi, Harap Mengganti TPS Yang Dipilih",
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  error = (text) => {
    return new Promise((resolve) => {
      Swal.fire({
        icon: "warning",
        title: "Perhatian",
        html: text,
        confirmButtonText: `<span id="btn-confirm">OK</span>`,
      }).then((result) => {
        resolve(result.isConfirmed); // Resolve the Promise with the confirmation result
      });
    });
  };

  developmentFeature = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Fitur masih dalam development",
        icon: "warning",
        confirmButtonColor: "#1A264E",
        confirmButtonText: `<span id="btn-confirm">Kembali</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  timeOutNotification = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Time Is Up!",
        text: "Please Repurchase",
        icon: "warning",
        confirmButtonColor: "#1A264E",
        confirmButtonText: `<span id="btn-confirm">Kembali</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationReset = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Data Yang Anda Inputkan Akan Dibersihkan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationCreate = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Data Yang Anda Masukan Akan Dikirim",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationPayment = (totalPrice) => {
    // Sekarang menerima angka, bukan objek
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        html: `
        <div style="text-align: left; font-size: 16px;">
          <p>Anda akan melakukan pembayaran dengan total:</p>
          <h2 style="color: #1A264E; font-weight: bold;">Rp ${totalPrice.toLocaleString()}</h2>
        </div>
      `,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: "Ya, Bayar Sekarang",
        cancelButtonText: "Batal",
        customClass: {
          popup: "swal2-rounded",
        },
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmation = (text) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: text || "-",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationTetapkanKS = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Data Akan Dikirim, dan Tidak Bisa Dirubah",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationVerif = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Data Yang Anda Masukan Akan Di Verifikasi",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationDownload = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Data Yang Anda Pilih Akan Dikirim Via Email",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };
  confirmationDownloadData = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Data Akan Terunduh ke Excel",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };
  confirmationCustom = ({ title, text, cfText, clText }) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#f43f5e",
        confirmButtonText: `<span id="btn-confirm">${cfText}</span>`,
        cancelButtonText: `<span id="btn-cancel">${clText}</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationChangePwd = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Kata Sandi Anda Akan diubah",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationReject = () => {
    return new Promise((resolve) => {
      Swal.fire({
        // confirmation before data deleted
        title: "Apakah Anda Yakin ?",
        text: "Request akan di tolak !!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationDelete = () => {
    return new Promise((resolve) => {
      Swal.fire({
        // confirmation before data deleted
        title: "Apakah Anda Yakin ?",
        text: "Data Anda Akan Dihapus !!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  successChangePassword = () => {
    return new Promise(() => {
      Swal.fire({
        icon: "info",
        title: "Berhasil Update Password!",
        text: "Harap Login Kembali",
      }).then((res) => {
        if (res.isConfirmed) {
          window.localStorage.clear();
          deleteCookie("token");
          window.location.href = "/";
        }
      });
    });
  };

  successChangeData = () => {
    return new Promise(() => {
      Swal.fire({
        icon: "info",
        title: "Berhasil Update Akun!",
        text: "Harap Login Kembali",
      }).then((res) => {
        if (res.isConfirmed) {
          window.localStorage.clear();
          deleteCookie("token");
          window.location.href = "/";
        }
      });
    });
  };

  confirmationCancel = () => {
    return new Promise((resolve) => {
      Swal.fire({
        // confirmation before data deleted
        title: "Apakah Anda Yakin ?",
        text: "Data Akan Di Batalkan !!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationUpdate = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Data Anda Sebelumnya akan Diperbaharui",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationLogout = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin Ingin Keluar ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  photoEmpty = () => {
    Swal.fire({
      title: "Perhatian !",
      text: "Foto Halaman 2 Wajib Diisi",
      icon: "warning",
    });
  };
  customWarningMsg = (msg) => {
    Swal.fire({
      title: "Perhatian !",
      text: msg,
      icon: "warning",
    });
  };
  customWarningMsgWBackdrop = (msg) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Perhatian !",
        text: msg,
        icon: "warning",
        backdrop: true, // Mengaktifkan backdrop
        allowOutsideClick: false, // Mencegah klik di luar untuk menutup
        allowEscapeKey: false, // Mencegah menutup dengan tombol escape
        confirmButtonText: "OK", // Tombol konfirmasi
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true); // Mengembalikan true jika tombol OK ditekan
        } else {
          resolve(false); // Mengembalikan false jika modal ditutup dengan cara lain
        }
      });
    });
  };

  customConfirmation = (msg) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: msg,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1A264E",
        cancelButtonColor: "#A8A8A8",
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  info = (text, text2) => {
    Swal.fire({
      title: "Perhatian !",
      html: `${text} ${
        text2 ? `<br><strong style="font-size: 18px;">${text2}</strong>` : ""
      }`,
      icon: "warning",
    });
  };

  successCopy = () => {
    Swal.fire({
      title: "Sukses",
      text: "Data Berhasil Disalin",
      icon: "success",
    });
  };
  successCreate = () => {
    Swal.fire({
      title: "Sukses",
      text: "Data Anda Berhasil Terupload",
      icon: "success",
    });
  };

  success = (text) => {
    Swal.fire({
      title: "Sukses",
      text: text,
      icon: "success",
    });
  };

  successVerifikasi = () => {
    Swal.fire({
      title: "Sukses",
      text: "Data Berhasil Terverifikasi",
      icon: "success",
    });
  };

  successCreateAndWaitConfirm = () => {
    Swal.fire({
      title: "Sukses",
      text: "Data Anda Berhasil Terupload, Harap Tunggu Konfirmasi Admin",
      icon: "success",
    });
  };

  successDelete = () => {
    Swal.fire({
      title: "Sukses",
      text: "Data Anda Berhasil Dihapus",
      icon: "success",
    });
  };

  successUpdate = () => {
    Swal.fire({
      title: "Sukses",
      text: "Data Anda Berhasil Terupdate",
      icon: "success",
    });
  };

  successLogin = () => {
    Swal.fire({
      title: "Login Sukses",
      icon: "success",
    });
  };

  successAccept = () => {
    toast.success("Data berhasil di konfirmasi", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  successDownload = () => {
    toast.success("Link download sudah di kirim, Silahkan buka gmail anda", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  successReject = () => {
    toast.success("Data berhasil di reject", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
}
