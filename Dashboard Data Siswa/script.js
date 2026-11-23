// 1. Mock data statis (minimal 10 data siswa: name, class, score)
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
  { name: "Mikuro Arimoto", class: "XII IPA 2", score: 72},
  { name: "Shoko Hamura", class: "XII IPA 2", score: 70 },
];

const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("studentTableBody");
const averageScoreEl = document.getElementById("averageScore");
const resultCountEl = document.getElementById("resultCount");

// Helper untuk menghindari karakter HTML berbahaya saat merender nama/kelas
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderDashboard(keyword = "") {
  const normalizedKeyword = keyword.trim().toLowerCase();

  // 2. Filter data berdasarkan kata kunci nama menggunakan .filter()
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(normalizedKeyword)
  );

  // 3. Render baris tabel menggunakan .map()
  if (filteredStudents.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-row">Tidak ada siswa yang cocok dengan pencarian "${escapeHtml(keyword)}".</td>
      </tr>
    `;
  } else {
    tableBody.innerHTML = filteredStudents
      .map(
        (student, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.class)}</td>
            <td>${student.score}</td>
          </tr>
        `
      )
      .join("");
  }

  // 4. Hitung total score dengan .reduce() lalu bagi dengan jumlah siswa yang tampil
  const totalScore = filteredStudents.reduce((acc, student) => acc + student.score, 0);
  const average =
    filteredStudents.length > 0 ? (totalScore / filteredStudents.length).toFixed(2) : "0.00";

  averageScoreEl.textContent = average;
  resultCountEl.textContent = `Menampilkan ${filteredStudents.length} dari ${students.length} siswa`;
}

// 5. Event listener pada input pencarian
searchInput.addEventListener("input", (event) => {
  renderDashboard(event.target.value);
});

// Render awal saat halaman pertama kali dibuka
renderDashboard();