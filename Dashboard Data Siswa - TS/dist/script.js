"use strict";
// 2. Mock data statis dengan static typing StudentType[]
const students = [
    { name: "Doki Reiji", class: "XII IPS 1", score: 85 },
    { name: "Agi", class: "XII IPS 1", score: 90 },
    { name: "Daisuke Date", class: "XII IPS 1", score: 87 },
    { name: "Setsuna Aikokuin", class: "XII IPA 1", score: 81 },
    { name: "Rui Amou", class: "XII IPA 1", score: 75 },
    { name: "Kiki Iwai", class: "XII IPS 2", score: 65 },
    { name: "Kotobuki Takanari", class: "XII IPS 2", score: 67 },
    { name: "Kunai Kazanami", class: "XII IPS 3", score: 89 },
    { name: "Hatsune Kazanami", class: "XII IPS 3", score: 91 },
    { name: "Mikuro Arimoto", class: "XII IPA 2", score: 72 },
    { name: "Shoko Hamura", class: "XII IPA 2", score: 70 },
];
// 3. Elemen DOM dengan tipe eksplisit dan pengecekan null (strict mode)
const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("studentTableBody");
const averageScoreEl = document.getElementById("averageScore");
const resultCountEl = document.getElementById("resultCount");
// Helper escape HTML dengan parameter dan return type eksplisit
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
// Fungsi filter berdasarkan nama siswa
function filterStudentsByName(data, keyword) {
    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) {
        return data;
    }
    return data.filter((student) => student.name.toLowerCase().includes(normalizedKeyword));
}
// Fungsi menghitung total & rata-rata score menggunakan .reduce()
function calculateAverageScore(data) {
    if (data.length === 0) {
        return "0.00";
    }
    const totalScore = data.reduce((accumulator, student) => accumulator + student.score, 0);
    const average = totalScore / data.length;
    return average.toFixed(2);
}
// Fungsi merender baris tabel menggunakan .map()
function renderTableRows(data, keyword) {
    if (!tableBody)
        return;
    if (data.length === 0) {
        tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-row">
          Tidak ada siswa yang cocok dengan pencarian "${escapeHtml(keyword)}".
        </td>
      </tr>
    `;
        return;
    }
    const rowsHtml = data
        .map((student, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(student.name)}</td>
          <td>${escapeHtml(student.class)}</td>
          <td>${student.score}</td>
        </tr>
      `)
        .join("");
    tableBody.innerHTML = rowsHtml;
}
// Fungsi utama update dashboard
function renderDashboard(keyword = "") {
    const filteredStudents = filterStudentsByName(students, keyword);
    renderTableRows(filteredStudents, keyword);
    if (averageScoreEl) {
        averageScoreEl.textContent = calculateAverageScore(filteredStudents);
    }
    if (resultCountEl) {
        resultCountEl.textContent = `Menampilkan ${filteredStudents.length} dari ${students.length} siswa`;
    }
}
// Event listener pada input pencarian
if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        const target = event.target;
        renderDashboard(target ? target.value : "");
    });
}
// Render awal saat halaman dimuat
renderDashboard();
