// 1. Type alias / interface untuk struktur data siswa secara ketat
type StudentType = {
  name: string;
  class: string;
  score: number;
};

// 2. Mock data statis dengan static typing StudentType[]
const students: StudentType[] = [
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

// 3. Elemen DOM dengan tipe eksplisit dan pengecekan null (strict mode)
const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
const tableBody = document.getElementById("studentTableBody") as HTMLTableSectionElement | null;
const averageScoreEl = document.getElementById("averageScore") as HTMLTableCellElement | null;
const resultCountEl = document.getElementById("resultCount") as HTMLSpanElement | null;

// Helper escape HTML dengan parameter dan return type eksplisit
function escapeHtml(text: string): string {
  const div: HTMLDivElement = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Fungsi filter berdasarkan nama siswa
function filterStudentsByName(data: StudentType[], keyword: string): StudentType[] {
  const normalizedKeyword: string = keyword.trim().toLowerCase();
  if (!normalizedKeyword) {
    return data;
  }

  return data.filter((student: StudentType): boolean =>
    student.name.toLowerCase().includes(normalizedKeyword)
  );
}

// Fungsi menghitung total & rata-rata score menggunakan .reduce()
function calculateAverageScore(data: StudentType[]): string {
  if (data.length === 0) {
    return "0.00";
  }

  const totalScore: number = data.reduce(
    (accumulator: number, student: StudentType): number => accumulator + student.score,
    0
  );

  const average: number = totalScore / data.length;
  return average.toFixed(2);
}

// Fungsi merender baris tabel menggunakan .map()
function renderTableRows(data: StudentType[], keyword: string): void {
  if (!tableBody) return;

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

  const rowsHtml: string = data
    .map(
      (student: StudentType, index: number): string => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(student.name)}</td>
          <td>${escapeHtml(student.class)}</td>
          <td>${student.score}</td>
        </tr>
      `
    )
    .join("");

  tableBody.innerHTML = rowsHtml;
}

// Fungsi utama update dashboard
function renderDashboard(keyword: string = ""): void {
  const filteredStudents: StudentType[] = filterStudentsByName(students, keyword);

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
  searchInput.addEventListener("input", (event: Event): void => {
    const target = event.target as HTMLInputElement | null;
    renderDashboard(target ? target.value : "");
  });
}

// Render awal saat halaman dimuat
renderDashboard();